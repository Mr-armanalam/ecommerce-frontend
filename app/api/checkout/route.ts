/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/model/Order.model";
import { Product } from "@/model/product";
import { NextResponse } from "next/server";
import Stripe from 'stripe';

if (!process.env.STRIPE_SK) {
  throw new Error('Missing STRIPE_SK environment variable');
}

const stripe = new Stripe(process.env.STRIPE_SK);

export async function POST(req: Request) {
  try {
    mongooseConnect();
    const formData = await req.formData();
    const formDataObject: { [key: string]: any } = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });    

    const { name, email, city, postalCode, landmark, country, cartProducts } = formDataObject;

    // const productsIds = cartProducts;
    const productsIds = JSON.parse(cartProducts);    
    const uniqueIds = [...new Set(productsIds)];
    const productsInfos = await Product.find({_id:uniqueIds});

    let line_items = [];
    for (const productId of uniqueIds) {
      const productInfo = productsInfos.find(p => p._id.toString() === productId);
      
      const quantity = productsIds.filter((id:string) => id === productId)?.length || 0 ;
      if (quantity > 0 && productInfo) {
        line_items.push({
        quantity,
        price_data: {
          currency: 'USD',
          product_data: {name: productInfo.title},
          unit_amount: quantity * productInfo.price * 100,

        }
      })
      }
    }

    const orderDoc = await Order.create({
      line_items,
      name,email,city, postalCode,
      country,landmark, paid: false,
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      customer_email: email,
      success_url: `${process.env.PUBLIC_URL}/cart?success=1`,
      cancel_url: `${process.env.PUBLIC_URL}/cart?canceled=1`,
      metadata: {orderId: orderDoc._id.toString()}
    });

    return NextResponse.json({
      url: session.url
    })

  } catch (error: any) {
    throw new Error(error.message);
  }
}

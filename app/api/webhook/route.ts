
import { Order } from '@/model/Order.model';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';


if (!process.env.STRIPE_SK) {
  throw new Error('Missing STRIPE_SK environment variable');
}

const stripe = new Stripe(process.env.STRIPE_SK);

const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

export const config = {
  api: {
    bodyParser: false,
  },
};

async function buffer(readable: ReadableStream<Uint8Array>) {
  const reader = readable.getReader();
  const chunks = [];
  let result;

  while (!(result = await reader.read()).done) {
    chunks.push(result.value);
  }

  return Buffer.concat(chunks);
}

export async function POST(req: NextRequest) {
  if (!req.body) {
    throw new Error('Missing request body');
  }
  const buf = await buffer(req.body);
  const sig = req.headers.get('stripe-signature');

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig!, endpointSecret!);
  } catch (err:any) {
    console.error(` Webhook signature verification failed.`, err);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const paymentData = event.data.object as any ;
      const orderId = paymentData.metadata.orderId;
      const paid = paymentData.payment_status === 'paid';
      if (paid && orderId) {
        await Order.findByIdAndUpdate(orderId,{paid: true});
      }
      break;
    }
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true }, {status: 200});
}

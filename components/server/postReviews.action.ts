/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { mongooseConnect } from "@/lib/mongoose";
import { Reviews } from "../client/ReviewShower";
import { Review } from "@/model/reviews.model";

export const postReviews = async (props: Reviews) => {
  try {
    mongooseConnect();

    const newReview = new Review({ ...props });
    await newReview.save();

    const reviews = await Review.findOne({ productId: props.productId, userId: props.userId })
      .sort({
        createdAt: -1,
      })
      .populate("userId");

    if (reviews.length > 0) {
      return {
        status: "success",
        reviews: JSON.parse(JSON.stringify(reviews)),
      };
    }

    return { status: "success", reviews: {} };
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export const getAllReviews = async (productId: string) => {
  try {
    mongooseConnect();
    const reviews = await Review.find({ productId })
      .sort({
        createdAt: -1,
      })
      .populate("userId");

    if (reviews.length > 0) {
      return {
        status: "success",
        reviews: JSON.parse(JSON.stringify(reviews)),
      };
    }

    return { status: "success", reviews: [] };
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export const getUserReview = async ({ productId, userId }:{productId: string, userId: string | undefined}) => {
  try {
    mongooseConnect();
    const review = await Review.findOne({ productId, userId }).populate("userId");
    if (review) {
      return {
        status: "success",
        review: JSON.parse(JSON.stringify(review)),
      };
    }
    return { status: "500", review: null };
  } catch (error: any) {
    console.log(error.message);
    return { status: 500, review: [] };
  }
};

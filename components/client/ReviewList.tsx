"use client";
import React, { useEffect, useState } from "react";
import { lora } from "../Header";
import { getAllReviews } from "../server/postReviews.action";
import { useSession } from "next-auth/react";
import { IClientUser } from "@/model/Clientuser.model";
import ReviewStart from "./ReviewStart";

export interface FetchReview {
  rating: number;
  title: string;
  description: string;
  userId?: IClientUser;
  productId: string;
  createdAt: number | string | Date;
}

const ReviewList = ({ productId }: { productId: string }) => {
  const [allreviews, setAllReviews] = useState<FetchReview[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      (async () => {
        const fetchReviews = await getAllReviews(productId);
        if (!fetchReviews) return;
        const BuyerReviews = fetchReviews?.reviews.filter(
          (review: FetchReview) => review.userId?._id !== session?.user?.id
        );
        setAllReviews(BuyerReviews);
      })();
    }
  }, [session, setAllReviews]);

  return (
    <>
      <h3 className={`${lora.className} mb-1 font-bold text-gray-500`}>
        All Reviews
      </h3>
      {allreviews.length === 0 && (
        <h2 className={`${lora.className} text-gray-700 `}>
          No any reviews for this product
        </h2>
      )}
      <div className={`flex flex-col gap-3 text-gray-500`}>
        {allreviews.map((review, i) => (
          <ReviewStart key={i} {...review} />
        ))}
      </div>
    </>
  );
};

export default ReviewList;

"use client";
import React, { useState } from "react";
import { lora } from "../Header";
import { StarIcon } from "../icons";
import { useSession } from "next-auth/react";
// import CollapsibleRating from "./CollapsibleRating";

const ReviewShower = () => {
  const [rating, setRating] = useState(1);
  const [hoverRating, setHoverRating] = useState(0);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const { data: session } = useSession();

  interface Review {
    rating: number;
    title: string;
    description: string;
    userId?: string;
    reviewTime: string;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const review: Review = {
      rating,
      title,
      description,
      userId: session?.user?.id,
      reviewTime: new Date().toISOString(),
    };

    console.log(review);
  };

  return (
    <section className=" relative pb-2">
      <h2 className={`${lora.className} mb-0.5 font-semibold`}>Reviews</h2>
      <div className="grid grid-cols-5 gap-8">
        <div className="white_box col-span-2">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <h3 className={`${lora.className} mb-1 font-bold text-gray-500`}>
              Write a Review
            </h3>
            <div className="ml-auto flex">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`size-5 cursor-pointer ${i < (hoverRating || rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                  onClick={() => setRating(i + 1)}
                  onMouseEnter={() => setHoverRating(i + 1)}
                  onMouseLeave={() => setHoverRating(0)}
                />
              ))}
            </div>
            <input
              type="text"
              name="title"
              placeholder="Title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              name="description"
              placeholder="Description"
              className="rounded-lg border-b px-2 outline-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id="description"
            />
            <button
              type="submit"
              className="btn-primary1 btn_block mt-6 rounded-md bg-primaryMain py-2.5 text-white"
              id="submit"
            >
              Add Your Review
            </button>
          </form>
        </div>
        <div className="white_box col-span-3 h-fit">
          <h3 className={`${lora.className} mb-1 font-bold text-gray-500`}>
            All Reviews
          </h3>
          {/* <h2 className={`${lora.className} text-gray-700 `}>
            No any reviews for this product
          </h2> */}
          <div className={`flex flex-col gap-3 text-gray-500`}>
            {[...Array(3)].map((review, i) => (
              <div className="rounded-lg bg-gray-50 px-6 py-4" key={i}>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white object-cover font-bold uppercase">
                    s
                  </div>
                  <span className="font-bold">Arman Alam</span>
                </div>
                <div className="ml-4 mt-3 flex">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className="size-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <div className="mt-3 px-4">
                  <p className="text-sm font-semibold">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Autem quos consectetur iste obcaecati itaque quidem a
                    repellat, magni unde eum explicabo quod vel tenetur quas
                    aliquid nemo nam? Omnis, quisquam.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <CollapsibleRating /> */}
    </section>
  );
};

export default ReviewShower;

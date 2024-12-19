'use client'
import React, { useState } from "react";

const ProductImages = ({ images }: { images: string[] }) => {
  const [activeImage, setActiveImage] = useState(images?.[0] || '');
  return (
    <div className="flex flex-col">
        <div className="center max-h-[220px] w-full">
          <img
            className="max-w-[100%] max-h-[220px] object-contain"
            src={activeImage}
            alt="details-product"
          />
        </div>
      <div className="flex overflow-x-auto w-full ">
        {images.map((image, index) => (

          <div key={index}
          className={`${activeImage === image ? "border-2 border-gray-200"
           : "border border-gray-100"} center cursor-pointer shadow-md mt-10 mb-2 rounded-md ml-3 p-2`}
          >
            <img
              onClick={() => setActiveImage(image)}
              className="w-[80px] bg-transparent mix-blend-multiply object-contain  "
              src={image}
              alt="details-all-product"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;

"use client"

import React from "react"

export const ProductPropertes = ({properties}:{properties: {[key: string]:string}}) => {
  const productPropertes = Object.keys(properties);  
  return (
    <div className="text-gray-700 text-sm">
      {productPropertes && productPropertes.reverse().map((product, index) => (
        <p key={index}>{product}: {properties[product]}</p>
      ))}
    </div>
  )
}




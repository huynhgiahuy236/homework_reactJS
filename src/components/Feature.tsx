import React, { useState } from "react";
import  featureData  from "../data/feature.json";

const Feature = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center mt-15 gap-10">
      {featureData.map((item, index) => (
        <div
          key={index}
          className="bg-gray-100 rounded-2xl relative text-center p-10 grid gap-2"
        >
          <span className="text-2xl absolute -top-7 left-1/2 -translate-x-1/2 text-white bg-blue-600 p-3 rounded-xl">
            <i className={item.icon}></i>
          </span>
          <h1 className="font-medium text-xl">{item.title}</h1>
          <p className="text-gray-700">{item.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Feature;

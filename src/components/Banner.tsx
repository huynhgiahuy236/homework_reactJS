import React from "react";

const Banner = () => {
  return (
    <div className="bg-gray-100 text-center mt-10 py-20 rounded-3xl grid gap-y-5">
      <h1 className="font-bold xl:text-5xl text-4xl">A warm welcome!</h1>
      <p className="text-lg md:text-xl text-gray-700">
        Bootstrap utility classes are used to create this jumbotron since the
        old component has been <br /> removed from the framework. Why create
        custom CSS when you can use utilities?
      </p>
      <button className="bg-blue-600 hover:bg-blue-700 py-3 px-5 rounded-lg text-white cursor-pointer mx-auto text-lg hover:scale-105 duration-400 transition-all">
        Call to action
      </button>
    </div>
  );
};

export default Banner;

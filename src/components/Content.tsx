import React, { useState } from "react";
import dataGlasses from "../data/dataGlasses.json";
import GlassesDetail from "./GlassesDetail";

const Content = () => {
  // State quản lý ID kính đang chọn
  const [glassesId, setGlassesId] = useState(1);
  // State quản lý việc ẩn/hiện modal chi tiết
  const [isDetail, setIsDetail] = useState(true);
  const selectedGlasses = dataGlasses.find((item) => item.id === glassesId);
  return (
    <div className="relative">
      {/* Khu vực Model thử kính */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-20 xl:gap-32 items-center p-4 sm:p-6 lg:p-10">
        <div className="relative flex justify-center items-center lg:mb-6 ">
          <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-gray-300">
            <img
              src="glassesImage/model.jpg"
              alt="model"
              className="h-[400px] w-[300px] object-cover rounded-2xl"
            />
            {/* Info Card */}
            {isDetail && selectedGlasses && (
              <div className="md:hidden absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#041F73]/95 to-blue-200/60 backdrop-blur-sm text-white p-4 sm:p-5 rounded-b-2xl transition-all duration-500">
                <div className="flex items-center justify-between">
                  <h1 className="text-lg sm:text-xl font-bold truncate text-[#041f73]">
                    {selectedGlasses?.name}
                  </h1>

                  <div className="mt-2 flex items-center gap-2">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                      ${selectedGlasses?.price}
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-blue-100 line-clamp-3">
                  {selectedGlasses?.desc}
                </p>
              </div>
            )}
          </div>
          {selectedGlasses && (
            <div className="absolute left-1/2 top-[25%] -translate-x-1/2 transition-all duration-500">
              <img
                src={selectedGlasses.url}
                alt="glasses"
                className="h-12 w-45 opacity-80 "
              />
            </div>
          )}
        </div>

        <div className="w-full max-w-md mx-auto md:max-w-none">
          <GlassesDetail detail={isDetail} selectedGlasses={selectedGlasses} />
        </div>
      </div>

      {/* Danh sách kính để chọn */}
      <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 mx-auto justify-items-center gap-5 px-4">
        {dataGlasses.map((item) => (
          <img
            key={item.id}
            src={item.url}
            alt={item.name}
            className={`h-12 w-22 cursor-pointer p-2 bg-gray-200 rounded-lg border-2 transition-all 
              ${glassesId === item.id ? "border-blue-500 bg-white" : "border-transparent"}`}
            onClick={() => {
              setGlassesId(item.id);
            }}
          />
        ))}
      </div>

      {/* button reset & details */}
      <div className="flex justify-center gap-4 mt-10">
        <button
          className="py-4 px-8 bg-green-600 hover:bg-green-700 rounded-lg text-white text-xl cursor-pointer"
          onClick={() => {
            setGlassesId(0);
          }}
        >
          Xóa hết kính
        </button>
        <button
          onClick={() => setIsDetail(!isDetail)}
          className="py-4 px-8 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-xl cursor-pointer"
        >
          {isDetail ? "Ẩn chi tiết" : "Hiện chi tiết"}
        </button>
      </div>
    </div>
  );
};

export default Content;

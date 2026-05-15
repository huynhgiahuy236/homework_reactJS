import React from "react";

const GlassesDetail = (props) => {
  const { detail, selectedGlasses } = props;
  if (!selectedGlasses || !detail) return null;
  return (
    <div className="hidden md:block h-full rounded-2xl bg-white p-4 sm:p-5 lg:p-6 text-[#041F73] shadow-lg border border-blue-100">
      <h1 className="hidden lg:block text-center text-2xl xl:text-3xl font-bold bg-gradient-to-r from-blue-200 to-blue-700 rounded-xl py-3 mb-6">
        Chi tiết sản phẩm
      </h1>
      <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-4 lg:gap-6">
        <div className="w-full sm:w-1/3 lg:w-full flex justify-center">
          <img
            src={selectedGlasses.url}
            alt={selectedGlasses.name}
            className="h-24 sm:h-28 lg:h-32 xl:h-36 w-auto object-contain drop-shadow-md transition-all duration-300 hover:scale-105"
          />
        </div>

        <div className="w-full sm:w-2/3 lg:w-full space-y-3 text-center sm:text-left lg:text-center">
          <h2 className="text-xl sm:text-2xl font-bold leading-tight">
            {selectedGlasses.name}
          </h2>

          <span className="inline-block rounded-full bg-green-500 px-4 py-1.5 text-sm sm:text-base font-semibold text-white shadow-sm">
            Giá: ${selectedGlasses.price}
          </span>

          <p className="text-sm sm:text-base italic leading-relaxed text-gray-500">
            Mô tả: {selectedGlasses.desc}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GlassesDetail;

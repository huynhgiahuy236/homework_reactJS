import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectorDanhSachGhe,
  selectorGheKhachChon,
  chonGhe,
} from "../store/booking/bookingSlide";

const RapPhim = () => {
  const dispatch = useDispatch();
  const danhSachGhe = useSelector(selectorDanhSachGhe);
  const gheKhachChon = useSelector(selectorGheKhachChon);

  const handleChonGhe = (ghe, hang) => {
    if (!ghe.daDat) {
      dispatch(chonGhe({ ...ghe, hang }));
    }
  };

  const isGheChon = (soGhe) => gheKhachChon.some((g) => g.soGhe === soGhe);

  const renderHeaderGhe = () => {
    const headerData = danhSachGhe.find((data) => data.hang === "");
    if (!headerData) return null;
    return headerData.danhSachGhe.map((ghe) => (
      <div
        key={ghe.soGhe}
        className="w-10 h-8 flex items-center justify-center text-yellow-500 text-xs font-black"
      >
        {ghe.soGhe}
      </div>
    ));
  };

  const renderHangGhe = () => {
    return danhSachGhe
      .filter((hangGhe) => hangGhe.hang !== "")
      .map((hangGhe) => (
        <div key={hangGhe.hang} className="flex items-center gap-4">
          <div className="w-8 text-yellow-500 font-black text-lg">
            {hangGhe.hang}
          </div>
          <div className="flex gap-2">
            {hangGhe.danhSachGhe.map((ghe) => {
              const isChon = isGheChon(ghe.soGhe);
              const isDat = ghe.daDat;
              return (
                <button
                  key={ghe.soGhe}
                  onClick={() => handleChonGhe(ghe, hangGhe.hang)}
                  disabled={isDat}
                  className={`w-10 h-8 rounded text-[10px] font-bold transition-all duration-300 transform hover:scale-110 border
                    ${
                      isDat
                        ? "bg-slate-800 border-slate-700 text-slate-600 cursor-not-allowed opacity-50"
                        : isChon
                          ? "bg-green-500 border-green-400 text-black shadow-[0_0_10px_rgba(34,197,94,0.6)]"
                          : "bg-slate-900 border-yellow-600 text-yellow-500 hover:bg-yellow-600/20"
                    }`}
                >
                  {ghe.soGhe}
                </button>
              );
            })}
          </div>
        </div>
      ));
  };

  return (
    <section className="flex-1 overflow-x-auto p-4">
      <div className="flex min-w-max flex-col items-center gap-5">
        {/* man hinh */}
        <div className="flex flex-col items-center w-full max-w-lg">
          <p className="text-orange-400 uppercase tracking-[0.5em] text-xs font-bold my-2">
            Màn hình
          </p>
          <div className="relative w-full h-20">
            <div className="absolute left-1/2 top-0 h-14 w-[85%] -translate-x-1/2 bg-gradient-to-b from-orange-400/80 to-orange-600/20 shadow-[0_20px_50px_rgba(251,146,60,0.3)] [clip-path:polygon(10%_0,90%_0,100%_100%,0_100%)]" />
          </div>
        </div>

        {/* ghế */}
        <div className="rounded-2xl border border-yellow-700/50 bg-black/40 p-6 shadow-2xl shadow-yellow-900/20 backdrop-blur-sm">
          <div className="flex flex-col gap-3">
            <div className="flex gap-2 pl-10">{renderHeaderGhe()}</div>
            <div className="flex flex-col gap-3">{renderHangGhe()}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RapPhim;

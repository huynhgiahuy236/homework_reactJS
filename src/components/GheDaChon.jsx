import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectorGheKhachChon,
  huyGhe,
  datVe,
} from "../store/booking/bookingSlide";

const GheDaChon = () => {
  const dispatch = useDispatch();
  const gheKhachChon = useSelector(selectorGheKhachChon);
  const [hoTen, setHoTen] = React.useState("");
  const [sdt, setSdt] = React.useState("");

  const tongTien = gheKhachChon.reduce((sum, ghe) => sum + ghe.gia, 0);

  const handleHuyGhe = (soGhe) => {
    dispatch(huyGhe(soGhe));
  };

  const handleDatVe = () => {
    const regexHoTen = /^[a-zA-ZÀ-ỹ\s]{2,}$/u;
    const regexSdt = /^0\d{9}$/;

    if (!regexHoTen.test(hoTen.trim())) {
      alert("Họ tên không hợp lệ! Vui lòng nhập chữ, tối thiểu 2 ký tự");
      return;
    }

    if (!regexSdt.test(sdt.trim())) {
      alert(
        "Số điện thoại không hợp lệ! (Vui lòng nhập đúng 10 chữ số, bắt đầu bằng số 0)",
      );
      return;
    }

    if (gheKhachChon.length === 0) {
      alert("Vui lòng chọn ít nhất một ghế!");
      return;
    }

    const dsDatVe = gheKhachChon.map((g) => g.soGhe);
    dispatch(datVe(dsDatVe));
    alert(`Đặt vé thành công cho ${hoTen}`);
    setHoTen("");
    setSdt("");
  };
  return (
    <aside className="w-full px-3 mx-auto lg:w-130 lg:ml-40">
      <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-2xl p-6 shadow-2xl sticky top-4">
        <h2 className="text-yellow-500 text-xl font-extrabold uppercase mb-6 tracking-wider border-b border-slate-700 pb-3">
          Thông Tin Đặt Vé
        </h2>

        {/* Legend */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          {[
            { color: "bg-orange-600", label: "Đã đặt" },
            { color: "bg-green-500", label: "Đang chọn" },
            {
              color: "bg-slate-700 border border-slate-500",
              label: "Còn trống",
            },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center gap-1">
              <div className={`w-8 h-5 ${item.color} rounded shadow-sm`}></div>
              <span className="text-[10px] text-slate-400 font-medium">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="space-y-4 md:space-y-0 md: gap-5 mb-6 gird md:flex md:items-center">
          <input
            type="text"
            placeholder="Nhập họ tên"
            value={hoTen}
            onChange={(e) => setHoTen(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
          />
          <input
            type="tel"
            placeholder="Số điện thoại"
            value={sdt}
            onChange={(e) => setSdt(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
          />
        </div>

        {/* Selected Seats Table */}
        <div className="bg-black/40 rounded-xl border border-slate-700/50 mb-6 overflow-hidden">
          <div
            className={`max-h-[250px] ${gheKhachChon.length > 5 ? "overflow-y-auto scrollbar-thin scrollbar-thumb-yellow-600" : ""}`}
          >
            <table className="w-full text-sm">
              <thead className="bg-slate-800/50">
                <tr>
                  <th className="text-slate-400 py-3 px-3 text-left">Ghế</th>
                  <th className="text-slate-400 py-3 px-3 text-right">Giá</th>
                  <th className="py-3 px-3"></th>
                </tr>
              </thead>
              <tbody>
                {gheKhachChon.length === 0 ? (
                  <tr>
                    <td
                      colSpan="3"
                      className="text-center text-slate-500 py-6 italic"
                    >
                      Chưa chọn ghế nào
                    </td>
                  </tr>
                ) : (
                  gheKhachChon.map((ghe, index) => (
                    <tr
                      key={ghe.soGhe}
                      className="border-b border-slate-700/30 hover:bg-white/5 transition-colors"
                    >
                      <td className="text-green-400 py-3 px-3 font-bold">
                        {ghe.soGhe}
                      </td>
                      <td className="text-slate-200 py-3 px-3 text-right">
                        {ghe.gia.toLocaleString("vi-VN")} ₫
                      </td>
                      <td className="py-3 px-3 text-center">
                        <button
                          onClick={() => handleHuyGhe(ghe.soGhe)}
                          className="text-slate-500 hover:text-red-500 transition-colors text-lg"
                        >
                          &times;
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Summary */}
        <div className="space-y-3 mb-6 bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div className="flex justify-between text-slate-300">
            <span>Số lượng:</span>
            <span className="font-bold">{gheKhachChon.length} ghế</span>
          </div>
          <div className="flex justify-between text-yellow-400 text-lg">
            <span className="font-bold">Tổng tiền:</span>
            <span className="font-extrabold">
              {tongTien.toLocaleString("vi-VN")} ₫
            </span>
          </div>
        </div>

        {/* Book Button */}
        <button
          onClick={handleDatVe}
          className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-400 hover:to-orange-500 text-black font-black py-4 rounded-xl shadow-[0_0_20px_-5px_rgba(234,179,8,0.5)] transform hover:scale-[1.02] transition-all uppercase tracking-widest"
        >
          Xác nhận đặt vé
        </button>
      </div>
    </aside>
  );
};

export default GheDaChon;

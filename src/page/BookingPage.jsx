import React from "react";
import RapPhim from "../components/RapPhim";
import GheDaChon from "../components/GheDaChon";

const BookingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-slate-950 to-black text-white">
      {/* Header */}
      <header className="bg-black/90 border-b border-yellow-600 py-6">
        <h1 className="text-yellow-400 text-3xl font-bold uppercase tracking-wider text-center">
          🎬 Đặt Vé Xem Phim
        </h1>
      </header>
      {/* Main */}
      <main className="w-auto mx-auto px-5 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 lg:gap-20">
          <RapPhim />
          <GheDaChon />
        </div>
      </main>
    </div>
  );
};

export default BookingPage;

import React from "react";

const Header = () => {
  const nav = [
    { name: "Home", path: "#" },
    { name: "About", path: "#" },
    { name: "Contact", path: "#" },
  ];
  return (
    <div className="bg-green-950">
      <header className="p-4 flex justify-between items-center wrapper">
        <div className="text-white text-sm md:text-xl font-medium">
          <a href="">Start Bootstrap</a>
        </div>
        <div className="text-sm md:text-lg text-gray-400 flex gap-5 ">
          {nav.map((item, index) => (
            <a
              key={index}
              href={item.path}
              className="hover:text-red-600 hover:-translate-y-1 duration-300 transition-all first-of-type:text-white"
            >
              {item.name}
            </a>
          ))}
        </div>
      </header>
    </div>
  );
};

export default Header;

import React from "react";
import Header from "./components/Header";
import Content from "./components/Content";

const App = () => {
  return (
    <div className="bg-linear-to-r/decreasing from-purple-500  via-blue-400  to-blue-200 min-h-screen">
      <Header />
      <Content />
    </div>
  );
};

export default App;

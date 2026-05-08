import React from "react";
import Header from "./components/Header";
import Banner from "./components/Banner";

import Footer from "./components/Footer";
import Feature from "./components/Feature";
const App = () => {
  return (
    <div>
      <Header />
      <main className="wrapper"> 
        <Banner />
        <Feature />
      </main>
      <Footer />
    </div>
  );
};

export default App;

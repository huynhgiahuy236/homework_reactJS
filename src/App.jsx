import React from "react";
import { Route, Routes } from "react-router-dom";
import BookingPage from "./page/BookingPage";
import store from "./store/store.js";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<BookingPage />} />
        {/* them notfound404 */}
      </Routes>
    </div>
  );
};

export default App;

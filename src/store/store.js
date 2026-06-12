import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "./booking/bookingSlide";

const store = configureStore({
    reducer: {
        booking: bookingReducer
    }
});

export default store;
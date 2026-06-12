import { createSlice } from "@reduxjs/toolkit"
import danhSachGhe from "../../data/danhSachGhe";

const initialState = {
    danhSachGhe: danhSachGhe,
    gheKhachChon: []
}

const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
        chonGhe: (state, action) => {
            const gheDuocChon = action.payload;
            const index = state.gheKhachChon.findIndex(g => g.soGhe === gheDuocChon.soGhe);

            if (index === -1) {
                state.gheKhachChon.push(gheDuocChon);
            } else {
                state.gheKhachChon.splice(index, 1);
            }
        },
        huyGhe: (state, action) => {
            const soGhe = action.payload;
            state.gheKhachChon = state.gheKhachChon.filter(g => g.soGhe !== soGhe);
        },
        datVe: (state, action) => {
            const dsDatVe = action.payload;
            dsDatVe.forEach(soGhe => {
                const row = state.danhSachGhe.find(h => h.hang === soGhe.charAt(0));
                if (row) {
                    const seat = row.danhSachGhe.find(g => g.soGhe === soGhe);
                    if (seat) seat.daDat = true;
                }
            });
            state.gheKhachChon = [];
        }
    }
});

export const { chonGhe, huyGhe, datVe } = bookingSlice.actions;

export const selectorDanhSachGhe = (state) => state.booking.danhSachGhe;
export const selectorGheKhachChon = (state) => state.booking.gheKhachChon;

export default bookingSlice.reducer
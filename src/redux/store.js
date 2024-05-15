import { configureStore } from "@reduxjs/toolkit"; 
import moviesReducer from "./movies";

export const store = configureStore({
    reducer: {
        movies: moviesReducer}
});

export default store;
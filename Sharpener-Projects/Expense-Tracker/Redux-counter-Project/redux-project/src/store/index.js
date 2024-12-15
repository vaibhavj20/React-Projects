import { configureStore } from "@reduxjs/toolkit";
import counterReducer, { counterActions } from "./Counter";

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export { counterActions };
export default store;

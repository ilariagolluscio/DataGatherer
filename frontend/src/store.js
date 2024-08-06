import {configureStore} from '@reduxjs/toolkit';
import {keyboardReducer} from "./slices/keyboardSlice";

export default configureStore({
  reducer: {
    keyboard: keyboardReducer,
  }
});
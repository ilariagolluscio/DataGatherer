import {configureStore} from '@reduxjs/toolkit';
import {galleryReducer} from "./slices/gallerySlice";

export default configureStore({
  reducer: {
    gallery: galleryReducer,
  }
});
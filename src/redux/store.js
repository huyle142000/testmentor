import { configureStore } from "@reduxjs/toolkit";
import FormReducer from "./reducer/FormReducer";
import LoadingSpinner from "./reducer/Loading";
import ProjectReducer from "./reducer/ProjectReducer";
export const store = configureStore({
  reducer: {
    FormReducer,
    ProjectReducer,
    LoadingSpinner,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

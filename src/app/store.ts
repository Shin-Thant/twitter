import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice";
import currentPageReducer from "../features/currentPageSlice";
import apiSlice from "./api/apiSlice";

const store = configureStore({
	reducer: {
		auth: authReducer,
		user: userReducer,
		currentPage: currentPageReducer,
		[apiSlice.reducerPath]: apiSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

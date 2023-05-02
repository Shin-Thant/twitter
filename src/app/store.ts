import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import apiSlice from "../features/api/apiSlice";
import userReducer from "../features/userSlice";

const store = configureStore({
	reducer: {
		auth: authReducer,
		user: userReducer,
		[apiSlice.reducerPath]: apiSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

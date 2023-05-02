import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { checkUserEndpoint } from "./api/authApiSlice";
import { RootState } from "../app/store";
import isTokenErrorPayload from "../helpers/isTokenErrorPayload";

type State = {
	accessToken: string | null;
};

const initialState: State = { accessToken: null };

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setAccessToken: (state, action: PayloadAction<string | null>) => {
			state.accessToken = action.payload;
			// localStorage.setItem("token", action.payload || "");
			localStorage.setItem("token", "fake-token-skljfej298u5");
		},
	},
	extraReducers: (builder) => {
		builder
			.addMatcher(checkUserEndpoint.matchFulfilled, ({ accessToken }) => {
				const token = localStorage.getItem("token");
				if (!accessToken && token) {
					accessToken = token;
				}
			})
			.addMatcher(
				checkUserEndpoint.matchRejected,
				(state, { payload }) => {
					if (isTokenErrorPayload(payload)) {
						console.log(payload);
						state.accessToken = null;
						localStorage.setItem("token", "");
					}
				}
			);
	},
});

export const tokenSelector = (state: RootState) => state.auth.accessToken;
export const { setAccessToken } = authSlice.actions;
export default authSlice.reducer;

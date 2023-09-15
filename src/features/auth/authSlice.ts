import type { PayloadAction } from "@reduxjs/toolkit";
import { CaseReducer, createSlice } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { RootState } from "../../app/store";
import isTokenErrorPayload from "../../util/isTokenErrorPayload";
import { checkUserEndpoint } from "./authApiSlice";

type AuthState = {
	status: "login" | "logout" | "loading";
	accessToken: string | null;
};

const initialState: AuthState = { status: "loading", accessToken: null };

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setAuth: (state, { payload }: PayloadAction<string | null>) => {
			state.accessToken = payload;
			if (!payload) {
				state.status = "logout";
			} else {
				state.status = "login";
			}
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			checkUserEndpoint.matchRejected,
			onCheckUserRejected
		);
	},
});

const onCheckUserRejected: CaseReducer<
	AuthState,
	PayloadAction<FetchBaseQueryError | undefined>
> = (state, { payload }) => {
	if (isTokenErrorPayload(payload)) {
		state.accessToken = null;
		state.status = "logout";
	}
};

export const tokenSelector = (state: RootState) => state.auth.accessToken;
export const authStatusSelector = (state: RootState) => state.auth.status;

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;

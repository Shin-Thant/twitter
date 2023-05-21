import type { PayloadAction } from "@reduxjs/toolkit";
import { CaseReducer, createSlice } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { RootState } from "../../app/store";
import isTokenErrorPayload from "../../helpers/isTokenErrorPayload";
import { checkUserEndpoint } from "./authApiSlice";

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
	State,
	PayloadAction<FetchBaseQueryError | undefined>
> = (state, { payload }) => {
	if (isTokenErrorPayload(payload)) {
		console.log(payload);
		state.accessToken = null;
	}
};

export const tokenSelector = (state: RootState) => state.auth.accessToken;
export const { setAccessToken } = authSlice.actions;
export default authSlice.reducer;

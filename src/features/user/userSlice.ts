import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import isTokenErrorPayload from "../../util/isTokenErrorPayload";
import { checkUserEndpoint } from "../auth/authApiSlice";
import { UserWithFollows } from "./userTypes";

type State = {
	user: UserWithFollows | null;
};

const initialState: State = { user: null };

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<UserWithFollows | null>) => {
			state.user = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addMatcher(
				checkUserEndpoint.matchFulfilled,
				(state, { payload }) => {
					state.user = payload;
				}
			)
			.addMatcher(
				checkUserEndpoint.matchRejected,
				(state, { payload }) => {
					if (isTokenErrorPayload(payload)) {
						state.user = null;
					}
				}
			);
	},
});

export const userSelector = (state: RootState) => state.user.user;
export const userIdSelector = (state: RootState) => state.user.user?._id;

export const { setUser } = userSlice.actions;
export default userSlice.reducer;

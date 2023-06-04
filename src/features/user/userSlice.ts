import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { checkUserEndpoint } from "../auth/authApiSlice";
import { RootState } from "../../app/store";
import isTokenErrorPayload from "../../helpers/isTokenErrorPayload";
import { User } from "./type";

type State = {
	user: User | null;
};

const initialState: State = { user: null };

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<User | null>) => {
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
						console.log(payload);
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

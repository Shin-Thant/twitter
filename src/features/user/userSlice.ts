import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { checkUserEndpoint } from "../auth/authApiSlice";
import { RootState } from "../../app/store";
import isTokenErrorPayload from "../../helpers/isTokenErrorPayload";

export type User = {
	_id: string;
	name: string;
	username: string;
	email: string;
	avatar?: string;
	followers: string[];
	following: string[];
	counts: {
		followers: number;
		following: number;
	};
	createdAt: string;
	updatedAt: string;
	id: string;
};

type State = {
	user: User | null;
};

const mockUser: User = {
	_id: "646f6c6cdf12213c783f1907",
	username: "Ada76",
	name: "Darnell Pouros",
	email: "darnell@test.com",
	following: [],
	followers: [],
	avatar: "",
	createdAt: "2023-05-25T08:48:20.229Z",
	updatedAt: "2023-05-25T08:48:20.229Z",
	id: "646f6c6cdf12213c783f1907",
	counts: {
		followers: 243,
		following: 30,
	},
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

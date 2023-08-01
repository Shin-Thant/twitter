import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

type State = {
	tweet: { currentPage: number };
};

const initialState: State = {
	tweet: {
		currentPage: 1,
	},
};

const currentPageSlice = createSlice({
	name: "CurrentPage",
	initialState,
	reducers: {
		setTweetCurrentPage(state, action: PayloadAction<number | undefined>) {
			state.tweet.currentPage =
				action.payload ?? state.tweet.currentPage + 1;
		},
	},
});

export const currentPageSelector = (
	state: RootState,
	category: keyof State
) => {
	return state.currentPage[category].currentPage;
};

export const { setTweetCurrentPage } = currentPageSlice.actions;
export default currentPageSlice.reducer;

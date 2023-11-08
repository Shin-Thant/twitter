import { create } from "zustand";

type State = {
	threadIds: string[];
};
type Actions = {
	addThread(newThreadId: string): void;
	removeLastThread(): void;
	resetThread(): void;
};

export const useCommentThreadStore = create<State & Actions>((set) => ({
	threadIds: [],
	addThread(newThreadId) {
		return set((state) => ({
			threadIds: [...state.threadIds, newThreadId],
		}));
	},
	removeLastThread() {
		return set((state) => ({
			threadIds: state.threadIds.slice(0, state.threadIds.length - 1),
		}));
	},
	resetThread() {
		return set(() => ({ threadIds: [] }));
	},
}));

import { create } from "zustand";

type Thread = { commentId: string; getRepliesCacheKey?: string };
type State = {
	threads: Thread[];
};
type Actions = {
	addThread(newThread: Thread): void;
	removeLastThread(): void;
	resetThread(): void;
};

export const useCommentThreadStore = create<State & Actions>((set) => ({
	threads: [],
	addThread(newThreadId) {
		return set((state) => ({
			threads: [...state.threads, newThreadId],
		}));
	},
	removeLastThread() {
		return set((state) => ({
			threads: state.threads.slice(0, state.threads.length - 1),
		}));
	},
	resetThread() {
		return set(() => ({ threads: [] }));
	},
}));

import { create } from "zustand";

type State = {
	currentThread: string | undefined;
	threadIds: string[];
};
type Actions = {
	setCurrentThread(threadId: string): void;
	addThread(newThreadId: string): void;
	removeLastThread(): void;
	resetThread(): void;
};

export const useCommentThreadStore = create<State & Actions>((set) => ({
	currentThread: undefined,
	threadIds: [],
	setCurrentThread(threadId) {
		return set((state) => ({
			...state,
			currentThread: threadId,
		}));
	},
	addThread(newThreadId) {
		return set((state) => ({
			...state,
			threadIds: [...state.threadIds, newThreadId],
		}));
	},
	removeLastThread() {
		return set((state) => ({
			...state,
			threadIds: state.threadIds.slice(0, state.threadIds.length - 1),
		}));
	},
	resetThread() {
		return set(() => ({ setCurrentThread: undefined, threadIds: [] }));
	},
}));

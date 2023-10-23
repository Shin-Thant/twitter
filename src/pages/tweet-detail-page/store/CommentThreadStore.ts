import { create } from "zustand";

type State = {
	threadId?: string;
};
type Actions = {
	setThreadId(threadId?: string): void;
};

export const useCommentThreadStore = create<State & Actions>((set) => ({
	threadId: undefined,
	setThreadId: (threadId) => set(() => ({ threadId })),
}));

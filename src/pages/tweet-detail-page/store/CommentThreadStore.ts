import { create } from "zustand";

type State = {
	commentId?: string;
};
type Actions = {
	setCommentId(commentId?: string): void;
};

export const useCommentThreadStore = create<State & Actions>((set) => ({
	commentId: undefined,
	setCommentId: (commentId) => set(() => ({ commentId })),
}));

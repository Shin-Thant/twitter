import { useContext } from "react";
import { CommentCreateModalContext } from "../context/CommentCreateModalContext";

export const useCommentCreateModal = () =>
	useContext(CommentCreateModalContext);

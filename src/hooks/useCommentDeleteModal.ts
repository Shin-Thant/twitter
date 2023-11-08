import { useContext } from "react";
import { CommentDeleteModalContext } from "../context/CommentDeleteModalContext";

const useCommentDeleteModal = () => useContext(CommentDeleteModalContext);
export default useCommentDeleteModal;

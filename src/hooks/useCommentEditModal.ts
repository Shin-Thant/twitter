import { useContext } from "react";
import { CommentEditModalContext } from "../context/CommentEditModalContext";

const useCommentEditModal = () => useContext(CommentEditModalContext);
export default useCommentEditModal;

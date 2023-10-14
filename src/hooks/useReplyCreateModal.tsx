import { useContext } from "react";
import { ReplyCreateModalContext } from "../context/ReplyCreateModalContext";

export const useReplyCreateModal = () => useContext(ReplyCreateModalContext);

import { useContext } from "react";
import { TweetDeleteModalContext } from "../context/TweetDeleteModalContext";

export const useTweetDeleteModal = () => useContext(TweetDeleteModalContext);

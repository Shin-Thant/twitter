import { useContext } from "react";
import { TweetEditModalContext } from "../context/TweetEditModalContext";

export const useTweetEditModal = () => useContext(TweetEditModalContext);

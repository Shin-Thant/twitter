import { useContext } from "react";
import { TweetShareModalContext } from "../context/TweetShareModalContext";

export const useTweetShareModal = () => useContext(TweetShareModalContext);

import { useContext } from "react";
import { TweetInfoModalContext } from "../context/TweetInfoModalContext";

export const useTweetInfoModal = () => useContext(TweetInfoModalContext);

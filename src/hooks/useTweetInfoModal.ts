import { useContext } from "react";
import { TweetInfoModalContext } from "../context/TwetInfoModalContext";

export const useTweetInfoModal = () => useContext(TweetInfoModalContext);

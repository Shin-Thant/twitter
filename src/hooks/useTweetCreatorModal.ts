import { useContext } from "react";
import { TweetCreatorModalContext } from "../context/TweetCreatorModalContext";

export const useTweetCreatorModal = () => useContext(TweetCreatorModalContext);

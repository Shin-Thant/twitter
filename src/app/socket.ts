import { io } from "socket.io-client";
import { BASE_URL } from "../config";

export const ListenTo = {
	NEW_POST: "new-post",
	REACT: "react",
} as const;

export const socket = io(BASE_URL, {
	autoConnect: false,
});

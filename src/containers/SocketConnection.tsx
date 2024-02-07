import { useEffect } from "react";
import { useAppSelector } from "../app/hooks";
import { socket } from "../app/socket";
import { userIdSelector } from "../features/user/userSlice";

export const SocketConnection = () => {
	const userID = useAppSelector(userIdSelector);
	useEffect(() => {
		let isMounted = true;
		if (isMounted && !!userID) {
			socket.auth = { userID: userID };
			socket.connect();
		}
		return () => {
			isMounted = false;
		};
	}, [userID]);

	useEffect(() => {
		function onConnect() {
			console.log("connected");
		}
		function onDisconnect() {
			console.log("disconnected");
		}
		function onNotify(message: string) {
			console.log("notified", message);
		}

		socket.on("connect", onConnect);
		socket.on("disconnect", onDisconnect);
		socket.on("notify", onNotify);
		return () => {
			socket.off("connect", onConnect);
			socket.off("disconnect", onDisconnect);
			socket.off("notify", onNotify);
		};
	}, []);

	return <></>;
};

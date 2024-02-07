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

		socket.on("connect", onConnect);
		socket.on("disconnect", onDisconnect);
		return () => {
			socket.off("connect", onConnect);
			socket.off("disconnect", onDisconnect);
		};
	}, []);

	return <></>;
};

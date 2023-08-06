import { useLocation } from "react-router-dom";

export const useLocationState = (options?: { receiveWith: string }) => {
	const state = useLocation().state;
	if (!state) {
		return null;
	}
	return state[options?.receiveWith ?? "from"] as string;
};

import { useLocation } from "react-router-dom";
import { StateWithFromData } from "../util/createLocatioState";

export const useFromPath = (): undefined | string => {
	const state = useLocation().state;

	if (!isStateWithFromData(state)) {
		return undefined;
	}

	return state["from"];
};

function isStateWithFromData(state: unknown): state is StateWithFromData {
	return (
		!!state &&
		typeof state === "object" &&
		"from" in state &&
		typeof state.from === "string"
	);
}

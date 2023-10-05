import { useLocation, useNavigate } from "react-router-dom";

const HOME_PATH = "/" as const;
const TWEET_DETAIL_REGEX = /^\/tweet\/[a-zA-Z0-9]+$/;

export const useRedirectOnActionComplete = () => {
	const navigate = useNavigate();
	const currentPathName = useLocation().pathname;

	const redirectOnActionComplete = () => {
		if (currentPathName === HOME_PATH) {
			return;
		}

		if (TWEET_DETAIL_REGEX.test(currentPathName)) {
			navigate(HOME_PATH);
		}
	};

	return { redirectOnActionComplete };
};

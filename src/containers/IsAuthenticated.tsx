import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { authStatusSelector } from "../features/auth/authSlice";
import { useLocationState } from "../hooks/useLocationState";

type Props = {
	children: ReactNode;
};

const IsAuthenticated = ({ children }: Props) => {
	const authStatus = useAppSelector(authStatusSelector);
	const from = useLocationState();
	const navigate = useNavigate();

	useEffect(() => {
		let isMounted = true;
		if (isMounted && authStatus === "login") {
			navigate(from ? from : "/");
		}

		return () => {
			isMounted = false;
		};
		//! It has to be done!
		//! We only want to run the side effect in initial render
	}, [navigate]);

	return <>{children}</>;
};

export default IsAuthenticated;

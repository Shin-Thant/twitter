import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { authStatusSelector } from "../features/auth/authSlice";

type Props = {
	children: ReactNode;
};

const IsAuthenticated = ({ children }: Props) => {
	const authStatus = useAppSelector(authStatusSelector);
	const from = useLocation().state?.from || null;

	if (authStatus === "login") {
		return <Navigate to={from ? `/${from}` : "/"} />;
	}

	return <>{children}</>;
};

export default IsAuthenticated;

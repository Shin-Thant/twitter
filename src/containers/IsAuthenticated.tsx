import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { authStatusSelector } from "../features/auth/authSlice";
import { useLocationState } from "../hooks/useLocationState";
import { userSelector } from "../features/user/userSlice";

type Props = {
	children: ReactNode;
};

const IsAuthenticated = ({ children }: Props) => {
	const authStatus = useAppSelector(authStatusSelector);
	const user = useAppSelector(userSelector);
	const from = useLocationState();
	const navigate = useNavigate();

	useEffect(() => {
		let isMounted = true;
		if (isMounted) {
			if (authStatus === "login") {
				if (!user) {
					return navigate("/", { replace: true });
				}
				if (user.emailVerified) {
					navigate(from ? from : "/", { replace: true });
				} else {
					navigate("/verify-email", { replace: true });
				}
			}
		}

		return () => {
			isMounted = false;
		};
	}, [navigate, authStatus, from, user]);

	return <>{children}</>;
};

export default IsAuthenticated;

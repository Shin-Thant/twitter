import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useLogoutMutation } from "../features/auth/authApiSlice";
import { setUser, userSelector } from "../features/user/userSlice";
import { setAccessToken } from "../features/auth/authSlice";

export default function Home() {
	// const accessToken = useAppSelector((state) => state.auth.accessToken);
	const user = useAppSelector(userSelector);
	const [logout] = useLogoutMutation();
	const dispatch = useAppDispatch();

	const out = async () => {
		const res = await logout();
		dispatch(setAccessToken(null));
		dispatch(setUser(null));
		console.log(res);
	};

	return (
		<div>
			<Typography color="text.primary">{JSON.stringify(user)}</Typography>
			{!user ? (
				<Link to="/login">login</Link>
			) : (
				<button onClick={out}>logout</button>
			)}
		</div>
	);
}

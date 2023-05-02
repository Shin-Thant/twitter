import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useLogoutMutation } from "../features/api/authApiSlice";
import { setUser, userSelector } from "../features/userSlice";
import { setAccessToken } from "../features/authSlice";

const Home = () => {
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
			<h1>{JSON.stringify(user)}</h1>
			{!user ? (
				<Link to="/login">login</Link>
			) : (
				<button onClick={out}>logout</button>
			)}
		</div>
	);
};

export default Home;

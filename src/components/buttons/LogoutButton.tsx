import { Button } from "@mui/material";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useLogoutMutation } from "../../features/auth/authApiSlice";
import { useAppDispatch } from "../../app/hooks";
import { setAuth } from "../../features/auth/authSlice";
import { setUser } from "../../features/user/userSlice";

export default function LogoutButton() {
	const [logout] = useLogoutMutation();
	const dispatch = useAppDispatch();

	const handleLogout = async () => {
		await logout();
		dispatch(setAuth(null));
		dispatch(setUser(null));
	};

	return (
		<Button
			onClick={handleLogout}
			color="error"
			size="large"
			endIcon={<LogoutRoundedIcon />}
			sx={{
				borderRadius: "5px",
				textTransform: "none",
			}}
		>
			Logout
		</Button>
	);
}

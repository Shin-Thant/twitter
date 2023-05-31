import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useDrawerController from "../../hooks/useDrawerController";

export default function GoAuthButton() {
	const navigate = useNavigate();
	const { setIsOpen } = useDrawerController();

	const goToLogin = () => {
		setIsOpen(false);
		navigate("/login");
	};

	return (
		<Button onClick={goToLogin} variant="outlined" fullWidth>
			Login / Sign Up
		</Button>
	);
}

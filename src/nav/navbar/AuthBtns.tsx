import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const styles = {
	display: { xs: "none", md: "flex" },
	textTransform: "none",
	fontSize: "0.95rem",
	px: "1.3rem",
};

const AuthBtn = () => {
	const navigate = useNavigate();

	const goTo = (route: "/login" | "/signup") => {
		navigate(route);
	};
	return (
		<>
			<Button
				onClick={() => goTo("/login")}
				variant="outlined"
				sx={styles}
			>
				Login
			</Button>
			<Button
				onClick={() => goTo("/signup")}
				variant="contained"
				sx={styles}
			>
				Sign Up
			</Button>
		</>
	);
};

export default AuthBtn;

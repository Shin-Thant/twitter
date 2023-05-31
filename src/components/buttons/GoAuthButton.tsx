import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useDrawerController from "../../hooks/useDrawerController";
import { ReactNode } from "react";

type Props = {
	route?: "login" | "signup";
	children?: ReactNode;
};
export default function GoAuthButton({ route, children }: Props) {
	const navigate = useNavigate();
	const { setIsOpen } = useDrawerController();

	const goTo = (route: "login" | "signup") => {
		setIsOpen(false);
		navigate(`/${route}`);
	};

	if (route) {
		return (
			<Button
				variant={route === "signup" ? "contained" : "outlined"}
				sx={{
					display: { xs: "none", md: "flex" },
					textTransform: "none",
					fontSize: "0.95rem",
					px: "1.3rem",
				}}
				onClick={() => goTo(route)}
			>
				{children}
			</Button>
		);
	}

	return (
		<Button onClick={() => goTo("login")} variant="outlined" fullWidth>
			Login / Sign Up
		</Button>
	);
}

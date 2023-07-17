import { useTransition } from "react";
import { Button } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";

const styles = {
	textTransform: "none",
	fontSize: "0.9rem",
	px: "1.3rem",
} as const;

const getStyles = (displayIn?: "xs" | "md") => {
	return {
		display:
			!displayIn || displayIn === "md"
				? { xs: "none", md: "flex" }
				: { xs: "flex", md: "none" },
		...styles,
	} as const;
};

type Props = {
	displayIn?: "xs" | "md";
	fullWidth?: boolean;
	sx?: SxProps<Theme>;
	onNavigate?: () => void;
};

const AuthButton = ({ sx, displayIn, fullWidth, onNavigate }: Props) => {
	const navigate = useNavigate();
	const location = useLocation();
	const [isPending, startTransition] = useTransition();

	const goTo = (route: "/login" | "/signup") => {
		if (!onNavigate) {
			navigate(
				{ pathname: route },
				{ state: { from: location.pathname } }
			);
			return;
		}

		onNavigate();
		startTransition(() => {
			navigate(
				{ pathname: route },
				{ state: { from: location.pathname } }
			);
		});
	};
	return (
		<>
			<Button
				variant="outlined"
				onClick={() => goTo("/login")}
				disabled={isPending}
				fullWidth={fullWidth}
				sx={{ ...getStyles(displayIn), ...sx }}
			>
				Login
			</Button>
			<Button
				variant="contained"
				onClick={() => goTo("/signup")}
				disabled={isPending}
				fullWidth={fullWidth}
				sx={{ ...getStyles(displayIn), ...sx }}
			>
				Sign Up
			</Button>
		</>
	);
};

export default AuthButton;

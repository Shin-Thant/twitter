import { Button, Divider, SxProps, Theme } from "@mui/material";
import { startTransition, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTweetInfoModal } from "../../hooks/useTweetInfoModal";
import Modal from "./Modal";

export default function TweetInfoModal() {
	const { isOpen, setIsOpen } = useTweetInfoModal();
	const navigate = useNavigate();
	const location = useLocation();

	const closeAndNavigate = (to: "/login" | "/signup") => {
		setIsOpen(false);
		startTransition(() => {
			navigate(to, { state: { from: location.pathname } });
		});
	};

	const onClose = useCallback(() => {
		setIsOpen(false);
	}, [setIsOpen]);

	return (
		<Modal title={"Let's connect first!"} isOpen={isOpen} onClose={onClose}>
			<Button
				onClick={() => closeAndNavigate("/login")}
				variant="outlined"
				fullWidth
				sx={btnStyles}
			>
				Login
			</Button>

			<Divider sx={{ my: "1rem" }}>or</Divider>

			<Button
				onClick={() => closeAndNavigate("/signup")}
				variant="contained"
				fullWidth
				sx={btnStyles}
			>
				Sign Up
			</Button>
		</Modal>
	);
}

const btnStyles: SxProps<Theme> = {
	textTransform: "none",
	py: 1,
	borderRadius: { xs: "50px", ss: "8px" },
};
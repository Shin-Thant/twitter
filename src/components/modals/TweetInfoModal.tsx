import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useCallback, startTransition } from "react";
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
			navigate({ pathname: to }, { state: { from: location.pathname } });
		});
	};

	const onClose = useCallback(() => {
		setIsOpen(false);
	}, [setIsOpen]);

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<Box
				mb={3}
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<Typography variant="h6">Let's connect first!</Typography>
				<IconButton
					onClick={onClose}
					size="small"
					sx={{
						color: grey[700],
						transition: "color 200ms ease",
						"&:hover": {
							color: grey[300],
						},
					}}
				>
					<CloseRoundedIcon />
				</IconButton>
			</Box>

			<Button
				onClick={() => closeAndNavigate("/login")}
				variant="outlined"
				fullWidth
				sx={{ textTransform: "none" }}
			>
				Login
			</Button>

			<Divider sx={{ my: "1rem" }}>or</Divider>

			<Button
				onClick={() => closeAndNavigate("/signup")}
				variant="contained"
				fullWidth
				sx={{ textTransform: "none" }}
			>
				Sign Up
			</Button>
		</Modal>
	);
}

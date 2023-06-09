import { Box, Button, Divider, Modal, Typography } from "@mui/material";
import React from "react";
import { useTweetInfoModal } from "../../hooks/useTweetInfoModal";
import { useNavigate } from "react-router-dom";

const style = {
	position: "absolute",
	top: { xs: "100%", normal_sm: "50%" },
	left: "50%",
	transform: {
		xs: "translate(-50%, -100%)",
		normal_sm: "translate(-50%, -50%)",
	},
	width: { xs: "100%", normal_sm: 350, sm: 400 },
	bgcolor: "bg.navbar",
	boxShadow: 24,
	p: { xs: 2, normal_sm: 4 },
	color: "text.primary",
	borderRadius: { xs: "10px 10px 0 0", normal_sm: "10px" },
};

export default function TweetInfoModal() {
	const { isOpen, setIsOpen } = useTweetInfoModal();
	const navigate = useNavigate();

	const closeAndNavigate = (to: "/login" | "/signup") => {
		setIsOpen(false);
		navigate(to);
	};

	return (
		<Modal
			open={isOpen}
			onClose={() => {
				setIsOpen(false);
			}}
			disableAutoFocus
			disableEnforceFocus
		>
			<Box sx={style}>
				<Typography variant="h6" mb={3}>
					Let's connect first!
				</Typography>

				<Button
					onClick={() => closeAndNavigate("/login")}
					variant="contained"
					fullWidth
					sx={{ textTransform: "none" }}
				>
					Login
				</Button>

				<Divider sx={{ my: "1rem" }}>or</Divider>

				<Button
					onClick={() => closeAndNavigate("/signup")}
					variant="outlined"
					fullWidth
					sx={{ textTransform: "none" }}
				>
					Sign Up
				</Button>
			</Box>
		</Modal>
	);
}

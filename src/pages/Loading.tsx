import { Box, Typography, styled } from "@mui/material";
import TwitterIcon from "../img/twitter-icon-circle.svg";

export default function LoadingPage() {
	return (
		<Box
			sx={{
				width: "100%",
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				bgcolor: "bg.main",
				flexDirection: "column",
				gap: "0.5rem",
			}}
		>
			<Image src={TwitterIcon} alt="Twitter Icon" />
			<Typography
				sx={{
					fontSize: "1.1rem",
					fontWeight: 500,
					color: "text.secondary",
				}}
			>
				Loading...
			</Typography>
		</Box>
	);
}

const Image = styled("img")(() => ({
	width: 50,
	height: 50,
	objectFit: "cover",
	// mixBlendMode: "color-burn",
}));

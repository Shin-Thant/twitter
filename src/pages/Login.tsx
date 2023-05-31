import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Box, Button, Stack, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { Link } from "react-router-dom";
import LoginForm from "../components/forms/LoginForm";
import TwitterBird from "../img/twitter-bird-logo.svg";

export default function Login() {
	return (
		<Box p="1rem" bgcolor="bg.auth" height="100vh">
			<Link to="/" style={{ textDecoration: "none" }}>
				<Button
					startIcon={<ArrowBackRoundedIcon />}
					sx={{ textTransform: "none", fontSize: "0.95rem" }}
				>
					Back to Home
				</Button>
			</Link>

			<Stack
				width={"100%"}
				minHeight={"80vh"}
				justifyContent={"center"}
				alignItems={"center"}
			>
				<Box sx={{ width: "min(400px, 100%)" }}>
					<Stack
						direction={{ xs: "column", ss: "row" }}
						justifyContent="center"
						alignItems={{ xs: "center", ss: "center" }}
						spacing={{ xs: 0.5, ss: 1 }}
						mb="1.5rem"
					>
						<Box
							width="35px"
							height="max-content"
							borderRadius="50%"
						>
							<img
								src={TwitterBird}
								alt="Twitter Logo"
								style={{
									width: "100%",
									height: "100%",
									objectFit: "cover",
								}}
							/>
						</Box>

						<Typography
							color="text.primary"
							variant="h4"
							fontWeight={"bold"}
							sx={{
								fontSize: {
									xs: "1.7rem",
									md: "2rem",
								},
							}}
						>
							Login to Twitter
						</Typography>
					</Stack>

					<LoginForm />

					<Stack
						mt={"1.3rem"}
						direction={"row"}
						justifyContent={"space-between"}
					>
						<Typography
							color="text.primary"
							variant="body1"
							fontWeight="500"
						>
							Don't have account?
						</Typography>

						<Link to={"/signup"} style={{ textDecoration: "none" }}>
							<Typography
								variant="body1"
								fontWeight="500"
								color={blue[500]}
								sx={{
									textDecoration: "underline",
									":hover, :focus": {
										color: blue[700],
									},
								}}
							>
								Sign Up
							</Typography>
						</Link>
					</Stack>
				</Box>
			</Stack>
		</Box>
	);
}

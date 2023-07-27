import { Box, Stack, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { Link } from "react-router-dom";
import BackButton from "../components/buttons/BackButton";
import SignUpForm from "../components/forms/SignUpForm";
import TwitterBird from "../img/twitter-bird-logo.svg";
import { Helmet } from "react-helmet-async";

export default function SignUp() {
	return (
		<>
			<Helmet>
				<title>Twitter | Sign Up</title>
			</Helmet>

			<Box p="1rem" height="min-content" bgcolor="bg.auth">
				<Box
					position={{ xs: "static", md: "fixed" }}
					top="1rem"
					left="1rem"
				>
					<BackButton />
				</Box>

				<Stack
					width={"100%"}
					mt={{ xs: "3rem", md: "2rem" }}
					mb={{ xs: "2rem", md: "0" }}
					justifyContent={"center"}
					alignItems={"center"}
				>
					<Box sx={{ width: "min(400px, 100%)" }}>
						<Stack
							direction={"column"}
							justifyContent="center"
							alignItems={{ xs: "center", sm: "center" }}
							spacing={{ xs: 0.5, sm: 1 }}
							mb="1.5rem"
						>
							<Box width="35px" height="max-content">
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
									textAlign: "center",
									fontSize: {
										xs: "1.7rem",
										md: "2rem",
									},
								}}
							>
								See what's happening in the world
							</Typography>
						</Stack>

						<SignUpForm />

						<Stack
							mt={"1.3rem"}
							direction={"row"}
							justifyContent={"space-between"}
						>
							<Typography
								variant="body1"
								fontWeight="500"
								color="text.primary"
								sx={{ opacity: "0.8" }}
							>
								Already have an account?
							</Typography>

							<Link
								to={"/login"}
								style={{ textDecoration: "none" }}
							>
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
									Login
								</Typography>
							</Link>
						</Stack>
					</Box>
				</Stack>
			</Box>
		</>
	);
}

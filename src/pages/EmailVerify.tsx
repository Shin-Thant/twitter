import { Box, Button, Link, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useLogoutMutation } from "../features/auth/authApiSlice";
import { authStatusSelector, setAuth } from "../features/auth/authSlice";
import { setUser, userSelector } from "../features/user/userSlice";
import EmailOpen from "../img/email_open.svg";

export default function EmailVerify() {
	const user = useAppSelector(userSelector);
	const authStatus = useAppSelector(authStatusSelector);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const [logout] = useLogoutMutation();

	useEffect(() => {
		let isMounted = true;

		if (isMounted) {
			if (authStatus === "login") {
				if (user?.emailVerified) {
					navigate("/", { replace: true });
				}
			} else if (authStatus === "logout") {
				if (!user) {
					navigate("/login", { replace: true });
				} else if (user.emailVerified) {
					navigate("/", { replace: true });
				}
			}
		}

		return () => {
			isMounted = false;
		};
	}, [user, authStatus, navigate]);

	const onLinkClick = async () => {
		if (authStatus === "login") {
			await logout();
		}
		dispatch(setAuth(null));
		dispatch(setUser(null));
		navigate("/login");
	};

	return (
		<>
			<Helmet>
				<title>Twitter | Verify Email</title>
			</Helmet>

			<Box
				bgcolor="bg.auth"
				height="100vh"
				p="1rem"
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Box
					sx={{
						width: "min(400px, 100%)",
						mx: "auto",
					}}
				>
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
						textAlign={"center"}
					>
						Verify Your Email!
					</Typography>

					<Box
						sx={{
							maxWidth: "100%",
							width: { xs: 150, sm: 200 },
							mx: "auto",
							my: 5,
						}}
					>
						<img
							src={EmailOpen}
							alt=""
							style={{
								width: "100%",
								height: "100%",
								objectFit: "cover",
							}}
						/>
					</Box>

					<Typography color="text.primary" sx={{ mb: 2 }}>
						We just sent an email to{" "}
						<Typography
							color="primary"
							fontWeight={500}
							component={"span"}
						>
							{user?.email ?? "someone@mail.com"}
						</Typography>
						.
					</Typography>

					<Typography color="grey" fontWeight={500} sx={{ mb: 1 }}>
						Didn't receive an email?
					</Typography>
					<Stack direction="row" justifyContent="center">
						<Button
							fullWidth
							variant="contained"
							sx={{
								py: 1,
								textTransform: "none",
							}}
						>
							Resend email
						</Button>
					</Stack>
					<Stack
						direction="row"
						justifyContent="space-between"
						alignItems="center"
						mt={1.5}
					>
						<Typography color="text.primary">
							Want to login as another user?
						</Typography>
						<Link onClick={onLinkClick} sx={{ cursor: "pointer" }}>
							Login
						</Link>
					</Stack>
				</Box>
			</Box>
		</>
	);
}

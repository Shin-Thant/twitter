import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Box, Button, Stack, Typography } from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import {
	Label,
	StyledForm,
	StyledInputBase,
	SubmitButton,
} from "../components/forms/AuthForm";
import FormErrror from "../components/forms/FormError";
import { useLoginMutation } from "../features/auth/authApiSlice";
import { setAccessToken } from "../features/auth/authSlice";
import { setUser } from "../features/user/userSlice";
import TwitterBird from "../img/twitter-bird-logo.svg";

export default function Login() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [login, { isLoading, isError, error }] = useLoginMutation();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};
	const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (isLoading || !email || !password) {
			return;
		}

		// TODO: Should this login logic be separated to a new hook or function? Or not?
		const response = await login({ email, password });
		if ("error" in response) {
			console.log(response.error);
			return;
		}

		const data = response.data;
		dispatch(setAccessToken(data.accessToken));
		dispatch(setUser(data.user));
		navigate("/");
	};

	return (
		<Box p="1rem" bgcolor="bg.auth" height="100vh">
			<Link to="/" style={{ textDecoration: "none" }}>
				<Button
					startIcon={<ArrowBackRoundedIcon />}
					sx={{ textTransform: "none", fontSize: "1rem" }}
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

					{!!error && <FormErrror error={error} />}

					<StyledForm onSubmit={onFormSubmit}>
						<Label
							htmlFor="email--login"
							sx={{ display: "block", mb: "0.3rem" }}
						>
							Email
						</Label>
						<StyledInputBase
							id="email--login"
							type="email"
							value={email}
							onChange={onEmailChange}
							placeholder="john@test.com"
							autoComplete="off"
							sx={{
								borderColor: isError ? "red" : grey[500],
								"&:focus-within": {
									borderColor: isError ? "red" : blue[600],
								},
							}}
						/>

						<Label
							htmlFor="pwd--login"
							sx={{ display: "block", mb: "0.3rem" }}
						>
							Password
						</Label>
						<StyledInputBase
							id="pwd--login"
							type="password"
							value={password}
							onChange={onPasswordChange}
							placeholder="your-password"
							autoComplete="off"
							sx={{
								borderColor: isError ? "red" : grey[500],
								"&:focus-within": {
									borderColor: isError ? "red" : blue[600],
								},
							}}
						/>

						<SubmitButton isLoading={isLoading}>
							{isLoading ? "Loading..." : "Login"}
						</SubmitButton>
					</StyledForm>

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

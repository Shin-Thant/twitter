import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Box, Button, Stack, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
	Label,
	StyledForm,
	StyledInputBase,
	SubmitButton,
} from "../components/AuthForm";
import { useLoginMutation } from "../features/api/authApiSlice";
import TwitterBird from "../img/twitter-bird-logo.svg";
import { setAccessToken } from "../features/authSlice";
import { useAppDispatch } from "../app/hooks";
import { setUser } from "../features/userSlice";

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [login, { isLoading }] = useLoginMutation();
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
		<Box p="1rem">
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
						alignItems={{ xs: "start", ss: "center" }}
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
							// textAlign={"center"}
							variant="h4"
							fontWeight={"bold"}
							color={blue[500]}
						>
							Login to Twitter
						</Typography>
					</Stack>

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
						<Typography variant="body1" fontWeight="500">
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
};

export default Login;

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Box, Button, Stack, Typography } from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
	Label,
	StyledForm,
	StyledInputBase,
	SubmitButton,
} from "../components/AuthForm";
import TwitterBird from "../img/twitter-bird-logo.svg";
import { setAccessToken } from "../features/authSlice";
import { useAppDispatch } from "../app/hooks";
import { setUser } from "../features/userSlice";
import { useSignUpMutation } from "../features/api/authApiSlice";

const SignUp = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [signup, { isLoading }] = useSignUpMutation();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};
	const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};
	const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!name || !email || !password) {
			return;
		}
		const res = await signup({ name, email, password });
		if ("error" in res) {
			console.log(res.error);
			return;
		}
		console.log(res.data);
	};

	return (
		<Box p="1rem" height="min-content">
			<Button
				startIcon={<ArrowBackRoundedIcon />}
				sx={{ textTransform: "none", fontSize: "1rem", mb: "2rem" }}
			>
				<Link
					to="/"
					style={{ textDecoration: "none", color: "inherit" }}
				>
					Back to Home
				</Link>
			</Button>

			<Stack
				width={"100%"}
				mb="2rem"
				justifyContent={"center"}
				alignItems={"center"}
			>
				<Box sx={{ width: "min(400px, 100%)" }}>
					<Stack
						direction={"column"}
						justifyContent="center"
						alignItems={{ xs: "start", sm: "center" }}
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
							variant="h4"
							fontWeight={"bold"}
							color={blue[500]}
						>
							See what's happening in the world
						</Typography>
					</Stack>

					<StyledForm onSubmit={onFormSubmit}>
						<Label
							htmlFor="name--signup"
							sx={{ display: "block", mb: "0.3rem" }}
						>
							Name
						</Label>
						<StyledInputBase
							id="name--signup"
							type="name"
							value={name}
							onChange={onNameChange}
							placeholder="John Doe"
						/>

						<Label
							htmlFor="email--signup"
							sx={{ display: "block", mb: "0.3rem" }}
						>
							Email
						</Label>
						<StyledInputBase
							id="email--signup"
							type="email"
							value={email}
							onChange={onEmailChange}
							placeholder="john@test.com"
						/>

						<Label
							htmlFor="pwd--signup"
							sx={{ display: "block", mb: "0.3rem" }}
						>
							Password
						</Label>
						<StyledInputBase
							id="pwd--signup"
							type="password"
							value={password}
							onChange={onPasswordChange}
							placeholder="your-password"
						/>

						<SubmitButton isLoading={isLoading}>
							{isLoading ? "Loading..." : "Sing Up"}
						</SubmitButton>
					</StyledForm>

					<Stack
						mt={"1.3rem"}
						direction={"row"}
						justifyContent={"space-between"}
					>
						<Typography variant="body1" fontWeight="500">
							Already have an account?
						</Typography>

						<Link to={"/login"} style={{ textDecoration: "none" }}>
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
	);
};

export default SignUp;

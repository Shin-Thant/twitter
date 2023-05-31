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
} from "../components/forms/AuthFormComponents";
import TwitterBird from "../img/twitter-bird-logo.svg";
import { useSignUpMutation } from "../features/auth/authApiSlice";
import FormError from "../components/forms/FormError";

// TODO: continue this

export default function SignUp() {
	const navigate = useNavigate();
	const [signup, { isLoading, isError, error }] = useSignUpMutation();

	const [username, setUserName] = useState("");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const onUserNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		setUserName(e.target.value);
	};
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

		if (!checksValuesExist()) {
			return;
		}
		const res = await signup({ username, name, email, password });
		if ("error" in res) {
			console.log(res.error);
			return;
		}

		navigate("/login");
		// console.log(res.data);
	};

	function checksValuesExist() {
		return !!username || !!name || !!email || !!password;
	}

	return (
		<Box p="1rem" height="min-content" bgcolor="bg.auth">
			<Box
				position={{ xs: "static", md: "fixed" }}
				top="1rem"
				left="1rem"
			>
				<Link to="/" style={{ textDecoration: "none" }}>
					<Button
						startIcon={<ArrowBackRoundedIcon />}
						sx={{
							textTransform: "none",
							fontSize: "0.95rem",
						}}
					>
						Back to Home
					</Button>
				</Link>
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

					{!!error && <FormError error={error} />}

					<StyledForm onSubmit={onFormSubmit}>
						<Label
							htmlFor="username--signup"
							sx={{ display: "block", mb: "0.3rem" }}
						>
							User Name
						</Label>
						<StyledInputBase
							id="username--signup"
							type="name"
							value={username}
							onChange={onUserNameChange}
							placeholder="john-doe2508"
							required={true}
							autoComplete="off"
							sx={{
								borderColor: isError ? "red" : grey[500],
								"&:focus-within": {
									borderColor: isError ? "red" : blue[600],
								},
							}}
						/>

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
							required={true}
							autoComplete="off"
							sx={{
								borderColor: isError ? "red" : grey[500],
								"&:focus-within": {
									borderColor: isError ? "red" : blue[600],
								},
							}}
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
							required={true}
							autoComplete="off"
							sx={{
								borderColor: isError ? "red" : grey[500],
								"&:focus-within": {
									borderColor: isError ? "red" : blue[600],
								},
							}}
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
							required={true}
							autoComplete="off"
							sx={{
								borderColor: isError ? "red" : grey[500],
								"&:focus-within": {
									borderColor: isError ? "red" : blue[600],
								},
							}}
						/>

						<SubmitButton isLoading={isLoading}>
							{isLoading ? "Loading..." : "Sign Up"}
						</SubmitButton>
					</StyledForm>

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
}

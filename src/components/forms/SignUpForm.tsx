import { zodResolver } from "@hookform/resolvers/zod";
import { blue, grey, red } from "@mui/material/colors";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSignUpMutation } from "../../features/auth/authApiSlice";
import { SignUpInputs, SignUpSchema } from "../../schemas/SignUpSchema";
import {
	FieldContainer,
	Label,
	StyledForm,
	StyledInputBase,
} from "./AuthFormComponents";
import FieldError from "./FieldError";
import FormError from "./FormError";
import SubmitButton from "../buttons/SubmitButton";
import { useAppDispatch } from "../../app/hooks";
import { setUser } from "../../features/user/userSlice";

export default function SignUpForm() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const [signup, { isError, error: mutationError }] = useSignUpMutation();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SignUpInputs>({
		resolver: zodResolver(SignUpSchema),
		defaultValues: {
			username: "",
			name: "",
			email: "",
			password: "",
		},
	});

	const onFormSubmit: SubmitHandler<SignUpInputs> = async (data) => {
		const { username, name, email, password } = data;

		const res = await signup({ username, name, email, password });
		if ("error" in res) {
			return;
		}

		dispatch(setUser(res.data));

		navigate("/login");
	};

	return (
		<>
			{!!mutationError && <FormError error={mutationError} />}

			<StyledForm onSubmit={handleSubmit(onFormSubmit)}>
				<FieldContainer>
					<Label
						htmlFor="username--signup"
						sx={{ display: "block", mb: "0.3rem" }}
					>
						Username
					</Label>
					<StyledInputBase
						id="username--signup"
						type="name"
						placeholder="john-doe2508"
						required={true}
						autoComplete="off"
						sx={getInputStyle(isError || !!errors.username)}
						{...register("username")}
					/>
					{errors.username?.message && (
						<FieldError message={errors.username.message} />
					)}
				</FieldContainer>

				<FieldContainer>
					<Label
						htmlFor="name--signup"
						sx={{ display: "block", mb: "0.3rem" }}
					>
						Name
					</Label>
					<StyledInputBase
						id="name--signup"
						type="name"
						placeholder="John Doe"
						required={true}
						autoComplete="off"
						sx={getInputStyle(isError || !!errors.name)}
						{...register("name")}
					/>
					{errors.name?.message && (
						<FieldError message={errors.name.message} />
					)}
				</FieldContainer>

				<FieldContainer>
					<Label
						htmlFor="email--signup"
						sx={{ display: "block", mb: "0.3rem" }}
					>
						Email
					</Label>
					<StyledInputBase
						id="email--signup"
						type="email"
						placeholder="john@test.com"
						required={true}
						autoComplete="off"
						sx={getInputStyle(isError || !!errors.email)}
						{...register("email")}
					/>
					{errors.email?.message && (
						<FieldError message={errors.email.message} />
					)}
				</FieldContainer>

				<FieldContainer>
					<Label
						htmlFor="pwd--signup"
						sx={{ display: "block", mb: "0.3rem" }}
					>
						Password
					</Label>
					<StyledInputBase
						id="pwd--signup"
						type="password"
						placeholder="your-password"
						required={true}
						autoComplete="off"
						sx={getInputStyle(isError || !!errors.password)}
						{...register("password")}
					/>
					{errors.password?.message && (
						<FieldError message={errors.password.message} />
					)}
				</FieldContainer>

				<SubmitButton fullWidth={true} isLoading={isSubmitting}>
					{isSubmitting ? "Loading..." : "Sign Up"}
				</SubmitButton>
			</StyledForm>
		</>
	);
}

const getInputStyle = (isError: boolean) => {
	return {
		borderColor: isError ? red["A700"] : grey[500],
		"&:focus-within": {
			borderColor: isError ? red["A700"] : blue[600],
		},
	};
};

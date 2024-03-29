import { zodResolver } from "@hookform/resolvers/zod";
import { blue, grey, red } from "@mui/material/colors";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { useLoginMutation } from "../../features/auth/authApiSlice";
import { setAuth } from "../../features/auth/authSlice";
import { setUser } from "../../features/user/userSlice";
import { useFromPath } from "../../hooks/useFromPath";
import { LoginInputs, LoginSchema } from "../../schemas/LoginSchema";
import SubmitButton from "../buttons/SubmitButton";
import {
	FieldContainer,
	Label,
	StyledForm,
	StyledInputBase,
} from "./AuthFormComponents";
import FieldError from "./FieldError";
import FormError from "./FormError";

const DEFAULT_VALUES: LoginInputs = {
	email: "",
	password: "",
};

export default function LoginForm() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const from = useFromPath();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginInputs>({
		resolver: zodResolver(LoginSchema),
		defaultValues: DEFAULT_VALUES,
	});

	const [login, { isError, error: mutationError }] = useLoginMutation();

	const onFormSubmit: SubmitHandler<LoginInputs> = async (data) => {
		const { email, password } = data;

		const response = await login({ email, password });
		if ("error" in response) {
			return;
		}

		const result = response.data;
		dispatch(setAuth(result.accessToken));
		dispatch(setUser(result.user));

		const isEmailVerified = result.user.emailVerified;
		navigate(!isEmailVerified ? "/verify-email" : from ?? "/");
	};

	return (
		<>
			{!!mutationError && <FormError error={mutationError} />}

			<StyledForm onSubmit={handleSubmit(onFormSubmit)}>
				<FieldContainer>
					<Label
						htmlFor="email--login"
						sx={{ display: "block", mb: "0.3rem" }}
					>
						Email
					</Label>
					<StyledInputBase
						id="email--login"
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
						htmlFor="pwd--login"
						sx={{ display: "block", mb: "0.3rem" }}
					>
						Password
					</Label>
					<StyledInputBase
						id="pwd--login"
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
					{isSubmitting ? "Loading..." : "Login"}
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

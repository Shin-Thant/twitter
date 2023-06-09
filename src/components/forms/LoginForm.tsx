import { zodResolver } from "@hookform/resolvers/zod";
import { blue, grey, red } from "@mui/material/colors";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { useLoginMutation } from "../../features/auth/authApiSlice";
import { setAuth } from "../../features/auth/authSlice";
import { setUser } from "../../features/user/userSlice";
import {
	FieldContainer,
	Label,
	StyledForm,
	StyledInputBase,
	SubmitButton,
} from "./AuthFormComponents";
import FieldError from "./FieldError";
import FormError from "./FormError";
import { LoginInputs, LoginSchema } from "../../schemas/LoginSchema";

const DEFAULT_VALUES: LoginInputs = {
	email: "",
	password: "",
};

export default function LoginForm() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
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
			console.log(response.error);
			return;
		}

		const result = response.data;
		dispatch(setAuth(result.accessToken));
		dispatch(setUser(result.user));
		navigate("/");
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
						autoComplete="off"
						sx={getInputStyle(isError)}
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
						autoComplete="off"
						sx={getInputStyle(isError)}
						{...register("password")}
					/>
					{errors.password?.message && (
						<FieldError message={errors.password.message} />
					)}
				</FieldContainer>

				<SubmitButton isLoading={isSubmitting}>
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

import { z } from "zod";
import checkInputSpaces from "../util/checkInputSpaces";

export const LoginSchema = z.object({
	email: z
		.string({
			invalid_type_error: "Email must be string!",
		})
		.nonempty("Email is required!")
		.email("Invalid email!")
		.trim(),
	password: z
		.string({
			required_error: "Password required!",
			invalid_type_error: "Password must be string!",
		})
		.nonempty("Password is required!")
		.min(6, "Password must have at least 6 letters!")
		.trim()
		.refine(checkInputSpaces, "Password can't contain spaces!"),
});

export type LoginInputs = z.infer<typeof LoginSchema>;

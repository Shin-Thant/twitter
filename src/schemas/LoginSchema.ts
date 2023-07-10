import { z } from "zod";
import checkInputSpaces from "../helpers/checkInputSpaces";

export const LoginSchema = z.object({
	email: z
		.string({
			required_error: "Email required!",
			invalid_type_error: "Email must be string!",
		})
		.email("Invalid email!")
		.trim(),
	password: z
		.string({
			required_error: "Password required!",
			invalid_type_error: "Password must be string!",
		})
		.trim()
		.min(6, "Password must have at least 6 letters!")
		.refine(checkInputSpaces, "Password can't contain spaces!"),
});

export type LoginInputs = z.infer<typeof LoginSchema>;

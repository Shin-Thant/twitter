import { z } from "zod";
import checkInputSpaces from "../helpers/checkInputSpaces";

export const SignUpSchema = z.object({
	username: z
		.string({
			required_error: "Username required!",
			invalid_type_error: "Username must be string!",
		})
		.trim()
		.min(3, "User must have at least 3 letters!")
		.refine(checkInputSpaces, "Username can't contain spaces!"),
	name: z
		.string({
			required_error: "Name required!",
			invalid_type_error: "Name must be string!",
		})
		.trim()
		.min(3, "Name must have at least 3 letters!"),
	email: z
		.string({
			required_error: "email required!",
			invalid_type_error: "email must be string!",
		})
		.trim()
		.email("Invalid email!"),
	password: z
		.string({
			required_error: "email required!",
			invalid_type_error: "email must be string!",
		})
		.trim()
		.min(6, "Password must have at least 6 letters!")
		.refine(checkInputSpaces, "Password can't contain spaces!"),
});

export type SignUpInputs = z.infer<typeof SignUpSchema>;

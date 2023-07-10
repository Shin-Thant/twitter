import z from "zod";

export const CreateTweetSchema = z.object({
	content: z
		.string()
		.trim()
		.max(120, "Caption cannot contain more thant 120 characters!"),
});
export type CreateTweetInput = z.infer<typeof CreateTweetSchema>;

export const ShareTweetSchema = z.object({
	content: z
		.string()
		.trim()
		.max(120, "Caption cannot contain more thant 120 characters!"),
});
export type ShareTweetInput = z.infer<typeof ShareTweetSchema>;

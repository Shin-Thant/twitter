import z from "zod";

export const ShareTweetSchema = z.object({
	content: z
		.string()
		.max(200, "Caption cannot contain more thant 100 characters!"),
});

export type ShareTweetInput = z.infer<typeof ShareTweetSchema>;

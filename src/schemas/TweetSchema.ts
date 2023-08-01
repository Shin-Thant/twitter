import z from "zod";

const INVALID_TYPE_ERROR = "Tweet content must be string!";
const NON_EMPTY_ERROR = "Tweet content is required";
const MAX_LIMIT = 120;
const MAX_LIMIT_ERROR = "Caption cannot contain more thant 120 characters!";

export const CreateTweetSchema = z.object({
	content: z
		.string({
			invalid_type_error: INVALID_TYPE_ERROR,
		})
		.trim()
		.nonempty(NON_EMPTY_ERROR)
		.max(MAX_LIMIT, MAX_LIMIT_ERROR),
});
export type CreateTweetInput = z.infer<typeof CreateTweetSchema>;

export const QuoteRetweetSchema = z.object({
	content: z
		.string({ invalid_type_error: INVALID_TYPE_ERROR })
		.trim()
		.nonempty(NON_EMPTY_ERROR)
		.max(MAX_LIMIT, MAX_LIMIT_ERROR),
});
export type ShareTweetInput = z.infer<typeof QuoteRetweetSchema>;

export const EditTweetSchema = z.object({
	content: z
		.string({ invalid_type_error: INVALID_TYPE_ERROR })
		.trim()
		.nonempty(NON_EMPTY_ERROR)
		.max(MAX_LIMIT, MAX_LIMIT_ERROR),
});
export type EditTweetInput = z.infer<typeof EditTweetSchema>;

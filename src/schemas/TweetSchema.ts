import z from "zod";

const INVALID_TYPE_ERROR = "Tweet content must be string!";
const NON_EMPTY_ERROR = "Tweet content is required";
const MAX_LIMIT = 120;
const MAX_LIMIT_ERROR = "Caption cannot contain more thant 120 characters!";

export const TweetCreateSchema = z.object({
	content: z
		.string({ invalid_type_error: INVALID_TYPE_ERROR })
		.trim()
		.max(MAX_LIMIT, MAX_LIMIT_ERROR)
		.optional(),
});
export type TweetCreateInput = z.infer<typeof TweetCreateSchema>;

export const QuoteRetweetSchema = z.object({
	content: z
		.string({ invalid_type_error: INVALID_TYPE_ERROR })
		.trim()
		.nonempty(NON_EMPTY_ERROR)
		.max(MAX_LIMIT, MAX_LIMIT_ERROR),
});
export type ShareTweetInput = z.infer<typeof QuoteRetweetSchema>;

export const TweetEditSchema = TweetCreateSchema.extend({});
export type TweetEditInput = z.infer<typeof TweetEditSchema>;

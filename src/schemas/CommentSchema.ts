import { z } from "zod";

export const CommentCreateSchema = z.object({
	content: z
		.string({ invalid_type_error: "Comment must be string!" })
		.trim()
		.nonempty("Comment is required!")
		.max(120, "Comment cannot contain more thant 120 characters!"),
});
export type CommentCreateInput = z.infer<typeof CommentCreateSchema>;

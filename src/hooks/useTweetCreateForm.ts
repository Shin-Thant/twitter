import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TweetCreateInput, TweetCreateSchema } from "../schemas/TweetSchema";

export function useTweetCreateForm() {
	return useForm<TweetCreateInput>({
		resolver: zodResolver(TweetCreateSchema),
		defaultValues: {
			content: "",
		},
		mode: "onChange",
	});
}

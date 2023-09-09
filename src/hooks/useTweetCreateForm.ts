import { useForm } from "react-hook-form";
import { TweetCreateInput, TweetCreateSchema } from "../schemas/TweetSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageListType } from "react-images-uploading";

export function useTweetCreateForm() {
	return useForm<TweetCreateInput>({
		resolver: zodResolver(TweetCreateSchema),
		defaultValues: {
			content: "",
		},
		mode: "onChange",
	});
}

export function createTweetFormData({
	images,
	content,
}: {
	images: ImageListType;
	content?: string;
}): FormData {
	const formData = new FormData();

	if (content) {
		formData.set("body", content);
	}
	images.forEach((image) => {
		if (image.file) {
			formData.append(`photos`, image.file);
		}
	});
	return formData;
}

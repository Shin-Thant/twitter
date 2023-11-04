import { ImageListType } from "react-images-uploading";

export function createTweetFormData({
	images,
	content,
}: {
	images?: ImageListType;
	content?: string;
}): FormData {
	const formData = new FormData();

	if (content) {
		formData.set("body", content);
	}
	if (images?.length) {
		images.forEach((image) => {
			if (image.file) {
				formData.append(`photos`, image.file);
			}
		});
	}
	return formData;
}

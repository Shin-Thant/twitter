import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Stack } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useCreateTweetMutation } from "../../features/tweet/tweetApiSlice";
import { isBaseQueryResponseError } from "../../helpers/errorHelpers";
import { useTweetCreatorModal } from "../../hooks/useTweetCreatorModal";
import { showToast } from "../../lib/handleToast";
import { TweetCreateInput, TweetCreateSchema } from "../../schemas/TweetSchema";
import ModalActionButton from "../buttons/ModalActionButton";
import ContentInputHandler from "../forms/ContentInputHandler";
import Modal from "./Modal";
import useImageInputHandler from "../../hooks/useImageInputHandler";
import WithImageInput from "../inputs/WithImageInput";
import TweetImageUploadButton from "../buttons/TweetImageUploadButton";
import UploadedImageList from "../lists/UploadedImageList";

// TODO: test and try to refactor this

const TOTAL_IMAGE_LIMIT = 4 as const;

const TweetCreatorModal = () => {
	const { isOpen, setIsOpen } = useTweetCreatorModal();
	const [createTweet, { isLoading }] = useCreateTweetMutation();

	const { images, onImageInputChange, removeAllImages } =
		useImageInputHandler();

	const {
		handleSubmit,
		control,
		watch,
		formState: { isSubmitting, isValid },
		reset,
	} = useForm<TweetCreateInput>({
		resolver: zodResolver(TweetCreateSchema),
		defaultValues: {
			content: "",
		},
		mode: "onChange",
	});

	const content = watch("content");

	const onSubmit: SubmitHandler<TweetCreateInput> = async (data) => {
		if (isLoading) return;
		if (!data.content && !images.length) {
			showErrorToast("Content or image must be provided!");
			return;
		}

		try {
			const formData = createTweetFormData({ content: data.content });
			const response = await createTweet(formData);

			if (
				"error" in response &&
				isBaseQueryResponseError(response.error)
			) {
				showErrorToast();
				return;
			}

			showSuccessToast();
		} catch (err) {
			showErrorToast();
		} finally {
			onClose();
		}
	};

	function createTweetFormData({ content }: { content?: string }): FormData {
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

	function showSuccessToast() {
		showToast({
			message: "Successfully added new tweet!",
			variant: "success",
		});
	}

	function showErrorToast(message?: string) {
		showToast({
			message: message ?? "Something went wrong!",
			variant: "error",
		});
	}

	const onClose = () => {
		removeAllImages();
		setIsOpen(false);
		reset();
	};

	const isSubmitButtonDisabled: boolean =
		(!content?.trim().length && !images.length) || !isValid;

	const isUploadButtonDisabled: boolean =
		isSubmitting || images.length === TOTAL_IMAGE_LIMIT;

	return (
		<Modal title="Create Tweet" isOpen={isOpen} onClose={onClose}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Controller
					render={({ field, formState: { errors } }) => (
						<ContentInputHandler
							field={field}
							errorMessage={errors.content?.message}
							contentLength={content?.length ?? 0}
							placeholder="What's happening?"
							autoFocus={true}
						/>
					)}
					name="content"
					control={control}
					defaultValue=""
				/>

				<WithImageInput
					images={images}
					onImageInputChange={onImageInputChange}
					render={({
						images,
						onImageUpload,
						onImageRemove,
						onImageUpdate,
					}) => (
						<Box sx={{ mt: 3 }}>
							{!!images.length && (
								<UploadedImageList
									images={images}
									updateImage={onImageUpdate}
									removeImage={onImageRemove}
								/>
							)}

							<Stack
								direction={"row"}
								justifyContent={"space-between"}
								alignItems={"center"}
								spacing={2}
								sx={{ mt: 2 }}
							>
								<Box>
									<TweetImageUploadButton
										disabled={isUploadButtonDisabled}
										currentImageCount={images.length}
										totalImageCount={TOTAL_IMAGE_LIMIT}
										uploadImage={onImageUpload}
									/>
								</Box>

								<Stack
									direction={"row"}
									justifyContent={"flex-end"}
									alignItems={"center"}
									spacing={1}
								>
									<ModalActionButton
										isLoading={isSubmitting}
										type="button"
										setGreyStyles={true}
										onClick={onClose}
									>
										Cancel
									</ModalActionButton>
									<ModalActionButton
										isLoading={isSubmitting}
										disabled={isSubmitButtonDisabled}
										type="submit"
									>
										{isSubmitting ? "Loading..." : "Tweet"}
									</ModalActionButton>
								</Stack>
							</Stack>
						</Box>
					)}
				/>
			</form>
		</Modal>
	);
};

export default TweetCreatorModal;

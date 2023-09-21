import { Box, Stack } from "@mui/material";
import { useEffect } from "react";
import { Controller, SubmitHandler } from "react-hook-form";
import { useAppSelector } from "../../app/hooks";
import {
	selectTweetById,
	useEditTweetMutation,
} from "../../features/tweet/tweetApiSlice";
import useImageInputHandler from "../../hooks/useImageInputHandler";
import useTweetEditForm from "../../hooks/useTweetEditForm";
import { useTweetEditModal } from "../../hooks/useTweetEditModal";
import useTweetImageLoader from "../../hooks/useTweetImageLoader";
import { showToast } from "../../lib/handleToast";
import { TweetEditInput } from "../../schemas/TweetSchema";
import { createTweetFormData } from "../../util/createTweetFormData";
import {
	isBaseQueryResponseError,
	isValidResponseErrorData,
} from "../../util/errorHelpers";
import ModalActionButton from "../buttons/ModalActionButton";
import TweetImageUploadButton from "../buttons/TweetImageUploadButton";
import ContentInputHandler from "../forms/ContentInputHandler";
import WithImageInput from "../inputs/WithImageInput";
import PreviewImageList from "../lists/PreviewImageList";
import Modal from "./Modal";

const TOTAL_IMAGE_LIMIT: number = 4 as const;

const TweetEditModal = () => {
	const { id: tweetId, isOpen, closeModal } = useTweetEditModal();
	const [editTweet, { isLoading }] = useEditTweetMutation();
	const tweet = useAppSelector((state) => selectTweetById(state, tweetId));

	const {
		handleSubmit,
		formState: { isSubmitting, isValid },
		control,
		watch,
		setValue,
		reset,
	} = useTweetEditForm();

	const content = watch("content");

	const { loadImages, images, onImageInputChange, removeAllImages } =
		useImageInputHandler();

	const { isLoading: isFileLoading, error: fileLoadError } =
		useTweetImageLoader({ imageNames: tweet?.images, loadImages });

	// update input when get tweet
	useEffect(() => {
		let isMounted = true;

		if (isMounted) {
			if (tweet) {
				!!tweet.body && setValue("content", tweet.body);
			} else {
				closeModal();
			}
		}

		return () => {
			isMounted = false;
		};
	}, [setValue, tweet, closeModal]);

	const onSubmit: SubmitHandler<TweetEditInput> = async (data) => {
		if (isLoading) return;

		if (!data.content && !images.length) {
			console.error("No values to update!");
			return;
		}

		try {
			const formData = createTweetFormData({
				images,
				content: data.content,
			});
			const result = await editTweet({ tweetId, body: formData });

			if (
				"error" in result &&
				isBaseQueryResponseError(result.error) &&
				isValidResponseErrorData(result.error.data)
			) {
				showErrorToast(result.error.data.message);
			}
		} catch (err) {
			showErrorToast();
		} finally {
			onClose();
		}
	};

	const onClose = () => {
		removeAllImages();
		reset();
		closeModal();
	};

	function showErrorToast(message?: string) {
		showToast({
			message: message ?? "Something went wrong!",
			variant: "error",
		});
	}

	return (
		<Modal title={"Edit Tweet"} isOpen={isOpen} onClose={onClose}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Controller
					render={({ field, formState: { errors } }) => (
						<ContentInputHandler
							field={field}
							errorMessage={errors.content?.message}
							contentLength={content.length}
							autoFocus={true}
							disabled={!tweet || !!fileLoadError}
						/>
					)}
					name="content"
					control={control}
					defaultValue={""}
				/>

				<WithImageInput
					images={images}
					onImageInputChange={onImageInputChange}
					render={({
						images,
						onImageRemove,
						onImageUpdate,
						onImageUpload,
					}) => (
						<Box sx={{ mt: 3 }}>
							<PreviewImageList
								images={images}
								removeImage={onImageRemove}
								updateImage={onImageUpdate}
							/>

							<Stack
								direction={"row"}
								justifyContent={"space-between"}
								alignItems={"center"}
								spacing={2}
								mt={2}
							>
								<TweetImageUploadButton
									disabled={
										isFileLoading ||
										isSubmitting ||
										images.length === TOTAL_IMAGE_LIMIT
									}
									currentImageCount={images.length}
									totalImageCount={4}
									uploadImage={onImageUpload}
								/>

								<Stack
									direction={"row"}
									justifyContent={"flex-end"}
									alignItems={"center"}
									spacing={2}
								>
									<ModalActionButton
										type="button"
										isLoading={isSubmitting}
										onClick={onClose}
										setGreyStyles={true}
									>
										Cancel
									</ModalActionButton>
									<ModalActionButton
										type="submit"
										isLoading={
											isSubmitting ||
											!tweet ||
											!!fileLoadError
										}
										disabled={!isValid}
									>
										{isSubmitting ? "Loading..." : "Save"}
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

export default TweetEditModal;

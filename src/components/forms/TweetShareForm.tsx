import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Stack } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useShareTweetMutation } from "../../features/tweet/tweetApiSlice";
import useImageInputHandler from "../../hooks/useImageInputHandler";
import { useTweetShareModal } from "../../hooks/useTweetShareModal";
import { showToast } from "../../lib/handleToast";
import { QuoteRetweetSchema, ShareTweetInput } from "../../schemas/TweetSchema";
import { createTweetFormData } from "../../util/createTweetFormData";
import {
	isBaseQueryResponseError,
	isValidResponseErrorData,
} from "../../util/errorHelpers";
import ModalActionButton from "../buttons/ModalActionButton";
import TweetImageUploadButton from "../buttons/TweetImageUploadButton";
import WithImageInput from "../inputs/WithImageInput";
import PreviewImageList from "../lists/PreviewImageList";
import { StyledForm } from "./AuthFormComponents";
import ContentInputHandler from "./ContentInputHandler";

const TOTAL_IMAGE_LIMIT = 4 as const;

type Props = {
	resetModalState: () => void;
};

const TweetShareForm = ({ resetModalState }: Props) => {
	const { id: targetTweetId, closeModal } = useTweetShareModal();
	const [shareTweet, { isLoading: isSharing }] = useShareTweetMutation();

	const { images, onImageInputChange, removeAllImages } =
		useImageInputHandler();

	const {
		handleSubmit,
		watch,
		formState: { isSubmitting, isValid },
		control,
		reset,
	} = useForm({
		resolver: zodResolver(QuoteRetweetSchema),
		defaultValues: {
			content: "",
		},
		mode: "onChange",
	});

	const content = watch("content");

	const onSubmit: SubmitHandler<ShareTweetInput> = async (data) => {
		if (isSharing) return;
		if (!data.content && !images.length) {
			showToast({
				message: "Content or image must be provided!",
				variant: "error",
			});
			return;
		}
		try {
			const formData = createTweetFormData({
				images,
				content: data.content,
			});

			const response = await shareTweet({
				tweetId: targetTweetId,
				body: formData,
			});
			if ("data" in response) {
				reset();
				removeAllImages();
				resetModalState();
				closeModal();
				return;
			}

			if (
				!isBaseQueryResponseError(response.error) ||
				!isValidResponseErrorData(response.error.data)
			) {
				showToast({
					message: "Something went wrong!",
					variant: "error",
				});
				return;
			}
			showToast({
				message: response.error.data.message,
				variant: "error",
			});
		} catch (err) {
			console.log(err);
			reset();
			removeAllImages();
		}
	};

	const onClose = () => {
		closeModal();
	};

	return (
		<StyledForm onSubmit={handleSubmit(onSubmit)}>
			<Controller
				render={({ field, formState: { errors } }) => (
					<ContentInputHandler
						field={field}
						errorMessage={errors.content?.message}
						contentLength={content.length}
						autoFocus={true}
						placeholder="What's on your mind?"
					/>
				)}
				name="content"
				control={control}
				defaultValue={""}
			/>

			<Box>
				<WithImageInput
					images={images}
					onImageInputChange={onImageInputChange}
					render={({
						onImageUpload,
						onImageRemove,
						onImageUpdate,
					}) => (
						<Box sx={{ mt: 2 }}>
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
									currentImageCount={images.length}
									totalImageCount={TOTAL_IMAGE_LIMIT}
									uploadImage={onImageUpload}
									disabled={
										isSubmitting ||
										images.length >= TOTAL_IMAGE_LIMIT
									}
								/>

								<Stack
									direction={"row"}
									justifyContent={"flex-end"}
									alignItems={"center"}
									spacing={2}
									mt={2}
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
										isLoading={isSubmitting}
										disabled={
											!isValid ||
											(!content.length && !images.length)
										}
										sx={{
											minWidth: 100,
										}}
									>
										{isSubmitting
											? "Loading..."
											: "Retweet"}
									</ModalActionButton>
								</Stack>
							</Stack>
						</Box>
					)}
				/>
			</Box>
		</StyledForm>
	);
};

export default TweetShareForm;

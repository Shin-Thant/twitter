import { Avatar, Box, Paper, Stack } from "@mui/material";
import { Controller, SubmitHandler } from "react-hook-form";
import { useCreateTweetMutation } from "../../features/tweet/tweetApiSlice";
import { GetMeResultUser } from "../../features/user/userTypes";
import useImageInputHandler from "../../hooks/useImageInputHandler";
import { useTweetCreateForm } from "../../hooks/useTweetCreateForm";
import { showToast } from "../../lib/handleToast";
import { TweetCreateInput } from "../../schemas/TweetSchema";
import { createTweetFormData } from "../../util/createTweetFormData";
import { isBaseQueryResponseError } from "../../util/errorHelpers";
import SubmitButton from "../buttons/SubmitButton";
import TweetImageUploadButton from "../buttons/TweetImageUploadButton";
import WithImageInput from "../inputs/WithImageInput";
import PreviewImageList from "../lists/PreviewImageList";
import { StyledForm } from "./AuthFormComponents";
import ContentInputHandler from "./ContentInputHandler";

const TOTAL_IMAGE_LIMIT = 4 as const;

type Props = {
	user: GetMeResultUser;
};

const TweetCreator = ({ user }: Props) => {
	const [createTweet, { isLoading }] = useCreateTweetMutation();

	const { images, onImageInputChange, removeAllImages } =
		useImageInputHandler();

	const {
		watch,
		handleSubmit,
		formState: { isSubmitting, isValid },
		control,
		reset,
	} = useTweetCreateForm();
	const content = watch("content");

	const onSubmit: SubmitHandler<TweetCreateInput> = async (data) => {
		if (isLoading) return;
		if (!data.content && !images.length) {
			showErrorToast("Content or image must be provided!");
			return;
		}

		try {
			const formData = createTweetFormData({
				content: data.content,
				images,
			});
			const response = await createTweet(formData);

			if (
				"error" in response &&
				isBaseQueryResponseError(response.error)
			) {
				showErrorToast();
				return;
			}

			onReset();
			showSuccessToast();
		} catch (err) {
			showErrorToast();
		}
	};

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

	function onReset() {
		removeAllImages();
		reset();
	}

	const isSubmitButtonDisabled: boolean =
		(!content?.trim().length && !images.length) || !isValid;

	return (
		<Paper
			variant="outlined"
			sx={{
				borderRadius: "10px",
				display: "block",
				gap: 3,
				borderWidth: { xs: "0", sm: "1px" },
				boxShadow: { xs: "none", sm: "0 2px 5px rgba(0, 0, 0, 0.2)" },
				mt: { xs: 3, sm: 0 },
				px: { xs: 2, sm: 3 },
				py: { xs: 1, sm: 3 },
				bgcolor: "transparent",
			}}
		>
			<StyledForm sx={{ flex: 1 }} onSubmit={handleSubmit(onSubmit)}>
				<Stack direction="row" alignItems={"flex-start"} spacing={2}>
					<Avatar
						src={user.avatar}
						alt={`${user.name}-profile-image`}
						sx={{
							width: { xs: 30, ss: 35 },
							height: { xs: 30, ss: 35 },
							outline: "1px solid hsl(203, 100%, 47%)",
							outlineOffset: "3px",
							bgcolor: "primary.main",
						}}
					/>

					<Box sx={{ width: "100%" }}>
						<Controller
							render={({ field, formState: { errors } }) => (
								<ContentInputHandler
									field={field}
									errorMessage={errors.content?.message}
									contentLength={content?.length ?? 0}
									placeholder="What's happening?"
								/>
							)}
							name="content"
							control={control}
							defaultValue={""}
						/>
					</Box>
				</Stack>

				<Box>
					<WithImageInput
						images={images}
						onImageInputChange={onImageInputChange}
						render={({
							images,
							onImageUpload,
							onImageUpdate,
							onImageRemove,
						}) => (
							<Box sx={{ mt: 3 }}>
								{!!images.length && (
									<Box>
										<PreviewImageList
											images={images}
											updateImage={onImageUpdate}
											removeImage={onImageRemove}
										/>
									</Box>
								)}

								<Stack
									direction="row"
									justifyContent="space-between"
									alignItems="center"
									sx={{
										mt: 3,
									}}
								>
									<TweetImageUploadButton
										disabled={
											isSubmitting ||
											images.length === TOTAL_IMAGE_LIMIT
										}
										uploadImage={onImageUpload}
										currentImageCount={images.length}
										totalImageCount={TOTAL_IMAGE_LIMIT}
									/>

									<Stack
										direction="row"
										justifyContent="flex-end"
										alignItems="center"
										spacing={2}
									>
										<SubmitButton
											isLoading={isSubmitting}
											isDisabled={isSubmitButtonDisabled}
											sx={{
												minWidth: 100,
											}}
										>
											{isSubmitting
												? "Loading..."
												: "Tweet"}
										</SubmitButton>
									</Stack>
								</Stack>
							</Box>
						)}
					/>
				</Box>
			</StyledForm>
		</Paper>
	);
};

export default TweetCreator;

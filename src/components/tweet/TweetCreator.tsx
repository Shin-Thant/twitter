import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, Box, Button, Paper, Stack } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useCreateTweetMutation } from "../../features/tweet/tweetApiSlice";
import { User } from "../../features/user/userTypes";
import { isBaseQueryResponseError } from "../../helpers/errorHelpers";
import useImageInputHandler from "../../hooks/useImageInputHandler";
import { showToast } from "../../lib/handleToast";
import { TweetCreateInput, TweetCreateSchema } from "../../schemas/TweetSchema";
import SubmitButton from "../buttons/SubmitButton";
import TweetImageUploadButton from "../buttons/TweetImageUploadButton";
import { StyledForm } from "../forms/AuthFormComponents";
import ContentInputHandler from "../forms/ContentInputHandler";
import WithImageInput from "../inputs/WithImageInput";
import UploadedImageList from "../lists/UploadedImageList";

// TODO: modify the image upload to use it without using `render` prop

const AVATAR_SIZE = { xs: 30, ss: 35 };

type Form = TweetCreateInput;

type Props = {
	user: User;
};

const TweetCreator = ({ user }: Props) => {
	const [createTweet] = useCreateTweetMutation();

	const { images, onImageInputChange, removeAllImages } =
		useImageInputHandler();

	const {
		watch,
		handleSubmit,
		formState: { isSubmitting, isValid, errors },
		control,
		reset,
	} = useForm<Form>({
		resolver: zodResolver(TweetCreateSchema),
		defaultValues: {
			content: "",
		},
		mode: "onChange",
	});
	const content = watch("content");

	const onSubmit: SubmitHandler<Form> = async (data) => {
		if (!data.content && !images.length) {
			showErrorToast("Content or image must be provided!");
			return;
		}

		try {
			const formData = createTweetFormData({ content });
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

	function onReset() {
		removeAllImages();
		reset();
	}

	const isSubmitButtonDisabled: boolean =
		(!content?.trim().length && !images.length) || !isValid;

	const showResetButton: boolean =
		!!errors.content?.message || !!content?.length || !!images.length;

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
							width: AVATAR_SIZE,
							height: AVATAR_SIZE,
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
							<Box>
								{!!images.length && (
									<Box sx={{ mt: 3 }}>
										<UploadedImageList
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
											isSubmitting || images.length === 4
										}
										onClick={onImageUpload}
										currentImageCount={images.length}
										totalImageCount={4}
									/>

									<Stack
										direction="row"
										justifyContent="flex-end"
										alignItems="center"
										spacing={2}
									>
										{showResetButton && (
											<Button
												type="button"
												variant="text"
												sx={{ textTransform: "none" }}
												onClick={onReset}
											>
												reset
											</Button>
										)}
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

import { zodResolver } from "@hookform/resolvers/zod";
import PhotoOutlinedIcon from "@mui/icons-material/PhotoOutlined";
import {
	Avatar,
	Box,
	Button,
	IconButton,
	Paper,
	Stack,
	Typography,
} from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useCreateTweetMutation } from "../../features/tweet/tweetApiSlice";
import { User } from "../../features/user/userTypes";
import { isBaseQueryResponseError } from "../../helpers/errorHelpers";
import { showToast } from "../../lib/handleToast";
import { TweetCreateInput, TweetCreateSchema } from "../../schemas/TweetSchema";
import SubmitButton from "../buttons/SubmitButton";
import { StyledForm } from "../forms/AuthFormComponents";
import ContentInputHandler from "../forms/ContentInputHandler";
import ImageInput from "../inputs/ImageInput";
import UploadedImageList from "../lists/UploadedImageList";
import { useState } from "react";

const AVATAR_SIZE = { xs: 30, ss: 35 };

type Form = TweetCreateInput & { photos?: File[] };

type Props = {
	user: User;
};
const TweetCreator = ({ user }: Props) => {
	const [createTweet] = useCreateTweetMutation();
	const [uploadedImages, setUploadedImages] = useState<File[]>([]);

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
		if (!data.content && !uploadedImages.length) return;
		console.log("hi");

		try {
			const formData = new FormData();
			formData.append("body", data.content);
			uploadedImages.forEach((image, i) => {
				formData.append(`photo_${i}`, image);
			});

			const response = await createTweet(formData);

			if (
				"error" in response &&
				isBaseQueryResponseError(response.error)
			) {
				showToast({
					message: "Something went wrong!",
					variant: "error",
				});
				return;
			}

			reset();
			showToast({
				message: "Successfully added new tweet!",
				variant: "success",
			});
		} catch (err) {
			showToast({ message: "Something went wrong!", variant: "error" });
		}
	};

	const onReset = () => {
		// reset input state, errors
		reset();
	};

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
									contentLength={content.length}
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
					<ImageInput
						setUploadedImages={setUploadedImages}
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
									<Box>
										<IconButton
											disabled={images.length === 4}
											onClick={onImageUpload}
											color="primary"
											size="small"
										>
											<PhotoOutlinedIcon />
										</IconButton>
										<Typography
											variant="caption"
											component={"span"}
										>
											{images.length} / 4
										</Typography>
									</Box>

									<Stack
										direction="row"
										justifyContent="flex-end"
										alignItems="center"
										spacing={2}
									>
										{(!!errors.content?.message ||
											!!content.length) && (
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
											isDisabled={
												(!content.trim().length &&
													!images.length) ||
												!isValid
											}
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

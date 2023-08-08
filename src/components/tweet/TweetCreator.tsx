import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, Box, Paper } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useCreateTweetMutation } from "../../features/tweet/tweetApiSlice";
import { User } from "../../features/user/userTypes";
import { isBaseQueryResponseError } from "../../helpers/errorHelpers";
import { showToast } from "../../lib/handleToast";
import { CreateTweetInput, CreateTweetSchema } from "../../schemas/TweetSchema";
import SubmitButton from "../buttons/SubmitButton";
import { StyledForm } from "../forms/AuthFormComponents";
import ContentInputHandler from "../forms/ContentInputHandler";

const AVATAR_SIZE = { xs: 30, ss: 35 };

type Props = {
	user: User;
};
const TweetCreator = ({ user }: Props) => {
	const [createTweet] = useCreateTweetMutation();

	const {
		watch,
		handleSubmit,
		formState: { isSubmitting },
		control,
		reset,
	} = useForm<CreateTweetInput>({
		resolver: zodResolver(CreateTweetSchema),
		defaultValues: {
			content: "",
		},
	});
	const content = watch("content");

	const onSubmit: SubmitHandler<CreateTweetInput> = async (data) => {
		if (!data.content) return;

		try {
			const response = await createTweet({ body: data.content });

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

	return (
		<Paper
			variant="outlined"
			sx={{
				borderRadius: "10px",
				display: "flex",
				alignItems: "flex-start",
				gap: 3,
				borderWidth: { xs: "0", sm: "1px" },
				boxShadow: { xs: "none", sm: "0 2px 5px rgba(0, 0, 0, 0.2)" },
				mt: { xs: 3, sm: 0 },
				px: { xs: 2, sm: 3 },
				py: { xs: 1, sm: 3 },
				bgcolor: "transparent",
			}}
		>
			<Box>
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
			</Box>
			<StyledForm sx={{ flex: 1 }} onSubmit={handleSubmit(onSubmit)}>
				<Box>
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

				<Box
					sx={{
						mt: 2,
						display: "flex",
						justifyContent: "flex-end",
						alignItems: "center",
					}}
				>
					<SubmitButton
						isLoading={isSubmitting}
						isDisabled={!content.length}
						sx={{
							minWidth: 100,
						}}
					>
						{isSubmitting ? "Loading..." : "Tweet"}
					</SubmitButton>
				</Box>
			</StyledForm>
		</Paper>
	);
};

export default TweetCreator;

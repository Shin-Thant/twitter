import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, Box, Paper } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { User } from "../../features/user/userTypes";
import { CreateTweetInput, CreateTweetSchema } from "../../schemas/TweetSchema";
import SubmitButton from "../buttons/SubmitButton";
import ContentLength from "../feedbacks/ContentLength";
import { StyledForm } from "../forms/AuthFormComponents";
import FieldError from "../forms/FieldError";
import TweetContentInput from "../forms/TweetContentInput";
import { useCreateTweetMutation } from "../../features/tweet/tweetApiSlice";
import {
	isFetchBaseQueryError,
	isResponseError,
} from "../../helpers/errorHelpers";
import { showToast } from "../../lib/handleToast";

type Props = {
	user: User;
};
const TweetCreator = ({ user }: Props) => {
	const [createTweet] = useCreateTweetMutation();

	const {
		watch,
		handleSubmit,
		formState: { isSubmitting, errors, defaultValues },
		control,
	} = useForm<CreateTweetInput>({
		resolver: zodResolver(CreateTweetSchema),
		defaultValues: {
			content: "",
		},
		mode: "onChange",
	});
	const content = watch("content");

	const onSubmit: SubmitHandler<CreateTweetInput> = async (data) => {
		const response = await createTweet({ body: data.content });
		console.log({ response });

		if (
			"error" in response &&
			isFetchBaseQueryError(response.error) &&
			isResponseError(response.error)
		) {
			showToast({ message: "Something went wrong", variant: "error" });
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
						outline: "1px solid hsl(203, 100%, 47%)",
						outlineOffset: "3px",
						bgcolor: "primary.main",
					}}
				/>
			</Box>
			<StyledForm sx={{ flex: 1 }} onSubmit={handleSubmit(onSubmit)}>
				<Box>
					<TweetContentInput
						hasError={!!errors.content}
						placeholder="What's happening?"
						controller={{
							name: "content",
							control,
							defaultValue: defaultValues?.content ?? "",
						}}
					/>

					<Box
						sx={{
							mt: 1,
							display: "flex",
							gap: 1.5,
							justifyContent: errors.content?.message
								? "space-between"
								: "flex-end",
						}}
					>
						{errors.content?.message && (
							<FieldError
								sx={{ mt: 0 }}
								message={errors.content.message}
							/>
						)}
						<ContentLength
							errorMessage={errors.content?.message}
							currentLength={content.length}
							limit={120}
						/>
					</Box>
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

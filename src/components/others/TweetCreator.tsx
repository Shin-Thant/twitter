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

type Props = {
	user: User;
};
const TweetCreator = ({ user }: Props) => {
	const {
		watch,
		handleSubmit,
		register,
		formState: { isSubmitting, errors },
	} = useForm({
		resolver: zodResolver(CreateTweetSchema),
		defaultValues: {
			content: "",
		},
		mode: "onChange",
	});
	const content = watch("content");

	const onSubmit: SubmitHandler<CreateTweetInput> = (data) => {
		console.log(data);
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
						outlineOffset: "2px",
					}}
				/>
			</Box>
			<StyledForm sx={{ flex: 1 }} onSubmit={handleSubmit(onSubmit)}>
				<Box>
					<TweetContentInput
						type="text"
						placeholder="What's happening?"
						hasError={!!errors.content}
						{...register("content")}
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
					<SubmitButton isLoading={isSubmitting}>
						{isSubmitting ? "Loading..." : "Tweet"}
					</SubmitButton>
				</Box>
			</StyledForm>
		</Paper>
	);
};

export default TweetCreator;

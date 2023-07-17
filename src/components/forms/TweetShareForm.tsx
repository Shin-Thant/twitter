import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { ShareTweetInput, ShareTweetSchema } from "../../schemas/TweetSchema";
import SubmitButton from "../buttons/SubmitButton";
import ContentLength from "../feedbacks/ContentLength";
import { StyledForm } from "./AuthFormComponents";
import FieldError from "./FieldError";
import TweetContentInput from "./TweetContentInput";

type Props = {
	share: (body?: string) => void | Promise<void>;
};

const TweetShareForm = ({ share }: Props) => {
	const {
		handleSubmit,
		watch,
		formState: { errors, isSubmitting, defaultValues },
		control,
	} = useForm({
		resolver: zodResolver(ShareTweetSchema),
		defaultValues: {
			content: "",
		},
		mode: "onChange",
	});

	const content = watch("content");

	const onSubmit: SubmitHandler<ShareTweetInput> = async (data) => {
		await share(data.content ?? "");
	};

	return (
		<StyledForm onSubmit={handleSubmit(onSubmit)}>
			<TweetContentInput
				multiline
				maxRows={5}
				placeholder="What's happening?"
				hasError={!!errors.content}
				controller={{
					name: "content",
					control,
					defaultValue: defaultValues?.content ?? "",
				}}
			/>
			<Box
				sx={{
					mt: 1,
					gap: 1.5,
					display: "flex",
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

			<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
				<SubmitButton
					isLoading={isSubmitting}
					sx={{
						minWidth: 150,
						mt: 3,
					}}
				>
					{isSubmitting ? "Loading..." : "Retweet"}
				</SubmitButton>
			</Box>
		</StyledForm>
	);
};

export default TweetShareForm;

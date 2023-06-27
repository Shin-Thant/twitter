import { zodResolver } from "@hookform/resolvers/zod";
import { Box, InputBase, Typography } from "@mui/material";
import { grey, red } from "@mui/material/colors";
import { SubmitHandler, useForm } from "react-hook-form";
import {
	ShareTweetInput,
	ShareTweetSchema,
} from "../../schemas/ShareTweetSchema";
import { StyledForm } from "./AuthFormComponents";
import FieldError from "./FieldError";
import SubmitButton from "../buttons/SubmitButton";

type Props = {
	share: (body?: string) => void | Promise<void>;
};

const TweetShareForm = ({ share }: Props) => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(ShareTweetSchema),
		defaultValues: {
			content: "",
		},
	});

	const content = watch("content");

	const onSubmit: SubmitHandler<ShareTweetInput> = async (data) => {
		await share(data.content ?? "");
	};

	return (
		<StyledForm onSubmit={handleSubmit(onSubmit)}>
			<InputBase
				multiline
				maxRows={12}
				placeholder="Caption..."
				sx={{
					borderBottom: "1.5px solid",
					borderColor: errors.content?.message
						? red["A700"]
						: grey[500],
					"&:focus-within": {
						borderColor: errors.content?.message
							? red["A700"]
							: "primary.main",
					},
					display: "grid",
				}}
				{...register("content")}
			/>
			<Box
				sx={{
					mt: 1,
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
				<Typography
					variant="body2"
					sx={{
						minWidth: "max-content",
						// flex: 1,
						color: errors.content?.message
							? red["A200"]
							: grey[400],
					}}
				>
					{content.length} / 200
				</Typography>
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

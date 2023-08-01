import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ShareTweetInput, QuoteRetweetSchema } from "../../schemas/TweetSchema";
import SubmitButton from "../buttons/SubmitButton";
import { StyledForm } from "./AuthFormComponents";
import ContentInputHandler from "./ContentInputHandler";

// TODO: add cancel button

type Props = {
	share: (body?: string) => void | Promise<void>;
};

const TweetShareForm = ({ share }: Props) => {
	const {
		handleSubmit,
		watch,
		formState: { isSubmitting, isValid },
		control,
	} = useForm({
		resolver: zodResolver(QuoteRetweetSchema),
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
			<Controller
				render={({ field, formState: { errors } }) => (
					<ContentInputHandler
						field={field}
						errorMessage={errors.content?.message}
						contentLength={content.length}
					/>
				)}
				name="content"
				control={control}
				defaultValue={""}
			/>

			<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
				<SubmitButton
					isLoading={isSubmitting || !isValid}
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

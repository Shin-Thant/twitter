import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ShareTweetInput, QuoteRetweetSchema } from "../../schemas/TweetSchema";
import { StyledForm } from "./AuthFormComponents";
import ContentInputHandler from "./ContentInputHandler";
import ModalActionButton from "../buttons/ModalActionButton";

type Props = {
	handleShare: (body?: string) => void | Promise<void>;
	closeModal: () => void;
};

const TweetShareForm = ({ handleShare, closeModal }: Props) => {
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
		await handleShare(data.content ?? "");
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
					/>
				)}
				name="content"
				control={control}
				defaultValue={""}
			/>

			<Box
				sx={{
					display: "flex",
					justifyContent: "flex-end",
					gap: 2,
					mt: 2,
				}}
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
					isLoading={isSubmitting || !isValid}
					sx={{
						minWidth: 100,
					}}
				>
					{isSubmitting ? "Loading..." : "Retweet"}
				</ModalActionButton>
			</Box>
		</StyledForm>
	);
};

export default TweetShareForm;

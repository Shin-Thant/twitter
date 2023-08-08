import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useCreateTweetMutation } from "../../features/tweet/tweetApiSlice";
import { isBaseQueryResponseError } from "../../helpers/errorHelpers";
import { useTweetCreatorModal } from "../../hooks/useTweetCreatorModal";
import { showToast } from "../../lib/handleToast";
import { CreateTweetInput, CreateTweetSchema } from "../../schemas/TweetSchema";
import ModalActionButton from "../buttons/ModalActionButton";
import ContentInputHandler from "../forms/ContentInputHandler";
import Modal from "./Modal";

const TweetCreatorModal = () => {
	const { isOpen, setIsOpen } = useTweetCreatorModal();
	const [createTweet, { isLoading }] = useCreateTweetMutation();

	const {
		handleSubmit,
		control,
		watch,
		formState: { isSubmitting, isValid },
		reset,
	} = useForm<CreateTweetInput>({
		resolver: zodResolver(CreateTweetSchema),
		defaultValues: {
			content: "",
		},
		mode: "onChange",
	});

	const content = watch("content");

	const onSubmit: SubmitHandler<CreateTweetInput> = async (data) => {
		if (isLoading) return;

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

			showToast({
				message: "Successfully created tweet!",
				variant: "success",
			});
		} catch (err) {
			showToast({ message: "Something went wrong!", variant: "error" });
		} finally {
			onClose();
		}
	};

	const onClose = () => {
		setIsOpen(false);
		reset();
	};

	return (
		<Modal title="Create Tweet" isOpen={isOpen} onClose={onClose}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Controller
					render={({ field, formState: { errors } }) => (
						<ContentInputHandler
							field={field}
							errorMessage={errors.content?.message}
							contentLength={content.length}
							placeholder="What's happening?"
							autoFocus={true}
						/>
					)}
					name="content"
					control={control}
					defaultValue=""
				/>

				<Stack
					direction={"row"}
					justifyContent={"flex-end"}
					alignItems={"center"}
					spacing={2}
					sx={{ mt: 2 }}
				>
					<ModalActionButton
						isLoading={isSubmitting}
						type="button"
						setGreyStyles={true}
						onClick={onClose}
					>
						Cancel
					</ModalActionButton>

					<ModalActionButton
						isLoading={isSubmitting}
						disabled={!isValid}
						type="submit"
					>
						{isSubmitting ? "Loading..." : "Tweet"}
					</ModalActionButton>
				</Stack>
			</form>
		</Modal>
	);
};

export default TweetCreatorModal;

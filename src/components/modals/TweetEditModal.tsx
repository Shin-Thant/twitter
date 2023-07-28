import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useTweetEditModal } from "../../hooks/useTweetEditModal";
import { EditTweetInput, EditTweetSchema } from "../../schemas/TweetSchema";
import ContentInputHandler from "../forms/ContentInputHandler";
import Modal from "./Modal";

// TODO: get the original tweet content

const TweetEditModal = () => {
	const { isOpen, closeModal } = useTweetEditModal();

	const {
		handleSubmit,
		formState: { isSubmitting },
		control,
		watch,
		reset,
	} = useForm({
		resolver: zodResolver(EditTweetSchema),
		defaultValues: {
			content: "",
		},
		mode: "onChange",
	});

	const content = watch("content");

	const onSubmit: SubmitHandler<EditTweetInput> = (data) => {
		console.log(data);
	};

	const onClose = () => {
		reset();
		closeModal();
	};

	return (
		<Modal title={"Edit Tweet"} isOpen={isOpen} onClose={onClose}>
			<form onSubmit={handleSubmit(onSubmit)}>
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

				<Stack
					direction={"row"}
					justifyContent={"flex-end"}
					alignItems={"center"}
					spacing={2}
					mt={3}
				>
					<Button
						type="button"
						disabled={isSubmitting}
						variant="outlined"
						onClick={onClose}
						sx={{
							width: "max-content",
							minWidth: 85,
							borderRadius: "50px",
							textTransform: "none",
						}}
					>
						Cancel
					</Button>
					<Button
						type="submit"
						disabled={isSubmitting}
						variant="outlined"
						sx={{
							width: "max-content",
							minWidth: 85,
							borderRadius: "50px",
							textTransform: "none",
						}}
					>
						{isSubmitting ? "Loading..." : "Edit"}
					</Button>
				</Stack>
			</form>
		</Modal>
	);
};

export default TweetEditModal;

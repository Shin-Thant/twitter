import { zodResolver } from "@hookform/resolvers/zod";
import { Stack, Typography } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useCommentCreateModal } from "../../hooks/useCommentCreateModal";
import {
	CommentCreateInput,
	CommentCreateSchema,
} from "../../schemas/CommentSchema";
import ModalActionButton from "../buttons/ModalActionButton";
import ContentInputHandler from "../forms/ContentInputHandler";
import Modal from "./Modal";
import { selectTweetById } from "../../features/tweet/tweetApiSlice";
import { useAppSelector } from "../../app/hooks";

const CommentCreateModal = () => {
	const { isOpen, closeModal, id: tweetId } = useCommentCreateModal();
	const tweet = useAppSelector((state) => selectTweetById(state, tweetId));

	const {
		handleSubmit,
		formState: { isSubmitting, isValid },
		control,
		watch,
	} = useForm<CommentCreateInput>({
		resolver: zodResolver(CommentCreateSchema),
		defaultValues: {
			content: "",
		},
		mode: "onChange",
	});
	const content = watch("content");

	const onSubmit: SubmitHandler<CommentCreateInput> = (data) => {
		console.log(data);

		// reset();
	};

	const onClose = () => {
		closeModal();
	};

	// TODO: make modal accept custom modal header
	// expected title `Comment @elonmusk`
	return (
		<Modal
			title={
				<>
					Comment on{" "}
					<Typography
						color={"primary"}
						sx={{ fontSize: "inherit", display: "inline" }}
					>
						@{tweet?.owner.username}
					</Typography>
				</>
			}
			isOpen={isOpen}
			onClose={onClose}
		>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Controller
					render={({ field, formState: { errors } }) => (
						<ContentInputHandler
							field={field}
							contentLength={content.length}
							errorMessage={errors.content?.message}
							placeholder="Add comment"
						/>
					)}
					name="content"
					control={control}
					defaultValue=""
				/>

				<Stack
					direction="row"
					justifyContent={"flex-end"}
					alignItems={"center"}
					spacing={2}
					mt={2}
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
						isLoading={isSubmitting}
						disabled={!isValid}
					>
						{isSubmitting ? "Loading..." : "Comment"}
					</ModalActionButton>
				</Stack>
			</form>
		</Modal>
	);
};

export default CommentCreateModal;

import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "@mui/material";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
	useGetCommentByIdQuery,
	useUpdateCommentMutation,
} from "../../features/comment/commentApiSlice";
import useCommentEditModal from "../../hooks/useCommentEditModal";
import { showToast } from "../../lib/handleToast";
import {
	CommentCreateInput,
	CommentCreateSchema,
} from "../../schemas/CommentSchema";
import ModalActionButton from "../buttons/ModalActionButton";
import ContentInputHandler from "../forms/ContentInputHandler";
import Modal from "./Modal";

const CommentEditModal = () => {
	const { isOpen, closeModal, tweetId, commentId } = useCommentEditModal();

	const { data, isFetching: isFetchingComment } = useGetCommentByIdQuery(
		{ tweetId, commentId },
		{ skip: !commentId && isOpen }
	);

	const [replyComment, { isLoading }] = useUpdateCommentMutation();

	const {
		handleSubmit,
		formState: { isSubmitting, isValid },
		control,
		watch,
		reset,
		setValue,
	} = useForm<CommentCreateInput>({
		resolver: zodResolver(CommentCreateSchema),
		defaultValues: {
			content: "",
		},
		mode: "onChange",
	});
	const content = watch("content");

	useEffect(() => {
		let isMounted = true;
		console.log(data);

		if (isMounted && isOpen && !!data) {
			setValue("content", data.body);
		}

		return () => {
			isMounted = false;
		};
	}, [isOpen, setValue, data]);

	const onSubmit: SubmitHandler<CommentCreateInput> = async (data) => {
		if (isLoading) {
			return;
		}
		try {
			await replyComment({
				tweetId,
				body: data.content,
				commentId,
			});
			showToast({
				message: "Successfully commented!",
				variant: "success",
			});
			reset();
		} catch (err) {
			showToast({ message: "Something went wrong", variant: "error" });
		} finally {
			onClose();
		}
	};

	const onClose = () => {
		reset();
		closeModal();
	};

	return (
		<Modal title={"Edit Comment"} isOpen={isOpen} onClose={onClose}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Controller
					render={({ field, formState: { errors } }) => (
						<ContentInputHandler
							field={field}
							contentLength={content.length}
							errorMessage={errors.content?.message}
							placeholder="your comment"
							required={true}
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
						isLoading={isSubmitting || isFetchingComment}
						disabled={!isValid}
					>
						{isSubmitting ? "Loading..." : "Reply"}
					</ModalActionButton>
				</Stack>
			</form>
		</Modal>
	);
};

export default CommentEditModal;

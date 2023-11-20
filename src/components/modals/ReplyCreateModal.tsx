import { zodResolver } from "@hookform/resolvers/zod";
import { Stack, Typography } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
	useGetCommentByIdQuery,
	useReplyCommentMutation,
} from "../../features/comment/commentApiSlice";
import { useReplyCreateModal } from "../../hooks/useReplyCreateModal";
import { showToast } from "../../lib/handleToast";
import {
	CommentCreateInput,
	CommentCreateSchema,
} from "../../schemas/CommentSchema";
import ModalActionButton from "../buttons/ModalActionButton";
import ContentInputHandler from "../forms/ContentInputHandler";
import Modal from "./Modal";
import ModalHeaderSkeleton from "../skeletons/ModalHeaderSkeleton";

const ReplyCreateModal = () => {
	const {
		isOpen,
		closeModal,
		tweetId,
		commentId: originId,
		getRepliesCacheKey,
	} = useReplyCreateModal();

	const [replyComment, { isLoading }] = useReplyCommentMutation();
	const { data: parentComment, isFetching } = useGetCommentByIdQuery(
		{ commentId: originId, tweetId },
		{ skip: !isOpen || !originId || !tweetId }
	);

	const {
		handleSubmit,
		formState: { isSubmitting, isValid },
		control,
		watch,
		reset,
	} = useForm<CommentCreateInput>({
		resolver: zodResolver(CommentCreateSchema),
		defaultValues: {
			content: "",
		},
		mode: "onChange",
	});
	const content = watch("content");

	const onSubmit: SubmitHandler<CommentCreateInput> = async (data) => {
		if (isLoading) {
			return;
		}
		if (!parentComment) {
			onClose();
			return;
		}
		try {
			const isTopLevelReply =
				!getRepliesCacheKey && parentComment.type === "reply";

			await replyComment({
				tweetId,
				body: data.content,
				commentId: originId,
				getRepliesCacheKey: isTopLevelReply
					? parentComment._id
					: getRepliesCacheKey,
				invalidateTopLevelCommentsAndReplies: !getRepliesCacheKey,
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
		<Modal
			title={
				isFetching ? (
					<Stack direction="row" alignItems={"center"} spacing={1}>
						<ModalHeaderSkeleton
							width={90}
							sx={{ borderRadius: "2px" }}
						/>
						<ModalHeaderSkeleton
							width={40}
							sx={{ borderRadius: "2px" }}
						/>
					</Stack>
				) : (
					<>
						Reply to{" "}
						<Typography
							color={"primary"}
							sx={{ fontSize: "inherit", display: "inline" }}
						>
							@{parentComment?.owner.username}
						</Typography>
					</>
				)
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
							placeholder="Reply..."
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
						isLoading={isSubmitting || isFetching}
						disabled={!isValid}
					>
						{isSubmitting ? "Loading..." : "Reply"}
					</ModalActionButton>
				</Stack>
			</form>
		</Modal>
	);
};

export default ReplyCreateModal;

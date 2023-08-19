import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "@mui/material";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useAppSelector } from "../../app/hooks";
import {
	selectTweetById,
	useEditTweetMutation,
} from "../../features/tweet/tweetApiSlice";
import { useTweetEditModal } from "../../hooks/useTweetEditModal";
import { TweetEditInput, TweetEditSchema } from "../../schemas/TweetSchema";
import ModalActionButton from "../buttons/ModalActionButton";
import ContentInputHandler from "../forms/ContentInputHandler";
import Modal from "./Modal";

const TweetEditModal = () => {
	const { id: tweetId, isOpen, closeModal } = useTweetEditModal();
	const tweet = useAppSelector((state) => selectTweetById(state, tweetId));
	const [editTweet, { isLoading }] = useEditTweetMutation();

	const {
		handleSubmit,
		formState: { isSubmitting, isValid },
		control,
		watch,
		setValue,
	} = useForm({
		resolver: zodResolver(TweetEditSchema),
		defaultValues: {
			content: "",
		},
		mode: "onChange",
	});

	const content = watch("content");

	useEffect(() => {
		let isMounted = true;
		console.log("setting...");

		if (isMounted) {
			if (tweet) {
				setValue("content", tweet.body);
			} else {
				closeModal();
			}
		}

		return () => {
			isMounted = false;
		};
	}, [setValue, tweet, closeModal]);

	const onSubmit: SubmitHandler<TweetEditInput> = async (data) => {
		if (isLoading) return;
		if (data.content === tweet?.body) {
			closeModal();
			return;
		}

		await editTweet({ tweetId, body: data.content });
		closeModal();
	};

	const onClose = () => {
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
							autoFocus={true}
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
						{isSubmitting ? "Loading..." : "Save"}
					</ModalActionButton>
				</Stack>
			</form>
		</Modal>
	);
};

export default TweetEditModal;

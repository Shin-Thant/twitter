import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Typography,
} from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import RepliesContainer from "../../../containers/RepliesContainer";
import { GetCommentsResultComment } from "../../../features/comment/commentTypes";
import ReplyList from "../../lists/ReplyList";
import CommentHeader from "./CommentHeader";
import CommentLikeButton from "./CommentLikeButton";
import CommentOptionsMenu from "./CommentOptionsMenu";
import ReplyButton from "./ReplyButton";
import { useCommentThreadStore } from "../../../pages/tweet-detail-page/store/CommentThreadStore";

const MAX_DEPTH = 2 as const;

type Props = {
	getRepliesCacheKey?: string;
	depth: number;
	comment:
		| GetCommentsResultComment
		| GetCommentsResultComment["comments"][number];
};

const CommentItem = ({ depth, comment, getRepliesCacheKey }: Props) => {
	const { id: currentTweetId } = useParams();
	const [showMore, setShowMore] = useState<boolean>(false);

	const { addThread: addNewThread, setCurrentThread } =
		useCommentThreadStore();

	const changeThread = () => {
		addNewThread(comment.origin?._id ?? comment._id);
		setCurrentThread(comment._id);
	};

	return (
		<Card
			variant="outlined"
			sx={{
				bgcolor: "transparent",
				mb: 2,
				borderWidth: 1,
				borderStyle: "solid",
				borderColor: "tweet.borderColorFade",
				borderRadius: "10px",
				"&:hover": {
					borderColor: "tweet.borderColor",
				},
			}}
		>
			{JSON.stringify(`id: ${comment._id}`)}
			<br />
			{JSON.stringify(`key: ${getRepliesCacheKey}`)}
			<CommentHeader
				owner={comment.owner}
				createdAt={comment.createdAt}
				replyTo={
					comment.type === "comment"
						? comment.tweet.owner.username
						: comment.origin.owner.username
				}
				action={
					<CommentOptionsMenu
						type={comment.type}
						originIdOrGetRepliesCacheKey={
							getRepliesCacheKey ?? comment.origin?._id
						}
						tweetId={
							!currentTweetId ? comment.tweet._id : currentTweetId
						}
						commentId={comment._id}
					/>
				}
			/>
			<CardContent>
				<Typography
					sx={{
						fontSize: { xs: 15.5, sm: 16 },
						whiteSpace: "pre-line",
					}}
				>
					{comment.body}
				</Typography>
			</CardContent>

			<CardActions>
				<CommentLikeButton
					getRepliesCacheKey={getRepliesCacheKey}
					commentId={comment._id}
					tweetId={comment.tweet._id}
					likes={comment.likes}
				/>
				<ReplyButton
					getRepliesCacheKey={getRepliesCacheKey}
					commentId={comment._id}
					ownerId={comment.owner._id}
					tweetId={comment.tweet._id}
					replies={comment.comments ?? []}
				/>
			</CardActions>

			<Box px={2}>
				{!!comment.comments?.length && (
					<>
						{depth >= MAX_DEPTH && (
							<Button
								sx={{
									textTransform: "none",
									mb: 2,
									display:
										depth >= MAX_DEPTH
											? "inline-flex"
											: "none",
								}}
								onClick={changeThread}
							>
								see more
							</Button>
						)}
						<Box
							sx={{
								display: depth >= MAX_DEPTH ? "none" : "block",
							}}
						>
							{"comments" in comment.comments[0] ? (
								<ReplyList
									depth={depth + 1}
									getRepliesCacheKey={getRepliesCacheKey}
									replies={comment.comments}
								/>
							) : (
								<>
									<Button
										sx={{
											textTransform: "none",
											mb: 2,
											display:
												depth >= MAX_DEPTH
													? "none"
													: "inline-flex",
										}}
										onClick={() =>
											setShowMore((prev) => !prev)
										}
									>
										see {showMore ? "less" : "more"}
									</Button>

									{showMore && (
										<RepliesContainer
											// key={`${showMore}`}
											depth={depth + 1}
											commentId={comment._id}
											show={showMore}
										/>
									)}
								</>
							)}
						</Box>
					</>
				)}
			</Box>
		</Card>
	);
};

export default CommentItem;

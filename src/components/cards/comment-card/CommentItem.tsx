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

	const setThreadId = useCommentThreadStore().setCommentId;

	const changeThread = () => {
		setThreadId(comment._id);
	};

	return (
		<Card
			variant="outlined"
			sx={{
				bgcolor: "transparent",
				mb: 2,
				borderWidth: "1px 1px 1px 1px",
				borderStyle: "solid",
				borderColor: "tweet.borderColor",
				borderRadius: "10px",
			}}
		>
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
						originId={getRepliesCacheKey ?? comment.origin?._id}
						tweetId={
							!currentTweetId
								? comment.type === "comment"
									? comment.tweet._id
									: comment.tweet
								: currentTweetId
						}
						commentId={comment._id}
					/>
				}
			/>
			<CardContent>
				Depth: {depth}
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
					commentId={comment._id}
					tweetId={
						comment.type === "comment"
							? comment.tweet._id
							: comment.tweet
					}
					likes={comment.likes}
				/>
				<ReplyButton
					getRepliesCacheKey={getRepliesCacheKey}
					commentId={comment._id}
					ownerId={comment.owner._id}
					tweetId={
						comment.type === "comment"
							? comment.tweet._id
							: comment.tweet
					}
					replies={comment.comments ?? []}
				/>
			</CardActions>

			<Box px={2}>
				{depth === 2 && (
					<Button onClick={changeThread}>go to another</Button>
				)}

				{comment.comments?.length &&
					!("tweet" in comment.comments[0]) && (
						<Button onClick={() => setShowMore((prev) => !prev)}>
							show more
						</Button>
					)}

				{!comment.comments?.length ? (
					"no replies"
				) : "tweet" in comment.comments[0] ? (
					<ReplyList
						depth={depth + 1}
						getRepliesCacheKey={getRepliesCacheKey}
						replies={comment.comments}
					/>
				) : showMore ? (
					<RepliesContainer
						depth={depth + 1}
						commentId={comment._id}
						show={showMore}
					/>
				) : (
					"not showing"
				)}
			</Box>
		</Card>
	);
};

export default CommentItem;

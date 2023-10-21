import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Typography,
} from "@mui/material";
import { useState } from "react";
import RepliesContainer from "../../../containers/RepliesContainer";
import { GetCommentsResultComment } from "../../../features/comment/commentTypes";
import CommentList from "../../lists/CommentList";
import CommentHeader from "./CommentHeader";
import CommentLikeButton from "./CommentLikeButton";
import ReplyButton from "./ReplyButton";

type Props = {
	comment:
		| GetCommentsResultComment
		| GetCommentsResultComment["comments"][number];
};

const CommentItem = ({ comment }: Props) => {
	const [showMore, setShowMore] = useState<boolean>(false);

	return (
		<Card
			variant="outlined"
			sx={{
				bgcolor: "transparent",
				mb: 2,
				borderWidth: { xs: "0 0 1px 0", sm: "1px 1px 1px 1px" },
				borderStyle: "solid",
				borderColor: "tweet.borderColor",
				borderRadius: { xs: "0", sm: "10px" },
			}}
		>
			<CommentHeader
				tweetId={
					comment.type === "comment"
						? comment.tweet._id
						: comment.tweet
				}
				commentId={comment._id}
				owner={comment.owner}
				createdAt={comment.createdAt}
				replyTo={
					comment.type === "comment"
						? comment.tweet.owner.username
						: comment.origin.owner.username
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
					commentId={comment._id}
					tweetId={
						comment.type === "comment"
							? comment.tweet._id
							: comment.tweet
					}
					likes={comment.likes}
				/>
				<ReplyButton
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
				{comment.comments?.length &&
					!("tweet" in comment.comments[0]) && (
						<Button onClick={() => setShowMore((prev) => !prev)}>
							show more
						</Button>
					)}

				{!comment.comments?.length ? (
					"no replies"
				) : "tweet" in comment.comments[0] ? (
					<CommentList comments={comment.comments} />
				) : (
					<RepliesContainer commentId={comment._id} show={showMore} />
				)}
			</Box>
		</Card>
	);
};

export default CommentItem;

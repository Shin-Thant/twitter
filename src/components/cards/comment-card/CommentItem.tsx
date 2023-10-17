import { Card, CardActions, CardContent, Typography } from "@mui/material";
import { GetCommentsResultComment } from "../../../features/comment/commentTypes";
import CommentHeader from "./CommentHeader";
import CommentLikeButton from "./CommentLikeButton";
import ReplyButton from "./ReplyButton";

type Props = {
	comment: GetCommentsResultComment;
};

const CommentItem = ({ comment }: Props) => {
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
				commentId={comment._id}
				owner={comment.owner}
				createdAt={comment.createdAt}
				replyTo={
					!comment.origin
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
					tweetId={comment.tweet._id}
					likes={comment.likes}
				/>
				<ReplyButton
					commentId={comment._id}
					ownerId={comment.owner._id}
					tweetId={comment.tweet._id}
					replies={comment.comments}
				/>
			</CardActions>
		</Card>
	);
};

export default CommentItem;

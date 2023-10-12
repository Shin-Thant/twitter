import {
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Typography,
} from "@mui/material";
import { Comment } from "../../features/comment/commentTypes";
import TweetAvatar from "../tweet/header/TweetAvatar";
import TweetTitle from "../tweet/header/TweetTitle";
import CommentLikeButton from "./CommentLikeButton";
import CommentSubTitle from "./CommentSubTitle";
import ReplyButton from "./ReplyButton";

type Props = {
	comment: Comment;
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
			<CardHeader
				avatar={
					<TweetAvatar
						avatar={comment.owner.avatar}
						name={comment.owner.name}
						sx={{
							bgcolor: "hsl(330, 100%, 50%)",
							width: { xs: 30, ss: 35 },
							height: { xs: 30, ss: 35 },
							objectFit: "cover",
							fontSize: "1rem",
						}}
					/>
				}
				title={
					<TweetTitle
						owner={comment.owner}
						createdAt={comment.createdAt}
					/>
				}
				subheader={
					<CommentSubTitle
						replyTo={
							!comment.origin
								? comment.tweet.owner.username
								: comment.origin.owner.username
						}
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
					commentId={comment._id}
					ownerId={comment.owner._id}
					likes={comment.likes}
				/>
				<ReplyButton
					ownerId={comment.owner._id}
					nestedCommentCount={comment.comments.length}
				/>
			</CardActions>
		</Card>
	);
};

export default CommentItem;
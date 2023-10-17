import { CardHeader } from "@mui/material";
import { useAppSelector } from "../../../app/hooks";
import { userIdSelector } from "../../../features/user/userSlice";
import { UserWithoutEmail } from "../../../features/user/userTypes";
import CardAvatar from "../components/CardAvatar";
import CardTitle from "../components/CardTitle";
import CommentOptionsMenu from "./CommentOptionsMenu";
import CommentSubTitle from "./CommentSubTitle";

type Props = {
	tweetId: string;
	commentId: string;
	owner: UserWithoutEmail;
	createdAt: string;
	replyTo: string;
};

function CommentHeader({
	tweetId,
	commentId,
	owner,
	createdAt,
	replyTo,
}: Props) {
	const loginUserId = useAppSelector(userIdSelector);
	const isCommentOwner = loginUserId === owner._id;

	return (
		<CardHeader
			avatar={
				<CardAvatar
					avatar={owner.avatar}
					name={owner.name}
					sx={{
						bgcolor: "hsl(330, 100%, 50%)",
						width: { xs: 30, ss: 35 },
						height: { xs: 30, ss: 35 },
						objectFit: "cover",
						fontSize: "1rem",
					}}
				/>
			}
			title={<CardTitle owner={owner} createdAt={createdAt} />}
			subheader={<CommentSubTitle replyTo={replyTo} />}
			action={
				isCommentOwner ? (
					<CommentOptionsMenu
						tweetId={tweetId}
						commentId={commentId}
					/>
				) : null
			}
		/>
	);
}

export default CommentHeader;

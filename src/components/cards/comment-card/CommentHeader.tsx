import { CardHeader } from "@mui/material";
import { ReactElement } from "react";
import { useAppSelector } from "../../../app/hooks";
import { userIdSelector } from "../../../features/user/userSlice";
import { UserWithoutEmail } from "../../../features/user/userTypes";
import CardAvatar from "../components/CardAvatar";
import CardTitle from "../components/CardTitle";
import CommentSubTitle from "./CommentSubTitle";

type Props = {
	owner: UserWithoutEmail;
	createdAt: string;
	replyTo: string;
	action: ReactElement;
};

function CommentHeader({ action, owner, createdAt, replyTo }: Props) {
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
			action={isCommentOwner ? action : null}
		/>
	);
}

export default CommentHeader;

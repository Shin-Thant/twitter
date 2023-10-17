import { CardHeader } from "@mui/material";
import { useAppSelector } from "../../../app/hooks";
import { GetTweetsUser } from "../../../features/tweet/tweetTypes";
import { userIdSelector } from "../../../features/user/userSlice";
import CardAvatar from "../components/CardAvatar";
import CardTitle from "../components/CardTitle";
import TweetSubTitle from "./header/TweetSubTitle";
import TweetOptionsMenu from "./menus/TweetOptionsMenu";

type Props = {
	tweetId: string;
	owner: GetTweetsUser;
	createdAt: string;
};

export default function TweetHeader({ tweetId, owner, createdAt }: Props) {
	const loginUserId = useAppSelector(userIdSelector);
	const isTweetOwner = owner._id === loginUserId;

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
			subheader={<TweetSubTitle username={owner.username} />}
			action={
				isTweetOwner ? <TweetOptionsMenu tweetId={tweetId} /> : false
			}
			sx={{ pb: 1 }}
		/>
	);
}

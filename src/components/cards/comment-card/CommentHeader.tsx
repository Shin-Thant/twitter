import { CardHeader } from "@mui/material";
import { useAppSelector } from "../../../app/hooks";
import { userIdSelector } from "../../../features/user/userSlice";
import TweetSubTitle from "../tweet-card/header/TweetSubTitle";
import TweetTitle from "../tweet-card/header/TweetTitle";
import TweetOptionsMenu from "../tweet-card/menus/TweetOptionsMenu";
import { GetTweetsUser } from "../../../features/tweet/tweetTypes";
import CardAvatar from "../components/CardAvatar";

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
			title={<TweetTitle owner={owner} createdAt={createdAt} />}
			subheader={<TweetSubTitle username={owner.username} />}
			action={
				isTweetOwner ? <TweetOptionsMenu tweetId={tweetId} /> : false
			}
			sx={{ pb: 1 }}
		/>
	);
}

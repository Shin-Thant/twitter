import { CardHeader } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { Owner } from "../../features/tweet/tweetTypes";
import { userIdSelector } from "../../features/user/userSlice";
import TweetAvatar from "./header/TweetAvatar";
import TweetSubTitle from "./header/TweetSubTitle";
import TweetTitle from "./header/TweetTitle";
import TweetOptionsMenu from "./menus/TweetOptionsMenu";

const width = { xs: 30, ss: 35 };
const height = { xs: 30, ss: 35 };

type Props = {
	tweetId: string;
	owner: Owner;
	createdAt: string;
};

export default function TweetHeader({ tweetId, owner, createdAt }: Props) {
	const loginUserId = useAppSelector(userIdSelector);
	const isTweetOwner = owner._id === loginUserId;

	return (
		<CardHeader
			avatar={
				<TweetAvatar
					avatar={owner.avatar}
					name={owner.name}
					sx={{
						bgcolor: "hsl(330, 100%, 50%)",
						width,
						height,
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
			sx={{ pb: "0" }}
		/>
	);
}

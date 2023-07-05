import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { SharedTweet } from "../../features/tweet/tweetTypes";
import TweetAvatar from "./header/TweetAvatar";
import TweetSubTitle from "./header/TweetSubTitle";
import TweetTitle from "./header/TweetTitle";

type Props = {
	origin: SharedTweet["origin"];
};
const NestedTweet = ({ origin }: Props) => {
	return (
		<Card
			variant="outlined"
			sx={{
				bgcolor: "tweet.bg",
				p: 1.5,
				border: "1px solid",
				borderColor: "tweet.borderColor",
				borderRadius: "8px",
			}}
		>
			<CardHeader
				avatar={
					<TweetAvatar
						avatar={origin.owner.avatar}
						name={origin.owner.name}
						sx={{
							bgcolor: grey[500],
							width: 30,
							height: 30,
							objectFit: "cover",
							fontSize: "0.9rem",
						}}
					/>
				}
				title={
					<TweetTitle
						owner={origin.owner}
						createdAt={origin.createdAt}
					/>
				}
				subheader={<TweetSubTitle username={origin.owner.username} />}
				sx={{
					p: "0",
				}}
			/>

			<CardContent
				sx={{
					px: 0,
					ml: { xs: 0, ss: 4.5 },
					"&.MuiCardContent-root": {
						pb: 0,
					},
				}}
			>
				<Typography
					variant="body2"
					sx={{
						fontWeight: 400,
					}}
					className="auto_line--tweet_origin"
				>
					{origin.body}
				</Typography>
			</CardContent>
		</Card>
	);
};

export default NestedTweet;

import { Box, Card } from "@mui/material";
import { ForwardedRef, forwardRef, memo } from "react";
import { Tweet } from "../../features/tweet/type";
import TweetActions from "./TweetActions";
import TweetBody from "./TweetBody";
import TweetHeader from "./TweetHeader";

type Props = {
	tweet: Tweet;
	cacheKey: number;
};
const TweetCard = forwardRef(
	({ tweet, cacheKey }: Props, ref: ForwardedRef<HTMLDivElement>) => {
		return (
			<Card
				ref={ref}
				sx={{
					border: "1px solid hsl(0, 0%, 15%)",
					"&.MuiPaper-root": {
						backgroundImage: "none",
						bgcolor: "tweet.bg",
					},
					mb: "1rem",
				}}
			>
				<TweetHeader owner={tweet.owner} createdAt={tweet.createdAt} />

				<Box
					sx={{
						ml: { xs: 0, ss: "3.3rem", sm: "3.5rem" },
						p: "0.5rem",
					}}
				>
					<TweetBody tweet={tweet} />

					<TweetActions cacheKey={cacheKey} tweet={tweet} />
				</Box>
			</Card>
		);
	}
);
const MemorizedTweetCard = memo(TweetCard);
export default MemorizedTweetCard;

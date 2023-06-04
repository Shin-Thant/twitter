import {
	Avatar,
	Box,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Typography,
} from "@mui/material";
import { ForwardedRef, forwardRef, memo } from "react";
import { Link } from "react-router-dom";
import getRelativeTime from "../../helpers/getRelativeTime";
import TweetActions from "./TweetActions";
import TweetHeader from "./TweetHeader";
import { Tweet } from "../../features/tweet/type";

// TODO: refactor card body

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

				<CardContent sx={{ ml: { xs: 0, ss: "3.3rem", sm: "3.5rem" } }}>
					<Typography sx={{ mb: "0.5rem" }}>{tweet.body}</Typography>

					{tweet.type === "share" && (
						<Card variant="outlined" sx={{ p: "1rem" }}>
							<CardHeader
								avatar={
									<Link className="router_link" to="/">
										{!tweet.origin.owner.avatar ? (
											<Avatar
												sx={{
													width: 30,
													height: 30,
													objectFit: "cover",
													fontSize: "0.9rem",
												}}
											>
												{tweet.origin.owner.name[0]}
											</Avatar>
										) : (
											<Avatar
												sx={{
													width: 30,
													height: 30,
													objectFit: "cover",
													fontSize: "0.9rem",
												}}
												src={tweet.origin.owner.avatar}
												alt={`${tweet.origin.owner.avatar}-profile-picture`}
											/>
										)}
									</Link>
								}
								title={
									<Box
										sx={{
											display: "flex",
											alignItems: "center",
											gap: "0.6rem",
										}}
									>
										<Typography
											component="h1"
											variant="body2"
											sx={{ fontWeight: "600" }}
										>
											<Link
												className="router_link"
												to="/"
											>
												{tweet.origin.owner.name}
											</Link>
										</Typography>
										<Typography
											color="text.secondary"
											fontSize={"0.8rem"}
										>
											&bull;
										</Typography>
										<Typography
											component="p"
											variant="body2"
											color="text.secondary"
											sx={{
												display: "inline-block",
											}}
										>
											{getRelativeTime({
												inputDate: new Date(
													tweet.origin.createdAt
												),
											})}
										</Typography>
									</Box>
								}
								subheader={
									<Typography
										color="text.secondary"
										variant="body2"
									>
										<Link className="router_link" to="/">
											@{tweet.origin.owner.username}
										</Link>{" "}
									</Typography>
								}
								sx={{
									p: "0",
									mb: "0.5rem",
								}}
							/>
							<CardActions sx={{ ml: { xs: 0, ss: "2.5rem" } }}>
								<Typography
									variant="body2"
									sx={{
										color: "text.secondary",
										fontWeight: 500,
									}}
								>
									{tweet.origin.body}
								</Typography>
							</CardActions>
						</Card>
					)}
				</CardContent>

				<TweetActions cacheKey={cacheKey} tweet={tweet} />
			</Card>
		);
	}
);
const MemorizedTweetCard = memo(TweetCard);
export default MemorizedTweetCard;

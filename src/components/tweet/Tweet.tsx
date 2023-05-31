import {
	Avatar,
	Card,
	CardContent,
	CardHeader,
	Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Tweet } from "../../features/tweet/tweetApiSlice";
import getRelativeTime from "../../helpers/getRelativeTime";

type Props = {
	tweet: Tweet;
};
export default function TweetCard({ tweet }: Props) {
	return (
		<Card
			sx={{
				border: "1px solid hsl(0, 0%, 15%)",
				"&.MuiPaper-root": {
					backgroundImage: "none",
					bgcolor: "bg.navbar",
				},
				mb: "1rem",
			}}
		>
			<CardHeader
				avatar={
					<Link className="router_link" to="/">
						{!tweet.owner.avatar ? (
							<Avatar>{tweet.owner.name[0]}</Avatar>
						) : (
							<Avatar
								src={tweet.owner.avatar}
								alt={`${tweet.owner.avatar}-profile-picture`}
							/>
						)}
					</Link>
				}
				title={
					<Typography component="h1">
						<Link className="router_link" to="/">
							{tweet.owner.name}
						</Link>
						<Typography
							component="p"
							color="text.secondary"
							sx={{
								ml: "0.5rem",
								display: "inline-block",
							}}
						>
							{getRelativeTime({
								inputDate: new Date(tweet.createdAt),
							})}
						</Typography>
					</Typography>
				}
			/>
			<CardContent>
				<Typography>{tweet.body}</Typography>
				<Typography>{new Date(tweet.createdAt).toString()}</Typography>
			</CardContent>
		</Card>
	);
}

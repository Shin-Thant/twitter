import {
	Card,
	CardActionArea,
	CardContent,
	CardHeader,
	Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { SharedTweet } from "../../features/tweet/tweetTypes";
import TweetAvatar from "./header/TweetAvatar";
import TweetSubTitle from "./header/TweetSubTitle";
import TweetTitle from "./header/TweetTitle";
import { MouseEventHandler } from "react";
import TweetImageList from "../lists/TweetImageList";
import { useNavigate } from "react-router-dom";

// TODO: use the created tweet header component instead of card header

type ButtonEventHandler = MouseEventHandler<HTMLButtonElement>;

type Props = {
	origin: SharedTweet["origin"];
};

const NestedTweet = ({ origin }: Props) => {
	const navigate = useNavigate();

	const onNavigate: ButtonEventHandler = (e) => {
		e.preventDefault();
		e.stopPropagation();

		navigate(`/tweet/${origin._id}`);
	};

	const stopMouseDownPropagation: ButtonEventHandler = (e) => {
		e.stopPropagation();
	};

	return (
		<Card
			variant="outlined"
			sx={{
				bgcolor: "tweet.bg",
				border: "1px solid",
				borderColor: "tweet.borderColor",
				borderRadius: "8px",
			}}
		>
			<CardActionArea
				onMouseDown={stopMouseDownPropagation}
				onClick={onNavigate}
				sx={{
					p: 1.5,
					"& .MuiCardActionArea-focusHighlight": {
						bgcolor: "transparent",
					},
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
					subheader={
						<TweetSubTitle username={origin.owner.username} />
					}
					sx={{
						p: "0",
					}}
				/>

				<CardContent
					sx={{
						px: 0,
						ml: { xs: 0, ss: 4.5 },
					}}
				>
					{origin.body && (
						<Typography
							sx={{
								fontWeight: 400,
								mb: origin.images.length ? 1 : 0,
							}}
							className="auto_line--tweet_origin"
						>
							{origin.body}
						</Typography>
					)}

					{!!origin.images?.length && (
						<TweetImageList
							images={origin.images}
							tweetId={origin._id}
							rowHeight={80}
						/>
					)}
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default NestedTweet;

import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import moment from "moment";
import { Owner } from "../../../features/tweet/tweetTypes";

function getRelativeTime({ date }: { date: string }) {
	return moment(date).fromNow();
}

type Props = {
	owner: Owner;
	createdAt: string;
};
const TweetTitle = ({ owner, createdAt }: Props) => {
	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				gap: 1.2,
			}}
		>
			<Link to="/" className="router_link auto_line">
				<Typography
					component="h1"
					sx={{
						cursor: "pointer",
						fontWeight: "600",
						fontSize: "0.95rem",
					}}
					title={owner.name}
				>
					{owner.name}
				</Typography>
			</Link>

			<Typography color="text.secondary" fontSize={"0.8rem"}>
				&bull;
			</Typography>
			<Typography
				component="p"
				variant="body2"
				color="text.secondary"
				sx={{
					minWidth: "max-content",
					display: "inline-block",
				}}
			>
				{getRelativeTime({ date: createdAt })}
			</Typography>
		</Box>
	);
};

export default TweetTitle;

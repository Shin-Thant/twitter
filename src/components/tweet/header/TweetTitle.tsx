import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Owner } from "../../../features/tweet/tweetTypes";
import getRelativeTime from "../../../helpers/getRelativeTime";

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
			<Typography
				component="h1"
				sx={{
					fontWeight: "600",
					fontSize: "0.95rem",
				}}
				title={owner.name}
			>
				<Link className="router_link auto_line" to="/">
					{owner.name}
				</Link>
			</Typography>
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
				{getRelativeTime({
					inputDate: new Date(createdAt),
				})}
			</Typography>
		</Box>
	);
};

export default TweetTitle;

import { Box, Typography } from "@mui/material";
import { Owner } from "../../../features/tweet/tweetTypes";
import getRelativeTime from "../../../helpers/getRelativeTime";
import { MouseEventHandler } from "react";

type Props = {
	owner: Owner;
	createdAt: string;
};
const TweetTitle = ({ owner, createdAt }: Props) => {
	const onProfileNavigate: MouseEventHandler<HTMLSpanElement> = (e) => {
		e.stopPropagation();
		e.preventDefault();
		// navigate to user
	};

	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				gap: 1.2,
			}}
		>
			<Typography
				onClick={onProfileNavigate}
				component="h1"
				className="auto_line"
				sx={{
					cursor: "pointer",
					fontWeight: "600",
					fontSize: "0.95rem",
				}}
				title={owner.name}
			>
				{owner.name}
			</Typography>
			<Typography color="text.secondary" fontSize={"0.8rem"}>
				&bull;
			</Typography>
			<Typography
				component="p"
				variant="body2"
				color="text.secondary"
				sx={{
					cursor: "default",
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

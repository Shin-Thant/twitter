import { Box, Typography } from "@mui/material";
import { Owner } from "../../../features/tweet/tweetTypes";
import getRelativeTime from "../../../util/getRelativeTime";
import { MouseEventHandler } from "react";
import { Link } from "react-router-dom";

type Props = {
	owner: Owner;
	createdAt: string;
};
const TweetTitle = ({ owner, createdAt }: Props) => {
	const stopMouseDownPropagation: MouseEventHandler<HTMLAnchorElement> = (
		e
	) => {
		e.stopPropagation();
		e.preventDefault();
	};

	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				gap: 1.2,
			}}
		>
			<Link
				to="/"
				onMouseDown={stopMouseDownPropagation}
				className="router_link auto_line"
			>
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

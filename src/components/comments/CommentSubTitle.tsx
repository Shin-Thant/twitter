import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

type Props = {
	replyTo: string;
};

const CommentSubTitle = ({ replyTo }: Props) => {
	return (
		<Typography
			className="auto_line"
			sx={{ width: "max-content", cursor: "pointer" }}
			color="text.secondary"
			variant="body2"
		>
			Replying to{" "}
			<Typography
				color={"primary"}
				component={"span"}
				sx={{
					fontWeight: 500,
					fontSize: "inherit",
				}}
			>
				<Link to="/" className="router_link w-max">
					@{replyTo}
				</Link>
			</Typography>
		</Typography>
	);
};

export default CommentSubTitle;

import Typography from "@mui/material/Typography";
import { MouseEventHandler } from "react";

type Props = {
	username: string;
};

const TweetSubTitle = ({ username }: Props) => {
	const onProfileNavigate: MouseEventHandler<HTMLSpanElement> = (e) => {
		e.stopPropagation();
		e.preventDefault();
		// navigate to user
	};

	return (
		<Typography
			onClick={onProfileNavigate}
			className="auto_line"
			sx={{ width: "max-content", cursor: "pointer" }}
			color="text.secondary"
			variant="body2"
		>
			@{username}
		</Typography>
	);
};

export default TweetSubTitle;

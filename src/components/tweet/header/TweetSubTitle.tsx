import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

type Props = {
	username: string;
};
const TweetSubTitle = ({ username }: Props) => {
	return (
		<Typography
			sx={{ width: "max-content" }}
			color="text.secondary"
			variant="body2"
		>
			<Link className="router_link auto_line" to="/">
				@{username}
			</Link>
		</Typography>
	);
};

export default TweetSubTitle;

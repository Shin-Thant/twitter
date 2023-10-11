import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

type Props = {
	text: string;
};

const TweetSubTitle = ({ text }: Props) => {
	return (
		<Link to="/" className="router_link auto_line w-max">
			<Typography
				className="auto_line"
				sx={{ width: "max-content", cursor: "pointer" }}
				color="text.secondary"
				variant="body2"
			>
				{text}
			</Typography>
		</Link>
	);
};

export default TweetSubTitle;

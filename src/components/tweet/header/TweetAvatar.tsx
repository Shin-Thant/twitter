import { Avatar } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";
import { Link } from "react-router-dom";

type Props = {
	avatar: string | undefined;
	name: string;
	sx?: SxProps<Theme>;
};
const TweetAvatar = ({ avatar, name, sx }: Props) => {
	return (
		<Link className="router_link" to="/">
			{!avatar ? (
				<Avatar sx={sx}>{name[0]}</Avatar>
			) : (
				<Avatar
					sx={{ ...sx, bgcolor: "none" }}
					src={avatar}
					alt={`${avatar}-profile-picture`}
					imgProps={{ loading: "lazy" }}
				/>
			)}
		</Link>
	);
};

export default TweetAvatar;

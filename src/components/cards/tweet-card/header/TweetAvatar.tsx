import { Avatar } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";
import { MouseEventHandler } from "react";
import { Link } from "react-router-dom";

type Props = {
	avatar: string | undefined;
	name: string;
	sx?: SxProps<Theme>;
};
const TweetAvatar = ({ avatar, name, sx }: Props) => {
	const stopMouseDownPropagation: MouseEventHandler<HTMLAnchorElement> = (
		e
	) => {
		e.stopPropagation();
		e.preventDefault();
		// navigate to user
	};

	return (
		<>
			<Link
				to="/"
				onMouseDown={stopMouseDownPropagation}
				className="router_link"
			>
				{!avatar ? (
					<Avatar sx={{ ...sx }}>{name[0]}</Avatar>
				) : (
					<Avatar
						sx={{
							...sx,
							bgcolor: "none",
						}}
						src={avatar}
						alt={`${avatar}-profile-picture`}
						imgProps={{ loading: "lazy" }}
					/>
				)}
			</Link>
		</>
	);
};

export default TweetAvatar;

import { Avatar } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";
import { MouseEventHandler } from "react";

type Props = {
	avatar: string | undefined;
	name: string;
	sx?: SxProps<Theme>;
};
const TweetAvatar = ({ avatar, name, sx }: Props) => {
	const onProfileNavigate: MouseEventHandler<HTMLDivElement> = (e) => {
		e.stopPropagation();
		e.preventDefault();
		// navigate to user
	};

	return (
		<>
			{!avatar ? (
				<Avatar
					onMouseDown={(e) => e.stopPropagation()}
					onClick={onProfileNavigate}
					sx={{ ...sx, cursor: "pointer" }}
				>
					{name[0]}
				</Avatar>
			) : (
				<Avatar
					onMouseDown={(e) => e.stopPropagation()}
					onClick={onProfileNavigate}
					sx={{
						...sx,
						bgcolor: "none",
						cursor: "pointer",
					}}
					src={avatar}
					alt={`${avatar}-profile-picture`}
					imgProps={{ loading: "lazy" }}
				/>
			)}
		</>
	);
};

export default TweetAvatar;

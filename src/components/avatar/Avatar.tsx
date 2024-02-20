import { Avatar as MuiAvatar, SxProps, Theme } from "@mui/material";

type Props = {
	src?: string;
	alt?: string;
	text: string;
	sx?: SxProps<Theme>;
};

export const Avatar = ({ src, alt, text, sx }: Props) => {
	return (
		<>
			{!src ? (
				<MuiAvatar sx={sx}>{text}</MuiAvatar>
			) : (
				<MuiAvatar sx={sx} src={src} alt={alt} />
			)}
		</>
	);
};

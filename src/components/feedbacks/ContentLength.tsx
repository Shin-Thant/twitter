import { Typography, TypographyProps } from "@mui/material";
import { grey, red } from "@mui/material/colors";
import { SxProps, Theme } from "@mui/material/styles";

interface Props extends TypographyProps {
	errorMessage: string | undefined;
	currentLength: number;
	limit: number;
	sx?: SxProps<Theme>;
}

const ContentLength = ({
	errorMessage,
	currentLength,
	limit,
	sx,
	variant,
}: Props) => {
	return (
		<Typography
			variant={variant ?? "body2"}
			sx={{
				minWidth: "max-content",
				color: errorMessage ? red[500] : grey[600],
				fontWeight: 500,
				...sx,
			}}
		>
			{currentLength} / {limit}
		</Typography>
	);
};

export default ContentLength;

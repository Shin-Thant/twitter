import { Box, Typography } from "@mui/material";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import { type BoxProps } from "@mui/material/Box";

interface Props {
	message: string;
	sx?: BoxProps;
}

export default function FieldError({ message, sx }: Props) {
	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				gap: "0.3rem",
				mt: "0.5rem",
				...sx,
			}}
		>
			<ErrorRoundedIcon fontSize="small" color="error" />
			<Typography
				color="error"
				sx={{ display: "inline-block", fontSize: "0.95rem" }}
			>
				{message}
			</Typography>
		</Box>
	);
}

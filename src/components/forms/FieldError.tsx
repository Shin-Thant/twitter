import { Box, Typography } from "@mui/material";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";

type Props = {
	message: string;
};

export default function FieldError({ message }: Props) {
	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				gap: "0.3rem",
				mt: "0.5rem",
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

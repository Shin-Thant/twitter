import { Box, InputBase, Typography } from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import { ReactNode } from "react";

export const StyledForm = styled("form")(() => ({
	display: "block",
}));

export const FieldContainer = styled(Box)(({ theme }) => ({
	marginBottom: theme.spacing(3),
}));

export const StyledInputBase = styled(InputBase)(() => ({
	display: "grid",
	padding: "0.3rem 0.8rem",
	border: "2px solid",
	borderRadius: "6px",
	borderColor: grey[500],
	"&:focus-within": {
		borderColor: blue[600],
	},
}));

type LabelProps = { htmlFor: string; sx?: object; children: ReactNode };
export const Label = ({ htmlFor, sx, children }: LabelProps) => {
	return (
		<Typography
			color="text.primary"
			component={"label"}
			variant="body1"
			fontWeight="400"
			htmlFor={htmlFor}
			sx={sx}
		>
			{children}
		</Typography>
	);
};

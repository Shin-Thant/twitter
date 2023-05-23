import { ReactNode } from "react";
import { styled } from "@mui/material/styles";
import { grey, blue } from "@mui/material/colors";
import { Button, InputBase, Typography } from "@mui/material";

export const StyledForm = styled("form")(() => ({
	display: "block",
}));

export const StyledInputBase = styled(InputBase)(() => ({
	display: "grid",
	padding: "0.3rem 0.8rem",
	marginBottom: "1.3rem",
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

type BtnProps = { isLoading: boolean; children: ReactNode };
export const SubmitButton = ({ isLoading, children }: BtnProps) => {
	return (
		<Button
			type="submit"
			disabled={isLoading}
			sx={{
				width: "100%",
				mt: "0.3rem",
				borderRadius: "5px",
				textTransform: "none",
				fontSize: "1rem",
				pointerEvents: isLoading ? "none" : "all",
				bgcolor: isLoading ? grey[500] : blue[500],
				":hover, :focus": {
					bgcolor: isLoading ? grey[500] : blue[500],
				},
			}}
			variant="contained"
		>
			{children}
		</Button>
	);
};

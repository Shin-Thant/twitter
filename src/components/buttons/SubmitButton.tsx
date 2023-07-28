import { Button, ButtonProps } from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import { ReactNode } from "react";

interface Props extends ButtonProps {
	isLoading: boolean;
	isDisabled?: boolean;
	children: ReactNode;
}

export default function SubmitButton({
	isLoading,
	isDisabled,
	children,
	variant,
	fullWidth,
	sx,
}: Props) {
	return (
		<Button
			fullWidth={fullWidth ?? false}
			type="submit"
			disabled={isLoading || isDisabled}
			sx={{
				borderRadius: "5px",
				textTransform: "none",
				pointerEvents: isLoading ? "none" : "all",
				bgcolor: isLoading ? grey[500] : blue[500],
				":hover, :focus": {
					bgcolor: isLoading ? grey[500] : blue[500],
				},
				...sx,
			}}
			variant={variant ?? "contained"}
		>
			{children}
		</Button>
	);
}

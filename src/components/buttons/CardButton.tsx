import { Button, SxProps, Theme, Typography } from "@mui/material";
import { blue, green, grey, red } from "@mui/material/colors";
import { ReactNode } from "react";

type Props = {
	type: "like" | "comment" | "share";
	label: string | number;
	isCompleted: boolean;
	handleClick: () => void;
	isLoading?: boolean;
	children: ReactNode;
};
const CardButton = ({
	type,
	label,
	isLoading,
	isCompleted,
	children,
	handleClick,
}: Props) => {
	return (
		<Button
			color="error"
			disabled={isLoading}
			onClick={handleClick}
			disableFocusRipple
			sx={{
				...styles,
				color: isCompleted ? colorStyles[type].color : grey[600],
				"&:hover": colorStyles[type].actionStyle,
				"&:focus": colorStyles[type].actionStyle,
			}}
			title={type}
		>
			{children}
			<Typography
				component="p"
				variant="body2"
				sx={{ ml: "0.1rem", fontWeight: 500 }}
			>
				{label}
			</Typography>
		</Button>
	);
};

const styles: SxProps<Theme> = {
	display: "flex",
	alignItems: "center",
	gap: "0.3rem",
	p: "0.4rem 0.8rem",
	borderRadius: "5px",
	transition: "all 250ms ease",

	"&:disabled": {
		opacity: 0.5,
	},
};

const colorStyles = {
	like: {
		color: red[500],
		actionStyle: { color: red[500], bgcolor: "hsl(0, 100%, 63%, 0.1)" },
	},
	comment: {
		color: blue[500],
		actionStyle: { color: blue[500], bgcolor: "hsl(230, 100%, 63%, 0.1)" },
	},
	share: {
		color: green[500],
		actionStyle: {
			color: green[500],
			bgcolor: "hsl(130, 100%, 63%, 0.1)",
		},
	},
} as const;

export default CardButton;

import { ButtonBase, Typography } from "@mui/material";
import { blue, green, grey, red } from "@mui/material/colors";
import { ReactNode } from "react";

type Props = {
	type: "like" | "comment" | "share";
	label: string | number;
	isLoading: boolean;
	isCompleted: boolean;
	handleClick: () => void;
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
		<ButtonBase
			disabled={isLoading}
			onClick={handleClick}
			sx={{
				...styles,
				color: isCompleted ? colors[type].color : grey[600],
				"&:hover": colors[type].hoverColors,
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
		</ButtonBase>
	);
};

const styles = {
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

const colors = {
	like: {
		color: red[500],
		hoverColors: { color: red[500], bgcolor: "hsl(0, 100%, 63%, 0.05)" },
	},
	comment: {
		color: blue[500],
		hoverColors: { color: blue[500], bgcolor: "hsl(230, 100%, 63%, 0.05)" },
	},
	share: {
		color: green[500],
		hoverColors: {
			color: green[500],
			bgcolor: "hsl(130, 100%, 63%, 0.05)",
		},
	},
} as const;

export default CardButton;

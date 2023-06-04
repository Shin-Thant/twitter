import { ButtonBase, Typography } from "@mui/material";
import { red, blue, green, grey } from "@mui/material/colors";
import React, { ReactNode } from "react";

const colors = {
	like: {
		color: red[500],
		hoverColors: { color: red[500], bgcolor: "hsl(0, 100%, 63%, 0.1)" },
	},
	comment: {
		color: blue[500],
		hoverColors: { color: blue[500], bgcolor: "hsl(230, 100%, 63%, 0.1)" },
	},
	share: {
		color: green[500],
		hoverColors: { color: green[500], bgcolor: "hsl(230, 100%, 63%, 0.1)" },
	},
} as const;

type Props = {
	isCompleted: boolean;
	type: "like" | "comment" | "share";
	label: string | number;
	handleClick: () => void;
	children: ReactNode;
};
const CardButton = ({
	type,
	isCompleted,
	label,
	handleClick,
	children,
}: Props) => {
	return (
		<ButtonBase
			onClick={handleClick}
			sx={{
				display: "flex",
				alignItems: "center",
				gap: "0.3rem",
				p: "0.4rem 0.8rem",
				borderRadius: "5px",
				color: isCompleted ? colors[type].color : grey[500],
				"&:hover": colors[type].hoverColors,
				transition: "all 250ms ease",
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

export default CardButton;

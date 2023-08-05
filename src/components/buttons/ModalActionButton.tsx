import { Button, ButtonProps, SxProps, Theme } from "@mui/material";

interface Props extends ButtonProps {
	isLoading: boolean;
	type: "button" | "submit";
	sx?: SxProps<Theme>;
	children: string;
	setGreyStyles?: boolean;
}

const ModalActionButton = ({
	type,
	disabled,
	isLoading,
	sx,
	children,
	setGreyStyles,
	...props
}: Props) => {
	return (
		<Button
			type={type}
			disabled={disabled || isLoading}
			variant="outlined"
			sx={{
				width: "max-content",
				minWidth: 88,
				borderRadius: "50px",
				textTransform: "none",

				...(setGreyStyles && greyBtnStyles),
				...sx,
			}}
			{...props}
		>
			{children}
		</Button>
	);
};

const greyBtnStyles = {
	borderColor: "btn.grey.normal",
	color: "btn.grey.normal",
	"&:hover": {
		borderColor: "btn.grey.hover",
		color: "btn.grey.hover",
	},
};

export default ModalActionButton;

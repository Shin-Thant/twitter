import { Box } from "@mui/material";
import MuiModal from "@mui/material/Modal/Modal";
import { ReactNode, ReactElement } from "react";

type Props = {
	isOpen: boolean;
	onClose: () => void;
	isCustom?: boolean;
	children: ReactNode | ReactElement;
};
export default function Modal({ isOpen, isCustom, onClose, children }: Props) {
	return (
		<MuiModal
			open={isOpen}
			onClose={onClose}
			disableAutoFocus
			disableEnforceFocus
		>
			<>{isCustom ? children : <Box sx={style}>{children}</Box>}</>
		</MuiModal>
	);
}

const style = {
	position: "absolute",
	top: { xs: "100%", normal_sm: "50%" },
	left: "50%",
	transform: {
		xs: "translate(-50%, -100%)",
		normal_sm: "translate(-50%, -50%)",
	},
	width: { xs: "100%", normal_sm: 350, sm: 400 },
	bgcolor: "bg.navbar",
	boxShadow: 24,
	p: { xs: 2, normal_sm: 4 },
	color: "text.primary",
	borderRadius: { xs: "10px 10px 0 0", normal_sm: "10px" },
};

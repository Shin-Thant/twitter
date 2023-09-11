import { Box, SxProps, Theme } from "@mui/material";
import MuiModal from "@mui/material/Modal/Modal";
import { ReactNode, ReactElement } from "react";
import ModalHeader from "./ModalHeader";

type Props = {
	title?: string | ReactNode;
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode | ReactElement;
	modalStyle?: SxProps<Theme>;
};

export default function Modal({
	title,
	isOpen,
	onClose,
	children,
	modalStyle,
}: Props) {
	return (
		<MuiModal
			open={isOpen}
			onClose={onClose}
			disableAutoFocus
			disableEnforceFocus
		>
			<Box
				sx={{
					position: "absolute",
					top: { xs: "100%", ss: "50%" },
					left: "50%",
					width: { xs: "100%", ss: 450, sm: 500 },
					minHeight: 230,
					transform: {
						xs: "translate(-50%, -100%)",
						ss: "translate(-50%, -50%)",
					},
					bgcolor: "bg.navbar",
					boxShadow: 24,
					p: { xs: 2, ss: 4 },
					color: "text.primary",
					borderRadius: { xs: "12px 12px 0 0", ss: "12px" },
					...modalStyle,
				}}
			>
				{!!title && <ModalHeader title={title} closeModal={onClose} />}
				{children}
			</Box>
		</MuiModal>
	);
}

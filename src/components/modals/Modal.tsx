import { Box } from "@mui/material";
import MuiModal from "@mui/material/Modal/Modal";
import { ReactNode, ReactElement } from "react";
import ModalHeader from "./ModalHeader";

type Props = {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode | ReactElement;
} & ({ isCustom: true; title?: string } | { isCustom?: false; title: string });

export default function Modal({
	title,
	isOpen,
	isCustom,
	onClose,
	children,
}: Props) {
	return (
		<MuiModal
			open={isOpen}
			onClose={onClose}
			disableAutoFocus
			disableEnforceFocus
		>
			<>
				{isCustom ? (
					children
				) : (
					<Box sx={style}>
						<ModalHeader title={title} closeModal={onClose} />{" "}
						{children}
					</Box>
				)}
			</>
		</MuiModal>
	);
}

const style = {
	position: "absolute",
	top: { xs: "100%", ss: "50%" },
	left: "50%",
	transform: {
		xs: "translate(-50%, -100%)",
		ss: "translate(-50%, -50%)",
	},
	width: { xs: "100%", ss: 400 },
	bgcolor: "bg.navbar",
	boxShadow: 24,
	p: { xs: 2, ss: 4 },
	color: "text.primary",
	borderRadius: { xs: "10px 10px 0 0", ss: "10px" },
};

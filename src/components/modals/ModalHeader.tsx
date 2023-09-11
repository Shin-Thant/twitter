import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";
import ModalCloseButton from "../buttons/ModalCloseButton";

// TODO: refactor with component composition

type Props = {
	title: string | ReactNode;
	closeModal: () => void;
};

const ModalHeader = ({ title, closeModal }: Props) => {
	return (
		<Box
			mb={3}
			sx={{
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
			}}
		>
			<Typography
				component={"h1"}
				sx={{ fontSize: { xs: "1.2rem", ss: "1.1rem" } }}
			>
				{title}
			</Typography>
			<ModalCloseButton onClose={closeModal} />
		</Box>
	);
};

export default ModalHeader;

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Box, IconButton, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

type Props = {
	title: string;
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
			<Typography variant="h6">{title}</Typography>
			<IconButton
				onClick={closeModal}
				size="small"
				sx={{
					color: grey[700],
					transition: "color 200ms ease",
					"&:hover": {
						color: grey[300],
					},
				}}
			>
				<CloseRoundedIcon />
			</IconButton>
		</Box>
	);
};

export default ModalHeader;

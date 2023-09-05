import PhotoOutlinedIcon from "@mui/icons-material/PhotoOutlined";
import { Box, IconButton, Typography } from "@mui/material";

type Props = {
	disabled: boolean;
	onClick: () => void;
	currentImageCount: number;
	totalImageCount: number;
};

const TweetImageUploadButton = ({
	disabled,
	currentImageCount,
	totalImageCount,
	onClick,
}: Props) => {
	return (
		<Box>
			<IconButton
				disabled={disabled}
				onClick={onClick}
				color="primary"
				size="small"
			>
				<PhotoOutlinedIcon />
			</IconButton>
			<Typography variant="caption" component={"span"}>
				{currentImageCount} / {totalImageCount}
			</Typography>
		</Box>
	);
};

export default TweetImageUploadButton;

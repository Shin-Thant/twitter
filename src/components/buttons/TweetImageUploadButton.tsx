import PhotoOutlinedIcon from "@mui/icons-material/PhotoOutlined";
import { Box, IconButton, Typography } from "@mui/material";

type Props = {
	disabled: boolean;
	uploadImage: () => void;
	currentImageCount: number;
	totalImageCount: number;
};

const TweetImageUploadButton = ({
	disabled,
	currentImageCount,
	totalImageCount,
	uploadImage,
}: Props) => {
	return (
		<Box>
			<IconButton
				disabled={disabled}
				onClick={uploadImage}
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

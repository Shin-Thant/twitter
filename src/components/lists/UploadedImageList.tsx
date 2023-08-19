import DeleteIcon from "@mui/icons-material/Delete";
import {
	IconButton,
	ImageList,
	ImageListItem,
	ImageListItemBar,
	styled,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { ImageListType } from "react-images-uploading";

type Props = {
	images: ImageListType;
	updateImage: (index: number) => void;
	removeImage: (index: number) => void;
};

const UploadedImageList = ({ images, updateImage, removeImage }: Props) => {
	const onImageUpdate = (index: number) => {
		updateImage(index);
	};

	const onImageRemove = (index: number) => {
		removeImage(index);
	};

	return (
		<ImageList>
			{images.map((item, index) => (
				<ImageListItem
					key={`${item.dataURL}-${item.file?.name}-${index}`}
					sx={{
						border: "1.5px solid",
						borderColor: grey[800],
						borderRadius: "7px",
						overflow: "hidden",
					}}
				>
					<Image
						onClick={() => onImageUpdate(index)}
						src={item.dataURL}
						alt=""
					/>

					<ImageListItemBar
						sx={{
							bgcolor: "transparent",
							pointerEvents: "none",
						}}
						position="bottom"
						actionIcon={
							<IconButton
								onClick={() => onImageRemove(index)}
								sx={{
									bgcolor: "hsl(0, 0%, 0%, 0.7)",
									pointerEvents: "all",
									"&:hover": {
										bgcolor: "hsl(0, 0%, 0%, 0.8)",
									},
								}}
							>
								<DeleteIcon fontSize="small" />
							</IconButton>
						}
					/>
				</ImageListItem>
			))}
		</ImageList>
	);
};

const Image = styled("img")(() => ({
	cursor: "pointer",
	width: "100%",
	height: "120px",
	objectFit: "cover",
	borderRadius: "5px",
	"&:hover": {
		transform: "scale(1.1)",
	},
	transition: "transform 220ms ease",
}));

export default UploadedImageList;

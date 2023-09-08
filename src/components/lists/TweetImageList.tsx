import { ImageList, ImageListItem, styled } from "@mui/material";

// TODO: refactor <img />
// TODO: show skeleton during loading

type Props = {
	images: string[];
};

const TweetImageList = ({ images }: Props) => {
	return (
		<ImageList cols={2} rowHeight={120}>
			{images.map((image, index) => (
				<ImageListItem
					key={image}
					cols={getColumnCountFor({
						totalImages: images.length,
						imageIndex: index,
					})}
					rows={getRowCountFor({
						totalImages: images.length,
					})}
					sx={{
						overflow: "hidden",
						borderRadius: "8px",
					}}
				>
					<Image
						src={`http://localhost:3500/api/v1/photos/${image}`}
						alt={`Tweet image ${image}`}
						loading="lazy"
					/>
				</ImageListItem>
			))}
		</ImageList>
	);
};

const Image = styled("img")(({ theme }) => ({
	borderRadius: "10px",
	width: "100%",
	height: "100%",
	objectFit: "cover",
	backgroundColor: theme.palette.tweet.imageBg,
}));

export default TweetImageList;

function getColumnCountFor({
	totalImages,
	imageIndex,
}: {
	totalImages: number;
	imageIndex: number;
}): number {
	if (totalImages === 1) {
		return 2;
	}
	if (totalImages === 3 && imageIndex === 2) {
		return 2;
	}
	return 1;
}

function getRowCountFor({ totalImages }: { totalImages: number }) {
	if (totalImages === 1) {
		return 2;
	}
	if (totalImages === 2) {
		return 2;
	}
	return 1;
}

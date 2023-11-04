import { ImageList, ImageListItem, styled } from "@mui/material";
import { MouseEvent } from "react";
import { z } from "zod";
import { useImageModal } from "../../hooks/useImageModal";
import { showToast } from "../../lib/handleToast";
import { IMAGE_URL } from "../../config";

const IMAGE_NAME_REGEX = /^([0-9a-fA-F]{32})-([0-9]+)\.(png|jpeg|jpg)$/;

const imageUrlSchema = z.string().min(1).trim().regex(IMAGE_NAME_REGEX);

type Props = {
	tweetId: string;
	images: string[];
	rowHeight: number;
};

const TweetImageList = ({ tweetId, images, rowHeight }: Props) => {
	const { showModal } = useImageModal();

	const getOnImageClick = ({ imageUrl }: { imageUrl: string }) => {
		const onImageClick = (e: MouseEvent<HTMLLIElement>) => {
			e.stopPropagation();

			const { success } = imageUrlSchema.safeParse(imageUrl);
			if (!success) {
				showToast({ message: "Can't show image!", variant: "error" });
				return;
			}

			showModal({ imageUrl, ownerTweetId: tweetId });
		};
		return onImageClick;
	};

	return (
		<ImageList cols={2} rowHeight={rowHeight}>
			{images.map((image, index) => (
				<ImageListItem
					key={image}
					onClick={getOnImageClick({ imageUrl: image })}
					cols={getColumnCountFor({
						totalImages: images.length,
					})}
					rows={getRowCountFor({
						totalImages: images.length,
						imageIndex: index,
					})}
					sx={{
						overflow: "hidden",
						borderRadius: "8px",
						cursor: "pointer",
					}}
				>
					<Image
						src={`${IMAGE_URL}/${image}`}
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

function getColumnCountFor({ totalImages }: { totalImages: number }): number {
	if (totalImages === 1) {
		return 2;
	}
	return 1;
}

function getRowCountFor({
	totalImages,
	imageIndex,
}: {
	totalImages: number;
	imageIndex: number;
}) {
	if (totalImages === 1) {
		return 2;
	}
	if (totalImages === 2) {
		return 2;
	}
	if (totalImages === 3 && imageIndex === 0) {
		return 2;
	}
	return 1;
}

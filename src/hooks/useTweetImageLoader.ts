import { ImageListType } from "react-images-uploading";
import useSWR from "swr";
import { createImageTypeListFor } from "../util/createImageTypeListFor";

type Props = {
	imageNames?: string[];
	loadImages(imageList: ImageListType): void;
};

const useTweetImageLoader = ({ imageNames, loadImages }: Props) => {
	return useSWR(
		!!imageNames && !!imageNames.length ? imageNames : null,
		async function (imageNames: string[]) {
			const result = await createImageTypeListFor({
				imageNames,
			});
			loadImages(result);
			return result;
		},
		{
			revalidateOnFocus: false,
			refreshInterval: 15 * 60 * 1000,
			errorRetryCount: 0,
		}
	);
};

export default useTweetImageLoader;

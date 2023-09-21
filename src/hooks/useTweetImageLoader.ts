import React from "react";
import { createImageTypeListFor } from "../util/createImageTypeListFor";
import useSWR from "swr";
import { ImageListType } from "react-images-uploading";

type Props = {
	imageNames?: string[];
	loadImages(imageList: ImageListType): void;
};

const useTweetImageLoader = ({ imageNames, loadImages }: Props) => {
	return useSWR(
		!!imageNames && !!imageNames.length ? imageNames : null,
		async function (imageNames: string[]) {
			// return new Promise((resolve) => {
			// 	setTimeout(async () => {
			// 		const result = await createImageTypeListFor({
			// 			imageNames,
			// 		});
			// 		loadImages(result);
			// 		resolve(result);
			// 	}, 3000);
			// });

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

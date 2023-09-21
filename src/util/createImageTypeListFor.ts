import { ImageListType } from "react-images-uploading";
import { convertIntoDataURL } from "./convertIntoDataURL";
import { getFileFor } from "./getFileFor";

export async function createImageTypeListFor({
	imageNames,
}: {
	imageNames: string[];
}): Promise<ImageListType> {
	const files = await getFilesFor({ imageNames });
	const dataURLs = await getDataURLsFor({ files });

	if (files.length !== imageNames.length) {
		throw new Error("Can't load some files!");
	}

	const result = getImageTypeList({ files, dataURLs });
	return result;
}

function getImageTypeList({
	files,
	dataURLs,
}: {
	files: File[];
	dataURLs: string[];
}): ImageListType {
	return files.map((_, index) => {
		return {
			dataURL: dataURLs[index],
			file: files[index],
		};
	});
}

async function getFilesFor({ imageNames }: { imageNames: string[] }) {
	const filePromises = imageNames.map(
		async (name) => await getFileFor({ name })
	);
	return await Promise.all(filePromises);
}

async function getDataURLsFor({ files }: { files: File[] }) {
	const dataURLPromises = files.map(
		async (file) => await convertIntoDataURL(file)
	);
	return await Promise.all(dataURLPromises);
}

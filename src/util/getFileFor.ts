import { IMAGE_URL } from "../app/config";

export async function getFileFor({ name }: { name: string }): Promise<File> {
	const imageBlob = await fetchImageAsBlob({
		imageURL: getImageUrl({ name }),
	});

	const file = createFile({
		imageBlob,
		name,
		type: getImageType({ imageName: name }),
	});
	return file;
}

async function fetchImageAsBlob({ imageURL }: { imageURL: string }) {
	const response = await fetch(imageURL);
	if (!response.ok) {
		throw new Error("Can't fetch image!");
	}
	return response.blob();
}

function createFile({
	imageBlob,
	name,
	type,
}: {
	imageBlob: Blob;
	name: string;
	type: string;
}) {
	return new File([imageBlob], name, {
		type: `image/${type}`,
	});
}

function getImageUrl({ name }: { name: string }) {
	return `${IMAGE_URL}/${name}`;
}

function getImageType({ imageName }: { imageName: string }) {
	return imageName.split(".")[1];
}

import { useState } from "react";
import { ImageListType, ImageUploadingPropsType } from "react-images-uploading";

const useImageInputHandler = () => {
	const [images, setImages] = useState<ImageListType>([]);

	const onImageInputChange: ImageUploadingPropsType["onChange"] = (
		imageList: ImageListType,
		_addUpdatedIndex?: number[] | undefined
	) => {
		setImages([...imageList]);
	};

	function removeAllImages() {
		setImages([]);
	}

	return {
		images,
		onImageInputChange,
		removeAllImages,
	};
};

export default useImageInputHandler;

import { useCallback, useState } from "react";
import { ImageListType, ImageUploadingPropsType } from "react-images-uploading";

const useImageInputHandler = () => {
	const [images, setImages] = useState<ImageListType>([]);

	const onImageInputChange: ImageUploadingPropsType["onChange"] = useCallback(
		(imageList: ImageListType, _addUpdatedIndex?: number[] | undefined) => {
			setImages([...imageList]);
		},
		[]
	);

	const loadImages = useCallback((imageList: ImageListType) => {
		if (!imageList.length) {
			return;
		}
		setImages([...imageList]);
	}, []);

	const removeAllImages = useCallback(() => {
		setImages([]);
	}, []);

	return {
		images,
		onImageInputChange,
		loadImages,
		removeAllImages,
	};
};

export default useImageInputHandler;

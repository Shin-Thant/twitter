import React, { ReactElement, useState } from "react";
import ReactImageUploading, {
	ErrorsType,
	ImageListType,
	ImageUploadingPropsType,
} from "react-images-uploading";
import { showToast } from "../../lib/handleToast";

const MAX_IMAGE_COUNT = 4 as const;
const ACCEPT_TYPES = ["jpg", "png", "jpeg"];
const MAX_FILE_SIZE_IN_BYTES = 150000 as const;
const UPLOAD_ERRORS: Record<keyof ErrorsType, string> = {
	acceptType: "Invalid image type!",
	maxFileSize: "Exceeded file size limit!",
	maxNumber: "Exceeded file count!",
};

type ImageHandlers = {
	images: ImageListType;
	onImageUpload: () => void;
	onImageRemove: (index: number) => void;
	onImageUpdate: (index: number) => void;
};

type Props = {
	setUploadedImages?: React.Dispatch<React.SetStateAction<File[]>>;
	render: (imageHandlers: ImageHandlers) => ReactElement;
};

const ImageInput = ({ setUploadedImages, render }: Props) => {
	const [images, setImages] = useState<ImageListType>([]);

	const onInputChange: ImageUploadingPropsType["onChange"] = (
		imageList: ImageListType,
		addUpdatedIndex?: number[] | undefined
	) => {
		if (setUploadedImages) {
			const files: File[] = [];
			imageList.forEach((item) => {
				if (item.file) files.push(item.file);
			});

			console.log("setting", files);
			setUploadedImages(files);
		}
		console.log({ imageList, addUpdatedIndex });
		setImages([...imageList]);
	};

	const onError: ImageUploadingPropsType["onError"] = (errors) => {
		const errorMessage = getErrorMessage(errors);

		if (errorMessage) {
			showToast({ message: errorMessage, variant: "error" });
		}
	};

	const getErrorMessage = (errors: ErrorsType) => {
		if (!errors) {
			return "Something weng wrong!";
		}
		const errorTypes = Object.keys(errors) as keyof ErrorsType;
		return UPLOAD_ERRORS[errorTypes];
	};

	return (
		<ReactImageUploading
			multiple
			value={images}
			onChange={onInputChange}
			maxFileSize={MAX_FILE_SIZE_IN_BYTES}
			maxNumber={MAX_IMAGE_COUNT}
			acceptType={ACCEPT_TYPES}
			dataURLKey="dataURL"
			onError={onError}
		>
			{({ onImageUpload, onImageRemove, onImageUpdate, imageList }) => (
				<>
					{render({
						images: imageList,
						onImageUpload,
						onImageRemove,
						onImageUpdate,
					})}
				</>
			)}
		</ReactImageUploading>
	);
};

export default ImageInput;

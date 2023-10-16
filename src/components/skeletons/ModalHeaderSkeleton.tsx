import { Skeleton, SxProps, Theme } from "@mui/material";

type Props = {
	width: number;
	height?: number;
	sx?: SxProps<Theme>;
};

const ModalHeaderSkeleton = ({ width, height, sx }: Props) => {
	return (
		<Skeleton
			animation="wave"
			variant="text"
			width={width}
			height={height}
			sx={sx}
		/>
	);
};

export default ModalHeaderSkeleton;

import { Box, Skeleton, Stack } from "@mui/material";

export const NotiMenuItemSkeleton = () => {
	return (
		<Stack
			direction={"row"}
			alignItems={"center"}
			spacing={2}
			sx={{ px: 2, mb: 4 }}
		>
			<Skeleton variant="circular" width={38} height={38} />
			<Box sx={{ flex: 1 }}>
				<Skeleton width={"100%"} height={13} sx={{ mb: 0.5 }} />
				<Skeleton width={50} height={13} />
			</Box>
		</Stack>
	);
};

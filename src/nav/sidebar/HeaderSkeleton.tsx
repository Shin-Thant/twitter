import { Box, Skeleton, Stack } from "@mui/material";
import React from "react";

export default function HeaderSkeleton() {
	return (
		<Box>
			<Skeleton
				variant="circular"
				width={45}
				height={45}
				animation="wave"
			/>

			<Box sx={{ my: "0.8rem" }}>
				<Skeleton
					variant="text"
					sx={{ width: 70, fontSize: "1.2rem" }}
					animation="wave"
				/>
				<Skeleton
					variant="text"
					sx={{ width: 100, fontSize: "1.2rem" }}
					animation="wave"
				/>
			</Box>

			<Stack direction="row" alignItems={"center"} spacing={2}>
				<Skeleton
					variant="text"
					sx={{ width: 100, fontSize: "1.2rem" }}
					animation="wave"
				/>

				<Skeleton
					variant="text"
					sx={{ width: 100, fontSize: "1.2rem" }}
					animation="wave"
				/>
			</Stack>
		</Box>
	);
}

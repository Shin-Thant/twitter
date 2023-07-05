import { Box, Skeleton } from "@mui/material";

const TweetSkeleton = () => {
	return (
		<>
			{[1, 2, 3, 4, 5].map((item) => (
				<Box
					key={item}
					p={3}
					mb={2}
					sx={{
						borderWidth: { xs: "0 0 1px 0", sm: "1px 1px 1px 1px" },
						borderStyle: "solid",
						borderColor: "tweet.borderColor",
						borderRadius: { xs: "0", sm: "5px" },
					}}
				>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							gap: 1,
							mb: 5,
						}}
					>
						<Skeleton
							animation="wave"
							variant="circular"
							width={40}
							height={40}
						/>
						<Box>
							<Skeleton animation="wave" width={100} />
							<Skeleton animation="wave" width={70} />
						</Box>
					</Box>
					<Box pl={{ xs: 0, ss: 6 }}>
						<Skeleton animation="wave" variant="text" />
						<Skeleton
							animation="wave"
							variant="text"
							width={"40%"}
						/>

						<Box
							mt={5}
							sx={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							{[1, 2, 3].map((item) => (
								<Skeleton
									key={item}
									animation="wave"
									width={20}
									height={20}
									variant="rectangular"
									sx={{ borderRadius: "3px" }}
								/>
							))}
						</Box>
					</Box>
				</Box>
			))}{" "}
		</>
	);
};

export default TweetSkeleton;

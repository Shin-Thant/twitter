import { Card, CardContent, Typography } from "@mui/material";

const EmptyNestedTweet = () => {
	return (
		<Card
			variant="outlined"
			onClick={(e) => {
				e.stopPropagation();
			}}
			onMouseDown={(e) => {
				e.stopPropagation();
			}}
			sx={{
				cursor: "default",
				bgcolor: "tweet.bg",
				border: "1px solid",
				borderColor: "tweet.borderColor",
				borderRadius: "8px",
			}}
		>
			<CardContent>
				<Typography>This tweet is deleted.</Typography>
			</CardContent>
		</Card>
	);
};

export default EmptyNestedTweet;

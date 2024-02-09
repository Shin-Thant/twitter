import { Button } from "@mui/material";

export const ViewMoreNotiButton = () => {
	return (
		<Button
			variant="outlined"
			size="small"
			sx={{
				textTransform: "none",
				borderRadius: "50px",
			}}
		>
			Mark all as read
		</Button>
	);
};

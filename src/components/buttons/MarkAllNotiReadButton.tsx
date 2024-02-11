import { Button } from "@mui/material";
import { useMarkAllAsReadMutation } from "../../features/notification/notificationApiSlice";

export const MarkAllNotiReadButton = () => {
	const [markAllAsRead, { isLoading }] = useMarkAllAsReadMutation();

	const handleClick = async () => {
		await markAllAsRead();
	};

	return (
		<Button
			disabled={isLoading}
			onClick={handleClick}
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

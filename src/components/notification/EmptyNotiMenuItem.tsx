import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Stack, Typography } from "@mui/material";

const EmptyNotiMenuItem = () => {
	return (
		<Stack
			justifyContent={"center"}
			alignItems={"center"}
			height={"100%"}
			color={"gray"}
			spacing={1}
			mt={7}
		>
			<NotificationsNoneIcon color={"inherit"} />
			<Typography variant="body2" color={"gray"}>
				Your notification is empty!
			</Typography>
		</Stack>
	);
};

export default EmptyNotiMenuItem;

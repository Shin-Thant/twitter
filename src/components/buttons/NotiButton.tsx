import { Badge, IconButton } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

const NotiButton = () => {
	return (
		<IconButton>
			<Badge badgeContent={1} color="primary">
				<NotificationsIcon />
			</Badge>
		</IconButton>
	);
};

export default NotiButton;

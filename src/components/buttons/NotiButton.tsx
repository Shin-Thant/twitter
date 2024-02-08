import NotificationsIcon from "@mui/icons-material/Notifications";
import { Badge, Box, IconButton, Menu, Typography } from "@mui/material";
import { useMemo } from "react";
import { useGetNotisQuery } from "../../features/notification/notificationApiSlice";
import { useMenuController } from "../../hooks/useMenuController";
import { NotiMenuList } from "../lists/NotiMenuList";

const NotiButton = () => {
	const { anchorEl, open, handleOpen, handleClose } = useMenuController();

	const { data, isFetching } = useGetNotisQuery(
		{ currentPage: 1, itemsPerPage: 10 },
		{
			pollingInterval: 15 * 60 * 1000,
		}
	);

	const unReadNotis = useMemo(() => {
		return data?.data?.reduce((acc, noti) => {
			if (!noti.isRead) {
				acc++;
			}
			return acc;
		}, 0);
	}, [data]);

	return (
		<>
			<IconButton onClick={handleOpen}>
				<Badge badgeContent={unReadNotis} color="primary">
					<NotificationsIcon />
				</Badge>
			</IconButton>

			<Menu
				PaperProps={{
					style: {
						width: 300,
						height: 350,
					},
				}}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
			>
				<Box px={2}>
					<Typography variant="h6">Notification</Typography>
				</Box>
				<NotiMenuList data={data} />
			</Menu>
		</>
	);
};

export default NotiButton;

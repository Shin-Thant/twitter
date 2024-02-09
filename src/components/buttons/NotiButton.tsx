import NotificationsIcon from "@mui/icons-material/Notifications";
import {
	Badge,
	Box,
	Button,
	IconButton,
	Menu,
	Stack,
	Typography,
} from "@mui/material";
import { useMemo } from "react";
import { useGetNotisQuery } from "../../features/notification/notificationApiSlice";
import { useMenuController } from "../../hooks/useMenuController";
import { NotiMenuList } from "../notification/NotiMenuList";

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
						width: 350,
						height: 350,
					},
				}}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
			>
				<Box px={2} sx={{ height: 30 }}>
					<Typography variant="h6">Notification</Typography>
				</Box>

				<Box
					sx={{
						py: 1,
						height: 250,
						overflow: "scroll",
					}}
				>
					<NotiMenuList data={data} />
				</Box>

				<Stack
					direction={"row"}
					justifyContent={"space-between"}
					alignItems={"center"}
					px={1}
					sx={{
						height: 50,
					}}
				>
					<Button
						sx={{ textTransform: "none", borderRadius: "50px" }}
						variant="outlined"
					>
						Mark all as read
					</Button>
					<Button
						sx={{
							width: { xs: "100%", sm: "max-content" },
							textTransform: "none",
						}}
						variant="contained"
					>
						View all
					</Button>
				</Stack>
			</Menu>
		</>
	);
};

export default NotiButton;

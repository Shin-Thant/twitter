import NotificationsIcon from "@mui/icons-material/Notifications";
import {
	Avatar,
	Badge,
	Box,
	IconButton,
	Menu,
	MenuItem,
	Stack,
	Typography,
} from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { useMemo } from "react";
import { useGetNotisQuery } from "../../features/notification/notificationApiSlice";
import { useMenuController } from "../../hooks/useMenuController";
import { getRelativeTime } from "../../lib/formatTime";

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
						width: 250,
						height: 300,
					},
				}}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
			>
				{!data?.data?.length ? (
					<Stack
						justifyContent={"center"}
						alignItems={"center"}
						height={"100%"}
						color={"gray"}
						spacing={1}
						mt={2}
					>
						<NotificationsNoneIcon color={"inherit"} />
						<Typography variant="body2" color={"gray"}>
							Your notification is empty!
						</Typography>
					</Stack>
				) : (
					data.data.map((noti) => (
						<MenuItem key={noti._id} sx={{ px: 1, py: 2 }}>
							<Stack
								width={"100%"}
								direction={"row"}
								justifyContent={"flex-start"}
								alignItems={"center"}
								spacing={1}
							>
								<Avatar
									src={noti.triggerBy.avatar}
									sx={{
										fontSize: "0.9rem",
										width: 28,
										height: 28,
										bgcolor: "hsl(330, 100%, 50%)",
									}}
								>
									{noti.triggerBy.name[0].toUpperCase()}
								</Avatar>

								<Box>
									<Box>
										<Typography variant="body2">
											{noti.message}
										</Typography>
									</Box>

									<Typography variant="caption">
										{getRelativeTime({
											date: noti.createdAt,
										})}
									</Typography>
								</Box>
							</Stack>
						</MenuItem>
					))
				)}
			</Menu>
		</>
	);
};

export default NotiButton;

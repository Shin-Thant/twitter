import NotificationsIcon from "@mui/icons-material/Notifications";
import {
	Box,
	Button,
	IconButton,
	Menu,
	Stack,
	Typography,
} from "@mui/material";
import { useEffect } from "react";
import { socket } from "../../app/socket";
import { useGetNotisQuery } from "../../features/notification/notificationApiSlice";
import { useMenuController } from "../../hooks/useMenuController";
import { NotiMenuList } from "../notification/NotiMenuList";

const NotiButton = () => {
	const { anchorEl, open, handleOpen, handleClose } = useMenuController();

	const { data, isFetching, refetch } = useGetNotisQuery(
		{ currentPage: 1, itemsPerPage: 10 },
		{
			pollingInterval: 15 * 60 * 1000,
		}
	);

	useEffect(() => {
		let isMounted = true;
		let timeoutId: NodeJS.Timeout | undefined;

		function onNotify() {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
				refetch();
			}, 3000);
		}

		if (isMounted) {
			socket.on("notify", onNotify);
		}

		return () => {
			isMounted = false;
			socket.off("notify", onNotify);
		};
	}, [refetch]);

	return (
		<>
			<IconButton onClick={handleOpen}>
				<NotificationsIcon />
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
						py: 2,
						height: 250,
						overflow: "scroll",
					}}
				>
					<NotiMenuList data={data} />

					{!!data?.hasNextPage && (
						<Box sx={{ px: 2 }}>
							<Button
								fullWidth
								sx={{
									mt: 2,
									textTransform: "none",
								}}
								variant="contained"
							>
								View more
							</Button>
						</Box>
					)}
				</Box>

				<Stack
					direction={"row"}
					justifyContent={"space-between"}
					alignItems={"center"}
					px={1}
					sx={{
						height: 50,
						bgcolor: "hsl(255, 100%, 100%, 0.1)",
					}}
				>
					<Button
						sx={{ textTransform: "none", borderRadius: "50px" }}
						variant="outlined"
					>
						Mark all as read
					</Button>
				</Stack>
			</Menu>
		</>
	);
};

export default NotiButton;

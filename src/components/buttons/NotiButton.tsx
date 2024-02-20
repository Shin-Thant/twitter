import NotificationsIcon from "@mui/icons-material/Notifications";
import {
	Box,
	Button,
	IconButton,
	Menu,
	Skeleton,
	Stack,
	Typography,
} from "@mui/material";
import { useEffect } from "react";
import { ListenTo, socket } from "../../app/socket";
import { useGetNotisQuery } from "../../features/notification/notificationApiSlice";
import { useNotiMenuContext } from "../../hooks/useNotiMenuContext";
import { NotiMenuList } from "../notification/NotiMenuList";
import { MarkAllNotiReadButton } from "./MarkAllNotiReadButton";

const NotiButton = () => {
	const { anchorEl, open, handleOpen, handleClose } = useNotiMenuContext();

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
			socket.on(ListenTo.REACT, onNotify);
		}

		return () => {
			isMounted = false;
			socket.off(ListenTo.REACT, onNotify);
			clearTimeout(timeoutId);
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
						height: 400,
						backgroundImage: "none",
					},
				}}
				sx={{
					"& .MuiPaper-root": {
						bgcolor: "noti.menuBg",
					},
				}}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
			>
				<Stack
					direction={"row"}
					justifyContent={"space-between"}
					alignItems={"center"}
					px={2}
					sx={{
						height: 50,
						position: "sticky",
						top: 0,
						zIndex: 2,
						bgcolor: "noti.menuBg",
						boxShadow: "0px 4px 8px 1px rgba(0,0,0,0.05);",
					}}
				>
					<Typography variant="h6">Notification</Typography>
					{isFetching ? (
						<Skeleton
							variant="rectangular"
							width={85}
							height={30}
							sx={{ borderRadius: "50px" }}
						/>
					) : (
						<MarkAllNotiReadButton />
					)}
				</Stack>

				<Box
					sx={{
						py: 2,
					}}
				>
					<NotiMenuList data={data} isFetching={isFetching} />

					{!isFetching && !!data?.hasNextPage && (
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
			</Menu>
		</>
	);
};

export default NotiButton;

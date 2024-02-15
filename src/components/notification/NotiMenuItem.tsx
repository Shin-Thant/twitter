import { Avatar, Box, MenuItem, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useMarkNotiReadMutation } from "../../features/notification/notificationApiSlice";
import { CommonNoti } from "../../features/notification/notificationTypes";
import { getRelativeTime } from "../../lib/formatTime";
import { NotiMenuItemOption } from "./NotiMenuItemOption";

type Props = {
	noti: CommonNoti;
};

const NotiMenuItem = ({ noti }: Props) => {
	const [markNotiAsRead, { isLoading }] = useMarkNotiReadMutation();

	const handleMenuItemClick = async () => {
		if (isLoading) return;
		await markNotiAsRead({ id: noti._id });
	};

	return (
		<MenuItem
			disableRipple
			onClick={(e) => {
				e.preventDefault();
				console.log("clicked");
			}}
			key={noti._id}
			sx={{
				px: 2,
				py: 2,
				borderBottom: "1px solid",
				borderColor: "noti.menuItemBorder",
				...(noti.isRead
					? {}
					: {
							bgcolor: "hsl(203, 100%, 70%, 0.08)",
							"&:hover": {
								bgcolor: "hsl(203, 100%, 70%, 0.2)",
							},
					  }),
			}}
		>
			<Stack
				width={"100%"}
				direction={"row"}
				justifyContent={"flex-start"}
				alignItems={"center"}
				spacing={2}
			>
				<Link
					to={`/tweet/${noti.doc._id}`}
					onClick={handleMenuItemClick}
					style={{
						display: "flex",
						alignItems: "center",
						gap: 10,
						textDecoration: "none",
					}}
				>
					<Avatar
						src={noti.triggerBy.avatar}
						sx={{
							textDecoration: "none",
							fontSize: "0.9rem",
							width: 28,
							height: 28,
							bgcolor: "hsl(330, 100%, 50%)",
						}}
					>
						{noti.triggerBy.name[0].toUpperCase()}
					</Avatar>

					<Box sx={{ flex: 1, color: "text.primary" }}>
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
				</Link>

				<NotiMenuItemOption id={noti._id} isRead={noti.isRead} />
			</Stack>
		</MenuItem>
	);
};

export default NotiMenuItem;

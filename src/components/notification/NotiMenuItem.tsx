import { Avatar, Box, MenuItem, Stack, Typography } from "@mui/material";
import { CommonNoti } from "../../features/notification/notificationTypes";
import { getRelativeTime } from "../../lib/formatTime";
import { NotiMenuItemOption } from "./NotiMenuItemOption";

type Props = {
	noti: CommonNoti;
};

const NotiMenuItem = ({ noti }: Props) => {
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

				<Box sx={{ flex: 1 }}>
					<Box>
						<Typography variant="body2">{noti.message}</Typography>
					</Box>

					<Typography variant="caption">
						{getRelativeTime({
							date: noti.createdAt,
						})}
					</Typography>
				</Box>

				<NotiMenuItemOption id={noti._id} isRead={noti.isRead} />
			</Stack>
		</MenuItem>
	);
};

export default NotiMenuItem;

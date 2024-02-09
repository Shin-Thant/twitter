import { Avatar, Box, MenuItem, Stack, Typography } from "@mui/material";
import { CommonNoti } from "../../features/notification/notificationTypes";
import { getRelativeTime } from "../../lib/formatTime";

type Props = {
	noti: CommonNoti;
};

const NotiMenuItem = ({ noti }: Props) => {
	return (
		<MenuItem
			key={noti._id}
			sx={{
				px: 2,
				py: 2,
				borderBottom: "1px solid",
				borderColor: "noti.menuItemBorder",
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

				<Box>
					<Box>
						<Typography variant="body2">{noti.message}</Typography>
					</Box>

					<Typography variant="caption">
						{getRelativeTime({
							date: noti.createdAt,
						})}
					</Typography>
				</Box>
			</Stack>
		</MenuItem>
	);
};

export default NotiMenuItem;

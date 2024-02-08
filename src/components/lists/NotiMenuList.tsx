import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Avatar, Box, MenuItem, Stack, Typography } from "@mui/material";
import { GetNotisResult } from "../../features/notification/notificationApiSlice";
import { getRelativeTime } from "../../lib/formatTime";

type Props = {
	data?: GetNotisResult;
};

export const NotiMenuList = ({ data }: Props) => {
	return (
		<>
			{!data?.data?.length ? (
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
			) : (
				data.data.map((noti) => (
					<MenuItem key={noti._id} sx={{ px: 2, py: 2 }}>
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
		</>
	);
};

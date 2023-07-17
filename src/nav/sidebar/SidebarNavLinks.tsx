import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import {
	Avatar,
	Button,
	List,
	ListItem,
	ListItemAvatar,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { userSelector } from "../../features/user/userSlice";
import { blue } from "@mui/material/colors";

// TODO: update profile nav link
export default function SidebarNavLinks() {
	const user = useAppSelector(userSelector);

	return (
		<List disablePadding>
			<ListItem disableGutters>
				<ListItemButton sx={{ borderRadius: "8px" }}>
					<ListItemIcon>
						<HomeRoundedIcon />
					</ListItemIcon>
					<ListItemText primary="Home" />
				</ListItemButton>
			</ListItem>

			{!user ? (
				""
			) : (
				<ListItem disableGutters>
					<ListItemButton sx={{ borderRadius: "8px" }}>
						<ListItemAvatar>
							<Avatar
								src={user.avatar}
								alt={`${user.name}-profile-image`}
								sx={{
									width: 27,
									height: 27,
									bgcolor: blue[500],
									fontSize: "0.9rem",
								}}
							/>
						</ListItemAvatar>
						<ListItemText primary="Profile" />
					</ListItemButton>
				</ListItem>
			)}

			<ListItem
				disableGutters
				sx={{ display: { xs: "none", md: "block" } }}
			>
				<Button
					fullWidth
					variant="contained"
					sx={{ textTransform: "none" }}
				>
					Tweet
				</Button>
			</ListItem>
		</List>
	);
}

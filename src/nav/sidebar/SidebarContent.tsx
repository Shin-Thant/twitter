import { Box, List, ListItem, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import LogoutButton from "../../components/buttons/LogoutButton";
import ThemeButton from "../../components/buttons/ThemeButton";
import SidebarHeader from "./SidebarHeader";
import SidebarNavLinks from "./SidebarNavLinks";
import { useAppSelector } from "../../app/hooks";
import { authStatusSelector } from "../../features/auth/authSlice";

export default function SidebarContent() {
	const authStatus = useAppSelector(authStatusSelector);
	return (
		<Box
			sx={{
				p: { xs: "1rem", normal_sm: "1rem" },
				height: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
			}}
		>
			<Box>
				<Box>
					<SidebarHeader />
				</Box>

				<Divider
					variant="fullWidth"
					sx={{
						my: { xs: "1rem", sm: "1.8rem" },
						color: "text.secondary",
					}}
				/>

				<SidebarNavLinks />

				<Divider
					variant="fullWidth"
					sx={{
						my: { xs: "1rem", sm: "1.8rem" },
						color: "text.secondary",
					}}
				/>

				<List disablePadding>
					<Typography>Theme</Typography>
					<ListItem disableGutters>
						<ThemeButton />
					</ListItem>
				</List>
			</Box>

			{authStatus === "login" && (
				<Box>
					<LogoutButton />
				</Box>
			)}
		</Box>
	);
}

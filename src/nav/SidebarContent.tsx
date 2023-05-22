import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import TwitterIcon from "@mui/icons-material/Twitter";
import {
	Avatar,
	Box,
	ButtonBase,
	List,
	ListItem,
	ListItemAvatar,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Stack,
	Typography,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import LogoutButton from "../components/buttons/LogoutButton";
import ThemeButton from "../components/buttons/ThemeButton";

export default function SidebarContent() {
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
					<Box sx={{ display: { xs: "block", md: "none" } }}>
						<ButtonBase sx={{ borderRadius: "50%" }}>
							<Link to="/">
								<Avatar
									src="https://images.unsplash.com/photo-1608050523507-5c2edb62c45e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dmlldG5hbWVzZSUyMGdpcmx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
									alt="Sue"
									sx={{
										width: 45,
										height: 45,
										objectFit: "cover",
									}}
								/>
							</Link>
						</ButtonBase>

						<Box sx={{ my: "1.1rem" }}>
							<Typography
								variant="h6"
								sx={{
									color: "text.primary",
									fontWeight: "500",
									textDecoration: "none",
								}}
							>
								<Link to="/" className="router_link">
									Raven Sue
								</Link>
							</Typography>
							<Typography
								component="h1"
								variant="body1"
								sx={{
									color: "text.secondary",
									textDecoration: "none",
								}}
							>
								<Link to="/" className="router_link">
									@raven2205_ss
								</Link>
							</Typography>
						</Box>
						<Stack
							direction="row"
							alignItems="center"
							spacing={2}
							flexWrap={"wrap"}
						>
							<Typography
								variant="body1"
								sx={{ fontWeight: "500" }}
							>
								343
								<Box
									component="span"
									sx={{
										fontWeight: "400",
										color: "text.secondary",
										ml: "0.3rem",
									}}
								>
									Following
								</Box>
							</Typography>
							<Typography
								variant="body1"
								sx={{ fontWeight: "500" }}
							>
								13
								<Box
									component="span"
									sx={{
										fontWeight: "400",
										color: "text.secondary",
										ml: "0.3rem",
									}}
								>
									Followers
								</Box>
							</Typography>
						</Stack>
					</Box>

					<Box
						sx={{
							display: { xs: "none", md: "flex" },
							justifyContent: "center",
							alignItems: "center",
						}}
						color={"primary.main"}
					>
						<Link to="/" style={{ color: "inherit" }}>
							<TwitterIcon sx={{ fontSize: "2.4rem" }} />
						</Link>
					</Box>
				</Box>

				<Divider
					variant="fullWidth"
					sx={{
						my: { xs: "1rem", sm: "1.8rem" },
						color: "text.secondary",
					}}
				/>

				<List disablePadding>
					<ListItem disableGutters>
						<ListItemButton sx={{ borderRadius: "8px" }}>
							<ListItemIcon>
								<HomeRoundedIcon />
							</ListItemIcon>
							<ListItemText primary="Home" />
						</ListItemButton>
					</ListItem>

					<ListItem disableGutters>
						<ListItemButton sx={{ borderRadius: "8px" }}>
							<ListItemAvatar>
								<Avatar
									src="https://images.unsplash.com/photo-1608050523507-5c2edb62c45e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dmlldG5hbWVzZSUyMGdpcmx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
									alt="Profile img"
									sx={{
										width: "30px",
										height: "30px",
										objectFit: "cover",
									}}
								/>
							</ListItemAvatar>
							<ListItemText primary="Profile" />
						</ListItemButton>
					</ListItem>

					<ListItem
						disableGutters
						sx={{ display: { xs: "none", md: "block" } }}
					>
						<ListItemButton
							sx={{
								color: "white",
								borderRadius: "8px",
								bgcolor: "primary.main",
								py: "0.7rem",
								"&:hover": {
									bgcolor: "primary.100",
								},
								justifyContent: "center",
							}}
						>
							Tweet
						</ListItemButton>
					</ListItem>
				</List>

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

			<Box>
				<LogoutButton />
			</Box>
		</Box>
	);
}

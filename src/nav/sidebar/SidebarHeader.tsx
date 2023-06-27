import TwitterIcon from "@mui/icons-material/Twitter";
import { Avatar, Box, ButtonBase, Stack, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import GoAuthButton from "../../components/buttons/GoAuthButton";
import { authStatusSelector } from "../../features/auth/authSlice";
import { userSelector } from "../../features/user/userSlice";
import HeaderSkeleton from "./HeaderSkeleton";

export default function SidebarHeader() {
	const authStatus = useAppSelector(authStatusSelector);
	const user = useAppSelector(userSelector);

	return (
		<>
			<Box sx={{ display: { xs: "block", md: "none" } }}>
				{authStatus === "loading" ? (
					<HeaderSkeleton />
				) : !user ? (
					<GoAuthButton />
				) : (
					<>
						<ButtonBase sx={{ borderRadius: "50%" }}>
							<Link className="router_link" to="/">
								{!user.avatar ? (
									<Avatar
										sx={{
											bgcolor: blue[500],
										}}
									>
										{user.name[0]}
									</Avatar>
								) : (
									<Avatar
										src={user.avatar}
										alt="Sue"
										sx={{
											width: 45,
											height: 45,
											objectFit: "cover",
										}}
									/>
								)}
							</Link>
						</ButtonBase>

						<Box sx={{ my: "1.1rem" }}>
							<Typography
								variant="h6"
								sx={{
									width: "max-content",
									color: "text.primary",
									fontWeight: "500",
									textDecoration: "none",
								}}
							>
								<Link to="/" className="router_link auto_line">
									{user.name}
								</Link>
							</Typography>
							<Typography
								component="h1"
								variant="body1"
								sx={{
									width: "max-content",
									color: "text.secondary",
									textDecoration: "none",
								}}
							>
								<Link to="/" className="router_link auto_line">
									@{user.username}
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
								{user.counts.following}
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
								{user.counts.followers}
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
					</>
				)}
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
		</>
	);
}

import TwitterIcon from "@mui/icons-material/Twitter";
import { AppBar, IconButton, Stack, Toolbar } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import DrawerToggle from "../../components/buttons/DrawerToggle";
import NotiButton from "../../components/buttons/NotiButton";
import SearchInput from "../../components/forms/SearchInput";
import { authStatusSelector } from "../../features/auth/authSlice";
import AuthButton from "./AuthButton";

const Navbar = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const authStatus = useAppSelector(authStatusSelector);

	const iconClick = () => {
		if (location.pathname === "/") {
			// TODO: make this works
			window.scrollTo({ top: 0, behavior: "smooth" });
			document.documentElement.scrollTop = 0;
			return;
		}
		navigate("/");
	};

	return (
		<AppBar
			position="sticky"
			sx={{
				backgroundImage: "none",
				backgroundColor: "bg.navbar",
			}}
		>
			<Toolbar>
				<Stack
					width={"100%"}
					direction="row"
					justifyContent={{ xs: "space-between", md: "end" }}
					alignItems={"center"}
					spacing={2}
				>
					<DrawerToggle />

					<IconButton
						onClick={iconClick}
						aria-label="home"
						sx={{
							display: { xs: "inline-flex", md: "none" },
							color: "primary.main",
							"&:hover": "primary.100",
						}}
						disableRipple
					>
						<TwitterIcon
							sx={{ fontSize: { xs: "1.8rem", sm: "2rem" } }}
						/>
					</IconButton>

					<Stack direction={"row"} alignItems={"center"} spacing={2}>
						<SearchInput />
						{authStatus === "logout" ? (
							<AuthButton />
						) : (
							<NotiButton />
						)}
					</Stack>
				</Stack>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;

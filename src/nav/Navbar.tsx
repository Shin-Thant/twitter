import TwitterIcon from "@mui/icons-material/Twitter";
import { AppBar, IconButton, Stack, Toolbar } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import DrawerToggle from "../components/buttons/DrawerToggle";
import SearchInput from "../components/forms/SearchInput";
import GoAuthButton from "../components/buttons/GoAuthButton";

const Navigation = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const iconClick = () => {
		if (location.pathname === "/") {
			// TODO: make this works
			window.scrollTo({ top: 0, left: 0 });
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
						<TwitterIcon fontSize="large" />
					</IconButton>

					<SearchInput />
					<GoAuthButton route="login">Login</GoAuthButton>
					<GoAuthButton route="signup">Sign Up</GoAuthButton>
				</Stack>
			</Toolbar>
		</AppBar>
	);
};

export default Navigation;

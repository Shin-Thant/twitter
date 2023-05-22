import TwitterIcon from "@mui/icons-material/Twitter";
import { AppBar, IconButton, Stack, Toolbar } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import DrawerToggle from "../components/buttons/DrawerToggle";
import SearchInput from "../components/forms/SearchInput";

const Navigation = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const iconClick = () => {
		if (location.pathname === "/") {
			console.log("home");
			console.log({ window });

			window.scrollTo({ top: 0, left: 0 });
			document.documentElement.scrollTop = 0;
			// return;
		} else {
			navigate("/");
		}
	};

	return (
		<AppBar position="sticky">
			<Toolbar sx={{ backgroundColor: "bg.navbar" }}>
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
				</Stack>
			</Toolbar>
		</AppBar>
	);
};

export default Navigation;

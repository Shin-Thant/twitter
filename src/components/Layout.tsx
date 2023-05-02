import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

const Layout = () => {
	return (
		<Box>
			<Navigation />
			<Outlet />
		</Box>
	);
};

export default Layout;

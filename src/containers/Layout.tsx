import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import Navbar from "../nav/Navbar";
import Sidebar from "../nav/Sidebar";

export default function Layout() {
	return (
		<Box bgcolor="bg.main" sx={{ display: "flex" }}>
			{/* <CssBaseline /> */}
			<Sidebar />
			<Box flex={1} sx={{ height: "100vh", overflow: "auto" }}>
				<Navbar />
				<Box sx={{ p: "1rem" }}>
					<Outlet />
				</Box>
			</Box>
		</Box>
	);
}

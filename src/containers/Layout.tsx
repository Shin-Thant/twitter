import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../nav/navbar/Navbar";
import Sidebar from "../nav/sidebar/Sidebar";
import ThemeModal from "../components/modals/ThemeModal";
import NotiStack from "./NotiStack";

export default function Layout() {
	return (
		<Box bgcolor="bg.main" sx={{ display: "flex" }}>
			<NotiStack />
			<ThemeModal />
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

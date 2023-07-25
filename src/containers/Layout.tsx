import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../nav/navbar/Navbar";
import Sidebar from "../nav/sidebar/Sidebar";
import ThemeModal from "../components/modals/ThemeModal";
import Toast from "../components/feedbacks/Toast";
import { LogoutModalProvider } from "../context/LogoutModalContext";
import LogoutModal from "../components/modals/LogoutModal";
import { TweetDeleteModalProvider } from "../context/TweetDeleteModalContext";
import TweetDeleteModal from "../components/modals/TweetDeleteModal";

export default function Layout() {
	return (
		<TweetDeleteModalProvider>
			<LogoutModalProvider>
				<TweetDeleteModal />
				<LogoutModal />

				<Box bgcolor="bg.main" sx={{ display: "flex" }}>
					<Toast />
					<ThemeModal />
					<Sidebar />
					<Box flex={1} sx={{ height: "100vh", overflow: "auto" }}>
						<Navbar />
						<Box>
							<Outlet />
						</Box>
					</Box>
				</Box>
			</LogoutModalProvider>
		</TweetDeleteModalProvider>
	);
}

import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Toast from "../components/feedbacks/Toast";
import LogoutModal from "../components/modals/LogoutModal";
import ThemeModal from "../components/modals/ThemeModal";
import TweetDeleteModal from "../components/modals/TweetDeleteModal";
import TweetEditModal from "../components/modals/TweetEditModal";
import TweetInfoModal from "../components/modals/TweetInfoModal";
import TweetShareModal from "../components/modals/TweetShareModal";
import Navbar from "../nav/navbar/Navbar";
import Sidebar from "../nav/sidebar/Sidebar";
import ProviderContainer from "./ProviderContainer";

export default function Layout() {
	return (
		<ProviderContainer>
			<LogoutModal />
			<TweetShareModal />
			<TweetInfoModal />
			<TweetDeleteModal />
			<TweetEditModal />

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
		</ProviderContainer>
	);
}

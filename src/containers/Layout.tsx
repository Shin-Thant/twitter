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
import TweetEditModal from "../components/modals/TweetEditModal";
import { TweetEditModalProvider } from "../context/TweetEditModalContext";
import TweetInfoModalProvider from "../context/TweetInfoModalContext";
import TweetShareModalProvider from "../context/TweetShareModalContext";
import TweetInfoModal from "../components/modals/TweetInfoModal";
import TweetShareModal from "../components/modals/TweetShareModal";

// TODO: restructure this
export default function Layout() {
	return (
		<LogoutModalProvider>
			<LogoutModal />

			<Box bgcolor="bg.main" sx={{ display: "flex" }}>
				<Toast />
				<ThemeModal />
				<Sidebar />

				<TweetInfoModalProvider>
					<TweetShareModalProvider>
						<TweetEditModalProvider>
							<TweetDeleteModalProvider>
								<TweetShareModal />
								<TweetInfoModal />
								<TweetDeleteModal />
								<TweetEditModal />

								<Box
									flex={1}
									sx={{ height: "100vh", overflow: "auto" }}
								>
									<Navbar />
									<Box>
										<Outlet />
									</Box>
								</Box>
							</TweetDeleteModalProvider>
						</TweetEditModalProvider>
					</TweetShareModalProvider>
				</TweetInfoModalProvider>
			</Box>
		</LogoutModalProvider>
	);
}

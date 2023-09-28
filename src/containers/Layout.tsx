import { Box } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
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
import TweetCreatorModal from "../components/modals/TweetCreatorModal";
import CommentCreateModal from "../components/modals/CommentCreateModal";
import ImageModal from "../components/modals/ImageModal";
import { useEffect } from "react";
import { useAppSelector } from "../app/hooks";
import { authStatusSelector } from "../features/auth/authSlice";
import { userSelector } from "../features/user/userSlice";

export default function Layout() {
	const authStatus = useAppSelector(authStatusSelector);
	const user = useAppSelector(userSelector);
	const navigate = useNavigate();

	useEffect(() => {
		let isMounted = true;

		if (isMounted) {
			if (authStatus === "login") {
				if (!!user && !user.emailVerified) {
					navigate("/verify-email", { replace: true });
				}
			}
		}

		return () => {
			isMounted = false;
		};
	}, [user, authStatus, navigate]);

	return (
		<ProviderContainer>
			<LogoutModal />
			<ImageModal />
			<TweetCreatorModal />
			<TweetShareModal />
			<TweetInfoModal />
			<TweetDeleteModal />
			<TweetEditModal />
			<CommentCreateModal />

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

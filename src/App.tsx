import { Suspense, lazy } from "react";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppTheme from "./containers/AppTheme";
import IsAuthenticated from "./containers/IsAuthenticated";
import ColorModeProvider from "./context/ColorModeContext";
import DrawerControllerProvider from "./context/DrawerControllerContext";
import ThemeModalProvider from "./context/ThemeModalContext";
import Loading from "./pages/Loading";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import TweetDetails from "./pages/tweet-detail-page/TweetDetails";
import { ReplyCreateModalContextProvider } from "./context/ReplyCreateModalContext";
import { CommentEditModalContextProvider } from "./context/CommentEditModalContext";
const EmailVerify = lazy(() => import("./pages/EmailVerify"));
const Layout = lazy(() => import("./containers/Layout"));
const Home = lazy(() => import("./pages/Home"));

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		errorElement: <>error</>,
		children: [
			{ path: "/", element: <Home /> },
			{
				path: "/tweet/:id",
				element: (
					<ReplyCreateModalContextProvider>
						<CommentEditModalContextProvider>
							<TweetDetails />
						</CommentEditModalContextProvider>
					</ReplyCreateModalContextProvider>
				),
			},
		],
	},
	{
		path: "login",
		element: (
			<IsAuthenticated>
				<Login />
			</IsAuthenticated>
		),
	},
	{
		path: "verify-email",
		element: <EmailVerify />,
	},
	{
		path: "signup",
		element: (
			<IsAuthenticated>
				<SignUp />
			</IsAuthenticated>
		),
	},
]);

function App() {
	return (
		<>
			<HelmetProvider>
				<ColorModeProvider>
					<DrawerControllerProvider>
						<ThemeModalProvider>
							<AppTheme>
								<Suspense fallback={<Loading />}>
									<RouterProvider router={router} />
								</Suspense>
							</AppTheme>
						</ThemeModalProvider>
					</DrawerControllerProvider>
				</ColorModeProvider>
			</HelmetProvider>
		</>
	);
}

export default App;

import { Suspense, lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppTheme from "./containers/AppTheme";
import ColorModeProvider from "./context/ColorModeContext";
import DrawerControllerProvider from "./context/DrawerControllerContext";
import ThemeModalProvider from "./context/ThemeModalContext";
const Login = lazy(() => import("./pages/Login"));
const Layout = lazy(() => import("./containers/Layout"));
const Home = lazy(() => import("./pages/Home"));
const SignUp = lazy(() => import("./pages/SignUp"));

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [{ path: "/", element: <Home /> }],
	},
	{
		path: "login",
		element: <Login />,
	},
	{
		path: "signup",
		element: <SignUp />,
	},
]);

function App() {
	return (
		<>
			<ColorModeProvider>
				<DrawerControllerProvider>
					<ThemeModalProvider>
						<AppTheme>
							<Suspense fallback={<h1>loading...</h1>}>
								<RouterProvider router={router} />
							</Suspense>
						</AppTheme>
					</ThemeModalProvider>
				</DrawerControllerProvider>
			</ColorModeProvider>
		</>
	);
}

export default App;

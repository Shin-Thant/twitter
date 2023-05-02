import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";

declare module "@mui/material/styles" {
	interface BreakpointOverrides {
		xs: true;
		ss: true;
		sm: true;
		md: true;
		lg: true;
		xl: true;
	}
}

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
	const theme = createTheme({
		breakpoints: {
			values: {
				xs: 0,
				ss: 500,
				sm: 600,
				md: 900,
				lg: 1200,
				xl: 1536,
			},
		},
	});
	return (
		<>
			<ThemeProvider theme={theme}>
				<RouterProvider router={router} />
			</ThemeProvider>
		</>
	);
}

export default App;

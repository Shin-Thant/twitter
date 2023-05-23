import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { checkUserEndpoint } from "./features/auth/authApiSlice.ts";
import store from "./app/store.ts";

store.dispatch(checkUserEndpoint.initiate());

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);

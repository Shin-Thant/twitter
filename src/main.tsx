import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { checkUserEndpoint } from "./features/auth/authApiSlice.ts";
import store from "./app/store.ts";
import tweetApiSlice from "./features/tweet/tweetApiSlice.ts";

store.dispatch(checkUserEndpoint.initiate());
store.dispatch(
	tweetApiSlice.endpoints.getTweets.initiate({
		itemsPerPage: 10,
		currentPage: 1,
	})
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);

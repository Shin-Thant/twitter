import { ReactNode } from "react";
import { LogoutModalProvider } from "../context/LogoutModalContext";
import TweetInfoModalProvider from "../context/TweetInfoModalContext";
import TweetShareModalProvider from "../context/TweetShareModalContext";
import { TweetEditModalProvider } from "../context/TweetEditModalContext";
import { TweetDeleteModalProvider } from "../context/TweetDeleteModalContext";

type Props = {
	children: ReactNode;
};

const ProviderContainer = ({ children }: Props) => {
	return (
		<LogoutModalProvider>
			<TweetInfoModalProvider>
				<TweetShareModalProvider>
					<TweetEditModalProvider>
						<TweetDeleteModalProvider>
							{children}
						</TweetDeleteModalProvider>
					</TweetEditModalProvider>
				</TweetShareModalProvider>
			</TweetInfoModalProvider>
		</LogoutModalProvider>
	);
};

export default ProviderContainer;

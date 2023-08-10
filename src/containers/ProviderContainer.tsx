import { ReactNode } from "react";
import { LogoutModalProvider } from "../context/LogoutModalContext";
import TweetInfoModalProvider from "../context/TweetInfoModalContext";
import TweetShareModalProvider from "../context/TweetShareModalContext";
import { TweetEditModalProvider } from "../context/TweetEditModalContext";
import { TweetDeleteModalProvider } from "../context/TweetDeleteModalContext";
import { TweetCreatorModalProvider } from "../context/TweetCreatorModalContext";
import { CommentCreateModalProvider } from "../context/CommentCreateModalContext";

type Props = {
	children: ReactNode;
};

const ProviderContainer = ({ children }: Props) => {
	return (
		<LogoutModalProvider>
			<TweetCreatorModalProvider>
				<TweetInfoModalProvider>
					<TweetShareModalProvider>
						<TweetEditModalProvider>
							<TweetDeleteModalProvider>
								<CommentCreateModalProvider>
									{children}
								</CommentCreateModalProvider>
							</TweetDeleteModalProvider>
						</TweetEditModalProvider>
					</TweetShareModalProvider>
				</TweetInfoModalProvider>
			</TweetCreatorModalProvider>
		</LogoutModalProvider>
	);
};

export default ProviderContainer;

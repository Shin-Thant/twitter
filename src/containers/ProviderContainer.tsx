import { ReactNode } from "react";
import { LogoutModalProvider } from "../context/LogoutModalContext";
import TweetInfoModalProvider from "../context/TweetInfoModalContext";
import TweetShareModalProvider from "../context/TweetShareModalContext";
import { TweetEditModalProvider } from "../context/TweetEditModalContext";
import { TweetDeleteModalProvider } from "../context/TweetDeleteModalContext";
import { TweetCreatorModalProvider } from "../context/TweetCreatorModalContext";
import { CommentCreateModalProvider } from "../context/CommentCreateModalContext";
import { ImageModalProvider } from "../context/ImageModalContext";

type Props = {
	children: ReactNode;
};

const ProviderContainer = ({ children }: Props) => {
	return (
		<LogoutModalProvider>
			<TweetCreatorModalProvider>
				<ImageModalProvider>
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
				</ImageModalProvider>
			</TweetCreatorModalProvider>
		</LogoutModalProvider>
	);
};

export default ProviderContainer;

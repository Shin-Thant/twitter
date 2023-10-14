import { ReactNode } from "react";
import { CommentCreateModalProvider } from "../context/CommentCreateModalContext";
import { ImageModalProvider } from "../context/ImageModalContext";
import { LogoutModalProvider } from "../context/LogoutModalContext";
import { TweetCreatorModalProvider } from "../context/TweetCreatorModalContext";
import { TweetDeleteModalProvider } from "../context/TweetDeleteModalContext";
import { TweetEditModalProvider } from "../context/TweetEditModalContext";
import TweetInfoModalProvider from "../context/TweetInfoModalContext";
import TweetShareModalProvider from "../context/TweetShareModalContext";

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

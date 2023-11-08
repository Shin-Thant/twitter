import { Box, Button, Stack } from "@mui/material";
import CommentsContainer from "../../containers/CommentsContainer";
import RepliesContainer from "../../containers/RepliesContainer";
import { useCommentThreadStore } from "./store/CommentThreadStore";

const INITIAL_DEPTH = 0;
const SHOW_REPLIES = true;

type Props = {
	tweetId: string;
};

const CommentsSection = ({ tweetId }: Props) => {
	const { threadIds, removeLastThread, resetThread } =
		useCommentThreadStore();

	return (
		<>
			<Box
				sx={{
					px: { xs: 1, sm: 0 },
				}}
			>
				{!!threadIds.length && (
					<Stack
						direction="row"
						justifyContent={"space-between"}
						alignItems={"center"}
						flexWrap={"wrap"}
						mb={2}
					>
						<Button
							variant="text"
							sx={{ textTransform: "none" }}
							onClick={() => resetThread()}
						>
							Go back to main thread
						</Button>

						{threadIds.length > 1 && (
							<Button
								variant="text"
								sx={{ textTransform: "none" }}
								onClick={removeLastThread}
							>
								Previous thread
							</Button>
						)}
					</Stack>
				)}

				{threadIds.length ? (
					<RepliesContainer
						commentId={threadIds[threadIds.length - 1]}
						depth={INITIAL_DEPTH}
						show={SHOW_REPLIES}
					/>
				) : (
					<CommentsContainer tweetId={tweetId} />
				)}
			</Box>
		</>
	);
};

export default CommentsSection;

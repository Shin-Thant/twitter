import { Button } from "@mui/material";
import CommentsContainer from "../../containers/CommentsContainer";
import RepliesContainer from "../../containers/RepliesContainer";
import { useCommentThreadStore } from "./store/CommentThreadStore";

const INITIAL_DEPTH = 0;
const SHOW_REPLIES = true;

type Props = {
	tweetId: string;
};

const CommentsSection = ({ tweetId }: Props) => {
	const { threadId, setThreadId } = useCommentThreadStore();

	return (
		<>
			{!!threadId && (
				<Button
					variant="text"
					sx={{ textTransform: "none", mb: 2 }}
					onClick={() => setThreadId(undefined)}
				>
					Go back to main thread
				</Button>
			)}
			{threadId ? (
				<RepliesContainer
					commentId={threadId}
					depth={INITIAL_DEPTH}
					show={SHOW_REPLIES}
				/>
			) : (
				<CommentsContainer tweetId={tweetId} />
			)}
		</>
	);
};

export default CommentsSection;

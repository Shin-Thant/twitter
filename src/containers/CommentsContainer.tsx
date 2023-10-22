import { Box } from "@mui/material";
import CommentList from "../components/lists/CommentList";
import { useGetCommentsQuery } from "../features/comment/commentApiSlice";

// TODO: don't fetch comments if the tweetId is not an object id
// TODO: create comments skeleton
// TODO: change to infinite scroll fetching

type Props = {
	tweetId: string;
};

const INITIAL_DEPTH = 0;

const CommentsContainer = ({ tweetId }: Props) => {
	const { isFetching, data } = useGetCommentsQuery(
		{ tweetId },
		{
			refetchOnFocus: false,
			pollingInterval: 15 * 60 * 60 * 1000,
		}
	);

	return (
		<Box>
			{isFetching ? (
				"fetching..."
			) : !data ? (
				"no data"
			) : (
				<CommentList depth={INITIAL_DEPTH} comments={data} />
			)}
		</Box>
	);
};

export default CommentsContainer;

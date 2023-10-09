import { Box } from "@mui/material";
import CommentList from "../components/lists/CommentList";
import { useGetCommentsQuery } from "../features/comment/commentApiSlice";

// TODO: don't fetch comments if the tweetId is not an object id
// TODO: create comments skeleton
// TODO: change to infinite scroll fetching

type Props = {
	tweetId: string;
};

const CommentsContainer = ({ tweetId }: Props) => {
	const { isFetching, data } = useGetCommentsQuery(
		{ tweetId },
		{ refetchOnFocus: false }
	);

	return (
		<Box>
			{isFetching ? (
				"fetching..."
			) : !data ? (
				"no data"
			) : (
				<CommentList comments={data} />
			)}
		</Box>
	);
};

export default CommentsContainer;

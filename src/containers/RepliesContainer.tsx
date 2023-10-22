import { Box } from "@mui/material";
import ReplyList from "../components/lists/ReplyList";
import { useGetCommentRepliesQuery } from "../features/comment/commentApiSlice";

type Props = {
	depth: number;
	commentId: string;
	show: boolean;
};

const RepliesContainer = ({ depth, commentId, show }: Props) => {
	const { isFetching, data } = useGetCommentRepliesQuery(
		{ commentId },
		{
			skip: !show,
			refetchOnFocus: false,
			pollingInterval: 15 * 60 * 60 * 1000,
		}
	);

	return (
		<Box>
			{!show ? (
				"hiding"
			) : isFetching ? (
				"fetching..."
			) : !data?.length ? (
				"no data"
			) : (
				<ReplyList
					depth={depth}
					getRepliesCacheKey={commentId}
					replies={data}
				/>
			)}
		</Box>
	);
};

export default RepliesContainer;

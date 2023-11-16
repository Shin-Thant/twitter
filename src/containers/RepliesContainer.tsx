import { Box } from "@mui/material";
import ReplyList from "../components/lists/ReplyList";
import { useGetCommentRepliesQuery } from "../features/comment/commentApiSlice";
import { useEffect } from "react";
import { useCommentThreadStore } from "../pages/tweet-detail-page/store/CommentThreadStore";

type Props = {
	depth: number;
	commentId: string;
	show: boolean;
};

const RepliesContainer = ({ depth, commentId, show }: Props) => {
	const removeLastThread = useCommentThreadStore().removeLastThread;
	const { isFetching, data } = useGetCommentRepliesQuery(
		{ commentId },
		{
			skip: !show,
			refetchOnFocus: false,
			pollingInterval: 15 * 60 * 60 * 1000,
			// refetchOnMountOrArgChange: true,
		}
	);

	useEffect(() => {
		let isMounted = true;

		if (isMounted && !isFetching && !data?.length) {
			removeLastThread();
		}
		return () => {
			isMounted = false;
		};
	}, [data, isFetching, removeLastThread]);

	return (
		<Box>
			{commentId}
			<br />
			{`${show}`}
			<br />
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

import {
	GetCommentsResultIntroReply,
	GetCommentsResultReply,
} from "../../features/comment/commentTypes";
import CommentItem from "../cards/comment-card/CommentItem";

type Props = {
	replies: (GetCommentsResultReply | GetCommentsResultIntroReply)[];
	depth: number;
	getRepliesCacheKey?: string;
};

const ReplyList = ({ replies, depth, getRepliesCacheKey }: Props) => {
	return (
		<>
			{replies.map((comment) => (
				<CommentItem
					depth={depth}
					key={comment._id}
					comment={comment}
					getRepliesCacheKey={getRepliesCacheKey}
				/>
			))}
		</>
	);
};

export default ReplyList;

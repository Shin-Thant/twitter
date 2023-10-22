import {
	GetCommentsResultIntroReply,
	GetCommentsResultReply,
} from "../../features/comment/commentTypes";
import CommentItem from "../cards/comment-card/CommentItem";

type Props = {
	replies: (GetCommentsResultReply | GetCommentsResultIntroReply)[];
	getRepliesCacheKey?: string;
};

const ReplyList = ({ replies, getRepliesCacheKey }: Props) => {
	return (
		<>
			{replies.map((comment) => (
				<CommentItem
					key={comment._id}
					comment={comment}
					getRepliesCacheKey={getRepliesCacheKey}
				/>
			))}
		</>
	);
};

export default ReplyList;

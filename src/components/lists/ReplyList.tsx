import {
	GetCommentsResultIntroReply,
	GetCommentsResultReply,
} from "../../features/comment/commentTypes";
import CommentItem from "../cards/comment-card/CommentItem";

type Props = {
	replies: (GetCommentsResultReply | GetCommentsResultIntroReply)[];
};

const ReplyList = ({ replies }: Props) => {
	return (
		<>
			{replies.map((comment) => (
				<CommentItem key={comment._id} comment={comment} />
			))}
		</>
	);
};

export default ReplyList;

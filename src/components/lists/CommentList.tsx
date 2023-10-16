import { GetCommentsResultComment } from "../../features/comment/commentTypes";
import CommentItem from "../cards/comment-card/CommentItem";

type Props = {
	comments: GetCommentsResultComment[];
};

const CommentList = ({ comments }: Props) => {
	return (
		<>
			{comments.map((comment) => (
				<CommentItem key={comment._id} comment={comment} />
			))}
		</>
	);
};

export default CommentList;

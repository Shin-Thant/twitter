import { ListResultComment } from "../../features/comment/commentTypes";
import CommentItem from "../cards/comment-card/CommentItem";

type Props = {
	comments: ListResultComment[];
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

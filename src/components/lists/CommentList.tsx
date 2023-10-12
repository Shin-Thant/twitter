import { Comment } from "../../features/comment/commentTypes";
import CommentItem from "../comments/CommentItem";

type Props = {
	comments: Comment[];
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

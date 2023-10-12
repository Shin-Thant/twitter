import { ListResultComment } from "../../features/comment/commentTypes";
import CommentItem from "../comments/CommentItem";

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

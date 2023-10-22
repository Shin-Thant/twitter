import { GetCommentsResultComment } from "../../features/comment/commentTypes";
import CommentItem from "../cards/comment-card/CommentItem";

type Props = {
	depth: number;
	comments: (
		| GetCommentsResultComment
		| GetCommentsResultComment["comments"][number]
	)[];
};

const CommentList = ({ depth, comments }: Props) => {
	return (
		<>
			{comments.map((comment) => (
				<CommentItem
					depth={depth}
					key={comment._id}
					comment={comment}
				/>
			))}
		</>
	);
};

export default CommentList;

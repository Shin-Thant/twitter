import { Comment } from "../features/comment/commentTypes";

export default function getUpdatedCmtList(
	list: Comment[],
	newItem: Comment,
	check: string
) {
	const isAdded = !!list.find((item) => item.creator._id === check);
	let updatedCmtList: Comment[];

	if (isAdded) {
		// remove item
		updatedCmtList = [...list.filter((item) => item.creator._id !== check)];
	} else {
		// add item
		updatedCmtList = [...list, newItem];
	}
	return updatedCmtList;
}

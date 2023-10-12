export default function getUpdatedStringList({
	isAdded,
	list,
	newItem,
}: {
	isAdded: boolean;
	list: string[];
	newItem: string;
}) {
	let updatedStrList: string[];

	if (isAdded) {
		// remove item
		updatedStrList = [...list.filter((item) => item !== newItem)];
	} else {
		// add item
		updatedStrList = [...list, newItem];
	}
	return updatedStrList;
}

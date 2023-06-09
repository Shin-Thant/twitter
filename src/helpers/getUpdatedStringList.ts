export default function getUpdatedStringList(list: string[], newItem: string) {
	const isAdded = list.includes(newItem);
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

export default function getUpdatedStringList({
	isAdded,
	list,
	newItem,
}: {
	isAdded: boolean;
	list: string[];
	newItem: string;
}): string[] {
	if (isAdded) {
		return [...list.filter((item) => item !== newItem)];
	}
	return [...list, newItem];
}

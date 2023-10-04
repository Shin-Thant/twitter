export type StateWithFromData = {
	from: string;
};

export function createLocationState({
	from,
}: {
	from: string;
}): StateWithFromData {
	return {
		from,
	};
}

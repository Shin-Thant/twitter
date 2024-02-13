import { NotiMenuItemSkeleton } from "./NotiMenuItemSkeleton";

export const NotiMenuSkeletonList = () => {
	return (
		<>
			{[1, 2, 3, 4, 5].map((item) => (
				<NotiMenuItemSkeleton key={item} />
			))}
		</>
	);
};

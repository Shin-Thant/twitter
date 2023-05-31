import React, { useCallback, useRef } from "react";

type Props = {
	isFetching: boolean;
	hasNextPage: boolean;
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export default function useInfiniteScroll({
	isFetching,
	hasNextPage,
	setCurrentPage,
}: Props) {
	const observer = useRef<IntersectionObserver>();

	const lastItemRef = useCallback(
		(tweet: HTMLDivElement | null) => {
			if (isFetching) {
				return;
			}

			if (observer.current) {
				observer.current.disconnect();
			}
			observer.current = new IntersectionObserver(([entry]) => {
				if (hasNextPage && entry.isIntersecting) {
					setCurrentPage((prev) => prev + 1);
				}
			});
			if (tweet) {
				observer.current.observe(tweet);
			}
		},
		[hasNextPage, isFetching, setCurrentPage]
	);

	return lastItemRef;
}

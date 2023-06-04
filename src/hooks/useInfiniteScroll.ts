import { useCallback, useRef } from "react";

type Props = {
	isFetching: boolean;
	hasNextPage: boolean;
	incrementPage: () => void;
};

export default function useInfiniteScroll({
	isFetching,
	hasNextPage,
	incrementPage,
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
					incrementPage();
				}
			});
			if (tweet) {
				observer.current.observe(tweet);
			}
		},
		[hasNextPage, isFetching, incrementPage]
	);

	return lastItemRef;
}

import { GetNotisResult } from "../../features/notification/notificationApiSlice";
import EmptyNotiMenuItem from "./EmptyNotiMenuItem";
import NotiMenuItem from "./NotiMenuItem";
import { NotiMenuSkeletonList } from "./NotiMenuSkeletonList";

type Props = {
	data?: GetNotisResult;
	isFetching: boolean;
};

export const NotiMenuList = ({ data, isFetching }: Props) => {
	return (
		<>
			{isFetching ? (
				<NotiMenuSkeletonList />
			) : !data?.data?.length ? (
				<EmptyNotiMenuItem />
			) : (
				data.data.map((noti) => (
					<NotiMenuItem key={noti._id} noti={noti} />
				))
			)}
		</>
	);
};

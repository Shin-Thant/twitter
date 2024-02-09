import { GetNotisResult } from "../../features/notification/notificationApiSlice";
import EmptyNotiMenuItem from "./EmptyNotiMenuItem";
import NotiMenuItem from "./NotiMenuItem";

type Props = {
	data?: GetNotisResult;
};

export const NotiMenuList = ({ data }: Props) => {
	return (
		<>
			{!data?.data?.length ? (
				<EmptyNotiMenuItem />
			) : (
				data.data.map((noti) => (
					<NotiMenuItem key={noti._id} noti={noti} />
				))
			)}
		</>
	);
};

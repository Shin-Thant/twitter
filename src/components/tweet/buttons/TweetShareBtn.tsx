import SharedOutlinedIcon from "@mui/icons-material/ShareOutlined";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import React from "react";
import { useTweetInfoModal } from "../../../hooks/useTweetInfoModal";
import CardButton from "../../buttons/CardButton";
import { SharedTweetPreview } from "../../../features/tweet/tweetTypes";
import { useAppSelector } from "../../../app/hooks";
import { userIdSelector } from "../../../features/user/userSlice";

type Props = {
	shares: SharedTweetPreview[];
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function TweetShareBtn({ shares, setModalOpen }: Props) {
	const loginUserId = useAppSelector(userIdSelector);
	const { setIsOpen: setTweetInfoModal } = useTweetInfoModal();

	const isShared = loginUserId
		? !!shares.find((share) => share.owner === loginUserId)
		: false;

	const handleModal = () => {
		if (!loginUserId) {
			setTweetInfoModal(true);
			return;
		}
		setModalOpen(true);
	};

	return (
		<CardButton
			label={shares.length}
			isCompleted={isShared}
			type="share"
			handleClick={handleModal}
		>
			{isShared ? (
				<ShareRoundedIcon fontSize="small" />
			) : (
				<SharedOutlinedIcon fontSize="small" />
			)}
		</CardButton>
	);
}

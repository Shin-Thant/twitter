import SharedOutlinedIcon from "@mui/icons-material/ShareOutlined";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import React from "react";
import { useTweetInfoModal } from "../../../hooks/useTweetInfoModal";
import CardButton from "../../buttons/CardButton";
import { SharedTweetPreview } from "../../../features/tweet/tweetTypes";

type Props = {
	shares: SharedTweetPreview[];
	userId: string | undefined;
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function TweetShareBtn({ shares, userId, setModalOpen }: Props) {
	const { setIsOpen: setTweetInfoModal } = useTweetInfoModal();

	const isShared = userId
		? !!shares.find((share) => share.owner === userId)
		: false;

	const handleModal = () => {
		if (!userId) {
			setTweetInfoModal(true);
			console.log("login first");
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

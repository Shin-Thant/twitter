import SharedOutlinedIcon from "@mui/icons-material/ShareOutlined";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import { startTransition, useState } from "react";
import { useHandleShareMutation } from "../../../features/tweet/tweetApiSlice";
import useCurrentPage from "../../../hooks/useCurrentPage";
import { showNotiBar } from "../../../lib/notiStackController";
import CardButton from "../../buttons/CardButton";
import { useTweetInfoModal } from "../../../hooks/useTweetInfoModal";

type Props = {
	shares: string[];
	tweetId: string;
	userId: string | undefined;
};
export default function TweetShareBtn({ shares, tweetId, userId }: Props) {
	const { currentPage } = useCurrentPage();
	const [handleShare, { isLoading }] = useHandleShareMutation();
	const { setIsOpen } = useTweetInfoModal();

	const [isShared, setIsShared] = useState(shares.includes(userId ?? ""));

	const onShare = async () => {
		if (isLoading) return;

		if (!userId) {
			setIsOpen(true);
			// TODO: show modal when user is not sign in
			console.log("login first");
			return;
		}

		try {
			// await handleShare({ tweetId });
			startTransition(() => {
				setIsShared((prev) => !prev);
			});
			showNotiBar({
				message: "Shared post successfully!",
				variant: "success",
				autoHideDuration: 1200,
			});
		} catch (err) {
			// error
		}
	};

	return (
		<CardButton
			isLoading={isLoading}
			label={shares.length}
			isCompleted={isShared}
			type="share"
			handleClick={onShare}
		>
			{isShared ? (
				<ShareRoundedIcon fontSize="small" />
			) : (
				<SharedOutlinedIcon fontSize="small" />
			)}
		</CardButton>
	);
}

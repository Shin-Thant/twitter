import SharedOutlinedIcon from "@mui/icons-material/ShareOutlined";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import { useAppSelector } from "../../../app/hooks";
import { SharedTweetPreview } from "../../../features/tweet/tweetTypes";
import { userIdSelector } from "../../../features/user/userSlice";
import { useTweetInfoModal } from "../../../hooks/useTweetInfoModal";
import { useTweetShareModal } from "../../../hooks/useTweetShareModal";
import CardButton from "../../buttons/CardButton";
import { selectTweetById } from "../../../features/tweet/tweetApiSlice";
import { showToast } from "../../../lib/handleToast";

type Props = {
	tweetId: string;
	shares: SharedTweetPreview[];
};

export default function TweetShareBtn({ tweetId, shares }: Props) {
	const foundTweet = useAppSelector((state) =>
		selectTweetById(state, tweetId)
	);

	const loginUserId = useAppSelector(userIdSelector);
	const isSharedByLoginUser: boolean = loginUserId
		? !!shares.find((share) => share.owner === loginUserId)
		: false;

	const { openModal } = useTweetShareModal();
	const { setIsOpen: setTweetInfoModal } = useTweetInfoModal();

	const handleModal = () => {
		if (!loginUserId) {
			setTweetInfoModal(true);
			return;
		}
		if (!foundTweet) {
			showToast({ message: "Something went wrong!", variant: "error" });
			return;
		}
		openModal(tweetId);
	};

	return (
		<CardButton
			label={shares.length}
			isDoneByLoginUser={isSharedByLoginUser}
			type="share"
			handleClick={handleModal}
		>
			{isSharedByLoginUser ? (
				<ShareRoundedIcon fontSize="small" />
			) : (
				<SharedOutlinedIcon fontSize="small" />
			)}
		</CardButton>
	);
}

import SharedOutlinedIcon from "@mui/icons-material/ShareOutlined";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import { useAppSelector } from "../../../app/hooks";
import { SharedTweetPreview } from "../../../features/tweet/tweetTypes";
import { userIdSelector } from "../../../features/user/userSlice";
import { useTweetInfoModal } from "../../../hooks/useTweetInfoModal";
import { useTweetShareModal } from "../../../hooks/useTweetShareModal";
import CardButton from "../../buttons/CardButton";

type Props = {
	tweetId: string;
	shares: SharedTweetPreview[];
};

// TODO: should I use `useEffect` for `isSharedByLoginUser`
export default function TweetShareBtn({ tweetId, shares }: Props) {
	const { openModal } = useTweetShareModal();
	const loginUserId = useAppSelector(userIdSelector);
	const { setIsOpen: setTweetInfoModal } = useTweetInfoModal();

	const isSharedByLoginUser: boolean = loginUserId
		? !!shares.find((share) => share.owner === loginUserId)
		: false;

	const handleModal = () => {
		if (!loginUserId) {
			setTweetInfoModal(true);
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

import { useTweetDeleteModal } from "../../../../hooks/useTweetDeleteModal";
import { useTweetEditModal } from "../../../../hooks/useTweetEditModal";
import CardOptionsMenu from "../../components/CardOptionsMenu";

type Props = {
	tweetId: string;
};

const TweetOptionsMenu = ({ tweetId }: Props) => {
	const { openModal: openEditModal } = useTweetEditModal();
	const { openModal: openDeleteModal } = useTweetDeleteModal();

	const handleEditModal = () => {
		openEditModal(tweetId);
	};

	const handleDeleteModal = () => {
		openDeleteModal(tweetId);
	};

	return (
		<CardOptionsMenu
			handleDeleteModal={handleDeleteModal}
			handleEditModal={handleEditModal}
		/>
	);
};

export default TweetOptionsMenu;

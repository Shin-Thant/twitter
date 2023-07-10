import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import {
	IconButton,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
} from "@mui/material";
import { useRef, useState } from "react";
import { useHandleDeleteTweetMutation } from "../../../features/tweet/tweetApiSlice";

type Props = {
	tweetId: string;
};
const TweetMenu = ({ tweetId }: Props) => {
	const [deleteTweet, { isLoading }] = useHandleDeleteTweetMutation();
	const [isOpen, setIsOpen] = useState(false);
	const anchorEl = useRef<HTMLButtonElement>(null);

	const handleDelete = async () => {
		if (isLoading) {
			return;
		}
		await deleteTweet({ tweetId });
	};

	const openMenu = () => {
		setIsOpen(true);
	};
	const closeMenu = () => {
		setIsOpen(false);
	};

	return (
		<>
			<IconButton
				ref={anchorEl}
				onClick={openMenu}
				size="small"
				sx={{
					color: "tweet.moreOptionsBtn",
				}}
			>
				<MoreVertRoundedIcon sx={{ fontSize: "1.3rem" }} />
			</IconButton>

			<Menu
				open={isOpen}
				anchorEl={anchorEl.current}
				anchorOrigin={{
					horizontal: "right",
					vertical: "bottom",
				}}
				transformOrigin={{
					horizontal: "right",
					vertical: "top",
				}}
				onClose={closeMenu}
				sx={{
					minWidth: "500px",
					"& .MuiMenu-paper": {
						borderRadius: "5px",
						boxShadow: "0px 2px 8px rgb(0, 0, 0, 0.3)",
					},
					"& .MuiMenu-list": {
						p: "5px",
					},
				}}
			>
				<MenuItem onClick={handleDelete}>
					<ListItemIcon>
						<DeleteOutlineRoundedIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText>Delete</ListItemText>
				</MenuItem>
			</Menu>
		</>
	);
};

export default TweetMenu;

import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import {
	IconButton,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
} from "@mui/material";
import { useRef, useState } from "react";
import { useTweetDeleteModal } from "../../../hooks/useTweetDeleteModal";
import { useTweetEditModal } from "../../../hooks/useTweetEditModal";

type Props = {
	tweetId: string;
};

const TweetOptionsMenu = ({ tweetId }: Props) => {
	const { openModal: openEditModal } = useTweetEditModal();
	const { openModal: openDeleteModal } = useTweetDeleteModal();
	const [isOpen, setIsOpen] = useState(false);
	const anchorEl = useRef<HTMLButtonElement>(null);

	const handleEditModal = () => {
		setIsOpen(false);
		openEditModal(tweetId);
	};

	const handleDeleteModal = () => {
		setIsOpen(false);
		openDeleteModal(tweetId);
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
					color: "option_icon.normal",
					"&:hover": {
						color: "option_icon.hover",
					},
					transition: "color 200ms ease",
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
				<MenuItem onClick={handleEditModal}>
					<ListItemIcon>
						<EditRoundedIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText
						sx={{
							"& .MuiTypography-root": {
								fontSize: { xs: "0.9rem", sm: "0.95rem" },
							},
						}}
					>
						Edit
					</ListItemText>
				</MenuItem>

				<MenuItem onClick={handleDeleteModal}>
					<ListItemIcon>
						<DeleteOutlineRoundedIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText
						sx={{
							"& .MuiTypography-root": {
								fontSize: { xs: "0.9rem", sm: "0.95rem" },
							},
						}}
					>
						Delete
					</ListItemText>
				</MenuItem>
			</Menu>
		</>
	);
};

export default TweetOptionsMenu;

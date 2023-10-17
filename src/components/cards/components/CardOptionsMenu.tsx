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

type Props = {
	handleEditModal(): void;
	handleDeleteModal(): void;
};

const CardOptionsMenu = ({ handleEditModal, handleDeleteModal }: Props) => {
	const [isMenuOpen, setMenuOpen] = useState(false);
	const anchorEl = useRef<HTMLButtonElement>(null);

	const onEditModalOpen = () => {
		setMenuOpen(false);
		handleEditModal();
	};

	const onDeleteModalOpen = () => {
		setMenuOpen(false);
		handleDeleteModal();
	};

	const openMenu = () => {
		setMenuOpen(true);
	};

	const closeMenu = () => {
		setMenuOpen(false);
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
				open={isMenuOpen}
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
				<MenuItem onClick={onEditModalOpen}>
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

				<MenuItem onClick={onDeleteModalOpen}>
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

export default CardOptionsMenu;

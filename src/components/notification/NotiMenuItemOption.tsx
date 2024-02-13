import { MoreHorizRounded } from "@mui/icons-material";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { MouseEvent } from "react";
import { useMenuController } from "../../hooks/useMenuController";
import { useMarkNotiReadMutation } from "../../features/notification/notificationApiSlice";

type Props = {
	id: string;
	isRead: boolean;
};

export const NotiMenuItemOption = ({ id, isRead }: Props) => {
	const { anchorEl, open, handleOpen, handleClose } = useMenuController();
	const [markNotiRead, { isLoading }] = useMarkNotiReadMutation();

	const handleClick = async (e: MouseEvent<HTMLLIElement>) => {
		if (isRead) return;
		e.stopPropagation();
		handleClose();
		await markNotiRead({ id });
	};

	return (
		<>
			<IconButton
				disabled={isLoading}
				size="small"
				onMouseDown={(e) => {
					e.stopPropagation();
				}}
				onClick={(e) => {
					handleOpen(e);
					e.stopPropagation();
				}}
			>
				<MoreHorizRounded />
			</IconButton>
			<Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
				<MenuItem
					disabled={isRead}
					onMouseDown={(e) => {
						e.stopPropagation();
					}}
					onClick={handleClick}
				>
					<DoneRoundedIcon fontSize="small" />
					<Typography variant="caption" sx={{ ml: 1 }}>
						Mark as read
					</Typography>
				</MenuItem>
			</Menu>
		</>
	);
};

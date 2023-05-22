import { startTransition } from "react";
import { Button } from "@mui/material";
import useDrawerController from "../../hooks/useDrawerController";
import useThemeModal from "../../hooks/useThemeModal";

export default function ThemeButton() {
	const { setIsOpen: setDrawer } = useDrawerController();
	const { setIsOpen: setModal } = useThemeModal();

	const openModal = () => {
		startTransition(() => {
			setDrawer(false);
			setModal(true);
		});
	};

	return (
		<>
			<Button onClick={openModal}>Change Theme</Button>
		</>
	);
}

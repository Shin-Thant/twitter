import { ReactNode, createContext } from "react";
import { useMenuController } from "../hooks/useMenuController";

type NotiMenuState = {
	anchorEl: HTMLElement | null;
	open: boolean;
	handleOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
	handleClose: () => void;
};

export const NotiMenuContext = createContext<NotiMenuState>({
	anchorEl: null,
	open: false,
	handleOpen: () => undefined,
	handleClose: () => undefined,
});
type Props = {
	children: ReactNode;
};

export const NotiMenuProvider = ({ children }: Props) => {
	const menuController = useMenuController();
	return (
		<NotiMenuContext.Provider value={menuController}>
			{children}
		</NotiMenuContext.Provider>
	);
};

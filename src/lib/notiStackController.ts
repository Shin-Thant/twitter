import { enqueueSnackbar } from "notistack";

type Param = {
	message: string;
	autoHideDuration: number;
	variant: "success" | "error" | "info";
};
export function showNotiBar({ message, autoHideDuration, variant }: Param) {
	enqueueSnackbar({ message, autoHideDuration, variant });
}

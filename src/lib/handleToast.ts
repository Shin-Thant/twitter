import { enqueueSnackbar } from "notistack";

type Param = {
	message: string;
	variant: "success" | "error" | "info";
	duration?: number;
};
export function showToast({ message, duration = 3000, variant }: Param) {
	enqueueSnackbar({ message, autoHideDuration: duration, variant });
}

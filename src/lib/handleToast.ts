import { enqueueSnackbar } from "notistack";

type Param = {
	message: string;
	variant: "success" | "error" | "info";
	duration?: number;
};
export function showToast({ message, variant, duration = 3000 }: Param) {
	enqueueSnackbar({ message, autoHideDuration: duration, variant });
}

import { enqueueSnackbar } from "notistack";

type Param = {
	message: string;
	variant: "success" | "error" | "info";
	durationInMillis?: number;
};
export function showToast({
	message,
	variant,
	durationInMillis = 3000,
}: Param) {
	enqueueSnackbar({ message, autoHideDuration: durationInMillis, variant });
}

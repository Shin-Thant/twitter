import { enqueueSnackbar } from "notistack";
import { OnToastClick } from "../components/feedbacks/Toast";

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

export function showNewPostNoti({
	onToastClick,
}: {
	onToastClick: OnToastClick;
}) {
	return enqueueSnackbar({
		autoHideDuration: 5000,
		variant: "postNoti",
		onToastClick,
	});
}

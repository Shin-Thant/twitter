import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { IconButton } from "@mui/material";
import { SnackbarProvider, closeSnackbar } from "notistack";
import PostNotiSnackBar from "./PostNotiSnackBar";

// add new variant
declare module "notistack" {
	interface VariantOverrides {
		postNoti: {
			notiPayloads: PostNotiPayload[];
			onToastClick: OnToastClick;
		};
	}
}
export type PostNotiPayload = { id: string; username: string; avatar?: string };
export type OnToastClick = (key: string | number) => void;

export default function Toast() {
	return (
		<>
			<SnackbarProvider
				Components={{
					postNoti: PostNotiSnackBar,
				}}
				maxSnack={3}
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
				action={(key) => (
					<IconButton
						color="default"
						onClick={() => closeSnackbar(key)}
					>
						<CloseRoundedIcon />
					</IconButton>
				)}
			/>
		</>
	);
}

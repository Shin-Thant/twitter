import { SnackbarProvider, closeSnackbar } from "notistack";
import { IconButton } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

export default function Toast() {
	return (
		<SnackbarProvider
			maxSnack={3}
			anchorOrigin={{ vertical: "top", horizontal: "center" }}
			action={(key) => (
				<IconButton color="default" onClick={() => closeSnackbar(key)}>
					<CloseRoundedIcon />
				</IconButton>
			)}
		/>
	);
}

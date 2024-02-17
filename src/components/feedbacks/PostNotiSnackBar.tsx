import { Button } from "@mui/material";
import NorthRoundedIcon from "@mui/icons-material/NorthRounded";
import { CustomContentProps, SnackbarContent } from "notistack";
import { forwardRef } from "react";
import { OnToastClick } from "./Toast";

interface PostSnackBarProps extends CustomContentProps {
	onToastClick: OnToastClick;
}

const PostNotiSnackBar = forwardRef<HTMLDivElement, PostSnackBarProps>(
	({ id, onToastClick, ...props }, ref) => {
		return (
			<SnackbarContent ref={ref} role="button" {...props}>
				<Button
					variant="contained"
					onClick={() => onToastClick(id.toString())}
					sx={{ borderRadius: 50, width: "max-content", mx: "auto" }}
				>
					<NorthRoundedIcon /> new posts
				</Button>
			</SnackbarContent>
		);
	}
);

export default PostNotiSnackBar;

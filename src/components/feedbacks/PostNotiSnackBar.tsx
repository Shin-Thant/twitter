import { Button } from "@mui/material";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import { CustomContentProps, SnackbarContent } from "notistack";
import { forwardRef } from "react";
import { OnToastClick } from "./Toast";

interface PostSnackBarProps extends CustomContentProps {
	onToastClick: OnToastClick;
}

const PostNotiSnackBar = forwardRef<HTMLDivElement, PostSnackBarProps>(
	({ onToastClick, ...props }, ref) => {
		return (
			<SnackbarContent
				ref={ref}
				role="alert"
				className={props.className}
				style={props.style}
			>
				<Button
					variant="contained"
					onClick={() => {
						onToastClick(props.id);
					}}
					sx={{
						borderRadius: 50,
						width: "max-content",
						mx: "auto",
						textTransform: "none",
					}}
				>
					<ArrowUpwardRoundedIcon fontSize="small" sx={{ mr: 1 }} />{" "}
					New posts
				</Button>
			</SnackbarContent>
		);
	}
);

export default PostNotiSnackBar;

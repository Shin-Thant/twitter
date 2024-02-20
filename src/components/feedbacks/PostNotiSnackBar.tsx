import { AvatarGroup, Button } from "@mui/material";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import { CustomContentProps, SnackbarContent } from "notistack";
import { forwardRef } from "react";
import { OnToastClick, PostNotiPayload } from "./Toast";
import { Avatar } from "../avatar/Avatar";

interface PostSnackBarProps extends CustomContentProps {
	notiPayloads: PostNotiPayload[];
	onToastClick: OnToastClick;
}

const PostNotiSnackBar = forwardRef<HTMLDivElement, PostSnackBarProps>(
	({ notiPayloads, onToastClick, ...props }, ref) => {
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
					<AvatarGroup
						max={3}
						sx={{
							mr: 1,
							"& .MuiAvatarGroup-avatar": {
								width: 26,
								height: 26,
								fontSize: 13,
							},
						}}
					>
						{notiPayloads.map((payload) => (
							<Avatar
								key={payload.id}
								sx={{
									width: 26,
									height: 26,
									fontSize: 10,
									objectFit: "cover",
									bgcolor: payload.avatar
										? "transparent"
										: "hsl(330, 100%, 50%)",
								}}
								src={payload.avatar}
								alt={`${payload.username} avatar image`}
								text={payload.username[0].toUpperCase()}
							/>
						))}
					</AvatarGroup>
					posted
				</Button>
			</SnackbarContent>
		);
	}
);

export default PostNotiSnackBar;

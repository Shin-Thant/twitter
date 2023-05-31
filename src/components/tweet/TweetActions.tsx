import { Button, CardActions } from "@mui/material";
import React from "react";
import HeartOutlinedIcon from "@mui/icons-material/FavoriteBorderRounded";
// import HeartFilled from "@mui/icons-material/FavoriteRounded";
import CommentOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import CommentFilledIcon from "@mui/icons-material/TextsmsRounded";
import SharedOutlinedIcon from "@mui/icons-material/ShareOutlined";

// TODO: create button which has initial color grey and when hover or click, change to specific color (red, blue, green)
export default function TweetActions() {
	return (
		<CardActions
			sx={{
				justifyContent: "space-between",
				ml: { xs: 0, ss: "3.3rem", sm: "3.5rem" },
			}}
		>
			<Button color="error" startIcon={<HeartOutlinedIcon />}>
				24
			</Button>
			<Button color="primary" startIcon={<CommentOutlinedIcon />}>
				5
			</Button>
			<Button color="success" startIcon={<SharedOutlinedIcon />}>
				10
			</Button>
		</CardActions>
	);
}

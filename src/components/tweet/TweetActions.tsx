import { CardActions } from "@mui/material";
import { type ReactNode } from "react";

type Props = {
	likeBtn: ReactNode;
	commentBtn: ReactNode;
	shareBtn: ReactNode;
};
export default function TweetActions({ likeBtn, commentBtn, shareBtn }: Props) {
	return (
		<CardActions
			sx={{
				justifyContent: "space-between",
			}}
		>
			{likeBtn}
			{commentBtn}
			{shareBtn}
		</CardActions>
	);
}

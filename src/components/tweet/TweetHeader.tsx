import React from "react";
import { CardHeader, Avatar, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import getRelativeTime from "../../helpers/getRelativeTime";
import { Owner } from "../../features/tweet/type";

type Props = {
	owner: Owner;
	createdAt: string;
};
const width = { xs: 30, ss: 35, sm: 40 };
const height = { xs: 30, ss: 35, sm: 40 };
export default function TweetHeader({ owner, createdAt }: Props) {
	return (
		<CardHeader
			avatar={
				<Link className="router_link" to="/">
					{!owner.avatar ? (
						<Avatar
							sx={{
								bgcolor: "hsl(330, 100%, 50%)",
								width,
								height,
								objectFit: "cover",
								fontSize: "1rem",
							}}
						>
							{owner.name[0]}
						</Avatar>
					) : (
						<Avatar
							sx={{
								width,
								height,
								objectFit: "cover",
								fontSize: "1rem",
							}}
							src={owner.avatar}
							alt={`${owner.avatar}-profile-picture`}
						/>
					)}
				</Link>
			}
			title={
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						gap: "0.6rem",
					}}
				>
					<Typography
						component="h1"
						variant="subtitle1"
						sx={{
							fontWeight: "600",
							fontSize: {
								xs: "0.95rem",
								ss: "0.98rem",
								sm: "1rem",
							},
						}}
						title={owner.name}
					>
						<Link className="router_link" to="/">
							{owner.name}
						</Link>
					</Typography>
					<Typography color="text.secondary" fontSize={"0.8rem"}>
						&bull;
					</Typography>
					<Typography
						component="p"
						variant="body2"
						color="text.secondary"
						sx={{
							minWidth: "max-content",
							display: "inline-block",
						}}
					>
						{getRelativeTime({
							inputDate: new Date(createdAt),
						})}
					</Typography>
				</Box>
			}
			subheader={
				<Typography
					color="text.secondary"
					variant="body2"
					title={owner.username}
				>
					<Link className="router_link" to="/">
						@{owner.username}
					</Link>{" "}
				</Typography>
			}
			sx={{ paddingBottom: "8px" }}
		/>
	);
}

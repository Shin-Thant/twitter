import { Avatar, Box, CardHeader, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { Owner } from "../../features/tweet/tweetTypes";
import { userIdSelector } from "../../features/user/userSlice";
import getRelativeTime from "../../helpers/getRelativeTime";
import TweetMenu from "./menus/TweetMenu";

const width = { xs: 30, ss: 35, sm: 40 };
const height = { xs: 30, ss: 35, sm: 40 };
type Props = {
	tweetId: string;
	owner: Owner;
	createdAt: string;
};
export default function TweetHeader({ tweetId, owner, createdAt }: Props) {
	const loginUserId = useAppSelector(userIdSelector);
	const isTweetOwner = owner._id === loginUserId;

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
						<Link className="router_link auto_line" to="/">
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
					sx={{ width: "max-content" }}
					color="text.secondary"
					variant="body2"
					title={owner.username}
				>
					<Link className="router_link auto_line" to="/">
						@{owner.username}
					</Link>
				</Typography>
			}
			action={isTweetOwner ? <TweetMenu tweetId={tweetId} /> : false}
			sx={{ paddingBottom: "8px" }}
		/>
	);
}

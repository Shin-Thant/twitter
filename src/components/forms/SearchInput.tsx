import PersonSearchRoundedIcon from "@mui/icons-material/PersonSearchRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Box, IconButton, InputBase, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function SearchInput() {
	const navigate = useNavigate();
	const iconClick = () => {
		navigate("/");
	};

	return (
		<>
			<InputWrapper sx={{ display: { xs: "none", mm: "inline-flex" } }}>
				<IconWrapper>
					<SearchRoundedIcon sx={{ fontSize: "1.3rem" }} />
				</IconWrapper>
				<StyledInputBase type="text" placeholder="Find friends..." />
			</InputWrapper>

			<IconButton
				onClick={iconClick}
				sx={{ display: { xs: "inline-flex", mm: "none" } }}
			>
				<PersonSearchRoundedIcon />
			</IconButton>
		</>
	);
}

const IconWrapper = styled(Box)(() => ({
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	color: "hsl(0, 0%, 50%)",
}));

const InputWrapper = styled(Box)(({ theme }) => ({
	width: "max-content",
	borderRadius: "8px",
	border: "1.5px solid",
	borderColor:
		theme.palette.mode === "dark" ? "hsl(0, 0%, 30%)" : "hsl(0, 0%, 80%)",
	padding: "0.2rem 0.8rem",
	alignItems: "center",
	justifyContent: "flex-start",
	gap: "0.6rem",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	"& .MuiInputBase-input": {
		width: "150px",
		[theme.breakpoints.up("md")]: {
			transition: "width 200ms ease",
			width: "125px",
			"&:focus": {
				width: "180px",
			},
		},
	},
}));

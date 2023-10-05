import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";
import { IconButton, Stack, StackProps, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFromPath } from "../../hooks/useFromPath";

interface Props extends StackProps {
	text: string;
}

const BackButton = ({ text, ...props }: Props) => {
	const from = useFromPath();
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(from ?? "/");
	};

	return (
		<Stack direction="row" alignItems="center" spacing={1} {...props}>
			<IconButton onClick={handleClick}>
				<KeyboardBackspaceRoundedIcon />
			</IconButton>

			<Typography color="text.primary">{text}</Typography>
		</Stack>
	);
};

export default BackButton;

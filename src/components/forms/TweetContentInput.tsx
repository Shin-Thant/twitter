import { InputBase, InputBaseProps } from "@mui/material";
import { grey, red } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

interface Props extends InputBaseProps {
	hasError: boolean;
}
const TweetContentInput = styled(InputBase)<Props>(({ theme, hasError }) => ({
	width: "100%",
	fontSize: "0.98rem",
	borderBottom: "1.5px solid",
	borderColor: hasError ? red["A700"] : grey[500],
	transition: "color 200ms ease",
	"&:focus-within": {
		borderColor: hasError ? red["A700"] : theme.palette.primary,
	},
}));

export default TweetContentInput;

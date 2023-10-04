import WestRoundedIcon from "@mui/icons-material/WestRounded";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useFromPath } from "../../hooks/useFromPath";

const BackButton = () => {
	const from = useFromPath();

	return (
		<Link to={from ? from : "/"} className="no_underline">
			<Button
				startIcon={<WestRoundedIcon />}
				sx={{
					textTransform: "none",
					fontSize: "0.95rem",
					width: 100,
				}}
			>
				Back
			</Button>
		</Link>
	);
};

export default BackButton;

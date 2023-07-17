import WestRoundedIcon from "@mui/icons-material/WestRounded";
import { Button } from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const BackButton = () => {
	const from = useLocation().state?.from;

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

import { Button } from "@mui/material";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import React from "react";

export default function LogoutButton() {
	return <Button
    size="large"
    endIcon={<LogoutRoundedIcon />}
    sx={{
        // color: "red",
        borderRadius: "5px",
        textTransform: "none",
        // "&:hover": {
        // 	backgroundColor: "primary.main",
        // 	color: "white",
        // },
    }}
>
    Logout
</Button>;
}

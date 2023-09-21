import { InputBase, InputBaseProps } from "@mui/material";
import { grey, red } from "@mui/material/colors";
import { SxProps, Theme } from "@mui/material/styles";
import { ControllerRenderProps } from "react-hook-form";

interface Props extends InputBaseProps {
	field:
		| ControllerRenderProps<{ content?: string }, "content">
		| ControllerRenderProps<{ content: string }, "content">;
	hasError: boolean;
	sx?: SxProps<Theme>;
}
function TweetContentInput({ field, hasError, sx, ...props }: Props) {
	return (
		<InputBase
			type="text"
			autoComplete="off"
			sx={{
				width: "100%",
				fontSize: "0.98rem",
				borderBottomWidth: "1.5px",
				borderBottomStyle: "solid",
				borderColor: hasError ? red["A700"] : grey[500],
				"&:focus-within": {
					borderColor: hasError ? red["A700"] : "primary.main",
				},
				...sx,
			}}
			{...field}
			{...props}
		/>
	);
}

export default TweetContentInput;

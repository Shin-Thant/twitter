import { InputBase, InputBaseProps } from "@mui/material";
import { grey, red } from "@mui/material/colors";
import { SxProps, Theme } from "@mui/material/styles";
import { UseControllerProps, useController } from "react-hook-form";

type Controller = Required<
	Pick<
		UseControllerProps<{ content: string }, "content">,
		"name" | "control" | "defaultValue"
	>
>;
interface Props extends InputBaseProps {
	hasError: boolean;
	controller: Controller;
	sx?: SxProps<Theme>;
}
function TweetContentInput({ hasError, sx, controller, ...props }: Props) {
	const { field } = useController(controller);

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

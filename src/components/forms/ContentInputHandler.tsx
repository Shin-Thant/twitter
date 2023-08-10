import { Box } from "@mui/material";
import { ControllerRenderProps } from "react-hook-form";
import ContentLength from "../feedbacks/ContentLength";
import FieldError from "./FieldError";
import TweetContentInput from "./TweetContentInput";

interface InputProps {
	autoFocus?: boolean;
	placeholder?: string;
	required?: boolean;
}
interface Props extends InputProps {
	field: ControllerRenderProps<{ content: string }>;
	errorMessage: string | undefined;
	contentLength: number;
	totalLength?: number;
}

const ContentInputHandler = ({
	field,
	errorMessage,
	contentLength,
	totalLength,
	autoFocus,
	placeholder,
	required,
}: Props) => {
	return (
		<>
			<TweetContentInput
				field={field}
				hasError={!!errorMessage}
				placeholder={placeholder}
				autoFocus={autoFocus}
				required={required ?? true}
			/>

			<Box
				sx={{
					mt: 1,
					gap: 1.5,
					display: "flex",
					justifyContent: errorMessage ? "space-between" : "flex-end",
				}}
			>
				{!!errorMessage && (
					<FieldError sx={{ mt: 0 }} message={errorMessage} />
				)}
				<ContentLength
					errorMessage={errorMessage}
					currentLength={contentLength}
					limit={totalLength ?? 120}
				/>
			</Box>
		</>
	);
};

export default ContentInputHandler;

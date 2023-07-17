import { Stack } from "@mui/material";
import AuthButton from "../../nav/navbar/AuthButton";
import useDrawerController from "../../hooks/useDrawerController";

export default function GoAuthButton() {
	const { setIsOpen } = useDrawerController();

	const onNavigate = () => {
		setIsOpen(false);
	};

	return (
		<Stack direction="column" spacing={3}>
			<AuthButton
				fullWidth={true}
				displayIn="xs"
				onNavigate={onNavigate}
			/>
		</Stack>
	);
}

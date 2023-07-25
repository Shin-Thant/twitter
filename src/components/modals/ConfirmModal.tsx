import {
	Button,
	Stack,
	Typography,
	styled
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useForm } from "react-hook-form";
import { StyledForm } from "../forms/AuthFormComponents";
import Modal from "./Modal";

type Props = {
	title: string;
	description: string;
	isOpen: boolean;
	onClose: () => void;
	actionLabel: string;
	action: () => Promise<void>;
};

const ConfirmModal = ({
	title,
	description,
	isOpen,
	onClose,
	actionLabel,
	action,
}: Props) => {
	const {
		handleSubmit,
		formState: { isSubmitting },
	} = useForm();

	const onSubmit = async () => {
		await action();
	};

	return (
		<Modal title={title} isOpen={isOpen} onClose={onClose}>
			<Typography sx={{ mb: 3 }}>{description}</Typography>

			<Stack
				direction="row"
				justifyContent={"flex-end"}
				alignItems={"center"}
				spacing={1}
			>
				<ActionButton
					variant="outlined"
					color="inherit"
					onClick={onClose}
					disabled={isSubmitting}
					sx={{
						borderColor: grey[400],
						color: grey[400],
					}}
				>
					Cancel
				</ActionButton>

				<StyledForm
					onSubmit={handleSubmit(onSubmit)}
					sx={{
						display: "inline-flex",
						width: "max-content",
					}}
				>
					<ActionButton
						variant="outlined"
						color="error"
						disabled={isSubmitting}
						type="submit"
					>
						{isSubmitting ? "Loading..." : actionLabel}
					</ActionButton>
				</StyledForm>
			</Stack>
		</Modal>
	);
};

const ActionButton = styled(Button)(({ theme }) => ({
	width: theme.spacing(11),
	borderRadius: "50px",
	textTransform: "none",
}));

export default ConfirmModal;

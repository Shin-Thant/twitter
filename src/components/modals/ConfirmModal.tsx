import { Button, Stack, Typography, styled } from "@mui/material";
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
			<Typography sx={{ mb: 4 }}>{description}</Typography>

			<Stack
				direction="row"
				justifyContent={"flex-end"}
				alignItems={"center"}
				spacing={1}
			>
				{/* change color in light mode (a little more dark) */}
				<ActionButton
					variant="outlined"
					color="inherit"
					onClick={onClose}
					disabled={isSubmitting}
					sx={{
						borderColor: "btn.grey.normal",
						color: "btn.grey.normal",
						// color: grey[400],
						"&:hover": {
							borderColor: "btn.grey.hover",
							color: "btn.grey.hover",
						},
					}}
				>
					Cancel
				</ActionButton>

				<StyledForm onSubmit={handleSubmit(onSubmit)}>
					<ActionButton
						disabled={isSubmitting}
						type="submit"
						variant="outlined"
						color="error"
					>
						{isSubmitting ? "Loading..." : actionLabel}
					</ActionButton>
				</StyledForm>
			</Stack>
		</Modal>
	);
};

const ActionButton = styled(Button)(({ theme }) => ({
	minWidth: theme.spacing(11),
	borderRadius: "50px",
	textTransform: "none",
}));

export default ConfirmModal;

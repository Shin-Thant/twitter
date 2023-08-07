import { Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import ModalActionButton from "../buttons/ModalActionButton";
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

			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack
					direction="row"
					justifyContent={"flex-end"}
					alignItems={"center"}
					spacing={1}
				>
					<ModalActionButton
						type="button"
						isLoading={isSubmitting}
						onClick={onClose}
						setGreyStyles={true}
					>
						Cancel
					</ModalActionButton>

					<ModalActionButton
						type="submit"
						isLoading={isSubmitting}
						color="error"
					>
						{isSubmitting ? "Loading..." : actionLabel}
					</ModalActionButton>
				</Stack>
			</form>
		</Modal>
	);
};

export default ConfirmModal;

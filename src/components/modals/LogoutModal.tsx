import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../../features/auth/authApiSlice";
import { setAuth } from "../../features/auth/authSlice";
import { setUser } from "../../features/user/userSlice";
import { useLogoutModal } from "../../hooks/useLogoutModal";
import { showToast } from "../../lib/handleToast";
import ConfirmModal from "./ConfirmModal";

const LogoutModal = () => {
	const dispatch = useDispatch();
	const { isOpen, setIsOpen } = useLogoutModal();
	const [logout, { isLoading }] = useLogoutMutation();

	const handleLogout = async () => {
		if (isLoading) return;
		try {
			await logout();
			dispatch(setAuth(null));
			dispatch(setUser(null));

			showToast({ message: "Successfully logout!", variant: "success" });
		} catch (err) {
			showToast({ message: "Something went wrong!", variant: "error" });
		} finally {
			setIsOpen(false);
		}
	};

	const onClose = () => {
		setIsOpen(false);
	};

	return (
		<ConfirmModal
			isOpen={isOpen}
			onClose={onClose}
			title="Logout"
			description="Are you sure to logout? You have to login again after this process!"
			actionLabel="Logout"
			action={handleLogout}
		/>
	);
};

export default LogoutModal;

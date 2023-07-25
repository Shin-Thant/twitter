import { useContext } from "react";
import { LogoutModalContext } from "../context/LogoutModalContext";

export const useLogoutModal = () => useContext(LogoutModalContext);

import { useContext } from "react";
import { ThemeModalContext } from "../context/ThemeModalContext";

const useThemeModal = () => useContext(ThemeModalContext);
export default useThemeModal;

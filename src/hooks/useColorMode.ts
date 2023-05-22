import { useContext } from "react";
import { ColorModeContext } from "../context/ColorModeContext";

const useColorMode = () => useContext(ColorModeContext);
export default useColorMode;

import { useContext } from "react";
import { NotiMenuContext } from "../context/NotiMenuContext";

export const useNotiMenuContext = () => useContext(NotiMenuContext);

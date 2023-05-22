import { useContext } from "react";
import { DrawerControllerContext } from "../context/DrawerControllerContext";

const useDrawerController = () => useContext(DrawerControllerContext);
export default useDrawerController;

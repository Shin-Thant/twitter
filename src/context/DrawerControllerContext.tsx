import { createModalContext } from "./createModalContext";
import withModalContext from "./WithModalContext";

export const DrawerControllerContext = createModalContext();

const DrawerControllerProvider = withModalContext(DrawerControllerContext);
export default DrawerControllerProvider;

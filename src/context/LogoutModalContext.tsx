import withModalContext from "./WithModalContext";
import { createModalContext } from "./createModalContext";

export const LogoutModalContext = createModalContext();

export const LogoutModalProvider = withModalContext(LogoutModalContext);

import withModalContext from "./WithModalContext";
import { createModalContext } from "./modalContextFactory";

export const LogoutModalContext = createModalContext();

export const LogoutModalProvider = withModalContext(LogoutModalContext);

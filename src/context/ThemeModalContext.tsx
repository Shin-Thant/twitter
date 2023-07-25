import { createModalContext } from "./createModalContext";
import withModalContext from "./WithModalContext";

export const ThemeModalContext = createModalContext();

const ThemeModalProvider = withModalContext(ThemeModalContext);
export default ThemeModalProvider;

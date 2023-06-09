import { useContext } from "react";
import { CurrentPageContext } from "../context/CurrentPageContext";

const useCurrentPage = () => useContext(CurrentPageContext);
export default useCurrentPage;

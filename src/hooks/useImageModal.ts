import { useContext } from "react";
import { ImageModalContext } from "../context/ImageModalContext";

export const useImageModal = () => useContext(ImageModalContext);

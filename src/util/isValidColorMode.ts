import { z } from "zod";
import { Mode } from "../context/ColorModeContext";

const ALLOWED_THEME_MODES = ["dark", "light", "system"];

const colorModeSchema = z
	.string({
		required_error: "No theme mode!",
		invalid_type_error: "Theme mode must be string!",
	})
	.trim()
	.refine((mode) => {
		return ALLOWED_THEME_MODES.indexOf(mode) !== -1;
	}, "Invalid theme mode!");

export default function isValidColorMode(mode: string | null): mode is Mode {
	return !!mode && colorModeSchema.safeParse(mode).success;
}

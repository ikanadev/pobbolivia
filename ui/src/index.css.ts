import { globalStyle } from "@vanilla-extract/css";
import { vars } from "./theme.css";

globalStyle("html", {
	fontFamily: vars.fonts.base,
	background: vars.colors.surface.s1,
	color: vars.colors.text.t1,
	fontSize: vars.fontSize.base,
});

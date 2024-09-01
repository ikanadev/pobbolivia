import { vars } from "@/theme.css";
import { style } from "@vanilla-extract/css";

export const title = style({
	color: vars.colors.primary.text,
	fontSize: vars.fontSize.xl,
	fontWeight: 800,
	letterSpacing: "-0.025em",
	marginBottom: vars.spacing.s4,
	textAlign: "center",
});
export const container = style({
	marginTop: vars.spacing.s10,
});
export const svgCont = style({
	maxWidth: "100%",
	width: "100%",
	overflowX: "auto",
});
export const svg = style({
	minWidth: "50rem",
	color: vars.colors.primary.text,
});
export const labelBot = style({
	fontSize: vars.fontSize.xs,
	color: vars.colors.text.t2,
});
export const labelLeft = style({
	fontFamily: "monospace",
	fontSize: vars.fontSize.xs,
	color: vars.colors.text.t2,
});


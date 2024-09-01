import { vars } from "src/theme.css";
import { style } from "@vanilla-extract/css";

export const container = style({
	display: "flex",
	alignItems: "center",
	gap: vars.spacing.s1,
	marginBottom: vars.spacing.s8,
});
export const backLink = style({
	color: vars.colors.primary.text,
	fontSize: vars.fontSize.xxl,
	textDecoration: "none",
})
export const title = style({
	color: vars.colors.primary.text,
	fontSize: vars.fontSize.xl,
	fontWeight: 800,
	letterSpacing: "-0.025em",
	textAlign: "center",
});

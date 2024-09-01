import { vars } from "@/theme.css";
import { style } from "@vanilla-extract/css";

export const container = style({
	maxWidth: "100%",
	width: vars.contentWidth,
	padding: vars.contentPadding,
	margin: "0 auto",
});
export const nav = style({
	display: "flex",
	gap: "1rem",
	alignItems: "center",
	justifyContent: "flex-end",
});
export const navThemeBtn = style({
	padding: vars.spacing.s1,
	color: vars.colors.text.t3,
});
export const navBtn = style({
	padding: vars.spacing.s2,
	color: vars.colors.text.t3,
	background: vars.colors.surface.s2,
	borderRadius: vars.spacing.s1,
});
export const footerCont = style({
	background: vars.colors.surface.s2,
});
export const footer = style([container, {
	color: vars.colors.text.t3,
	fontSize: vars.fontSize.xs,
	paddingTop: vars.spacing.s8,
	paddingBottom: vars.spacing.s8,
	display: "flex",
	justifyContent: "space-between",
	gap: vars.spacing.s6,
	flexWrap: "wrap",
}]);
export const footerLink = style({
	color: vars.colors.primary.text,
	textDecoration: "none",
	fontWeight: 600,
	// @ts-ignore
	'&:hover': {
		textDecoration: "underline",
	}
});

export const modalBackdrop = style({
	position: "fixed",
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	background: "rgba(0, 0, 0, 0.4)",
	backdropFilter: "blur(10px)",
	display: "grid",
	placeItems: "center",
	zIndex: 1,
});
export const modal = style({
	background: vars.colors.surface.s2,
	borderRadius: vars.spacing.s1,
	padding: vars.contentPadding,
	width: 600,
	maxWidth: "100vw",
	maxHeight: "100vh",
	overflow: "auto",
	display: "flex",
	flexDirection: "column",
	gap: vars.spacing.s5,
});
export const list = style({
	fontSize: vars.fontSize.xs,
	display: "flex",
	flexDirection: "column",
	gap: vars.spacing.s2,
});
export const modalBtn = style({
	padding: vars.spacing.s2,
	color: vars.colors.text.t3,
	background: vars.colors.surface.s3,
	borderRadius: vars.spacing.s1,
	alignSelf: "flex-end",
	fontWeight: 600,
});

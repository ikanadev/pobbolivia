import { vars } from "@/theme.css";
import { style, keyframes } from "@vanilla-extract/css";

const rotation = keyframes({
	"0%": {
		transform: "rotate(0deg)",
	},
	"100%": {
		transform: "rotate(360deg)",
	},
});
export const loaderCont = style({
	display: "grid",
	placeItems: "center",
	width: "100%",
	height: "300px",
});
export const loader = style({
	width: "48px",
	height: "48px",
	borderRadius: "50%",
	display: "inline-block",
	borderTop: "3px solid #FFF",
	borderTopColor: vars.colors.text.t3,
	borderRight: "3px solid transparent",
	boxSizing: "border-box",
	animation: "rotation 1s linear infinite",
	animationName: rotation,
});

import { vars } from "@/theme.css";
import { style } from "@vanilla-extract/css";

export const container = style({
	maxWidth: "100%",
	width: "100%",
	overflowX: "auto",
	marginTop: vars.spacing.s10,
});
export const table = style({
	borderCollapse: "collapse",
	fontSize: vars.fontSize.sm,
	margin: "0 auto",
});
const tCell = style({
	paddingLeft: vars.spacing.s6,
	color: vars.colors.text.t2,
	textWrap: "nowrap",
});
export const tHeadCell = style([
	tCell,
	{
		fontWeight: 600,
		paddingBottom: vars.spacing.s4,
	},
]);
export const tHeadCellCrec = style([
	tHeadCell,
	{
		textAlign: "left",
		paddingLeft: vars.spacing.s3,
	},
]);
export const tHeadCellYear = style([
	tHeadCell,
	{
		textAlign: "right",
	},
]);

export const tBodyCell = style([
	tCell,
	{
		borderTop: `1px solid ${vars.colors.surface.s3}`,
		paddingBottom: vars.spacing.s1,
		paddingTop: vars.spacing.s1,
	},
]);
export const tBodyCellPop = style([
	tBodyCell,
	{
		textAlign: "right",
		fontFamily: "monospace",
	},
]);
export const tBodyCellCrec = style([
	tBodyCell,
	{
		textAlign: "left",
		paddingLeft: vars.spacing.s3,
	},
]);

export const percent = style({
	fontSize: vars.fontSize.xs,
	fontFamily: "monospace",
	fontWeight: 600,
});
export const percentPositive = style({
	color: "green",
});
export const percentNegative = style({
	color: "red",
});

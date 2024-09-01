import { format } from "d3";
import { createSignal } from "solid-js";

export const numberFormat = format(",.0f");
export const numberAbbr = format("~s");

const [isDark, setIsDark] = createSignal(false);
export const themeStatus = { isDark, setIsDark };

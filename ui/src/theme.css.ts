import {
	createThemeContract,
	createTheme,
	createGlobalTheme,
} from "@vanilla-extract/css";

const root = createGlobalTheme("html", {
	fonts: {
		base: 'ui-sans-serif, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;',
	},
	fontSize: {
		xs: "0.875rem",
		sm: "1rem",
		base: "1.125rem",
		lg: "1.25rem",
		xl: "1.5rem",
		xxl: "2rem",
		xxxl: "3rem",
	},
	contentWidth: "60rem",
	contentPadding: "clamp(1rem, 2vw, 1.5rem)",
	spacing: {
		s1: "0.25rem",
		s2: "0.5rem",
		s3: "0.75rem",
		s4: "1rem",
		s5: "1.25rem",
		s6: "1.5rem",
		s7: "1.75rem",
		s8: "2rem",
		s9: "2.25rem",
		s10: "2.5rem",
		s11: "2.75rem",
		s12: "3rem",
	},
});

const colors = createThemeContract({
	surface: { s1: "", s2: "", s3: "" },
	text: { t1: "", t2: "", t3: "" },
	primary: { base: "", light: "", dark: "", text: "" },
	chart: {min: "", max: ""},
});

export const lightTheme = createTheme(colors, {
	surface: {
		s1: "#f9fafb",
		s2: "#f3f4f6",
		s3: "#dadbdf",
	},
	text: {
		t1: "#111827",
		t2: "#374151",
		t3: "#374151",
	},
	primary: {
		base: "#303d9b",
		light: "#3b4bc3",
		dark: "#202d8b",
		text: "#6b6bef",
	},
	chart: { min: "#93c5fd", max: "#2563eb", },
});
export const darkTheme = createTheme(colors, {
	surface: {
		s1: "#0e0e10",
		s2: "#18181b",
		s3: "#27272a",
	},
	text: {
		t1: "#f4f4f5",
		t2: "#e0e0e3",
		t3: "#dadadc",
	},
	primary: {
		base: "#3b4bc3",
		light: "#4b5bd3",
		dark: "#303d9b",
		text: "#7b7bff",
	},
	chart: { min: "#172554", max: "#1d4ed8", },
});

export const vars = { ...root, colors };

/*
font-family: 
@keyframes skeleton {
	0% {
		opacity: 1;
	}
	100% {
		opacity: 0.6;
	}
}
.skeleton {
	animation: skeleton 1s ease-in-out infinite alternate;
}
*/

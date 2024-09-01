import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

// biome-ignore lint/style/useNodejsImportProtocol: We are in front end
import path from "path";

export default defineConfig({
	plugins: [vanillaExtractPlugin(), solid()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});

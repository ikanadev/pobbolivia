import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import UnoCSS from 'unocss/vite';

// biome-ignore lint/style/useNodejsImportProtocol: We are in front end
import path from "path";

export default defineConfig({
	plugins: [UnoCSS(), solid()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
})

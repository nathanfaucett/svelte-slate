import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import fs from 'node:fs';

// https://vitejs.dev/config/
export default defineConfig(async () => {
	const pkg = JSON.parse(fs.readFileSync(new URL('package.json', import.meta.url), 'utf8'));

	/** @type {import('vite').UserConfig} */
	return {
		clearScreen: false,
		server: {
			host: '0.0.0.0',
			port: 5173,
			strictPort: true,
			hmr: {
				protocol: 'ws',
				host: '0.0.0.0',
				port: 5183
			}
		},
		preview: {
			host: '0.0.0.0',
			port: 5173,
			strictPort: true
		},
		plugins: [sveltekit()],
		define: {
			__VERSION__: JSON.stringify(pkg.version),
			__DESCRIPTION__: JSON.stringify(pkg.description),
			__KEYWORDS__: JSON.stringify(pkg.keywords)
		}
	};
});

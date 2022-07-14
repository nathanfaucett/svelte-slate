import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';
import fs from 'fs';

const pkg = JSON.parse(fs.readFileSync(new URL('package.json', import.meta.url), 'utf8'));

/** @type {import('vite').UserConfig} */
const config = {
	server: {
		port: 3000
	},
	preview: {
		port: 3000
	},
	define: {
		PACKAGE_JSON: JSON.stringify(pkg)
	},
	resolve: {
		alias: {
			'svelte-slate': path.resolve('src/lib')
		}
	},
	plugins: [sveltekit()]
};

export default config;

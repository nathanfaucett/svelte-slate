import fs from 'fs';
import path from 'path';
import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

const pkg = JSON.parse(fs.readFileSync(new URL('package.json', import.meta.url), 'utf8'));

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: 'index.html',
			precompress: true
		}),
		appDir: 'internal',
		paths: {
			base: process.env.USE_BASE_PATH ? '/svelte-slate' : ''
		},
		vite: {
			define: {
				PACKAGE_JSON: JSON.stringify(pkg)
			},
			resolve: {
				alias: {
					'svelte-slate': path.resolve('src/lib')
				}
			}
		}
	}
};

export default config;

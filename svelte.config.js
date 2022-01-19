import path from 'path';
import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),
	kit: {
		adapter: adapter(),
		target: '#svelte',
		appDir: 'internal',
		paths: {
			base: process.env.USE_BASE_PATH ? '/svelte-slate' : ''
		},
		vite: {
			resolve: {
				alias: {
					'svelte-slate': path.resolve('src/lib')
				}
			}
		}
	}
};

export default config;

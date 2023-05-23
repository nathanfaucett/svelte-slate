import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import { resolve } from 'node:path';

const tagsRegex1 = /(>)[\s]*([<{])/g;
const tagsRegex2 = /({[/:][a-z]+})[\s]*([<{])/g;
const tagsRegex3 = /({[#:][a-z]+ .+?})[\s]*([<{])/g;
const tagsRegex4 = /([>}])[\s]+(<|{[/#:][a-z][^}]*})/g;
const tagsReplace = '$1$2';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess({
		replace: [
			[tagsRegex1, tagsReplace],
			[tagsRegex2, tagsReplace],
			[tagsRegex3, tagsReplace],
			[tagsRegex4, tagsReplace]
		]
	}),
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
		alias: {
			'svelte-slate': './src/lib'
		}
	}
};

export default config;

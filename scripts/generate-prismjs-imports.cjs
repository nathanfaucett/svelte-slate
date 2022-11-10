const { truncateSync, createWriteStream } = require('fs');
const { languages } = require('prismjs/components.json');

const IMPORT_PATH = 'prismjs/components/';
const OUTPUT_PATH = __dirname + '/../src/lib/plugins/prismjs.ts';
const CORE_NAME = 'prism-core.min.js';

/** @type {{name: string; file: string; deps: string[]}[]} */
const fileObjects = Object.entries(languages)
	.filter(([id]) => id !== 'meta')
	.map(([id, lang]) => {
		return {
			id,
			name: lang.title || id,
			file: `prism-${id}.min.js`,
			deps: Array.isArray(lang.require) ? lang.require : lang.require ? [lang.require] : []
		};
	});

/** @type {{[key: string]: {name: string; file: string; deps: string[]}}} */
const fileObjectsByFile = fileObjects.reduce((acc, fileObject) => {
	acc[fileObject.id] = fileObject;
	return acc;
}, {});

fileObjects.forEach((fileObject) => {
	fileObject.deps = fileObject.deps.map((id) => fileObjectsByFile[id]);
});

/**
 * @param {string} file
 * @returns {string}
 */
function importFn(file) {
	return `import("${IMPORT_PATH}${file}")`;
}

/** @type {[file: {name: string; file: string; deps: string[]}, import: string][]} */
const imports = [];
/** @type {Set<[string]>} */
const alreadyImported = new Set();

/**
 * @param {{name: string; file: string; deps: string[]}} file
 */
function addImport(fileObject) {
	if (alreadyImported.has(fileObject.id)) {
		return;
	}
	alreadyImported.add(fileObject.id);
	fileObject.deps.forEach(addImport);
	imports.push([
		fileObject,
		fileObject.deps.length === 0
			? importFn(fileObject.file)
			: fileObject.deps.length === 1
			? `${importFn(fileObject.deps[0].file)}.then(() => ${importFn(fileObject.file)})`
			: `Promise.all([${fileObject.deps
					.map((d) => importFn(d.file))
					.join(', ')}]).then(() => ${importFn(fileObject.file)})`
	]);
}

fileObjects.forEach(addImport);

truncateSync(OUTPUT_PATH, 0);

const writeStream = createWriteStream(OUTPUT_PATH);

writeStream.write(`import "prismjs";\n`);
writeStream.write(`import "${IMPORT_PATH}${CORE_NAME}";\n`);
writeStream.write('export const languages = {\n');
imports.forEach(([file, importFn]) =>
	writeStream.write(`\t"${file.id}": {name: "${file.name}", loader: () => ${importFn}},\n`)
);
writeStream.write('};\n');

writeStream.on('error', (err) => {
	console.error(`There is an error writing the file ${OUTPUT_PATH}: ${err}`);
});
writeStream.end();

const { truncateSync, createWriteStream, readdirSync } = require('fs');
const { basename } = require('path');
const { writable } = require('svelte/store');
const { LANG_FILE_TO_NAME, LANG_NAME_TO_DEPS } = require('./prismjs-deps.cjs');

const BASE_PATH = __dirname + '/../node_modules/prismjs/components/';
const IMPORT_PATH = 'prismjs/components/';
const OUTPUT_PATH = __dirname + '/../src/lib/plugins/prismjs.ts';
const CORE_NAME = 'prism-core.min.js';

/** @type {function(import('fs').Dirent): string} */
function getFileName(item) {
	return basename(item.name, '.min.js').substring('prism-'.length);
}

/**
 * @interface FileObject
 * @member {string} name
 * @member {string} file
 * @member {Array.<FileObject>} deps
 */

const files = readdirSync(BASE_PATH, { withFileTypes: true }).filter(
	(item) =>
		!item.isDirectory() &&
		item.name.startsWith('prism-') &&
		item.name.endsWith('.min.js') &&
		item.name !== CORE_NAME
);

/** @type {Array.<FileObject>} */
const fileObjects = files.map(getFileName).map((file) => {
	const name = LANG_FILE_TO_NAME[file] || file;
	const deps = LANG_NAME_TO_DEPS[name] || [];
	return {
		name,
		file,
		deps: Array.isArray(deps) ? deps : [deps]
	};
});

/** @type {Object.<string, FileObject>} */
const fileObjectsByFile = fileObjects.reduce((acc, fileObject) => {
	acc[fileObject.file] = fileObject;
	return acc;
}, {});

fileObjects.forEach((fileObject) => {
	fileObject.deps = fileObject.deps.map((file) => fileObjectsByFile[file]);
});

/** @type {function(string): string} */
function getPrismFileName(file) {
	return `prism-${file}.min.js`;
}

/** @type {function(string): string} */
function importFn(file) {
	return `import("${IMPORT_PATH}${getPrismFileName(file)}")`;
}

/** @type {Array.<[string, string]>} */
const imports = [];
const alreadyImported = new Set();

/** @type {function(FileObject)} */
function addImport(fileObject) {
	if (alreadyImported.has(fileObject.file)) {
		return;
	}
	alreadyImported.add(fileObject.file);
	fileObject.deps.forEach(addImport);
	imports.push([
		fileObject.file,
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

writeStream.write(`import Prism from "prismjs";\n`);
writeStream.write(`if (typeof window !== "undefined") {\n`);
writeStream.write(`\t// @ts-ignore\n`);
writeStream.write(`\twindow.Prism = Prism || {};\n`);
writeStream.write(`\twindow.Prism.manual = true;\n`);
writeStream.write(`}\n`);
writeStream.write(`import "${IMPORT_PATH}${CORE_NAME}";\n`);
writeStream.write('export const languages = {\n');
imports.forEach(([name, importFn]) => writeStream.write(`\t"${name}": () => ${importFn},\n`));
writeStream.write('};\n');

writeStream.on('error', (err) => {
	console.error(`There is an error writing the file ${OUTPUT_PATH}: ${err}`);
});
writeStream.end();

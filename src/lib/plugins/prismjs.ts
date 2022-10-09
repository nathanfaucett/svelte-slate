import 'prismjs';
import 'prismjs/components/prism-core.min.js';
export const languages = {
	abap: () => import('prismjs/components/prism-abap.min.js'),
	abnf: () => import('prismjs/components/prism-abnf.min.js'),
	clike: () => import('prismjs/components/prism-clike.min.js'),
	javascript: () =>
		import('prismjs/components/prism-clike.min.js').then(
			() => import('prismjs/components/prism-javascript.min.js')
		),
	actionscript: () =>
		import('prismjs/components/prism-javascript.min.js').then(
			() => import('prismjs/components/prism-actionscript.min.js')
		),
	ada: () => import('prismjs/components/prism-ada.min.js'),
	agda: () => import('prismjs/components/prism-agda.min.js'),
	al: () => import('prismjs/components/prism-al.min.js'),
	antlr4: () => import('prismjs/components/prism-antlr4.min.js'),
	apacheconf: () => import('prismjs/components/prism-apacheconf.min.js'),
	sql: () => import('prismjs/components/prism-sql.min.js'),
	apex: () =>
		Promise.all([
			import('prismjs/components/prism-clike.min.js'),
			import('prismjs/components/prism-sql.min.js')
		]).then(() => import('prismjs/components/prism-apex.min.js')),
	apl: () => import('prismjs/components/prism-apl.min.js'),
	applescript: () => import('prismjs/components/prism-applescript.min.js'),
	aql: () => import('prismjs/components/prism-aql.min.js'),
	c: () =>
		import('prismjs/components/prism-clike.min.js').then(
			() => import('prismjs/components/prism-c.min.js')
		),
	cpp: () =>
		import('prismjs/components/prism-c.min.js').then(
			() => import('prismjs/components/prism-cpp.min.js')
		),
	arduino: () =>
		import('prismjs/components/prism-cpp.min.js').then(
			() => import('prismjs/components/prism-arduino.min.js')
		),
	arff: () => import('prismjs/components/prism-arff.min.js'),
	armasm: () => import('prismjs/components/prism-armasm.min.js'),
	arturo: () => import('prismjs/components/prism-arturo.min.js'),
	asciidoc: () => import('prismjs/components/prism-asciidoc.min.js'),
	asm6502: () => import('prismjs/components/prism-asm6502.min.js'),
	asmatmel: () => import('prismjs/components/prism-asmatmel.min.js'),
	markup: () => import('prismjs/components/prism-markup.min.js'),
	csharp: () =>
		import('prismjs/components/prism-clike.min.js').then(
			() => import('prismjs/components/prism-csharp.min.js')
		),
	aspnet: () =>
		Promise.all([
			import('prismjs/components/prism-markup.min.js'),
			import('prismjs/components/prism-csharp.min.js')
		]).then(() => import('prismjs/components/prism-aspnet.min.js')),
	autohotkey: () => import('prismjs/components/prism-autohotkey.min.js'),
	autoit: () => import('prismjs/components/prism-autoit.min.js'),
	avisynth: () => import('prismjs/components/prism-avisynth.min.js'),
	'avro-idl': () => import('prismjs/components/prism-avro-idl.min.js'),
	awk: () => import('prismjs/components/prism-awk.min.js'),
	bash: () => import('prismjs/components/prism-bash.min.js'),
	basic: () => import('prismjs/components/prism-basic.min.js'),
	batch: () => import('prismjs/components/prism-batch.min.js'),
	bbcode: () => import('prismjs/components/prism-bbcode.min.js'),
	bbj: () => import('prismjs/components/prism-bbj.min.js'),
	bicep: () => import('prismjs/components/prism-bicep.min.js'),
	birb: () =>
		import('prismjs/components/prism-clike.min.js').then(
			() => import('prismjs/components/prism-birb.min.js')
		),
	bison: () =>
		import('prismjs/components/prism-c.min.js').then(
			() => import('prismjs/components/prism-bison.min.js')
		),
	bnf: () => import('prismjs/components/prism-bnf.min.js'),
	bqn: () => import('prismjs/components/prism-bqn.min.js'),
	brainfuck: () => import('prismjs/components/prism-brainfuck.min.js'),
	brightscript: () => import('prismjs/components/prism-brightscript.min.js'),
	bro: () => import('prismjs/components/prism-bro.min.js'),
	bsl: () => import('prismjs/components/prism-bsl.min.js'),
	cfscript: () =>
		import('prismjs/components/prism-clike.min.js').then(
			() => import('prismjs/components/prism-cfscript.min.js')
		),
	chaiscript: () =>
		Promise.all([
			import('prismjs/components/prism-clike.min.js'),
			import('prismjs/components/prism-cpp.min.js')
		]).then(() => import('prismjs/components/prism-chaiscript.min.js')),
	cil: () => import('prismjs/components/prism-cil.min.js'),
	cilkc: () => import('prismjs/components/prism-cilkc.min.js'),
	cilkcpp: () => import('prismjs/components/prism-cilkcpp.min.js'),
	clojure: () => import('prismjs/components/prism-clojure.min.js'),
	cmake: () => import('prismjs/components/prism-cmake.min.js'),
	cobol: () => import('prismjs/components/prism-cobol.min.js'),
	coffeescript: () =>
		import('prismjs/components/prism-javascript.min.js').then(
			() => import('prismjs/components/prism-coffeescript.min.js')
		),
	concurnas: () => import('prismjs/components/prism-concurnas.min.js'),
	cooklang: () => import('prismjs/components/prism-cooklang.min.js'),
	coq: () => import('prismjs/components/prism-coq.min.js'),
	ruby: () =>
		import('prismjs/components/prism-clike.min.js').then(
			() => import('prismjs/components/prism-ruby.min.js')
		),
	crystal: () =>
		import('prismjs/components/prism-ruby.min.js').then(
			() => import('prismjs/components/prism-crystal.min.js')
		),
	cshtml: () =>
		Promise.all([
			import('prismjs/components/prism-markup.min.js'),
			import('prismjs/components/prism-csharp.min.js')
		]).then(() => import('prismjs/components/prism-cshtml.min.js')),
	csp: () => import('prismjs/components/prism-csp.min.js'),
	css: () => import('prismjs/components/prism-css.min.js'),
	'css-extras': () =>
		import('prismjs/components/prism-css.min.js').then(
			() => import('prismjs/components/prism-css-extras.min.js')
		),
	csv: () => import('prismjs/components/prism-csv.min.js'),
	cue: () => import('prismjs/components/prism-cue.min.js'),
	cypher: () => import('prismjs/components/prism-cypher.min.js'),
	d: () =>
		import('prismjs/components/prism-clike.min.js').then(
			() => import('prismjs/components/prism-d.min.js')
		),
	dart: () =>
		import('prismjs/components/prism-clike.min.js').then(
			() => import('prismjs/components/prism-dart.min.js')
		),
	dataweave: () => import('prismjs/components/prism-dataweave.min.js'),
	dax: () => import('prismjs/components/prism-dax.min.js'),
	dhall: () => import('prismjs/components/prism-dhall.min.js'),
	diff: () => import('prismjs/components/prism-diff.min.js'),
	'markup-templating': () =>
		import('prismjs/components/prism-markup.min.js').then(
			() => import('prismjs/components/prism-markup-templating.min.js')
		),
	django: () =>
		import('prismjs/components/prism-markup-templating.min.js').then(
			() => import('prismjs/components/prism-django.min.js')
		),
	'dns-zone-file': () => import('prismjs/components/prism-dns-zone-file.min.js'),
	docker: () => import('prismjs/components/prism-docker.min.js'),
	dot: () => import('prismjs/components/prism-dot.min.js'),
	ebnf: () => import('prismjs/components/prism-ebnf.min.js'),
	editorconfig: () => import('prismjs/components/prism-editorconfig.min.js'),
	eiffel: () => import('prismjs/components/prism-eiffel.min.js'),
	ejs: () =>
		Promise.all([
			import('prismjs/components/prism-javascript.min.js'),
			import('prismjs/components/prism-markup-templating.min.js')
		]).then(() => import('prismjs/components/prism-ejs.min.js')),
	elixir: () => import('prismjs/components/prism-elixir.min.js'),
	elm: () => import('prismjs/components/prism-elm.min.js'),
	erb: () =>
		Promise.all([
			import('prismjs/components/prism-ruby.min.js'),
			import('prismjs/components/prism-markup-templating.min.js')
		]).then(() => import('prismjs/components/prism-erb.min.js')),
	erlang: () => import('prismjs/components/prism-erlang.min.js'),
	lua: () => import('prismjs/components/prism-lua.min.js'),
	etlua: () =>
		Promise.all([
			import('prismjs/components/prism-lua.min.js'),
			import('prismjs/components/prism-markup-templating.min.js')
		]).then(() => import('prismjs/components/prism-etlua.min.js')),
	'excel-formula': () => import('prismjs/components/prism-excel-formula.min.js'),
	factor: () => import('prismjs/components/prism-factor.min.js'),
	false: () => import('prismjs/components/prism-false.min.js'),
	'firestore-security-rules': () =>
		import('prismjs/components/prism-clike.min.js').then(
			() => import('prismjs/components/prism-firestore-security-rules.min.js')
		),
	flow: () =>
		import('prismjs/components/prism-javascript.min.js').then(
			() => import('prismjs/components/prism-flow.min.js')
		),
	fortran: () => import('prismjs/components/prism-fortran.min.js'),
	fsharp: () =>
		import('prismjs/components/prism-clike.min.js').then(
			() => import('prismjs/components/prism-fsharp.min.js')
		),
	ftl: () =>
		import('prismjs/components/prism-markup-templating.min.js').then(
			() => import('prismjs/components/prism-ftl.min.js')
		),
	gap: () => import('prismjs/components/prism-gap.min.js'),
	gcode: () => import('prismjs/components/prism-gcode.min.js'),
	gdscript: () => import('prismjs/components/prism-gdscript.min.js'),
	gedcom: () => import('prismjs/components/prism-gedcom.min.js'),
	gettext: () => import('prismjs/components/prism-gettext.min.js'),
	gherkin: () => import('prismjs/components/prism-gherkin.min.js'),
	git: () => import('prismjs/components/prism-git.min.js'),
	glsl: () =>
		import('prismjs/components/prism-c.min.js').then(
			() => import('prismjs/components/prism-glsl.min.js')
		),
	gml: () =>
		import('prismjs/components/prism-clike.min.js').then(
			() => import('prismjs/components/prism-gml.min.js')
		),
	gn: () => import('prismjs/components/prism-gn.min.js'),
	'go-module': () => import('prismjs/components/prism-go-module.min.js'),
	go: () =>
		import('prismjs/components/prism-clike.min.js').then(
			() => import('prismjs/components/prism-go.min.js')
		),
	gradle: () => import('prismjs/components/prism-gradle.min.js'),
	graphql: () => import('prismjs/components/prism-graphql.min.js'),
	groovy: () =>
		import('prismjs/components/prism-clike.min.js').then(
			() => import('prismjs/components/prism-groovy.min.js')
		),
	haml: () =>
		import('prismjs/components/prism-ruby.min.js').then(
			() => import('prismjs/components/prism-haml.min.js')
		),
	handlebars: () =>
		import('prismjs/components/prism-markup-templating.min.js').then(
			() => import('prismjs/components/prism-handlebars.min.js')
		),
	haskell: () => import('prismjs/components/prism-haskell.min.js'),
	haxe: () =>
		import('prismjs/components/prism-clike.min.js').then(
			() => import('prismjs/components/prism-haxe.min.js')
		),
	hcl: () => import('prismjs/components/prism-hcl.min.js'),
	hlsl: () =>
		import('prismjs/components/prism-c.min.js').then(
			() => import('prismjs/components/prism-hlsl.min.js')
		),
	hoon: () => import('prismjs/components/prism-hoon.min.js'),
	hpkp: () => import('prismjs/components/prism-hpkp.min.js'),
	hsts: () => import('prismjs/components/prism-hsts.min.js'),
	http: () => import('prismjs/components/prism-http.min.js'),
	ichigojam: () => import('prismjs/components/prism-ichigojam.min.js'),
	icon: () => import('prismjs/components/prism-icon.min.js'),
	'icu-message-format': () => import('prismjs/components/prism-icu-message-format.min.js'),
	idris: () =>
		import('prismjs/components/prism-haskell.min.js').then(
			() => import('prismjs/components/prism-idris.min.js')
		),
	iecst: () => import('prismjs/components/prism-iecst.min.js'),
	ignore: () => import('prismjs/components/prism-ignore.min.js'),
	inform7: () => import('prismjs/components/prism-inform7.min.js'),
	ini: () => import('prismjs/components/prism-ini.min.js'),
	io: () => import('prismjs/components/prism-io.min.js'),
	j: () => import('prismjs/components/prism-j.min.js'),
	java: () =>
		import('prismjs/components/prism-clike.min.js').then(
			() => import('prismjs/components/prism-java.min.js')
		),
	javadoclike: () => import('prismjs/components/prism-javadoclike.min.js'),
	javadoc: () =>
		Promise.all([
			import('prismjs/components/prism-markup.min.js'),
			import('prismjs/components/prism-java.min.js'),
			import('prismjs/components/prism-javadoclike.min.js')
		]).then(() => import('prismjs/components/prism-javadoc.min.js')),
	javastacktrace: () => import('prismjs/components/prism-javastacktrace.min.js'),
	jexl: () => import('prismjs/components/prism-jexl.min.js'),
	jolie: () =>
		import('prismjs/components/prism-clike.min.js').then(
			() => import('prismjs/components/prism-jolie.min.js')
		),
	jq: () => import('prismjs/components/prism-jq.min.js'),
	'js-extras': () =>
		import('prismjs/components/prism-javascript.min.js').then(
			() => import('prismjs/components/prism-js-extras.min.js')
		),
	'js-templates': () =>
		import('prismjs/components/prism-javascript.min.js').then(
			() => import('prismjs/components/prism-js-templates.min.js')
		),
	typescript: () =>
		import('prismjs/components/prism-javascript.min.js').then(
			() => import('prismjs/components/prism-typescript.min.js')
		),
	jsdoc: () =>
		Promise.all([
			import('prismjs/components/prism-javascript.min.js'),
			import('prismjs/components/prism-javadoclike.min.js'),
			import('prismjs/components/prism-typescript.min.js')
		]).then(() => import('prismjs/components/prism-jsdoc.min.js')),
	json: () => import('prismjs/components/prism-json.min.js'),
	json5: () =>
		import('prismjs/components/prism-json.min.js').then(
			() => import('prismjs/components/prism-json5.min.js')
		),
	jsonp: () =>
		import('prismjs/components/prism-json.min.js').then(
			() => import('prismjs/components/prism-jsonp.min.js')
		),
	jsstacktrace: () => import('prismjs/components/prism-jsstacktrace.min.js'),
	jsx: () =>
		Promise.all([
			import('prismjs/components/prism-markup.min.js'),
			import('prismjs/components/prism-javascript.min.js')
		]).then(() => import('prismjs/components/prism-jsx.min.js')),
	julia: () => import('prismjs/components/prism-julia.min.js'),
	keepalived: () => import('prismjs/components/prism-keepalived.min.js'),
	keyman: () => import('prismjs/components/prism-keyman.min.js'),
	kotlin: () =>
		import('prismjs/components/prism-clike.min.js').then(
			() => import('prismjs/components/prism-kotlin.min.js')
		),
	kumir: () => import('prismjs/components/prism-kumir.min.js'),
	kusto: () => import('prismjs/components/prism-kusto.min.js'),
	latex: () => import('prismjs/components/prism-latex.min.js'),
	php: () =>
		import('prismjs/components/prism-markup-templating.min.js').then(
			() => import('prismjs/components/prism-php.min.js')
		),
	latte: () =>
		Promise.all([
			import('prismjs/components/prism-clike.min.js'),
			import('prismjs/components/prism-markup-templating.min.js'),
			import('prismjs/components/prism-php.min.js')
		]).then(() => import('prismjs/components/prism-latte.min.js')),
	less: () =>
		import('prismjs/components/prism-css.min.js').then(
			() => import('prismjs/components/prism-less.min.js')
		),
	scheme: () => import('prismjs/components/prism-scheme.min.js'),
	lilypond: () =>
		import('prismjs/components/prism-scheme.min.js').then(
			() => import('prismjs/components/prism-lilypond.min.js')
		),
	'linker-script': () => import('prismjs/components/prism-linker-script.min.js'),
	liquid: () =>
		import('prismjs/components/prism-markup-templating.min.js').then(
			() => import('prismjs/components/prism-liquid.min.js')
		),
	lisp: () => import('prismjs/components/prism-lisp.min.js'),
	livescript: () => import('prismjs/components/prism-livescript.min.js'),
	llvm: () => import('prismjs/components/prism-llvm.min.js'),
	log: () => import('prismjs/components/prism-log.min.js'),
	lolcode: () => import('prismjs/components/prism-lolcode.min.js'),
	magma: () => import('prismjs/components/prism-magma.min.js'),
	makefile: () => import('prismjs/components/prism-makefile.min.js'),
	markdown: () =>
		import('prismjs/components/prism-markup.min.js').then(
			() => import('prismjs/components/prism-markdown.min.js')
		),
	mata: () => import('prismjs/components/prism-mata.min.js'),
	matlab: () => import('prismjs/components/prism-matlab.min.js'),
	maxscript: () => import('prismjs/components/prism-maxscript.min.js'),
	mel: () => import('prismjs/components/prism-mel.min.js'),
	mermaid: () => import('prismjs/components/prism-mermaid.min.js'),
	metafont: () => import('prismjs/components/prism-metafont.min.js'),
	mizar: () => import('prismjs/components/prism-mizar.min.js'),
	mongodb: () =>
		import('prismjs/components/prism-javascript.min.js').then(
			() => import('prismjs/components/prism-mongodb.min.js')
		),
	monkey: () => import('prismjs/components/prism-monkey.min.js'),
	moonscript: () => import('prismjs/components/prism-moonscript.min.js'),
	n1ql: () => import('prismjs/components/prism-n1ql.min.js'),
	n4js: () =>
		import('prismjs/components/prism-javascript.min.js').then(
			() => import('prismjs/components/prism-n4js.min.js')
		),
	'nand2tetris-hdl': () => import('prismjs/components/prism-nand2tetris-hdl.min.js'),
	naniscript: () => import('prismjs/components/prism-naniscript.min.js'),
	nasm: () => import('prismjs/components/prism-nasm.min.js'),
	neon: () => import('prismjs/components/prism-neon.min.js'),
	nevod: () => import('prismjs/components/prism-nevod.min.js'),
	nginx: () => import('prismjs/components/prism-nginx.min.js'),
	nim: () => import('prismjs/components/prism-nim.min.js'),
	nix: () => import('prismjs/components/prism-nix.min.js'),
	nsis: () => import('prismjs/components/prism-nsis.min.js'),
	objectivec: () =>
		import('prismjs/components/prism-c.min.js').then(
			() => import('prismjs/components/prism-objectivec.min.js')
		),
	ocaml: () => import('prismjs/components/prism-ocaml.min.js'),
	odin: () => import('prismjs/components/prism-odin.min.js'),
	opencl: () =>
		import('prismjs/components/prism-c.min.js').then(
			() => import('prismjs/components/prism-opencl.min.js')
		),
	openqasm: () => import('prismjs/components/prism-openqasm.min.js'),
	oz: () => import('prismjs/components/prism-oz.min.js'),
	parigp: () => import('prismjs/components/prism-parigp.min.js'),
	parser: () =>
		import('prismjs/components/prism-markup.min.js').then(
			() => import('prismjs/components/prism-parser.min.js')
		),
	pascal: () => import('prismjs/components/prism-pascal.min.js'),
	pascaligo: () => import('prismjs/components/prism-pascaligo.min.js'),
	pcaxis: () => import('prismjs/components/prism-pcaxis.min.js'),
	peoplecode: () => import('prismjs/components/prism-peoplecode.min.js'),
	perl: () => import('prismjs/components/prism-perl.min.js'),
	'php-extras': () =>
		import('prismjs/components/prism-php.min.js').then(
			() => import('prismjs/components/prism-php-extras.min.js')
		),
	phpdoc: () =>
		Promise.all([
			import('prismjs/components/prism-php.min.js'),
			import('prismjs/components/prism-javadoclike.min.js')
		]).then(() => import('prismjs/components/prism-phpdoc.min.js')),
	'plant-uml': () => import('prismjs/components/prism-plant-uml.min.js'),
	plsql: () =>
		import('prismjs/components/prism-sql.min.js').then(
			() => import('prismjs/components/prism-plsql.min.js')
		),
	powerquery: () => import('prismjs/components/prism-powerquery.min.js'),
	powershell: () => import('prismjs/components/prism-powershell.min.js'),
	processing: () =>
		import('prismjs/components/prism-clike.min.js').then(
			() => import('prismjs/components/prism-processing.min.js')
		),
	prolog: () => import('prismjs/components/prism-prolog.min.js'),
	promql: () => import('prismjs/components/prism-promql.min.js'),
	properties: () => import('prismjs/components/prism-properties.min.js'),
	protobuf: () =>
		import('prismjs/components/prism-clike.min.js').then(
			() => import('prismjs/components/prism-protobuf.min.js')
		),
	psl: () => import('prismjs/components/prism-psl.min.js'),
	pug: () =>
		Promise.all([
			import('prismjs/components/prism-markup.min.js'),
			import('prismjs/components/prism-javascript.min.js')
		]).then(() => import('prismjs/components/prism-pug.min.js')),
	puppet: () => import('prismjs/components/prism-puppet.min.js'),
	pure: () => import('prismjs/components/prism-pure.min.js'),
	purebasic: () =>
		import('prismjs/components/prism-clike.min.js').then(
			() => import('prismjs/components/prism-purebasic.min.js')
		),
	purescript: () =>
		import('prismjs/components/prism-haskell.min.js').then(
			() => import('prismjs/components/prism-purescript.min.js')
		),
	python: () => import('prismjs/components/prism-python.min.js'),
	q: () => import('prismjs/components/prism-q.min.js'),
	qml: () =>
		import('prismjs/components/prism-javascript.min.js').then(
			() => import('prismjs/components/prism-qml.min.js')
		),
	qore: () =>
		import('prismjs/components/prism-clike.min.js').then(
			() => import('prismjs/components/prism-qore.min.js')
		),
	qsharp: () =>
		import('prismjs/components/prism-clike.min.js').then(
			() => import('prismjs/components/prism-qsharp.min.js')
		),
	r: () => import('prismjs/components/prism-r.min.js'),
	racket: () =>
		import('prismjs/components/prism-scheme.min.js').then(
			() => import('prismjs/components/prism-racket.min.js')
		),
	reason: () =>
		import('prismjs/components/prism-clike.min.js').then(
			() => import('prismjs/components/prism-reason.min.js')
		),
	regex: () => import('prismjs/components/prism-regex.min.js'),
	rego: () => import('prismjs/components/prism-rego.min.js'),
	renpy: () => import('prismjs/components/prism-renpy.min.js'),
	rescript: () => import('prismjs/components/prism-rescript.min.js'),
	rest: () => import('prismjs/components/prism-rest.min.js'),
	rip: () => import('prismjs/components/prism-rip.min.js'),
	roboconf: () => import('prismjs/components/prism-roboconf.min.js'),
	robotframework: () => import('prismjs/components/prism-robotframework.min.js'),
	rust: () => import('prismjs/components/prism-rust.min.js'),
	sas: () => import('prismjs/components/prism-sas.min.js'),
	sass: () =>
		import('prismjs/components/prism-css.min.js').then(
			() => import('prismjs/components/prism-sass.min.js')
		),
	scala: () =>
		import('prismjs/components/prism-java.min.js').then(
			() => import('prismjs/components/prism-scala.min.js')
		),
	scss: () =>
		import('prismjs/components/prism-css.min.js').then(
			() => import('prismjs/components/prism-scss.min.js')
		),
	'shell-session': () =>
		import('prismjs/components/prism-bash.min.js').then(
			() => import('prismjs/components/prism-shell-session.min.js')
		),
	smali: () => import('prismjs/components/prism-smali.min.js'),
	smalltalk: () => import('prismjs/components/prism-smalltalk.min.js'),
	smarty: () =>
		import('prismjs/components/prism-markup-templating.min.js').then(
			() => import('prismjs/components/prism-smarty.min.js')
		),
	sml: () => import('prismjs/components/prism-sml.min.js'),
	solidity: () =>
		import('prismjs/components/prism-clike.min.js').then(
			() => import('prismjs/components/prism-solidity.min.js')
		),
	'solution-file': () => import('prismjs/components/prism-solution-file.min.js'),
	soy: () =>
		import('prismjs/components/prism-markup-templating.min.js').then(
			() => import('prismjs/components/prism-soy.min.js')
		),
	turtle: () => import('prismjs/components/prism-turtle.min.js'),
	sparql: () =>
		import('prismjs/components/prism-turtle.min.js').then(
			() => import('prismjs/components/prism-sparql.min.js')
		),
	'splunk-spl': () => import('prismjs/components/prism-splunk-spl.min.js'),
	sqf: () =>
		import('prismjs/components/prism-clike.min.js').then(
			() => import('prismjs/components/prism-sqf.min.js')
		),
	squirrel: () =>
		import('prismjs/components/prism-clike.min.js').then(
			() => import('prismjs/components/prism-squirrel.min.js')
		),
	stan: () => import('prismjs/components/prism-stan.min.js'),
	stata: () =>
		Promise.all([
			import('prismjs/components/prism-mata.min.js'),
			import('prismjs/components/prism-java.min.js'),
			import('prismjs/components/prism-python.min.js')
		]).then(() => import('prismjs/components/prism-stata.min.js')),
	stylus: () => import('prismjs/components/prism-stylus.min.js'),
	supercollider: () => import('prismjs/components/prism-supercollider.min.js'),
	swift: () => import('prismjs/components/prism-swift.min.js'),
	systemd: () => import('prismjs/components/prism-systemd.min.js'),
	't4-templating': () => import('prismjs/components/prism-t4-templating.min.js'),
	't4-cs': () =>
		Promise.all([
			import('prismjs/components/prism-t4-templating.min.js'),
			import('prismjs/components/prism-csharp.min.js')
		]).then(() => import('prismjs/components/prism-t4-cs.min.js')),
	vbnet: () =>
		import('prismjs/components/prism-basic.min.js').then(
			() => import('prismjs/components/prism-vbnet.min.js')
		),
	't4-vb': () =>
		Promise.all([
			import('prismjs/components/prism-t4-templating.min.js'),
			import('prismjs/components/prism-vbnet.min.js')
		]).then(() => import('prismjs/components/prism-t4-vb.min.js')),
	yaml: () => import('prismjs/components/prism-yaml.min.js'),
	tap: () =>
		import('prismjs/components/prism-yaml.min.js').then(
			() => import('prismjs/components/prism-tap.min.js')
		),
	tcl: () => import('prismjs/components/prism-tcl.min.js'),
	textile: () =>
		import('prismjs/components/prism-markup.min.js').then(
			() => import('prismjs/components/prism-textile.min.js')
		),
	toml: () => import('prismjs/components/prism-toml.min.js'),
	tremor: () => import('prismjs/components/prism-tremor.min.js'),
	tsx: () =>
		Promise.all([
			import('prismjs/components/prism-jsx.min.js'),
			import('prismjs/components/prism-typescript.min.js')
		]).then(() => import('prismjs/components/prism-tsx.min.js')),
	tt2: () =>
		Promise.all([
			import('prismjs/components/prism-clike.min.js'),
			import('prismjs/components/prism-markup-templating.min.js')
		]).then(() => import('prismjs/components/prism-tt2.min.js')),
	twig: () =>
		import('prismjs/components/prism-markup-templating.min.js').then(
			() => import('prismjs/components/prism-twig.min.js')
		),
	typoscript: () => import('prismjs/components/prism-typoscript.min.js'),
	unrealscript: () => import('prismjs/components/prism-unrealscript.min.js'),
	uorazor: () => import('prismjs/components/prism-uorazor.min.js'),
	uri: () => import('prismjs/components/prism-uri.min.js'),
	v: () =>
		import('prismjs/components/prism-clike.min.js').then(
			() => import('prismjs/components/prism-v.min.js')
		),
	vala: () =>
		import('prismjs/components/prism-clike.min.js').then(
			() => import('prismjs/components/prism-vala.min.js')
		),
	velocity: () =>
		import('prismjs/components/prism-markup.min.js').then(
			() => import('prismjs/components/prism-velocity.min.js')
		),
	verilog: () => import('prismjs/components/prism-verilog.min.js'),
	vhdl: () => import('prismjs/components/prism-vhdl.min.js'),
	vim: () => import('prismjs/components/prism-vim.min.js'),
	'visual-basic': () => import('prismjs/components/prism-visual-basic.min.js'),
	warpscript: () => import('prismjs/components/prism-warpscript.min.js'),
	wasm: () => import('prismjs/components/prism-wasm.min.js'),
	'web-idl': () => import('prismjs/components/prism-web-idl.min.js'),
	wgsl: () => import('prismjs/components/prism-wgsl.min.js'),
	wiki: () =>
		import('prismjs/components/prism-markup.min.js').then(
			() => import('prismjs/components/prism-wiki.min.js')
		),
	wolfram: () => import('prismjs/components/prism-wolfram.min.js'),
	wren: () => import('prismjs/components/prism-wren.min.js'),
	xeora: () =>
		import('prismjs/components/prism-markup.min.js').then(
			() => import('prismjs/components/prism-xeora.min.js')
		),
	'xml-doc': () =>
		import('prismjs/components/prism-markup.min.js').then(
			() => import('prismjs/components/prism-xml-doc.min.js')
		),
	xojo: () => import('prismjs/components/prism-xojo.min.js'),
	xquery: () =>
		import('prismjs/components/prism-markup.min.js').then(
			() => import('prismjs/components/prism-xquery.min.js')
		),
	yang: () => import('prismjs/components/prism-yang.min.js'),
	zig: () => import('prismjs/components/prism-zig.min.js')
};

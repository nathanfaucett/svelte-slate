import{S as _e,i as ve,s as pe,N as he,O as Pe,h as F,n as we,r as v,j as B,k as j,p as be,d as I,u as p,l as C,a as x,I as Q,v as h,P as Se,b as P,t as w,w as b}from"../../../chunks/index-c487c846.js";import{S as Ne,w as Re,a as Oe,c as Ie,e as Te,q as Ae}from"../../../chunks/withSvelte-609181e7.js";import{E as ke}from"../../../chunks/Element-f70a912d.js";import{w as Ee,L as ye,t as Me}from"../../../chunks/CodeElement-abba0579.js";import{M as D,B as E,I as Le,a as Ue,b as We,c as De,d as Fe,e as Be,f as je,g as Ce,h as Ge,i as He}from"../../../chunks/MdFormatQuote-40723523.js";var Z={},R={};Object.defineProperty(R,"__esModule",{value:!0});R.FORMAT_PLAIN=R.FORMAT_HTML=R.FORMATS=void 0;var ee="html";R.FORMAT_HTML=ee;var te="plain";R.FORMAT_PLAIN=te;var qe=[ee,te];R.FORMATS=qe;var S={};Object.defineProperty(S,"__esModule",{value:!0});S.UNIT_WORDS=S.UNIT_WORD=S.UNIT_SENTENCES=S.UNIT_SENTENCE=S.UNIT_PARAGRAPHS=S.UNIT_PARAGRAPH=S.UNITS=void 0;var re="words";S.UNIT_WORDS=re;var ne="word";S.UNIT_WORD=ne;var ae="sentences";S.UNIT_SENTENCES=ae;var oe="sentence";S.UNIT_SENTENCE=oe;var ue="paragraphs";S.UNIT_PARAGRAPHS=ue;var ie="paragraph";S.UNIT_PARAGRAPH=ie;var xe=[re,ne,ae,oe,ue,ie];S.UNITS=xe;var y={};Object.defineProperty(y,"__esModule",{value:!0});y.WORDS=void 0;var ze=["ad","adipisicing","aliqua","aliquip","amet","anim","aute","cillum","commodo","consectetur","consequat","culpa","cupidatat","deserunt","do","dolor","dolore","duis","ea","eiusmod","elit","enim","esse","est","et","eu","ex","excepteur","exercitation","fugiat","id","in","incididunt","ipsum","irure","labore","laboris","laborum","Lorem","magna","minim","mollit","nisi","non","nostrud","nulla","occaecat","officia","pariatur","proident","qui","quis","reprehenderit","sint","sit","sunt","tempor","ullamco","ut","velit","veniam","voluptate"];y.WORDS=ze;var se={},G={};Object.defineProperty(G,"__esModule",{value:!0});G.LINE_ENDINGS=void 0;var Ve={POSIX:`
`,WIN32:`\r
`};G.LINE_ENDINGS=Ve;var fe={},V={},le={};(function(n){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e=function(a){var g=a.trim();return g.charAt(0).toUpperCase()+g.slice(1)},r=e;n.default=r})(le);var z={exports:{}};(function(n,e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=function(){return!!n.exports},t=r;e.default=t})(z,z.exports);var me={};(function(n){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e=function(){var a=!1;try{a=navigator.product==="ReactNative"}catch{a=!1}return a},r=e;n.default=r})(me);var de={},H={};Object.defineProperty(H,"__esModule",{value:!0});H.SUPPORTED_PLATFORMS=void 0;var Ke={DARWIN:"darwin",LINUX:"linux",WIN32:"win32"};H.SUPPORTED_PLATFORMS=Ke;(function(n){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e=H,r=function(){var g=!1;try{g=process.platform===e.SUPPORTED_PLATFORMS.WIN32}catch{g=!1}return g},t=r;n.default=t})(de);var K={};(function(n){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e=function(){var a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:0;return Array.apply(null,Array(a)).map(function(g,_){return _})},r=e;n.default=r})(K);var ce={};(function(n){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e=r(K);function r(g){return g&&g.__esModule?g:{default:g}}var t=function(_,$){var m=(0,e.default)(_);return m.map(function(){return $()})},a=t;n.default=a})(ce);(function(n){Object.defineProperty(n,"__esModule",{value:!0}),Object.defineProperty(n,"capitalize",{enumerable:!0,get:function(){return e.default}}),Object.defineProperty(n,"isNode",{enumerable:!0,get:function(){return r.default}}),Object.defineProperty(n,"isReactNative",{enumerable:!0,get:function(){return t.default}}),Object.defineProperty(n,"isWindows",{enumerable:!0,get:function(){return a.default}}),Object.defineProperty(n,"makeArrayOfLength",{enumerable:!0,get:function(){return g.default}}),Object.defineProperty(n,"makeArrayOfStrings",{enumerable:!0,get:function(){return _.default}});var e=$(le),r=$(z.exports),t=$(me),a=$(de),g=$(K),_=$(ce);function $(m){return m&&m.__esModule?m:{default:m}}})(V);(function(n){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e=y,r=V;function t(i,s){if(!(i instanceof s))throw new TypeError("Cannot call a class as a function")}function a(i,s){for(var l=0;l<s.length;l++){var u=s[l];u.enumerable=u.enumerable||!1,u.configurable=!0,"value"in u&&(u.writable=!0),Object.defineProperty(i,u.key,u)}}function g(i,s,l){return s&&a(i.prototype,s),l&&a(i,l),Object.defineProperty(i,"prototype",{writable:!1}),i}function _(i,s,l){return s in i?Object.defineProperty(i,s,{value:l,enumerable:!0,configurable:!0,writable:!0}):i[s]=l,i}var $=function(){function i(){var s=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},l=s.sentencesPerParagraph,u=l===void 0?{max:7,min:3}:l,d=s.wordsPerSentence,c=d===void 0?{max:15,min:5}:d,o=s.random;s.seed;var f=s.words,N=f===void 0?e.WORDS:f;if(t(this,i),_(this,"sentencesPerParagraph",void 0),_(this,"wordsPerSentence",void 0),_(this,"random",void 0),_(this,"words",void 0),u.min>u.max)throw new Error("Minimum number of sentences per paragraph (".concat(u.min,") cannot exceed maximum (").concat(u.max,")."));if(c.min>c.max)throw new Error("Minimum number of words per sentence (".concat(c.min,") cannot exceed maximum (").concat(c.max,")."));this.sentencesPerParagraph=u,this.words=N,this.wordsPerSentence=c,this.random=o||Math.random}return g(i,[{key:"generateRandomInteger",value:function(l,u){return Math.floor(this.random()*(u-l+1)+l)}},{key:"generateRandomWords",value:function(l){var u=this,d=this.wordsPerSentence,c=d.min,o=d.max,f=l||this.generateRandomInteger(c,o);return(0,r.makeArrayOfLength)(f).reduce(function(N,O){return"".concat(u.pluckRandomWord()," ").concat(N)},"").trim()}},{key:"generateRandomSentence",value:function(l){return"".concat((0,r.capitalize)(this.generateRandomWords(l)),".")}},{key:"generateRandomParagraph",value:function(l){var u=this,d=this.sentencesPerParagraph,c=d.min,o=d.max,f=l||this.generateRandomInteger(c,o);return(0,r.makeArrayOfLength)(f).reduce(function(N,O){return"".concat(u.generateRandomSentence()," ").concat(N)},"").trim()}},{key:"pluckRandomWord",value:function(){var l=0,u=this.words.length-1,d=this.generateRandomInteger(l,u);return this.words[d]}}]),i}(),m=$;n.default=m})(fe);(function(n){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e=R,r=G,t=g(fe),a=V;function g(u){return u&&u.__esModule?u:{default:u}}function _(u,d){if(!(u instanceof d))throw new TypeError("Cannot call a class as a function")}function $(u,d){for(var c=0;c<d.length;c++){var o=d[c];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(u,o.key,o)}}function m(u,d,c){return d&&$(u.prototype,d),c&&$(u,c),Object.defineProperty(u,"prototype",{writable:!1}),u}function i(u,d,c){return d in u?Object.defineProperty(u,d,{value:c,enumerable:!0,configurable:!0,writable:!0}):u[d]=c,u}var s=function(){function u(){var d=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:e.FORMAT_PLAIN,o=arguments.length>2?arguments[2]:void 0;if(_(this,u),this.format=c,this.suffix=o,i(this,"generator",void 0),e.FORMATS.indexOf(c.toLowerCase())===-1)throw new Error("".concat(c," is an invalid format. Please use ").concat(e.FORMATS.join(" or "),"."));this.generator=new t.default(d)}return m(u,[{key:"getLineEnding",value:function(){return this.suffix?this.suffix:!(0,a.isReactNative)()&&(0,a.isNode)()&&(0,a.isWindows)()?r.LINE_ENDINGS.WIN32:r.LINE_ENDINGS.POSIX}},{key:"formatString",value:function(c){return this.format===e.FORMAT_HTML?"<p>".concat(c,"</p>"):c}},{key:"formatStrings",value:function(c){var o=this;return c.map(function(f){return o.formatString(f)})}},{key:"generateWords",value:function(c){return this.formatString(this.generator.generateRandomWords(c))}},{key:"generateSentences",value:function(c){return this.formatString(this.generator.generateRandomParagraph(c))}},{key:"generateParagraphs",value:function(c){var o=this.generator.generateRandomParagraph.bind(this.generator);return this.formatStrings((0,a.makeArrayOfStrings)(c,o)).join(this.getLineEnding())}}]),u}(),l=s;n.default=l})(se);(function(n){Object.defineProperty(n,"__esModule",{value:!0}),Object.defineProperty(n,"LoremIpsum",{enumerable:!0,get:function(){return a.default}}),n.loremIpsum=void 0;var e=R,r=S,t=y,a=g(se);function g($){return $&&$.__esModule?$:{default:$}}var _=function(){var m=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},i=m.count,s=i===void 0?1:i,l=m.format,u=l===void 0?e.FORMAT_PLAIN:l,d=m.paragraphLowerBound,c=d===void 0?3:d,o=m.paragraphUpperBound,f=o===void 0?7:o,N=m.random,O=m.sentenceLowerBound,M=O===void 0?5:O,T=m.sentenceUpperBound,L=T===void 0?15:T,A=m.units,U=A===void 0?r.UNIT_SENTENCES:A,k=m.words,W=k===void 0?t.WORDS:k,X=m.suffix,ge=X===void 0?"":X,$e={random:N,sentencesPerParagraph:{max:f,min:c},words:W,wordsPerSentence:{max:L,min:M}},q=new a.default($e,u,ge);switch(U){case r.UNIT_PARAGRAPHS:case r.UNIT_PARAGRAPH:return q.generateParagraphs(s);case r.UNIT_SENTENCES:case r.UNIT_SENTENCE:return q.generateSentences(s);case r.UNIT_WORDS:case r.UNIT_WORD:return q.generateWords(s);default:return""}};n.loremIpsum=_})(Z);function Xe(n){let e,r;return e=new Ue({}),{c(){v(e.$$.fragment)},l(t){p(e.$$.fragment,t)},m(t,a){h(e,t,a),r=!0},i(t){r||(P(e.$$.fragment,t),r=!0)},o(t){w(e.$$.fragment,t),r=!1},d(t){b(e,t)}}}function Qe(n){let e,r;return e=new We({}),{c(){v(e.$$.fragment)},l(t){p(e.$$.fragment,t)},m(t,a){h(e,t,a),r=!0},i(t){r||(P(e.$$.fragment,t),r=!0)},o(t){w(e.$$.fragment,t),r=!1},d(t){b(e,t)}}}function Ye(n){let e,r;return e=new De({}),{c(){v(e.$$.fragment)},l(t){p(e.$$.fragment,t)},m(t,a){h(e,t,a),r=!0},i(t){r||(P(e.$$.fragment,t),r=!0)},o(t){w(e.$$.fragment,t),r=!1},d(t){b(e,t)}}}function Je(n){let e,r;return e=new Fe({}),{c(){v(e.$$.fragment)},l(t){p(e.$$.fragment,t)},m(t,a){h(e,t,a),r=!0},i(t){r||(P(e.$$.fragment,t),r=!0)},o(t){w(e.$$.fragment,t),r=!1},d(t){b(e,t)}}}function Ze(n){let e,r;return e=new Be({}),{c(){v(e.$$.fragment)},l(t){p(e.$$.fragment,t)},m(t,a){h(e,t,a),r=!0},i(t){r||(P(e.$$.fragment,t),r=!0)},o(t){w(e.$$.fragment,t),r=!1},d(t){b(e,t)}}}function et(n){let e,r;return e=new je({}),{c(){v(e.$$.fragment)},l(t){p(e.$$.fragment,t)},m(t,a){h(e,t,a),r=!0},i(t){r||(P(e.$$.fragment,t),r=!0)},o(t){w(e.$$.fragment,t),r=!1},d(t){b(e,t)}}}function tt(n){let e,r;return e=new Ce({}),{c(){v(e.$$.fragment)},l(t){p(e.$$.fragment,t)},m(t,a){h(e,t,a),r=!0},i(t){r||(P(e.$$.fragment,t),r=!0)},o(t){w(e.$$.fragment,t),r=!1},d(t){b(e,t)}}}function rt(n){let e,r;return e=new Ge({}),{c(){v(e.$$.fragment)},l(t){p(e.$$.fragment,t)},m(t,a){h(e,t,a),r=!0},i(t){r||(P(e.$$.fragment,t),r=!0)},o(t){w(e.$$.fragment,t),r=!1},d(t){b(e,t)}}}function nt(n){let e,r;return e=new He({}),{c(){v(e.$$.fragment)},l(t){p(e.$$.fragment,t)},m(t,a){h(e,t,a),r=!0},i(t){r||(P(e.$$.fragment,t),r=!0)},o(t){w(e.$$.fragment,t),r=!1},d(t){b(e,t)}}}function at(n){let e,r,t,a,g,_,$,m,i,s,l,u,d,c;return r=new D({props:{format:"bold",$$slots:{default:[Xe]},$$scope:{ctx:n}}}),t=new D({props:{format:"italic",$$slots:{default:[Qe]},$$scope:{ctx:n}}}),a=new D({props:{format:"underline",$$slots:{default:[Ye]},$$scope:{ctx:n}}}),g=new D({props:{format:"code",$$slots:{default:[Je]},$$scope:{ctx:n}}}),_=new E({props:{format:"heading-one",$$slots:{default:[Ze]},$$scope:{ctx:n}}}),$=new E({props:{format:"heading-two",$$slots:{default:[et]},$$scope:{ctx:n}}}),m=new E({props:{format:"block-quote",$$slots:{default:[tt]},$$scope:{ctx:n}}}),i=new E({props:{format:"numbered-list",$$slots:{default:[rt]},$$scope:{ctx:n}}}),s=new E({props:{format:"bulleted-list",$$slots:{default:[nt]},$$scope:{ctx:n}}}),l=new Le({}),d=new Te({props:{Element:ke,Leaf:ye,onKeyDown:n[2],placeholder:"Enter some plain text..."}}),{c(){e=F("div"),v(r.$$.fragment),v(t.$$.fragment),v(a.$$.fragment),v(g.$$.fragment),v(_.$$.fragment),v($.$$.fragment),v(m.$$.fragment),v(i.$$.fragment),v(s.$$.fragment),v(l.$$.fragment),u=F("div"),v(d.$$.fragment),this.h()},l(o){e=B(o,"DIV",{class:!0});var f=j(e);p(r.$$.fragment,f),p(t.$$.fragment,f),p(a.$$.fragment,f),p(g.$$.fragment,f),p(_.$$.fragment,f),p($.$$.fragment,f),p(m.$$.fragment,f),p(i.$$.fragment,f),p(s.$$.fragment,f),p(l.$$.fragment,f),f.forEach(I),u=B(o,"DIV",{class:!0});var N=j(u);p(d.$$.fragment,N),N.forEach(I),this.h()},h(){C(e,"class","toolbar svelte-140j02r"),C(u,"class","editor svelte-140j02r")},m(o,f){x(o,e,f),h(r,e,null),h(t,e,null),h(a,e,null),h(g,e,null),h(_,e,null),h($,e,null),h(m,e,null),h(i,e,null),h(s,e,null),h(l,e,null),x(o,u,f),h(d,u,null),c=!0},p(o,f){const N={};f&16&&(N.$$scope={dirty:f,ctx:o}),r.$set(N);const O={};f&16&&(O.$$scope={dirty:f,ctx:o}),t.$set(O);const M={};f&16&&(M.$$scope={dirty:f,ctx:o}),a.$set(M);const T={};f&16&&(T.$$scope={dirty:f,ctx:o}),g.$set(T);const L={};f&16&&(L.$$scope={dirty:f,ctx:o}),_.$set(L);const A={};f&16&&(A.$$scope={dirty:f,ctx:o}),$.$set(A);const U={};f&16&&(U.$$scope={dirty:f,ctx:o}),m.$set(U);const k={};f&16&&(k.$$scope={dirty:f,ctx:o}),i.$set(k);const W={};f&16&&(W.$$scope={dirty:f,ctx:o}),s.$set(W)},i(o){c||(P(r.$$.fragment,o),P(t.$$.fragment,o),P(a.$$.fragment,o),P(g.$$.fragment,o),P(_.$$.fragment,o),P($.$$.fragment,o),P(m.$$.fragment,o),P(i.$$.fragment,o),P(s.$$.fragment,o),P(l.$$.fragment,o),P(d.$$.fragment,o),c=!0)},o(o){w(r.$$.fragment,o),w(t.$$.fragment,o),w(a.$$.fragment,o),w(g.$$.fragment,o),w(_.$$.fragment,o),w($.$$.fragment,o),w(m.$$.fragment,o),w(i.$$.fragment,o),w(s.$$.fragment,o),w(l.$$.fragment,o),w(d.$$.fragment,o),c=!1},d(o){o&&I(e),b(r),b(t),b(a),b(g),b(_),b($),b(m),b(i),b(s),b(l),o&&I(u),b(d)}}}function ot(n){let e,r,t,a,g,_;function $(i){n[3](i)}let m={editor:n[1],$$slots:{default:[at]},$$scope:{ctx:n}};return n[0]!==void 0&&(m.value=n[0]),a=new Ne({props:m}),he.push(()=>Pe(a,"value",$)),a.$on("value",it),a.$on("selection",st),{c(){e=F("p"),r=F("a"),t=we("Source"),v(a.$$.fragment),this.h()},l(i){e=B(i,"P",{});var s=j(e);r=B(s,"A",{target:!0,href:!0});var l=j(r);t=be(l,"Source"),l.forEach(I),s.forEach(I),p(a.$$.fragment,i),this.h()},h(){C(r,"target","_blank"),C(r,"href","https://github.com/nathanfaucett/svelte-slate/blob/main/src/routes/huge-document.svelte")},m(i,s){x(i,e,s),Q(e,r),Q(r,t),h(a,i,s),_=!0},p(i,[s]){const l={};s&16&&(l.$$scope={dirty:s,ctx:i}),!g&&s&1&&(g=!0,l.value=i[0],Se(()=>g=!1)),a.$set(l)},i(i){_||(P(a.$$.fragment,i),_=!0)},o(i){w(a.$$.fragment,i),_=!1},d(i){i&&I(e),b(a,i)}}}const Y=new Z.LoremIpsum({sentencesPerParagraph:{max:8,min:4},wordsPerSentence:{max:16,min:4}});function ut(n,e){const r=[];for(let t=0;t<n;t++){r.push({type:"heading-one",children:[{text:Y.generateSentences(1)}]});for(let a=0;a<e;a++)r.push({type:"paragraph",children:[{text:Y.generateParagraphs(1)}]})}return r}const J={"mod+b":"bold","mod+i":"italic","mod+u":"underline","mod+`":"code"};function it(n){console.log(n.detail)}function st(n){console.log(n.detail)}function ft(n,e,r){const t=Re(Ee(Oe(Ie())));let a=ut(100,7);function g($){for(const m in J)if(Ae(m,$)){$.preventDefault();const i=J[m];Me(t,i)}}function _($){a=$,r(0,a)}return[a,t,g,_]}class $t extends _e{constructor(e){super(),ve(this,e,ft,ot,pe,{})}}export{$t as default};

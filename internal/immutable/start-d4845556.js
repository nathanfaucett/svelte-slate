import{_ as V}from"./chunks/preload-helper-0ffe6af8.js";import{S as Me,i as He,s as We,e as q,a as G,g as le,t as J,c as ce,b as F,d as K,f as Xe,o as ye,h as Ye,j as Qe,k as Ze,l as ge,m as C,n as et,p as tt,q as nt,r as H,u as Re,v as W,w as X,x as xe}from"./chunks/index-a65ad292.js";import{g as Ce,f as Be,s as z,a as be,i as at}from"./chunks/singletons-5c9442a9.js";import{s as rt}from"./chunks/paths-846459bd.js";function ot(r,e){return r==="/"||e==="ignore"?r:e==="never"?r.endsWith("/")?r.slice(0,-1):r:e==="always"&&!r.endsWith("/")?r+"/":r}function st(r){for(const e in r)r[e]=r[e].replace(/%23/g,"#").replace(/%3[Bb]/g,";").replace(/%2[Cc]/g,",").replace(/%2[Ff]/g,"/").replace(/%3[Ff]/g,"?").replace(/%3[Aa]/g,":").replace(/%40/g,"@").replace(/%26/g,"&").replace(/%3[Dd]/g,"=").replace(/%2[Bb]/g,"+").replace(/%24/g,"$");return r}const it=["href","pathname","search","searchParams","toString","toJSON"];function lt(r,e){const t=new URL(r);for(const c of it){let i=t[c];Object.defineProperty(t,c,{get(){return e(),i},enumerable:!0,configurable:!0})}return t[Symbol.for("nodejs.util.inspect.custom")]=(c,i,d)=>d(r,i),ct(t),t}function ct(r){Object.defineProperty(r,"hash",{get(){throw new Error("Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead")}})}function ft(r){let e=5381,t=r.length;if(typeof r=="string")for(;t;)e=e*33^r.charCodeAt(--t);else for(;t;)e=e*33^r[--t];return(e>>>0).toString(36)}const Se=window.fetch;window.fetch=(r,e)=>{if((r instanceof Request?r.method:(e==null?void 0:e.method)||"GET")!=="GET"){const c=new URL(r instanceof Request?r.url:r.toString(),document.baseURI).href;ie.delete(c)}return Se(r,e)};const ie=new Map;function ut(r,e,t){let i=`script[data-sveltekit-fetched][data-url=${JSON.stringify(r instanceof Request?r.url:r)}]`;t&&typeof t.body=="string"&&(i+=`[data-hash="${ft(t.body)}"]`);const d=document.querySelector(i);if(d!=null&&d.textContent){const{body:a,...u}=JSON.parse(d.textContent),g=d.getAttribute("data-ttl");return g&&ie.set(e,{body:a,init:u,ttl:1e3*Number(g)}),Promise.resolve(new Response(a,u))}return Se(r,t)}function dt(r,e){const t=ie.get(r);if(t){if(performance.now()<t.ttl)return new Response(t.body,t.init);ie.delete(r)}return Se(r,e)}const pt=/^(\.\.\.)?(\w+)(?:=(\w+))?$/;function ht(r){const e=[],t=[];let c=!0;return{pattern:r===""?/^\/$/:new RegExp(`^${r.split(/(?:\/|$)/).filter(mt).map((d,a,u)=>{const g=decodeURIComponent(d),m=/^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(g);if(m)return e.push(m[1]),t.push(m[2]),"(?:/(.*))?";const b=a===u.length-1;return g&&"/"+g.split(/\[(.+?)\]/).map(($,R)=>{if(R%2){const T=pt.exec($);if(!T)throw new Error(`Invalid param: ${$}. Params and matcher names can only have underscores and alphanumeric characters.`);const[,N,x,D]=T;return e.push(x),t.push(D),N?"(.*?)":"([^/]+?)"}return b&&$.includes(".")&&(c=!1),$.normalize().replace(/%5[Bb]/g,"[").replace(/%5[Dd]/g,"]").replace(/#/g,"%23").replace(/\?/g,"%3F").replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}).join("")}).join("")}${c?"/?":""}$`),names:e,types:t}}function mt(r){return!/^\([^)]+\)$/.test(r)}function _t(r,e,t,c){const i={};for(let d=0;d<e.length;d+=1){const a=e[d],u=t[d],g=r[d+1]||"";if(u){const m=c[u];if(!m)throw new Error(`Missing "${u}" param matcher`);if(!m(g))return}i[a]=g}return i}function gt(r,e,t,c){const i=new Set(e);return Object.entries(t).map(([u,[g,m,b]])=>{const{pattern:$,names:R,types:T}=ht(u),N={id:u,exec:x=>{const D=$.exec(x);if(D)return _t(D,R,T,c)},errors:[1,...b||[]].map(x=>r[x]),layouts:[0,...m||[]].map(a),leaf:d(g)};return N.errors.length=N.layouts.length=Math.max(N.errors.length,N.layouts.length),N});function d(u){const g=u<0;return g&&(u=~u),[g,r[u]]}function a(u){return u===void 0?u:[i.has(u),r[u]]}}function wt(r){let e,t,c;var i=r[0][0];function d(a){return{props:{data:a[2],form:a[1]}}}return i&&(e=new i(d(r))),{c(){e&&H(e.$$.fragment),t=q()},l(a){e&&Re(e.$$.fragment,a),t=q()},m(a,u){e&&W(e,a,u),G(a,t,u),c=!0},p(a,u){const g={};if(u&4&&(g.data=a[2]),u&2&&(g.form=a[1]),i!==(i=a[0][0])){if(e){le();const m=e;J(m.$$.fragment,1,0,()=>{X(m,1)}),ce()}i?(e=new i(d(a)),H(e.$$.fragment),F(e.$$.fragment,1),W(e,t.parentNode,t)):e=null}else i&&e.$set(g)},i(a){c||(e&&F(e.$$.fragment,a),c=!0)},o(a){e&&J(e.$$.fragment,a),c=!1},d(a){a&&K(t),e&&X(e,a)}}}function yt(r){let e,t,c;var i=r[0][0];function d(a){return{props:{data:a[2],$$slots:{default:[bt]},$$scope:{ctx:a}}}}return i&&(e=new i(d(r))),{c(){e&&H(e.$$.fragment),t=q()},l(a){e&&Re(e.$$.fragment,a),t=q()},m(a,u){e&&W(e,a,u),G(a,t,u),c=!0},p(a,u){const g={};if(u&4&&(g.data=a[2]),u&523&&(g.$$scope={dirty:u,ctx:a}),i!==(i=a[0][0])){if(e){le();const m=e;J(m.$$.fragment,1,0,()=>{X(m,1)}),ce()}i?(e=new i(d(a)),H(e.$$.fragment),F(e.$$.fragment,1),W(e,t.parentNode,t)):e=null}else i&&e.$set(g)},i(a){c||(e&&F(e.$$.fragment,a),c=!0)},o(a){e&&J(e.$$.fragment,a),c=!1},d(a){a&&K(t),e&&X(e,a)}}}function bt(r){let e,t,c;var i=r[0][1];function d(a){return{props:{data:a[3],form:a[1]}}}return i&&(e=new i(d(r))),{c(){e&&H(e.$$.fragment),t=q()},l(a){e&&Re(e.$$.fragment,a),t=q()},m(a,u){e&&W(e,a,u),G(a,t,u),c=!0},p(a,u){const g={};if(u&8&&(g.data=a[3]),u&2&&(g.form=a[1]),i!==(i=a[0][1])){if(e){le();const m=e;J(m.$$.fragment,1,0,()=>{X(m,1)}),ce()}i?(e=new i(d(a)),H(e.$$.fragment),F(e.$$.fragment,1),W(e,t.parentNode,t)):e=null}else i&&e.$set(g)},i(a){c||(e&&F(e.$$.fragment,a),c=!0)},o(a){e&&J(e.$$.fragment,a),c=!1},d(a){a&&K(t),e&&X(e,a)}}}function Je(r){let e,t=r[5]&&Fe(r);return{c(){e=Ye("div"),t&&t.c(),this.h()},l(c){e=Qe(c,"DIV",{id:!0,"aria-live":!0,"aria-atomic":!0,style:!0});var i=Ze(e);t&&t.l(i),i.forEach(K),this.h()},h(){ge(e,"id","svelte-announcer"),ge(e,"aria-live","assertive"),ge(e,"aria-atomic","true"),C(e,"position","absolute"),C(e,"left","0"),C(e,"top","0"),C(e,"clip","rect(0 0 0 0)"),C(e,"clip-path","inset(50%)"),C(e,"overflow","hidden"),C(e,"white-space","nowrap"),C(e,"width","1px"),C(e,"height","1px")},m(c,i){G(c,e,i),t&&t.m(e,null)},p(c,i){c[5]?t?t.p(c,i):(t=Fe(c),t.c(),t.m(e,null)):t&&(t.d(1),t=null)},d(c){c&&K(e),t&&t.d()}}}function Fe(r){let e;return{c(){e=et(r[6])},l(t){e=tt(t,r[6])},m(t,c){G(t,e,c)},p(t,c){c&64&&nt(e,t[6])},d(t){t&&K(e)}}}function vt(r){let e,t,c,i,d;const a=[yt,wt],u=[];function g(b,$){return b[0][1]?0:1}e=g(r),t=u[e]=a[e](r);let m=r[4]&&Je(r);return{c(){t.c(),c=q(),m&&m.c(),i=q()},l(b){t.l(b),c=q(),m&&m.l(b),i=q()},m(b,$){u[e].m(b,$),G(b,c,$),m&&m.m(b,$),G(b,i,$),d=!0},p(b,[$]){let R=e;e=g(b),e===R?u[e].p(b,$):(le(),J(u[R],1,1,()=>{u[R]=null}),ce(),t=u[e],t?t.p(b,$):(t=u[e]=a[e](b),t.c()),F(t,1),t.m(c.parentNode,c)),b[4]?m?m.p(b,$):(m=Je(b),m.c(),m.m(i.parentNode,i)):m&&(m.d(1),m=null)},i(b){d||(F(t),d=!0)},o(b){J(t),d=!1},d(b){u[e].d(b),b&&K(c),m&&m.d(b),b&&K(i)}}}function Et(r,e,t){let{stores:c}=e,{page:i}=e,{components:d}=e,{form:a}=e,{data_0:u=null}=e,{data_1:g=null}=e;Xe(c.page.notify);let m=!1,b=!1,$=null;return ye(()=>{const R=c.page.subscribe(()=>{m&&(t(5,b=!0),t(6,$=document.title||"untitled page"))});return t(4,m=!0),R}),r.$$set=R=>{"stores"in R&&t(7,c=R.stores),"page"in R&&t(8,i=R.page),"components"in R&&t(0,d=R.components),"form"in R&&t(1,a=R.form),"data_0"in R&&t(2,u=R.data_0),"data_1"in R&&t(3,g=R.data_1)},r.$$.update=()=>{r.$$.dirty&384&&c.page.set(i)},[d,a,u,g,m,b,$,c,i]}class kt extends Me{constructor(e){super(),He(this,e,Et,vt,We,{stores:7,page:8,components:0,form:1,data_0:2,data_1:3})}}const Rt={},fe=[()=>V(()=>import("./chunks/0-d1f528c8.js"),["chunks/0-d1f528c8.js","chunks/_layout-c2405b24.js","components/pages/_layout.svelte-d861fb19.js","assets/_layout-1ca33f26.css","chunks/index-a65ad292.js","chunks/paths-846459bd.js","chunks/IconBase-4ccfc90a.js","assets/IconBase-d93538e2.css"],import.meta.url),()=>V(()=>import("./chunks/1-5e3a5b1d.js"),["chunks/1-5e3a5b1d.js","components/error.svelte-0dc18895.js","chunks/index-a65ad292.js","chunks/singletons-5c9442a9.js","chunks/index-74dd7bae.js","chunks/paths-846459bd.js"],import.meta.url),()=>V(()=>import("./chunks/2-c55c2403.js"),["chunks/2-c55c2403.js","components/pages/_page.svelte-48ce5b29.js","chunks/index-a65ad292.js","chunks/paths-846459bd.js"],import.meta.url),()=>V(()=>import("./chunks/3-24620d5e.js"),["chunks/3-24620d5e.js","components/pages/chat/_page.svelte-440cb160.js","assets/_page-80f81047.css","chunks/index-a65ad292.js","chunks/MathButton-f1b3e08f.js","assets/MathButton-14f8d7ab.css","chunks/withSvelte-9794308c.js","assets/withSvelte-d94c0ed0.css","chunks/index-74dd7bae.js","chunks/CodeElement-f742a457.js","assets/CodeElement-92fa530d.css","chunks/preload-helper-0ffe6af8.js","chunks/MdFormatQuote-9a41fc80.js","assets/MdFormatQuote-0a14f6b6.css","chunks/IconBase-4ccfc90a.js","assets/IconBase-d93538e2.css","chunks/CheckListItemButton-0c4f39b4.js"],import.meta.url),()=>V(()=>import("./chunks/4-56f599fb.js"),["chunks/4-56f599fb.js","components/pages/default/_page.svelte-b07a7b29.js","chunks/index-a65ad292.js","chunks/withSvelte-9794308c.js","assets/withSvelte-d94c0ed0.css","chunks/index-74dd7bae.js"],import.meta.url),()=>V(()=>import("./chunks/5-6c28b06b.js"),["chunks/5-6c28b06b.js","components/pages/editor/_page.svelte-5f6a5fbf.js","assets/_page-c0e053e4.css","chunks/index-a65ad292.js","chunks/withSvelte-9794308c.js","assets/withSvelte-d94c0ed0.css","chunks/index-74dd7bae.js","chunks/Element-d68b46c3.js","assets/Element-2bbf41d2.css","chunks/CodeElement-f742a457.js","assets/CodeElement-92fa530d.css","chunks/preload-helper-0ffe6af8.js"],import.meta.url),()=>V(()=>import("./chunks/6-dd07f630.js"),["chunks/6-dd07f630.js","components/pages/huge-document/_page.svelte-1a581a3b.js","assets/_page-984eb7cd.css","chunks/index-a65ad292.js","chunks/withSvelte-9794308c.js","assets/withSvelte-d94c0ed0.css","chunks/index-74dd7bae.js","chunks/Element-d68b46c3.js","assets/Element-2bbf41d2.css","chunks/CodeElement-f742a457.js","assets/CodeElement-92fa530d.css","chunks/preload-helper-0ffe6af8.js","chunks/MdFormatQuote-9a41fc80.js","assets/MdFormatQuote-0a14f6b6.css","chunks/IconBase-4ccfc90a.js","assets/IconBase-d93538e2.css"],import.meta.url),()=>V(()=>import("./chunks/7-3bc0435b.js"),["chunks/7-3bc0435b.js","components/pages/plugins/_page.svelte-bbe1d89e.js","assets/_page-80f81047.css","chunks/index-a65ad292.js","chunks/withSvelte-9794308c.js","assets/withSvelte-d94c0ed0.css","chunks/index-74dd7bae.js","chunks/MathButton-f1b3e08f.js","assets/MathButton-14f8d7ab.css","chunks/CodeElement-f742a457.js","assets/CodeElement-92fa530d.css","chunks/preload-helper-0ffe6af8.js","chunks/MdFormatQuote-9a41fc80.js","assets/MdFormatQuote-0a14f6b6.css","chunks/IconBase-4ccfc90a.js","assets/IconBase-d93538e2.css","chunks/CheckListItemButton-0c4f39b4.js"],import.meta.url),()=>V(()=>import("./chunks/8-1cb56326.js"),["chunks/8-1cb56326.js","components/pages/richtext/_page.svelte-4efa26c2.js","assets/_page-984eb7cd.css","chunks/index-a65ad292.js","chunks/withSvelte-9794308c.js","assets/withSvelte-d94c0ed0.css","chunks/index-74dd7bae.js","chunks/Element-d68b46c3.js","assets/Element-2bbf41d2.css","chunks/CodeElement-f742a457.js","assets/CodeElement-92fa530d.css","chunks/preload-helper-0ffe6af8.js","chunks/CheckListItemButton-0c4f39b4.js","chunks/MdFormatQuote-9a41fc80.js","assets/MdFormatQuote-0a14f6b6.css","chunks/IconBase-4ccfc90a.js","assets/IconBase-d93538e2.css"],import.meta.url)],St=[],Lt={"":[2],chat:[3],default:[4],editor:[5],"huge-document":[6],plugins:[7],richtext:[8]},$t={handleError:({error:r})=>{console.error(r)}};class ve{constructor(e,t){this.status=e,typeof t=="string"?this.body={message:t}:t?this.body=t:this.body={message:`Error: ${e}`}}toString(){return JSON.stringify(this.body)}}class Ke{constructor(e,t){this.status=e,this.location=t}}const Pt="/__data.js";async function Ot(r){var e;for(const t in r)if(typeof((e=r[t])==null?void 0:e.then)=="function")return Object.fromEntries(await Promise.all(Object.entries(r).map(async([c,i])=>[c,await i])));return r}const Ge="sveltekit:scroll",B="sveltekit:index",re=gt(fe,St,Lt,Rt),Ee=fe[0],ke=fe[1];Ee();ke();let ee={};try{ee=JSON.parse(sessionStorage[Ge])}catch{}function we(r){ee[r]=be()}function It({target:r,base:e,trailing_slash:t}){var Ne;const c=[];let i=null;const d={before_navigate:[],after_navigate:[]};let a={branch:[],error:null,url:null},u=!1,g=!1,m=!0,b=!1,$=!1,R,T=(Ne=history.state)==null?void 0:Ne[B];T||(T=Date.now(),history.replaceState({...history.state,[B]:T},"",location.href));const N=ee[T];N&&(history.scrollRestoration="manual",scrollTo(N.x,N.y));let x=!1,D,Le,te;async function $e(){te=te||Promise.resolve(),await te,te=null;const n=new URL(location.href),l=he(n,!0);i=null,await Oe(l,n,[])}async function ue(n,{noscroll:l=!1,replaceState:f=!1,keepfocus:o=!1,state:s={}},p,h){return typeof n=="string"&&(n=new URL(n,Ce(document))),me({url:n,scroll:l?be():null,keepfocus:o,redirect_chain:p,details:{state:s,replaceState:f},nav_token:h,accepted:()=>{},blocked:()=>{},type:"goto"})}async function Pe(n){const l=he(n,!1);if(!l)throw new Error("Attempted to prefetch a URL that does not belong to this app");return i={id:l.id,promise:Ue(l)},i.promise}async function Oe(n,l,f,o,s={},p){var E,v;Le=s;let h=n&&await Ue(n);if(h||(h=await De(l,null,Z(new Error(`Not found: ${l.pathname}`),{url:l,params:{},routeId:null}),404)),l=(n==null?void 0:n.url)||l,Le!==s)return!1;if(h.type==="redirect")if(f.length>10||f.includes(l.pathname))h=await ne({status:500,error:Z(new Error("Redirect loop"),{url:l,params:{},routeId:null}),url:l,routeId:null});else return ue(new URL(h.location,l).href,{},[...f,l.pathname],s),!1;else((v=(E=h.props)==null?void 0:E.page)==null?void 0:v.status)>=400&&await z.updated.check()&&await ae(l);if(c.length=0,$=!1,b=!0,o&&o.details){const{details:w}=o,y=w.replaceState?0:1;w.state[B]=T+=y,history[w.replaceState?"replaceState":"pushState"](w.state,"",l)}if(i=null,g){a=h.state,h.props.page&&(h.props.page.url=l);const w=se();R.$set(h.props),w()}else Ie(h);if(o){const{scroll:w,keepfocus:y}=o;if(!y){const S=document.body,P=S.getAttribute("tabindex");S.tabIndex=-1,S.focus({preventScroll:!0}),setTimeout(()=>{var O;(O=getSelection())==null||O.removeAllRanges()}),P!==null?S.setAttribute("tabindex",P):S.removeAttribute("tabindex")}if(await xe(),m){const S=l.hash&&document.getElementById(l.hash.slice(1));w?scrollTo(w.x,w.y):S?S.scrollIntoView():scrollTo(0,0)}}else await xe();m=!0,h.props.page&&(D=h.props.page),p&&p(),b=!1}function Ie(n){var s,p;a=n.state;const l=document.querySelector("style[data-sveltekit]");l&&l.remove(),D=n.props.page;const f=se();R=new kt({target:r,props:{...n.props,stores:z},hydrate:!0}),f();const o={from:null,to:oe("to",{params:a.params,routeId:(p=(s=a.route)==null?void 0:s.id)!=null?p:null,url:new URL(location.href)}),type:"load"};d.after_navigate.forEach(h=>h(o)),g=!0}async function Y({url:n,params:l,branch:f,status:o,error:s,route:p,form:h}){var P;const E=f.filter(Boolean),v={type:"loaded",state:{url:n,params:l,branch:f,error:s,route:p},props:{components:E.map(O=>O.node.component)}};h!==void 0&&(v.props.form=h);let w={},y=!D;for(let O=0;O<E.length;O+=1){const U=E[O];w={...w,...U.data},(y||!a.branch.some(j=>j===U))&&(v.props[`data_${O}`]=w,y=y||Object.keys((P=U.data)!=null?P:{}).length>0)}if(y||(y=Object.keys(D.data).length!==Object.keys(w).length),!a.url||n.href!==a.url.href||a.error!==s||h!==void 0||y){v.props.page={error:s,params:l,routeId:p&&p.id,status:o,url:n,form:h,data:y?w:D.data};const O=(U,j)=>{Object.defineProperty(v.props.page,U,{get:()=>{throw new Error(`$page.${U} has been replaced by $page.url.${j}`)}})};O("origin","origin"),O("path","pathname"),O("query","searchParams")}return v}async function de({loader:n,parent:l,url:f,params:o,routeId:s,server_data_node:p}){var w,y,S,P,O;let h=null;const E={dependencies:new Set,params:new Set,parent:!1,url:!1},v=await n();if((w=v.shared)!=null&&w.load){let U=function(...L){for(const _ of L){const{href:k}=new URL(_,f);E.dependencies.add(k)}};const j={routeId:s,params:new Proxy(o,{get:(L,_)=>(E.params.add(_),L[_])}),data:(y=p==null?void 0:p.data)!=null?y:null,url:lt(f,()=>{E.url=!0}),async fetch(L,_){let k;L instanceof Request?(k=L.url,_={body:L.method==="GET"||L.method==="HEAD"?void 0:await L.blob(),cache:L.cache,credentials:L.credentials,headers:L.headers,integrity:L.integrity,keepalive:L.keepalive,method:L.method,mode:L.mode,redirect:L.redirect,referrer:L.referrer,referrerPolicy:L.referrerPolicy,signal:L.signal,..._}):k=L;const A=new URL(k,f).href;return U(A),g?dt(A,_):ut(k,A,_)},setHeaders:()=>{},depends:U,parent(){return E.parent=!0,l()}};Object.defineProperties(j,{props:{get(){throw new Error("@migration task: Replace `props` with `data` stuff https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693")},enumerable:!1},session:{get(){throw new Error("session is no longer available. See https://github.com/sveltejs/kit/discussions/5883")},enumerable:!1},stuff:{get(){throw new Error("@migration task: Remove stuff https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693")},enumerable:!1}}),h=(S=await v.shared.load.call(null,j))!=null?S:null,h=h?await Ot(h):null}return{node:v,loader:n,server:p,shared:(P=v.shared)!=null&&P.load?{type:"data",data:h,uses:E}:null,data:(O=h!=null?h:p==null?void 0:p.data)!=null?O:null}}function Ae(n,l,f,o){if($)return!0;if(!f)return!1;if(f.parent&&l||f.url&&n)return!0;for(const s of f.params)if(o[s]!==a.params[s])return!0;for(const s of f.dependencies)if(c.some(p=>p(new URL(s))))return!0;return!1}function pe(n,l){var f,o;return(n==null?void 0:n.type)==="data"?{type:"data",data:n.data,uses:{dependencies:new Set((f=n.uses.dependencies)!=null?f:[]),params:new Set((o=n.uses.params)!=null?o:[]),parent:!!n.uses.parent,url:!!n.uses.url}}:(n==null?void 0:n.type)==="skip"&&l!=null?l:null}async function Ue({id:n,invalidating:l,url:f,params:o,route:s}){var L;if((i==null?void 0:i.id)===n)return i.promise;const{errors:p,layouts:h,leaf:E}=s,v=[...h,E];p.forEach(_=>_==null?void 0:_().catch(()=>{})),v.forEach(_=>_==null?void 0:_[1]().catch(()=>{}));let w=null;const y=a.url?n!==a.url.pathname+a.url.search:!1,S=v.reduce((_,k,A)=>{var Q;const I=a.branch[A],M=!!(k!=null&&k[0])&&((I==null?void 0:I.loader)!==k[1]||Ae(y,_.some(Boolean),(Q=I.server)==null?void 0:Q.uses,o));return _.push(M),_},[]);if(S.some(Boolean)){try{w=await ze(f,S)}catch(_){return ne({status:500,error:Z(_,{url:f,params:o,routeId:s.id}),url:f,routeId:s.id})}if(w.type==="redirect")return w}const P=w==null?void 0:w.nodes;let O=!1;const U=v.map(async(_,k)=>{var Q;if(!_)return;const A=a.branch[k],I=P==null?void 0:P[k];if((!I||I.type==="skip")&&_[1]===(A==null?void 0:A.loader)&&!Ae(y,O,(Q=A.shared)==null?void 0:Q.uses,o))return A;if(O=!0,(I==null?void 0:I.type)==="error")throw I;return de({loader:_[1],url:f,params:o,routeId:s.id,parent:async()=>{var qe;const Ve={};for(let _e=0;_e<k;_e+=1)Object.assign(Ve,(qe=await U[_e])==null?void 0:qe.data);return Ve},server_data_node:pe(I===void 0&&_[0]?{type:"skip"}:I!=null?I:null,A==null?void 0:A.server)})});for(const _ of U)_.catch(()=>{});const j=[];for(let _=0;_<v.length;_+=1)if(v[_])try{j.push(await U[_])}catch(k){if(k instanceof Ke)return{type:"redirect",location:k.location};let A=500,I;P!=null&&P.includes(k)?(A=(L=k.status)!=null?L:A,I=k.error):k instanceof ve?(A=k.status,I=k.body):I=Z(k,{params:o,url:f,routeId:s.id});const M=await je(_,j,p);return M?await Y({url:f,params:o,branch:j.slice(0,M.idx).concat(M.node),status:A,error:I,route:s}):await De(f,s.id,I,A)}else j.push(void 0);return await Y({url:f,params:o,branch:j,status:200,error:null,route:s,form:l?void 0:null})}async function je(n,l,f){for(;n--;)if(f[n]){let o=n;for(;!l[o];)o-=1;try{return{idx:o+1,node:{node:await f[n](),loader:f[n],data:{},server:null,shared:null}}}catch{continue}}}async function ne({status:n,error:l,url:f,routeId:o}){var w;const s={},p=await Ee();let h=null;if(p.server)try{const y=await ze(f,[!0]);if(y.type!=="data"||y.nodes[0]&&y.nodes[0].type!=="data")throw 0;h=(w=y.nodes[0])!=null?w:null}catch{(f.origin!==location.origin||f.pathname!==location.pathname||u)&&await ae(f)}const E=await de({loader:Ee,url:f,params:s,routeId:o,parent:()=>Promise.resolve({}),server_data_node:pe(h)}),v={node:await ke(),loader:ke,shared:null,server:null,data:null};return await Y({url:f,params:s,branch:[E,v],status:n,error:l,route:null})}function he(n,l){if(Te(n))return;const f=decodeURI(n.pathname.slice(e.length)||"/");for(const o of re){const s=o.exec(f);if(s){const p=new URL(n.origin+ot(n.pathname,t)+n.search+n.hash);return{id:p.pathname+p.search,invalidating:l,route:o,params:st(s),url:p}}}}function Te(n){return n.origin!==location.origin||!n.pathname.startsWith(e)}async function me({url:n,scroll:l,keepfocus:f,redirect_chain:o,details:s,type:p,delta:h,nav_token:E,accepted:v,blocked:w}){var U,j,L,_;let y=!1;const S=he(n,!1),P={from:oe("from",{params:a.params,routeId:(j=(U=a.route)==null?void 0:U.id)!=null?j:null,url:a.url}),to:oe("to",{params:(L=S==null?void 0:S.params)!=null?L:null,routeId:(_=S==null?void 0:S.route.id)!=null?_:null,url:n}),type:p};h!==void 0&&(P.delta=h);const O={...P,cancel:()=>{y=!0}};if(d.before_navigate.forEach(k=>k(O)),y){w();return}we(T),v(),g&&z.navigating.set(P),await Oe(S,n,o,{scroll:l,keepfocus:f,details:s},E,()=>{d.after_navigate.forEach(k=>k(P)),z.navigating.set(null)})}async function De(n,l,f,o){return n.origin===location.origin&&n.pathname===location.pathname&&!u?await ne({status:o,error:f,url:n,routeId:l}):await ae(n)}function ae(n){return location.href=n.href,new Promise(()=>{})}return{after_navigate:n=>{ye(()=>(d.after_navigate.push(n),()=>{const l=d.after_navigate.indexOf(n);d.after_navigate.splice(l,1)}))},before_navigate:n=>{ye(()=>(d.before_navigate.push(n),()=>{const l=d.before_navigate.indexOf(n);d.before_navigate.splice(l,1)}))},disable_scroll_handling:()=>{(b||!g)&&(m=!1)},goto:(n,l={})=>ue(n,l,[]),invalidate:n=>{if(n===void 0)throw new Error("`invalidate()` (with no arguments) has been replaced by `invalidateAll()`");if(typeof n=="function")c.push(n);else{const{href:l}=new URL(n,location.href);c.push(f=>f.href===l)}return $e()},invalidateAll:()=>($=!0,$e()),prefetch:async n=>{const l=new URL(n,Ce(document));await Pe(l)},prefetch_routes:async n=>{const f=(n?re.filter(o=>n.some(s=>o.exec(s))):re).map(o=>Promise.all([...o.layouts,o.leaf].map(s=>s==null?void 0:s[1]())));await Promise.all(f)},apply_action:async n=>{if(n.type==="error"){const l=new URL(location.href),{branch:f,route:o}=a;if(!o)return;const s=await je(a.branch.length,f,o.errors);if(s){const p=await Y({url:l,params:a.params,branch:f.slice(0,s.idx).concat(s.node),status:500,error:n.error,route:o});a=p.state;const h=se();R.$set(p.props),h()}}else if(n.type==="redirect")ue(n.location,{},[]);else{const l={form:n.data,page:{...D,form:n.data,status:n.status}},f=se();R.$set(l),f()}},_start_router:()=>{history.scrollRestoration="manual",addEventListener("beforeunload",o=>{var h,E;let s=!1;const p={from:oe("from",{params:a.params,routeId:(E=(h=a.route)==null?void 0:h.id)!=null?E:null,url:a.url}),to:null,type:"unload",cancel:()=>s=!0};d.before_navigate.forEach(v=>v(p)),s?(o.preventDefault(),o.returnValue=""):history.scrollRestoration="auto"}),addEventListener("visibilitychange",()=>{if(document.visibilityState==="hidden"){we(T);try{sessionStorage[Ge]=JSON.stringify(ee)}catch{}}});const n=o=>{const{url:s,options:p}=Be(o);if(s&&p.prefetch){if(Te(s))return;Pe(s)}};let l;const f=o=>{clearTimeout(l),l=setTimeout(()=>{var s;(s=o.target)==null||s.dispatchEvent(new CustomEvent("sveltekit:trigger_prefetch",{bubbles:!0}))},20)};addEventListener("touchstart",n),addEventListener("mousemove",f),addEventListener("sveltekit:trigger_prefetch",n),addEventListener("click",o=>{if(o.button||o.which!==1||o.metaKey||o.ctrlKey||o.shiftKey||o.altKey||o.defaultPrevented)return;const{a:s,url:p,options:h}=Be(o);if(!s||!p)return;const E=s instanceof SVGAElement;if(!E&&!(p.protocol==="https:"||p.protocol==="http:"))return;const v=(s.getAttribute("rel")||"").split(/\s+/);if(s.hasAttribute("download")||v.includes("external")||h.reload||(E?s.target.baseVal:s.target))return;const[w,y]=p.href.split("#");if(y!==void 0&&w===location.href.split("#")[0]){x=!0,we(T),a.url=p,z.page.set({...D,url:p}),z.page.notify();return}me({url:p,scroll:h.noscroll?be():null,keepfocus:!1,redirect_chain:[],details:{state:{},replaceState:p.href===location.href},accepted:()=>o.preventDefault(),blocked:()=>o.preventDefault(),type:"link"})}),addEventListener("popstate",o=>{if(o.state){if(o.state[B]===T)return;const s=o.state[B]-T;me({url:new URL(location.href),scroll:ee[o.state[B]],keepfocus:!1,redirect_chain:[],details:null,accepted:()=>{T=o.state[B]},blocked:()=>{history.go(-s)},type:"popstate",delta:s})}}),addEventListener("hashchange",()=>{x&&(x=!1,history.replaceState({...history.state,[B]:++T},"",location.href))});for(const o of document.querySelectorAll("link"))o.rel==="icon"&&(o.href=o.href);addEventListener("pageshow",o=>{o.persisted&&z.navigating.set(null)})},_hydrate:async({status:n,error:l,node_ids:f,params:o,routeId:s,data:p,form:h})=>{var w;u=!0;const E=new URL(location.href);let v;try{const y=f.map(async(S,P)=>{const O=p[P];return de({loader:fe[S],url:E,params:o,routeId:s,parent:async()=>{const U={};for(let j=0;j<P;j+=1)Object.assign(U,(await y[j]).data);return U},server_data_node:pe(O)})});v=await Y({url:E,params:o,branch:await Promise.all(y),status:n,error:l,form:h,route:(w=re.find(S=>S.id===s))!=null?w:null})}catch(y){if(y instanceof Ke){await ae(new URL(y.location,location.href));return}v=await ne({status:y instanceof ve?y.status:500,error:Z(y,{url:E,params:o,routeId:s}),url:E,routeId:s})}Ie(v)}}}let At=1;async function ze(r,e){const t=new URL(r);t.pathname=r.pathname.replace(/\/$/,"")+Pt,t.searchParams.set("__invalid",e.map(i=>i?"y":"n").join("")),t.searchParams.set("__id",String(At++)),await V(()=>import(t.href),[],import.meta.url);const c=window.__sveltekit_data;return delete window.__sveltekit_data,c}function Z(r,e){var t;return r instanceof ve?r.body:(t=$t.handleError({error:r,event:e}))!=null?t:{message:e.routeId!=null?"Internal Error":"Not Found"}}const Ut=["hash","href","host","hostname","origin","pathname","port","protocol","search","searchParams","toString","toJSON"];function oe(r,e){for(const t of Ut)Object.defineProperty(e,t,{get(){throw new Error(`The navigation shape changed - ${r}.${t} should now be ${r}.url.${t}`)},enumerable:!1});return e}function se(){return()=>{}}async function Vt({env:r,hydrate:e,paths:t,target:c,trailing_slash:i}){rt(t);const d=It({target:c,base:t.base,trailing_slash:i});at({client:d}),e?await d._hydrate(e):d.goto(location.href,{replaceState:!0}),d._start_router()}export{Vt as start};

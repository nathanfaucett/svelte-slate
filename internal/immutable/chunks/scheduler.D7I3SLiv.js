function z(){}function P(t,e){for(const n in e)t[n]=e[n];return t}function H(t){return t()}function $(){return Object.create(null)}function M(t){t.forEach(H)}function tt(t){return typeof t=="function"}function et(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}function nt(t,e){return t!=t?e==e:t!==e}function it(t){return Object.keys(t).length===0}function N(t,...e){if(t==null){for(const i of e)i(void 0);return z}const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function rt(t){let e;return N(t,n=>e=n)(),e}function st(t,e,n){t.$$.on_destroy.push(N(e,n))}function ct(t,e,n,i){if(t){const r=C(t,e,n,i);return t[0](r)}}function C(t,e,n,i){return t[1]&&i?P(n.ctx.slice(),t[1](i(e))):n.ctx}function ot(t,e,n,i){if(t[2]&&i){const r=t[2](i(n));if(e.dirty===void 0)return r;if(typeof r=="object"){const c=[],s=Math.max(e.dirty.length,r.length);for(let l=0;l<s;l+=1)c[l]=e.dirty[l]|r[l];return c}return e.dirty|r}return e.dirty}function lt(t,e,n,i,r,c){if(r){const s=C(e,n,i,c);t.p(s,r)}}function ut(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function at(t){const e={};for(const n in t)n[0]!=="$"&&(e[n]=t[n]);return e}function ft(t,e){const n={};e=new Set(e);for(const i in t)!e.has(i)&&i[0]!=="$"&&(n[i]=t[i]);return n}let y=!1;function _t(){y=!0}function dt(){y=!1}function W(t,e,n,i){for(;t<e;){const r=t+(e-t>>1);n(r)<=i?t=r+1:e=r}return t}function q(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const o=[];for(let u=0;u<e.length;u++){const a=e[u];a.claim_order!==void 0&&o.push(a)}e=o}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let r=0;for(let o=0;o<e.length;o++){const u=e[o].claim_order,a=(r>0&&e[n[r]].claim_order<=u?r+1:W(1,r,O=>e[n[O]].claim_order,u))-1;i[o]=n[a]+1;const E=a+1;n[E]=o,r=Math.max(E,r)}const c=[],s=[];let l=e.length-1;for(let o=n[r]+1;o!=0;o=i[o-1]){for(c.push(e[o-1]);l>=o;l--)s.push(e[l]);l--}for(;l>=0;l--)s.push(e[l]);c.reverse(),s.sort((o,u)=>o.claim_order-u.claim_order);for(let o=0,u=0;o<s.length;o++){for(;u<c.length&&s[o].claim_order>=c[u].claim_order;)u++;const a=u<c.length?c[u]:null;t.insertBefore(s[o],a)}}function B(t,e){t.appendChild(e)}function L(t,e){if(y){for(q(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function ht(t,e,n){y&&!n?L(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function I(t){t.parentNode&&t.parentNode.removeChild(t)}function S(t){return document.createElement(t)}function U(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function v(t){return document.createTextNode(t)}function pt(){return v(" ")}function mt(){return v("")}function k(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function F(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}const R=["width","height"];function yt(t,e){const n=Object.getOwnPropertyDescriptors(t.__proto__);for(const i in e)e[i]==null?t.removeAttribute(i):i==="style"?t.style.cssText=e[i]:i==="__value"?t.value=t[i]=e[i]:n[i]&&n[i].set&&R.indexOf(i)===-1?t[i]=e[i]:F(t,i,e[i])}function bt(t){return t.dataset.svelteH}function gt(t){return Array.from(t.childNodes)}function G(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function j(t,e,n,i,r=!1){G(t);const c=(()=>{for(let s=t.claim_info.last_index;s<t.length;s++){const l=t[s];if(e(l)){const o=n(l);return o===void 0?t.splice(s,1):t[s]=o,r||(t.claim_info.last_index=s),l}}for(let s=t.claim_info.last_index-1;s>=0;s--){const l=t[s];if(e(l)){const o=n(l);return o===void 0?t.splice(s,1):t[s]=o,r?o===void 0&&t.claim_info.last_index--:t.claim_info.last_index=s,l}}return i()})();return c.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,c}function D(t,e,n,i){return j(t,r=>r.nodeName===e,r=>{const c=[];for(let s=0;s<r.attributes.length;s++){const l=r.attributes[s];n[l.name]||c.push(l.name)}c.forEach(s=>r.removeAttribute(s))},()=>i(e))}function xt(t,e,n){return D(t,e,n,S)}function wt(t,e,n){return D(t,e,n,U)}function J(t,e){return j(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>v(e),!0)}function vt(t){return J(t," ")}function Et(t,e){e=""+e,t.data!==e&&(t.data=e)}function kt(t,e,n,i){n==null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}let p;function K(){if(p===void 0){p=!1;try{typeof window<"u"&&window.parent&&window.parent.document}catch{p=!0}}return p}function At(t,e){getComputedStyle(t).position==="static"&&(t.style.position="relative");const i=S("iframe");i.setAttribute("style","display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;"),i.setAttribute("aria-hidden","true"),i.tabIndex=-1;const r=K();let c;return r?(i.src="data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>",c=k(window,"message",s=>{s.source===i.contentWindow&&e()})):(i.src="about:blank",i.onload=()=>{c=k(i.contentWindow,"resize",e),e()}),B(t,i),()=>{(r||c&&i.contentWindow)&&c(),I(i)}}function Nt(t,e,n){t.classList.toggle(e,!!n)}function Q(t,e,{bubbles:n=!1,cancelable:i=!1}={}){return new CustomEvent(t,{detail:e,bubbles:n,cancelable:i})}function Ct(t,e){const n=[];let i=0;for(const r of e.childNodes)if(r.nodeType===8){const c=r.textContent.trim();c===`HEAD_${t}_END`?(i-=1,n.push(r)):c===`HEAD_${t}_START`&&(i+=1,n.push(r))}else i>0&&n.push(r);return n}function St(t,e){return new t(e)}let m;function b(t){m=t}function f(){if(!m)throw new Error("Function called outside component initialization");return m}function jt(t){f().$$.before_update.push(t)}function Dt(t){f().$$.on_mount.push(t)}function Tt(t){f().$$.after_update.push(t)}function Ot(t){f().$$.on_destroy.push(t)}function zt(){const t=f();return(e,n,{cancelable:i=!1}={})=>{const r=t.$$.callbacks[e];if(r){const c=Q(e,n,{cancelable:i});return r.slice().forEach(s=>{s.call(t,c)}),!c.defaultPrevented}return!0}}function Pt(t,e){return f().$$.context.set(t,e),e}function Ht(t){return f().$$.context.get(t)}const h=[],A=[];let d=[];const x=[],T=Promise.resolve();let w=!1;function V(){w||(w=!0,T.then(Y))}function Mt(){return V(),T}function X(t){d.push(t)}function Wt(t){x.push(t)}const g=new Set;let _=0;function Y(){if(_!==0)return;const t=m;do{try{for(;_<h.length;){const e=h[_];_++,b(e),Z(e.$$)}}catch(e){throw h.length=0,_=0,e}for(b(null),h.length=0,_=0;A.length;)A.pop()();for(let e=0;e<d.length;e+=1){const n=d[e];g.has(n)||(g.add(n),n())}d.length=0}while(h.length);for(;x.length;)x.pop()();w=!1,g.clear(),b(t)}function Z(t){if(t.fragment!==null){t.update(),M(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(X)}}function qt(t){const e=[],n=[];d.forEach(i=>t.indexOf(i)===-1?e.push(i):n.push(i)),n.forEach(i=>i()),d=e}export{At as $,$ as A,Y as B,tt as C,it as D,X as E,qt as F,m as G,b as H,H as I,h as J,V as K,_t as L,dt as M,ct as N,U as O,wt as P,lt as Q,ut as R,ot as S,P as T,at as U,Ct as V,k as W,Pt as X,Ht as Y,zt as Z,rt as _,z as a,jt as a0,Ot as a1,yt as a2,Nt as a3,ft as a4,A as b,xt as c,I as d,S as e,vt as f,bt as g,Wt as h,ht as i,et as j,gt as k,J as l,L as m,nt as n,Et as o,st as p,mt as q,Tt as r,pt as s,v as t,Dt as u,F as v,kt as w,St as x,Mt as y,M as z};
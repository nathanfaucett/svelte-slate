function $(){}function rt(t,e){for(const n in e)t[n]=e[n];return t}function K(t){return t()}function U(){return Object.create(null)}function E(t){t.forEach(K)}function H(t){return typeof t=="function"}function kt(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let N;function At(t,e){return N||(N=document.createElement("a")),N.href=e,t===N.href}function Nt(t,e){return t!=t?e==e:t!==e}function ot(t){return Object.keys(t).length===0}function Q(t,...e){if(t==null)return $;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function St(t){let e;return Q(t,n=>e=n)(),e}function Ct(t,e,n){t.$$.on_destroy.push(Q(e,n))}function jt(t,e,n,i){if(t){const s=V(t,e,n,i);return t[0](s)}}function V(t,e,n,i){return t[1]&&i?rt(n.ctx.slice(),t[1](i(e))):n.ctx}function Mt(t,e,n,i){if(t[2]&&i){const s=t[2](i(n));if(e.dirty===void 0)return s;if(typeof s=="object"){const c=[],r=Math.max(e.dirty.length,s.length);for(let u=0;u<r;u+=1)c[u]=e.dirty[u]|s[u];return c}return e.dirty|s}return e.dirty}function Tt(t,e,n,i,s,c){if(s){const r=V(e,n,i,c);t.p(r,s)}}function Dt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function Pt(t){const e={};for(const n in t)n[0]!=="$"&&(e[n]=t[n]);return e}function zt(t,e){const n={};e=new Set(e);for(const i in t)!e.has(i)&&i[0]!=="$"&&(n[i]=t[i]);return n}function Ot(t){return t&&H(t.destroy)?t.destroy:$}let T=!1;function ct(){T=!0}function ut(){T=!1}function lt(t,e,n,i){for(;t<e;){const s=t+(e-t>>1);n(s)<=i?t=s+1:e=s}return t}function at(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const o=[];for(let l=0;l<e.length;l++){const f=e[l];f.claim_order!==void 0&&o.push(f)}e=o}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let s=0;for(let o=0;o<e.length;o++){const l=e[o].claim_order,f=(s>0&&e[n[s]].claim_order<=l?s+1:lt(1,s,d=>e[n[d]].claim_order,l))-1;i[o]=n[f]+1;const _=f+1;n[_]=o,s=Math.max(_,s)}const c=[],r=[];let u=e.length-1;for(let o=n[s]+1;o!=0;o=i[o-1]){for(c.push(e[o-1]);u>=o;u--)r.push(e[u]);u--}for(;u>=0;u--)r.push(e[u]);c.reverse(),r.sort((o,l)=>o.claim_order-l.claim_order);for(let o=0,l=0;o<r.length;o++){for(;l<c.length&&r[o].claim_order>=c[l].claim_order;)l++;const f=l<c.length?c[l]:null;t.insertBefore(r[o],f)}}function ft(t,e){t.appendChild(e)}function dt(t,e){if(T){for(at(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function qt(t,e,n){T&&!n?dt(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function X(t){t.parentNode&&t.parentNode.removeChild(t)}function Lt(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function Y(t){return document.createElement(t)}function _t(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function I(t){return document.createTextNode(t)}function Wt(){return I(" ")}function Bt(){return I("")}function G(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function Ht(t){return function(e){return e.stopPropagation(),t.call(this,e)}}function ht(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function It(t,e){const n=Object.getOwnPropertyDescriptors(t.__proto__);for(const i in e)e[i]==null?t.removeAttribute(i):i==="style"?t.style.cssText=e[i]:i==="__value"?t.value=t[i]=e[i]:n[i]&&n[i].set?t[i]=e[i]:ht(t,i,e[i])}function mt(t){return Array.from(t.childNodes)}function pt(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function Z(t,e,n,i,s=!1){pt(t);const c=(()=>{for(let r=t.claim_info.last_index;r<t.length;r++){const u=t[r];if(e(u)){const o=n(u);return o===void 0?t.splice(r,1):t[r]=o,s||(t.claim_info.last_index=r),u}}for(let r=t.claim_info.last_index-1;r>=0;r--){const u=t[r];if(e(u)){const o=n(u);return o===void 0?t.splice(r,1):t[r]=o,s?o===void 0&&t.claim_info.last_index--:t.claim_info.last_index=r,u}}return i()})();return c.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,c}function tt(t,e,n,i){return Z(t,s=>s.nodeName===e,s=>{const c=[];for(let r=0;r<s.attributes.length;r++){const u=s.attributes[r];n[u.name]||c.push(u.name)}c.forEach(r=>s.removeAttribute(r))},()=>i(e))}function Ft(t,e,n){return tt(t,e,n,Y)}function Rt(t,e,n){return tt(t,e,n,_t)}function yt(t,e){return Z(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>I(e),!0)}function Ut(t){return yt(t," ")}function Gt(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function Jt(t,e){t.value=e==null?"":e}function Kt(t,e,n,i){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}function Qt(t,e){for(let n=0;n<t.options.length;n+=1){const i=t.options[n];if(i.__value===e){i.selected=!0;return}}t.selectedIndex=-1}let S;function gt(){if(S===void 0){S=!1;try{typeof window<"u"&&window.parent&&window.parent.document}catch{S=!0}}return S}function Vt(t,e){getComputedStyle(t).position==="static"&&(t.style.position="relative");const i=Y("iframe");i.setAttribute("style","display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;"),i.setAttribute("aria-hidden","true"),i.tabIndex=-1;const s=gt();let c;return s?(i.src="data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>",c=G(window,"message",r=>{r.source===i.contentWindow&&e()})):(i.src="about:blank",i.onload=()=>{c=G(i.contentWindow,"resize",e)}),ft(t,i),()=>{(s||c&&i.contentWindow)&&c(),X(i)}}function Xt(t,e,n){t.classList[n?"add":"remove"](e)}function bt(t,e,{bubbles:n=!1,cancelable:i=!1}={}){const s=document.createEvent("CustomEvent");return s.initCustomEvent(t,n,i,e),s}function Yt(t,e){const n=[];let i=0;for(const s of e.childNodes)if(s.nodeType===8){const c=s.textContent.trim();c===`HEAD_${t}_END`?(i-=1,n.push(s)):c===`HEAD_${t}_START`&&(i+=1,n.push(s))}else i>0&&n.push(s);return n}function Zt(t,e){return new t(e)}let v;function w(t){v=t}function b(){if(!v)throw new Error("Function called outside component initialization");return v}function te(t){b().$$.before_update.push(t)}function ee(t){b().$$.on_mount.push(t)}function ne(t){b().$$.after_update.push(t)}function ie(t){b().$$.on_destroy.push(t)}function se(){const t=b();return(e,n,{cancelable:i=!1}={})=>{const s=t.$$.callbacks[e];if(s){const c=bt(e,n,{cancelable:i});return s.slice().forEach(r=>{r.call(t,c)}),!c.defaultPrevented}return!0}}function re(t,e){return b().$$.context.set(t,e),e}function oe(t){return b().$$.context.get(t)}function ce(t,e){const n=t.$$.callbacks[e.type];n&&n.slice().forEach(i=>i.call(this,e))}const x=[],J=[],j=[],L=[],et=Promise.resolve();let W=!1;function nt(){W||(W=!0,et.then(it))}function ue(){return nt(),et}function B(t){j.push(t)}function le(t){L.push(t)}const q=new Set;let C=0;function it(){const t=v;do{for(;C<x.length;){const e=x[C];C++,w(e),xt(e.$$)}for(w(null),x.length=0,C=0;J.length;)J.pop()();for(let e=0;e<j.length;e+=1){const n=j[e];q.has(n)||(q.add(n),n())}j.length=0}while(x.length);for(;L.length;)L.pop()();W=!1,q.clear(),w(t)}function xt(t){if(t.fragment!==null){t.update(),E(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(B)}}const M=new Set;let g;function ae(){g={r:0,c:[],p:g}}function fe(){g.r||E(g.c),g=g.p}function st(t,e){t&&t.i&&(M.delete(t),t.i(e))}function wt(t,e,n,i){if(t&&t.o){if(M.has(t))return;M.add(t),g.c.push(()=>{M.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}function de(t,e){wt(t,1,1,()=>{e.delete(t.key)})}function _e(t,e,n,i,s,c,r,u,o,l,f,_){let d=t.length,m=c.length,h=d;const D={};for(;h--;)D[t[h].key]=h;const k=[],P=new Map,z=new Map;for(h=m;h--;){const a=_(s,c,h),p=n(a);let y=r.get(p);y?i&&y.p(a,e):(y=l(p,a),y.c()),P.set(p,k[h]=y),p in D&&z.set(p,Math.abs(h-D[p]))}const F=new Set,R=new Set;function O(a){st(a,1),a.m(u,f),r.set(a.key,a),f=a.first,m--}for(;d&&m;){const a=k[m-1],p=t[d-1],y=a.key,A=p.key;a===p?(f=a.first,d--,m--):P.has(A)?!r.has(y)||F.has(y)?O(a):R.has(A)?d--:z.get(y)>z.get(A)?(R.add(y),O(a)):(F.add(A),d--):(o(p,r),d--)}for(;d--;){const a=t[d];P.has(a.key)||o(a,r)}for(;m;)O(k[m-1]);return k}function he(t,e){const n={},i={},s={$$scope:1};let c=t.length;for(;c--;){const r=t[c],u=e[c];if(u){for(const o in r)o in u||(i[o]=1);for(const o in u)s[o]||(n[o]=u[o],s[o]=1);t[c]=u}else for(const o in r)s[o]=1}for(const r in i)r in n||(n[r]=void 0);return n}function me(t){return typeof t=="object"&&t!==null?t:{}}function pe(t,e,n){const i=t.$$.props[e];i!==void 0&&(t.$$.bound[i]=n,n(t.$$.ctx[i]))}function ye(t){t&&t.c()}function ge(t,e){t&&t.l(e)}function $t(t,e,n,i){const{fragment:s,after_update:c}=t.$$;s&&s.m(e,n),i||B(()=>{const r=t.$$.on_mount.map(K).filter(H);t.$$.on_destroy?t.$$.on_destroy.push(...r):E(r),t.$$.on_mount=[]}),c.forEach(B)}function vt(t,e){const n=t.$$;n.fragment!==null&&(E(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function Et(t,e){t.$$.dirty[0]===-1&&(x.push(t),nt(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function be(t,e,n,i,s,c,r,u=[-1]){const o=v;w(t);const l=t.$$={fragment:null,ctx:[],props:c,update:$,not_equal:s,bound:U(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(o?o.$$.context:[])),callbacks:U(),dirty:u,skip_bound:!1,root:e.target||o.$$.root};r&&r(l.root);let f=!1;if(l.ctx=n?n(t,e.props||{},(_,d,...m)=>{const h=m.length?m[0]:d;return l.ctx&&s(l.ctx[_],l.ctx[_]=h)&&(!l.skip_bound&&l.bound[_]&&l.bound[_](h),f&&Et(t,_)),d}):[],l.update(),f=!0,E(l.before_update),l.fragment=i?i(l.ctx):!1,e.target){if(e.hydrate){ct();const _=mt(e.target);l.fragment&&l.fragment.l(_),_.forEach(X)}else l.fragment&&l.fragment.c();e.intro&&st(t.$$.fragment),$t(t,e.target,e.anchor,e.customElement),ut(),it()}w(o)}class xe{$destroy(){vt(this,1),this.$destroy=$}$on(e,n){if(!H(n))return $;const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const s=i.indexOf(n);s!==-1&&i.splice(s,1)}}$set(e){this.$$set&&!ot(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{de as $,rt as A,he as B,me as C,Pt as D,_t as E,Rt as F,Nt as G,jt as H,Yt as I,dt as J,Tt as K,Dt as L,Mt as M,Ct as N,J as O,pe as P,le as Q,re as R,xe as S,oe as T,St as U,se as V,B as W,Vt as X,te as Y,ie as Z,_e as _,qt as a,It as a0,Xt as a1,G as a2,E as a3,zt as a4,H as a5,Ot as a6,At as a7,Wt as a8,Ut as a9,Jt as aa,Qt as ab,Ht as ac,Lt as ad,ce as ae,st as b,fe as c,X as d,Bt as e,ne as f,ae as g,Y as h,be as i,Ft as j,mt as k,ht as l,Kt as m,I as n,ee as o,yt as p,Gt as q,Zt as r,kt as s,wt as t,ye as u,ge as v,$t as w,vt as x,ue as y,$ as z};

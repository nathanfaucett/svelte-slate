function M(){}function st(t,e){for(const n in e)t[n]=e[n];return t}function K(t){return t()}function U(){return Object.create(null)}function v(t){t.forEach(K)}function Q(t){return typeof t=="function"}function kt(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let S;function Et(t,e){return S||(S=document.createElement("a")),S.href=e,t===S.href}function St(t,e){return t!=t?e==e:t!==e}function ot(t){return Object.keys(t).length===0}function R(t,...e){if(t==null)return M;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function At(t){let e;return R(t,n=>e=n)(),e}function jt(t,e,n){t.$$.on_destroy.push(R(e,n))}function Nt(t,e,n,i){if(t){const s=V(t,e,n,i);return t[0](s)}}function V(t,e,n,i){return t[1]&&i?st(n.ctx.slice(),t[1](i(e))):n.ctx}function Ct(t,e,n,i){if(t[2]&&i){const s=t[2](i(n));if(e.dirty===void 0)return s;if(typeof s=="object"){const l=[],r=Math.max(e.dirty.length,s.length);for(let c=0;c<r;c+=1)l[c]=e.dirty[c]|s[c];return l}return e.dirty|s}return e.dirty}function Mt(t,e,n,i,s,l){if(s){const r=V(e,n,i,l);t.p(r,s)}}function qt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function zt(t){const e={};for(const n in t)n[0]!=="$"&&(e[n]=t[n]);return e}function Ot(t,e){const n={};e=new Set(e);for(const i in t)!e.has(i)&&i[0]!=="$"&&(n[i]=t[i]);return n}function Tt(t){return t&&Q(t.destroy)?t.destroy:M}let q=!1;function ct(){q=!0}function lt(){q=!1}function ut(t,e,n,i){for(;t<e;){const s=t+(e-t>>1);n(s)<=i?t=s+1:e=s}return t}function at(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const o=[];for(let u=0;u<e.length;u++){const f=e[u];f.claim_order!==void 0&&o.push(f)}e=o}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let s=0;for(let o=0;o<e.length;o++){const u=e[o].claim_order,f=(s>0&&e[n[s]].claim_order<=u?s+1:ut(1,s,d=>e[n[d]].claim_order,u))-1;i[o]=n[f]+1;const _=f+1;n[_]=o,s=Math.max(_,s)}const l=[],r=[];let c=e.length-1;for(let o=n[s]+1;o!=0;o=i[o-1]){for(l.push(e[o-1]);c>=o;c--)r.push(e[c]);c--}for(;c>=0;c--)r.push(e[c]);l.reverse(),r.sort((o,u)=>o.claim_order-u.claim_order);for(let o=0,u=0;o<r.length;o++){for(;u<l.length&&r[o].claim_order>=l[u].claim_order;)u++;const f=u<l.length?l[u]:null;t.insertBefore(r[o],f)}}function ft(t,e){t.appendChild(e)}function dt(t,e){if(q){for(at(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentElement!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function Lt(t,e,n){q&&!n?dt(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function X(t){t.parentNode.removeChild(t)}function Pt(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function Y(t){return document.createElement(t)}function _t(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function I(t){return document.createTextNode(t)}function Wt(){return I(" ")}function Bt(){return I("")}function G(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function ht(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function Dt(t,e){const n=Object.getOwnPropertyDescriptors(t.__proto__);for(const i in e)e[i]==null?t.removeAttribute(i):i==="style"?t.style.cssText=e[i]:i==="__value"?t.value=t[i]=e[i]:n[i]&&n[i].set?t[i]=e[i]:ht(t,i,e[i])}function mt(t){return Array.from(t.childNodes)}function pt(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function Z(t,e,n,i,s=!1){pt(t);const l=(()=>{for(let r=t.claim_info.last_index;r<t.length;r++){const c=t[r];if(e(c)){const o=n(c);return o===void 0?t.splice(r,1):t[r]=o,s||(t.claim_info.last_index=r),c}}for(let r=t.claim_info.last_index-1;r>=0;r--){const c=t[r];if(e(c)){const o=n(c);return o===void 0?t.splice(r,1):t[r]=o,s?o===void 0&&t.claim_info.last_index--:t.claim_info.last_index=r,c}}return i()})();return l.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,l}function tt(t,e,n,i){return Z(t,s=>s.nodeName===e,s=>{const l=[];for(let r=0;r<s.attributes.length;r++){const c=s.attributes[r];n[c.name]||l.push(c.name)}l.forEach(r=>s.removeAttribute(r))},()=>i(e))}function It(t,e,n){return tt(t,e,n,Y)}function Ft(t,e,n){return tt(t,e,n,_t)}function yt(t,e){return Z(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>I(e),!0)}function Ht(t){return yt(t," ")}function Ut(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function Gt(t,e){t.value=e==null?"":e}function Jt(t,e,n,i){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}function Kt(t,e){for(let n=0;n<t.options.length;n+=1){const i=t.options[n];if(i.__value===e){i.selected=!0;return}}t.selectedIndex=-1}let A;function gt(){if(A===void 0){A=!1;try{typeof window!="undefined"&&window.parent&&window.parent.document}catch{A=!0}}return A}function Qt(t,e){getComputedStyle(t).position==="static"&&(t.style.position="relative");const i=Y("iframe");i.setAttribute("style","display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;"),i.setAttribute("aria-hidden","true"),i.tabIndex=-1;const s=gt();let l;return s?(i.src="data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>",l=G(window,"message",r=>{r.source===i.contentWindow&&e()})):(i.src="about:blank",i.onload=()=>{l=G(i.contentWindow,"resize",e)}),ft(t,i),()=>{(s||l&&i.contentWindow)&&l(),X(i)}}function Rt(t,e,n){t.classList[n?"add":"remove"](e)}function Vt(t,e=document.body){return Array.from(e.querySelectorAll(t))}let $;function w(t){$=t}function x(){if(!$)throw new Error("Function called outside component initialization");return $}function Xt(t){x().$$.before_update.push(t)}function Yt(t){x().$$.on_mount.push(t)}function Zt(t){x().$$.after_update.push(t)}function te(t){x().$$.on_destroy.push(t)}function ee(t,e){return x().$$.context.set(t,e),e}function ne(t){return x().$$.context.get(t)}const b=[],J=[],N=[],W=[],et=Promise.resolve();let B=!1;function nt(){B||(B=!0,et.then(it))}function ie(){return nt(),et}function D(t){N.push(t)}function re(t){W.push(t)}const P=new Set;let j=0;function it(){const t=$;do{for(;j<b.length;){const e=b[j];j++,w(e),xt(e.$$)}for(w(null),b.length=0,j=0;J.length;)J.pop()();for(let e=0;e<N.length;e+=1){const n=N[e];P.has(n)||(P.add(n),n())}N.length=0}while(b.length);for(;W.length;)W.pop()();B=!1,P.clear(),w(t)}function xt(t){if(t.fragment!==null){t.update(),v(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(D)}}const C=new Set;let g;function se(){g={r:0,c:[],p:g}}function oe(){g.r||v(g.c),g=g.p}function rt(t,e){t&&t.i&&(C.delete(t),t.i(e))}function bt(t,e,n,i){if(t&&t.o){if(C.has(t))return;C.add(t),g.c.push(()=>{C.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}}function ce(t,e){bt(t,1,1,()=>{e.delete(t.key)})}function le(t,e,n,i,s,l,r,c,o,u,f,_){let d=t.length,m=l.length,h=d;const z={};for(;h--;)z[t[h].key]=h;const k=[],O=new Map,T=new Map;for(h=m;h--;){const a=_(s,l,h),p=n(a);let y=r.get(p);y?i&&y.p(a,e):(y=u(p,a),y.c()),O.set(p,k[h]=y),p in z&&T.set(p,Math.abs(h-z[p]))}const F=new Set,H=new Set;function L(a){rt(a,1),a.m(c,f),r.set(a.key,a),f=a.first,m--}for(;d&&m;){const a=k[m-1],p=t[d-1],y=a.key,E=p.key;a===p?(f=a.first,d--,m--):O.has(E)?!r.has(y)||F.has(y)?L(a):H.has(E)?d--:T.get(y)>T.get(E)?(H.add(y),L(a)):(F.add(E),d--):(o(p,r),d--)}for(;d--;){const a=t[d];O.has(a.key)||o(a,r)}for(;m;)L(k[m-1]);return k}function ue(t,e){const n={},i={},s={$$scope:1};let l=t.length;for(;l--;){const r=t[l],c=e[l];if(c){for(const o in r)o in c||(i[o]=1);for(const o in c)s[o]||(n[o]=c[o],s[o]=1);t[l]=c}else for(const o in r)s[o]=1}for(const r in i)r in n||(n[r]=void 0);return n}function ae(t){return typeof t=="object"&&t!==null?t:{}}function fe(t,e,n){const i=t.$$.props[e];i!==void 0&&(t.$$.bound[i]=n,n(t.$$.ctx[i]))}function de(t){t&&t.c()}function _e(t,e){t&&t.l(e)}function wt(t,e,n,i){const{fragment:s,on_mount:l,on_destroy:r,after_update:c}=t.$$;s&&s.m(e,n),i||D(()=>{const o=l.map(K).filter(Q);r?r.push(...o):v(o),t.$$.on_mount=[]}),c.forEach(D)}function $t(t,e){const n=t.$$;n.fragment!==null&&(v(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function vt(t,e){t.$$.dirty[0]===-1&&(b.push(t),nt(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function he(t,e,n,i,s,l,r,c=[-1]){const o=$;w(t);const u=t.$$={fragment:null,ctx:null,props:l,update:M,not_equal:s,bound:U(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(o?o.$$.context:[])),callbacks:U(),dirty:c,skip_bound:!1,root:e.target||o.$$.root};r&&r(u.root);let f=!1;if(u.ctx=n?n(t,e.props||{},(_,d,...m)=>{const h=m.length?m[0]:d;return u.ctx&&s(u.ctx[_],u.ctx[_]=h)&&(!u.skip_bound&&u.bound[_]&&u.bound[_](h),f&&vt(t,_)),d}):[],u.update(),f=!0,v(u.before_update),u.fragment=i?i(u.ctx):!1,e.target){if(e.hydrate){ct();const _=mt(e.target);u.fragment&&u.fragment.l(_),_.forEach(X)}else u.fragment&&u.fragment.c();e.intro&&rt(t.$$.fragment),wt(t,e.target,e.anchor,e.customElement),lt(),it()}w(o)}class me{$destroy(){$t(this,1),this.$destroy=M}$on(e,n){const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const s=i.indexOf(n);s!==-1&&i.splice(s,1)}}$set(e){this.$$set&&!ot(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{v as $,ae as A,$t as B,st as C,ie as D,M as E,zt as F,_t as G,Ft as H,Nt as I,Vt as J,dt as K,Mt as L,qt as M,Ct as N,J as O,fe as P,re as Q,ne as R,me as S,At as T,St as U,Xt as V,D as W,Qt as X,Dt as Y,Rt as Z,G as _,mt as a,Ot as a0,jt as a1,te as a2,le as a3,ce as a4,Q as a5,Et as a6,Kt as a7,Tt as a8,Gt as a9,Pt as aa,ht as b,It as c,X as d,Y as e,Jt as f,Lt as g,yt as h,he as i,Ut as j,Wt as k,Bt as l,Ht as m,se as n,bt as o,oe as p,rt as q,ee as r,kt as s,I as t,Zt as u,Yt as v,de as w,_e as x,wt as y,ue as z};

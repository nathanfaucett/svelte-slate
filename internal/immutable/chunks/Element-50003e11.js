import{S as W,i as Y,X as Z,I as E,e as L,k as G,t as z,c as C,a as N,m as J,h as A,d as c,b as f,g as T,K as O,T as x,j as ee,L as q,M as j,N as w,q as p,o as k,O as V,l as R,n as le,p as ne,P as D,w as K,x as Q,y as S,Q as M,B as X}from"./index-e5e6e368.js";import{n as te,o as ie,i as ae,b as se,e as fe,a as ue}from"./CodeElement-c84a1a7b.js";import{T as y,f as oe,p as re}from"./index.es-98589f29.js";function de(i){let e,a,s,t,l,n,u,o=(i[1].value||"world")+"",_,v,H,d,b,m;const B=i[8].default,I=E(B,i,i[7],null);return{c(){e=L("div"),a=L("div"),s=L("input"),l=G(),n=L("h1"),u=z("Hello, "),_=z(o),v=z("!"),H=G(),I&&I.c(),this.h()},l(h){e=C(h,"DIV",{class:!0,"data-slate-node":!0,"data-slate-inline":!0,"data-slate-void":!0,dir:!0,contenteditable:!0});var g=N(e);a=C(g,"DIV",{contenteditable:!0,class:!0});var P=N(a);s=C(P,"INPUT",{class:!0}),l=J(P),n=C(P,"H1",{class:!0});var U=N(n);u=A(U,"Hello, "),_=A(U,o),v=A(U,"!"),U.forEach(c),P.forEach(c),H=J(g),I&&I.l(g),g.forEach(c),this.h()},h(){s.value=t=i[1].value,f(s,"class","svelte-1jaq4ix"),f(n,"class","svelte-1jaq4ix"),f(a,"contenteditable",!1),f(a,"class","void svelte-1jaq4ix"),f(e,"class","container svelte-1jaq4ix"),f(e,"data-slate-node","element"),f(e,"data-slate-inline",i[2]),f(e,"data-slate-void",i[3]),f(e,"dir",i[5]),f(e,"contenteditable",i[4])},m(h,g){T(h,e,g),O(e,a),O(a,s),O(a,l),O(a,n),O(n,u),O(n,_),O(n,v),O(e,H),I&&I.m(e,null),i[9](e),d=!0,b||(m=x(s,"input",i[6]),b=!0)},p(h,[g]){(!d||g&2&&t!==(t=h[1].value)&&s.value!==t)&&(s.value=t),(!d||g&2)&&o!==(o=(h[1].value||"world")+"")&&ee(_,o),I&&I.p&&(!d||g&128)&&q(I,B,h,h[7],d?w(B,h[7],g,null):j(h[7]),null),(!d||g&4)&&f(e,"data-slate-inline",h[2]),(!d||g&8)&&f(e,"data-slate-void",h[3]),(!d||g&32)&&f(e,"dir",h[5]),(!d||g&16)&&f(e,"contenteditable",h[4])},i(h){d||(p(I,h),d=!0)},o(h){k(I,h),d=!1},d(h){h&&c(e),I&&I.d(h),i[9](null),b=!1,m()}}}function F(i){return i.type==="void"}function Ue(i){const{isVoid:e,isInline:a}=i;return i.isVoid=s=>F(s)?!0:e(s),i.isInline=s=>F(s)?!0:a(s),i}function Be(i){y.insertNodes(i,{type:"void",children:[{text:""}]})}function _e(i,e,a){let{$$slots:s={},$$scope:t}=e,{element:l}=e,{isInline:n}=e,{isVoid:u}=e,{contenteditable:o}=e,{ref:_=void 0}=e,{dir:v=void 0}=e,H=oe();function d(m){y.setNodes(H,{value:m.target.value},{at:re(l)})}function b(m){V[m?"unshift":"push"](()=>{_=m,a(0,_)})}return i.$$set=m=>{"element"in m&&a(1,l=m.element),"isInline"in m&&a(2,n=m.isInline),"isVoid"in m&&a(3,u=m.isVoid),"contenteditable"in m&&a(4,o=m.contenteditable),"ref"in m&&a(0,_=m.ref),"dir"in m&&a(5,v=m.dir),"$$scope"in m&&a(7,t=m.$$scope)},[_,l,n,u,o,v,d,t,s,b]}class me extends W{constructor(e){super(),Y(this,e,_e,de,Z,{element:1,isInline:2,isVoid:3,contenteditable:4,ref:0,dir:5})}}function he(i){let e,a;const s=i[6].default,t=E(s,i,i[18],null);return{c(){e=L("p"),t&&t.c(),this.h()},l(l){e=C(l,"P",{"data-slate-node":!0,"data-slate-inline":!0,"data-slate-void":!0,dir:!0,contenteditable:!0,class:!0});var n=N(e);t&&t.l(n),n.forEach(c),this.h()},h(){f(e,"data-slate-node","element"),f(e,"data-slate-inline",i[2]),f(e,"data-slate-void",i[3]),f(e,"dir",i[5]),f(e,"contenteditable",i[4]),f(e,"class","svelte-kkn06x")},m(l,n){T(l,e,n),t&&t.m(e,null),i[17](e),a=!0},p(l,n){t&&t.p&&(!a||n&262144)&&q(t,s,l,l[18],a?w(s,l[18],n,null):j(l[18]),null),(!a||n&4)&&f(e,"data-slate-inline",l[2]),(!a||n&8)&&f(e,"data-slate-void",l[3]),(!a||n&32)&&f(e,"dir",l[5]),(!a||n&16)&&f(e,"contenteditable",l[4])},i(l){a||(p(t,l),a=!0)},o(l){k(t,l),a=!1},d(l){l&&c(e),t&&t.d(l),i[17](null)}}}function be(i){let e,a,s;function t(n){i[16](n)}let l={element:i[1],isInline:i[2],isVoid:i[3],dir:i[5],contenteditable:i[4],$$slots:{default:[je]},$$scope:{ctx:i}};return i[0]!==void 0&&(l.ref=i[0]),e=new se({props:l}),V.push(()=>D(e,"ref",t)),{c(){K(e.$$.fragment)},l(n){Q(e.$$.fragment,n)},m(n,u){S(e,n,u),s=!0},p(n,u){const o={};u&2&&(o.element=n[1]),u&4&&(o.isInline=n[2]),u&8&&(o.isVoid=n[3]),u&32&&(o.dir=n[5]),u&16&&(o.contenteditable=n[4]),u&262144&&(o.$$scope={dirty:u,ctx:n}),!a&&u&1&&(a=!0,o.ref=n[0],M(()=>a=!1)),e.$set(o)},i(n){s||(p(e.$$.fragment,n),s=!0)},o(n){k(e.$$.fragment,n),s=!1},d(n){X(e,n)}}}function ce(i){let e,a,s;function t(n){i[15](n)}let l={element:i[1],isInline:i[2],isVoid:i[3],dir:i[5],contenteditable:i[4],$$slots:{default:[we]},$$scope:{ctx:i}};return i[0]!==void 0&&(l.ref=i[0]),e=new me({props:l}),V.push(()=>D(e,"ref",t)),{c(){K(e.$$.fragment)},l(n){Q(e.$$.fragment,n)},m(n,u){S(e,n,u),s=!0},p(n,u){const o={};u&2&&(o.element=n[1]),u&4&&(o.isInline=n[2]),u&8&&(o.isVoid=n[3]),u&32&&(o.dir=n[5]),u&16&&(o.contenteditable=n[4]),u&262144&&(o.$$scope={dirty:u,ctx:n}),!a&&u&1&&(a=!0,o.ref=n[0],M(()=>a=!1)),e.$set(o)},i(n){s||(p(e.$$.fragment,n),s=!0)},o(n){k(e.$$.fragment,n),s=!1},d(n){X(e,n)}}}function ve(i){let e,a,s;function t(n){i[14](n)}let l={element:i[1],isInline:i[2],isVoid:i[3],dir:i[5],contenteditable:i[4],$$slots:{default:[Le]},$$scope:{ctx:i}};return i[0]!==void 0&&(l.ref=i[0]),e=new fe({props:l}),V.push(()=>D(e,"ref",t)),{c(){K(e.$$.fragment)},l(n){Q(e.$$.fragment,n)},m(n,u){S(e,n,u),s=!0},p(n,u){const o={};u&2&&(o.element=n[1]),u&4&&(o.isInline=n[2]),u&8&&(o.isVoid=n[3]),u&32&&(o.dir=n[5]),u&16&&(o.contenteditable=n[4]),u&262144&&(o.$$scope={dirty:u,ctx:n}),!a&&u&1&&(a=!0,o.ref=n[0],M(()=>a=!1)),e.$set(o)},i(n){s||(p(e.$$.fragment,n),s=!0)},o(n){k(e.$$.fragment,n),s=!1},d(n){X(e,n)}}}function pe(i){let e,a,s;function t(n){i[13](n)}let l={element:i[1],isInline:i[2],isVoid:i[3],dir:i[5],contenteditable:i[4],$$slots:{default:[Ce]},$$scope:{ctx:i}};return i[0]!==void 0&&(l.ref=i[0]),e=new ue({props:l}),V.push(()=>D(e,"ref",t)),{c(){K(e.$$.fragment)},l(n){Q(e.$$.fragment,n)},m(n,u){S(e,n,u),s=!0},p(n,u){const o={};u&2&&(o.element=n[1]),u&4&&(o.isInline=n[2]),u&8&&(o.isVoid=n[3]),u&32&&(o.dir=n[5]),u&16&&(o.contenteditable=n[4]),u&262144&&(o.$$scope={dirty:u,ctx:n}),!a&&u&1&&(a=!0,o.ref=n[0],M(()=>a=!1)),e.$set(o)},i(n){s||(p(e.$$.fragment,n),s=!0)},o(n){k(e.$$.fragment,n),s=!1},d(n){X(e,n)}}}function ke(i){let e,a;const s=i[6].default,t=E(s,i,i[18],null);return{c(){e=L("ol"),t&&t.c(),this.h()},l(l){e=C(l,"OL",{"data-slate-node":!0,"data-slate-inline":!0,"data-slate-void":!0,dir:!0,contenteditable:!0,class:!0});var n=N(e);t&&t.l(n),n.forEach(c),this.h()},h(){f(e,"data-slate-node","element"),f(e,"data-slate-inline",i[2]),f(e,"data-slate-void",i[3]),f(e,"dir",i[5]),f(e,"contenteditable",i[4]),f(e,"class","svelte-kkn06x")},m(l,n){T(l,e,n),t&&t.m(e,null),i[12](e),a=!0},p(l,n){t&&t.p&&(!a||n&262144)&&q(t,s,l,l[18],a?w(s,l[18],n,null):j(l[18]),null),(!a||n&4)&&f(e,"data-slate-inline",l[2]),(!a||n&8)&&f(e,"data-slate-void",l[3]),(!a||n&32)&&f(e,"dir",l[5]),(!a||n&16)&&f(e,"contenteditable",l[4])},i(l){a||(p(t,l),a=!0)},o(l){k(t,l),a=!1},d(l){l&&c(e),t&&t.d(l),i[12](null)}}}function ge(i){let e,a;const s=i[6].default,t=E(s,i,i[18],null);return{c(){e=L("li"),t&&t.c(),this.h()},l(l){e=C(l,"LI",{"data-slate-node":!0,"data-slate-inline":!0,"data-slate-void":!0,dir:!0,contenteditable:!0,class:!0});var n=N(e);t&&t.l(n),n.forEach(c),this.h()},h(){f(e,"data-slate-node","element"),f(e,"data-slate-inline",i[2]),f(e,"data-slate-void",i[3]),f(e,"dir",i[5]),f(e,"contenteditable",i[4]),f(e,"class","svelte-kkn06x")},m(l,n){T(l,e,n),t&&t.m(e,null),i[11](e),a=!0},p(l,n){t&&t.p&&(!a||n&262144)&&q(t,s,l,l[18],a?w(s,l[18],n,null):j(l[18]),null),(!a||n&4)&&f(e,"data-slate-inline",l[2]),(!a||n&8)&&f(e,"data-slate-void",l[3]),(!a||n&32)&&f(e,"dir",l[5]),(!a||n&16)&&f(e,"contenteditable",l[4])},i(l){a||(p(t,l),a=!0)},o(l){k(t,l),a=!1},d(l){l&&c(e),t&&t.d(l),i[11](null)}}}function Ie(i){let e,a;const s=i[6].default,t=E(s,i,i[18],null);return{c(){e=L("h2"),t&&t.c(),this.h()},l(l){e=C(l,"H2",{"data-slate-node":!0,"data-slate-inline":!0,"data-slate-void":!0,dir:!0,contenteditable:!0,class:!0});var n=N(e);t&&t.l(n),n.forEach(c),this.h()},h(){f(e,"data-slate-node","element"),f(e,"data-slate-inline",i[2]),f(e,"data-slate-void",i[3]),f(e,"dir",i[5]),f(e,"contenteditable",i[4]),f(e,"class","svelte-kkn06x")},m(l,n){T(l,e,n),t&&t.m(e,null),i[10](e),a=!0},p(l,n){t&&t.p&&(!a||n&262144)&&q(t,s,l,l[18],a?w(s,l[18],n,null):j(l[18]),null),(!a||n&4)&&f(e,"data-slate-inline",l[2]),(!a||n&8)&&f(e,"data-slate-void",l[3]),(!a||n&32)&&f(e,"dir",l[5]),(!a||n&16)&&f(e,"contenteditable",l[4])},i(l){a||(p(t,l),a=!0)},o(l){k(t,l),a=!1},d(l){l&&c(e),t&&t.d(l),i[10](null)}}}function Ve(i){let e,a;const s=i[6].default,t=E(s,i,i[18],null);return{c(){e=L("h1"),t&&t.c(),this.h()},l(l){e=C(l,"H1",{"data-slate-node":!0,"data-slate-inline":!0,"data-slate-void":!0,dir:!0,contenteditable:!0,class:!0});var n=N(e);t&&t.l(n),n.forEach(c),this.h()},h(){f(e,"data-slate-node","element"),f(e,"data-slate-inline",i[2]),f(e,"data-slate-void",i[3]),f(e,"dir",i[5]),f(e,"contenteditable",i[4]),f(e,"class","svelte-kkn06x")},m(l,n){T(l,e,n),t&&t.m(e,null),i[9](e),a=!0},p(l,n){t&&t.p&&(!a||n&262144)&&q(t,s,l,l[18],a?w(s,l[18],n,null):j(l[18]),null),(!a||n&4)&&f(e,"data-slate-inline",l[2]),(!a||n&8)&&f(e,"data-slate-void",l[3]),(!a||n&32)&&f(e,"dir",l[5]),(!a||n&16)&&f(e,"contenteditable",l[4])},i(l){a||(p(t,l),a=!0)},o(l){k(t,l),a=!1},d(l){l&&c(e),t&&t.d(l),i[9](null)}}}function Ee(i){let e,a;const s=i[6].default,t=E(s,i,i[18],null);return{c(){e=L("ul"),t&&t.c(),this.h()},l(l){e=C(l,"UL",{"data-slate-node":!0,"data-slate-inline":!0,"data-slate-void":!0,dir:!0,contenteditable:!0,class:!0});var n=N(e);t&&t.l(n),n.forEach(c),this.h()},h(){f(e,"data-slate-node","element"),f(e,"data-slate-inline",i[2]),f(e,"data-slate-void",i[3]),f(e,"dir",i[5]),f(e,"contenteditable",i[4]),f(e,"class","svelte-kkn06x")},m(l,n){T(l,e,n),t&&t.m(e,null),i[8](e),a=!0},p(l,n){t&&t.p&&(!a||n&262144)&&q(t,s,l,l[18],a?w(s,l[18],n,null):j(l[18]),null),(!a||n&4)&&f(e,"data-slate-inline",l[2]),(!a||n&8)&&f(e,"data-slate-void",l[3]),(!a||n&32)&&f(e,"dir",l[5]),(!a||n&16)&&f(e,"contenteditable",l[4])},i(l){a||(p(t,l),a=!0)},o(l){k(t,l),a=!1},d(l){l&&c(e),t&&t.d(l),i[8](null)}}}function qe(i){let e,a;const s=i[6].default,t=E(s,i,i[18],null);return{c(){e=L("blockquote"),t&&t.c(),this.h()},l(l){e=C(l,"BLOCKQUOTE",{"data-slate-node":!0,"data-slate-inline":!0,"data-slate-void":!0,dir:!0,contenteditable:!0,class:!0});var n=N(e);t&&t.l(n),n.forEach(c),this.h()},h(){f(e,"data-slate-node","element"),f(e,"data-slate-inline",i[2]),f(e,"data-slate-void",i[3]),f(e,"dir",i[5]),f(e,"contenteditable",i[4]),f(e,"class","svelte-kkn06x")},m(l,n){T(l,e,n),t&&t.m(e,null),i[7](e),a=!0},p(l,n){t&&t.p&&(!a||n&262144)&&q(t,s,l,l[18],a?w(s,l[18],n,null):j(l[18]),null),(!a||n&4)&&f(e,"data-slate-inline",l[2]),(!a||n&8)&&f(e,"data-slate-void",l[3]),(!a||n&32)&&f(e,"dir",l[5]),(!a||n&16)&&f(e,"contenteditable",l[4])},i(l){a||(p(t,l),a=!0)},o(l){k(t,l),a=!1},d(l){l&&c(e),t&&t.d(l),i[7](null)}}}function je(i){let e;const a=i[6].default,s=E(a,i,i[18],null);return{c(){s&&s.c()},l(t){s&&s.l(t)},m(t,l){s&&s.m(t,l),e=!0},p(t,l){s&&s.p&&(!e||l&262144)&&q(s,a,t,t[18],e?w(a,t[18],l,null):j(t[18]),null)},i(t){e||(p(s,t),e=!0)},o(t){k(s,t),e=!1},d(t){s&&s.d(t)}}}function we(i){let e;const a=i[6].default,s=E(a,i,i[18],null);return{c(){s&&s.c()},l(t){s&&s.l(t)},m(t,l){s&&s.m(t,l),e=!0},p(t,l){s&&s.p&&(!e||l&262144)&&q(s,a,t,t[18],e?w(a,t[18],l,null):j(t[18]),null)},i(t){e||(p(s,t),e=!0)},o(t){k(s,t),e=!1},d(t){s&&s.d(t)}}}function Le(i){let e;const a=i[6].default,s=E(a,i,i[18],null);return{c(){s&&s.c()},l(t){s&&s.l(t)},m(t,l){s&&s.m(t,l),e=!0},p(t,l){s&&s.p&&(!e||l&262144)&&q(s,a,t,t[18],e?w(a,t[18],l,null):j(t[18]),null)},i(t){e||(p(s,t),e=!0)},o(t){k(s,t),e=!1},d(t){s&&s.d(t)}}}function Ce(i){let e;const a=i[6].default,s=E(a,i,i[18],null);return{c(){s&&s.c()},l(t){s&&s.l(t)},m(t,l){s&&s.m(t,l),e=!0},p(t,l){s&&s.p&&(!e||l&262144)&&q(s,a,t,t[18],e?w(a,t[18],l,null):j(t[18]),null)},i(t){e||(p(s,t),e=!0)},o(t){k(s,t),e=!1},d(t){s&&s.d(t)}}}function He(i){let e,a,s,t,l,n,u,o;const _=[qe,Ee,Ve,Ie,ge,ke,pe,ve,ce,be,he],v=[];function H(d,b){return b&2&&(e=null),b&2&&(a=null),b&2&&(s=null),b&2&&(t=null),d[1].type==="block-quote"?0:d[1].type==="bulleted-list"?1:d[1].type==="heading-one"?2:d[1].type==="heading-two"?3:d[1].type==="list-item"?4:d[1].type==="numbered-list"?5:(e==null&&(e=!!te(d[1])),e?6:(a==null&&(a=!!ie(d[1])),a?7:(s==null&&(s=!!F(d[1])),s?8:(t==null&&(t=!!ae(d[1])),t?9:10))))}return l=H(i,-1),n=v[l]=_[l](i),{c(){n.c(),u=R()},l(d){n.l(d),u=R()},m(d,b){v[l].m(d,b),T(d,u,b),o=!0},p(d,[b]){let m=l;l=H(d,b),l===m?v[l].p(d,b):(le(),k(v[m],1,1,()=>{v[m]=null}),ne(),n=v[l],n?n.p(d,b):(n=v[l]=_[l](d),n.c()),p(n,1),n.m(u.parentNode,u))},i(d){o||(p(n),o=!0)},o(d){k(n),o=!1},d(d){v[l].d(d),d&&c(u)}}}function Ne(i,e,a){let{$$slots:s={},$$scope:t}=e,{element:l}=e,{isInline:n}=e,{isVoid:u}=e,{contenteditable:o}=e,{ref:_=void 0}=e,{dir:v=void 0}=e;function H(r){V[r?"unshift":"push"](()=>{_=r,a(0,_)})}function d(r){V[r?"unshift":"push"](()=>{_=r,a(0,_)})}function b(r){V[r?"unshift":"push"](()=>{_=r,a(0,_)})}function m(r){V[r?"unshift":"push"](()=>{_=r,a(0,_)})}function B(r){V[r?"unshift":"push"](()=>{_=r,a(0,_)})}function I(r){V[r?"unshift":"push"](()=>{_=r,a(0,_)})}function h(r){_=r,a(0,_)}function g(r){_=r,a(0,_)}function P(r){_=r,a(0,_)}function U(r){_=r,a(0,_)}function $(r){V[r?"unshift":"push"](()=>{_=r,a(0,_)})}return i.$$set=r=>{"element"in r&&a(1,l=r.element),"isInline"in r&&a(2,n=r.isInline),"isVoid"in r&&a(3,u=r.isVoid),"contenteditable"in r&&a(4,o=r.contenteditable),"ref"in r&&a(0,_=r.ref),"dir"in r&&a(5,v=r.dir),"$$scope"in r&&a(18,t=r.$$scope)},[_,l,n,u,o,v,s,H,d,b,m,B,I,h,g,P,U,$,t]}class De extends W{constructor(e){super(),Y(this,e,Ne,He,Z,{element:1,isInline:2,isVoid:3,contenteditable:4,ref:0,dir:5})}}export{De as E,Be as i,Ue as w};
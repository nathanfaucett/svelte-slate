import{S as U,i as X,G as $e,W as Je,u as w,v as E,w as k,a2 as K,b,t as v,x as C,ad as Ke,H as ke,h as z,j as P,k as O,d as M,l as y,a as q,K as Ce,L as Me,M as De,O as F,P as G,Q,N as Z,y as Ze,n as se,p as ie,a1 as W,J as S,ac as Ne,a9 as Ve,q as xe,a3 as Ie,s as te,A as Y,B as ae,C as le,D as x,E as fe,F as ue,z as ce}from"../../../chunks/index-cb8244d6.js";import{J as he,Q as et,I as Te,R as Oe,q as oe,U as tt,V as He,W as nt,X as ot,P as ze,g as rt,G as st,s as it,f as at,T as re,Y as Pe,Z as lt,M as be,_ as ft,v as ut,p as ct,$ as dt,S as mt,w as ht,a as gt,c as _t,E as pt,D as $t}from"../../../chunks/index.es-e403fdd0.js";import{P as bt,a as Ae,p as ve,q as vt,j as Fe,c as wt,I as Et,w as kt,d as Ct,C as Mt,e as Dt,M as pe,B as me,b as It,f as Tt,g as yt,h as Nt,k as Bt,l as Lt,m as Vt,n as Ot,o as Ht}from"../../../chunks/MdFormatQuote-e4a23f30.js";import{I as de}from"../../../chunks/IconBase-e31913ed.js";/* empty css                                                             */import"../../../chunks/preload-helper-176e53da.js";const{window:Ee}=Ke;function zt(o){let e,t;const n=o[7].default,s=ke(n,o,o[10],null);return{c(){e=z("div"),s&&s.c(),this.h()},l(r){e=P(r,"DIV",{class:!0});var i=O(e);s&&s.l(i),i.forEach(M),this.h()},h(){y(e,"class","hovering-menu svelte-1us4u7o")},m(r,i){q(r,e,i),s&&s.m(e,null),o[9](e),t=!0},p(r,i){s&&s.p&&(!t||i&1024)&&Ce(s,n,r,r[10],t?De(n,r[10],i,null):Me(r[10]),null)},i(r){t||(b(s,r),t=!0)},o(r){v(s,r),t=!1},d(r){r&&M(e),s&&s.d(r),o[9](null)}}}function Pt(o){let e,t,n,s;return Je(o[8]),e=new bt({props:{$$slots:{default:[zt]},$$scope:{ctx:o}}}),{c(){w(e.$$.fragment)},l(r){E(e.$$.fragment,r)},m(r,i){k(e,r,i),t=!0,n||(s=K(Ee,"resize",o[8]),n=!0)},p(r,[i]){const a={};i&1025&&(a.$$scope={dirty:i,ctx:r}),e.$set(a)},i(r){t||(b(e.$$.fragment,r),t=!0)},o(r){v(e.$$.fragment,r),t=!1},d(r){C(e,r),n=!1,s()}}}function Se(o,e,t,n,s,r){const i=window.getSelection();if(!i||i.type.toLowerCase()==="none"){r>0&&setTimeout(()=>{Se(o,e,t,n,s,r-1)},100);return}const l=i.getRangeAt(0).getBoundingClientRect(),f=e.getBoundingClientRect();l.left+window.pageXOffset-o.offsetWidth/2<f.left?o.style.left=`${f.left+window.pageXOffset}px`:l.right+window.pageXOffset+o.offsetWidth/2>f.right?o.style.left=`${f.right+window.pageXOffset-o.offsetWidth}px`:o.style.left=`${l.left+window.pageXOffset-o.offsetWidth/2+l.width/2}px`,l.top+window.pageYOffset-o.offsetHeight<f.top?o.style.top=`${l.bottom+window.pageYOffset+s}px`:o.style.top=`${l.top+window.pageYOffset-o.offsetHeight-s}px`,o.style.opacity="1"}function At(o,e,t){let{$$slots:n={},$$scope:s}=e,{container:r=void 0}=e,{ref:i=void 0}=e,{open:a=!1}=e,{offsetY:l=4}=e,{retires:f=2}=e,c=640,u=480;function h(){t(1,c=Ee.innerWidth),t(2,u=Ee.innerHeight)}function m(g){F[g?"unshift":"push"](()=>{i=g,t(0,i)})}return o.$$set=g=>{"container"in g&&t(3,r=g.container),"ref"in g&&t(0,i=g.ref),"open"in g&&t(4,a=g.open),"offsetY"in g&&t(5,l=g.offsetY),"retires"in g&&t(6,f=g.retires),"$$scope"in g&&t(10,s=g.$$scope)},o.$$.update=()=>{o.$$.dirty&8&&r===void 0&&typeof document<"u"&&t(3,r=document.body),o.$$.dirty&127&&i&&(a?Se(i,r,c,u,l,f):i.removeAttribute("style"))},[i,c,u,r,a,l,f,n,h,m,s]}class Ye extends U{constructor(e){super(),X(this,e,At,Pt,$e,{container:3,ref:0,open:4,offsetY:5,retires:6})}}function Ft(o){let e;const t=o[13].default,n=ke(t,o,o[16],null);return{c(){n&&n.c()},l(s){n&&n.l(s)},m(s,r){n&&n.m(s,r),e=!0},p(s,r){n&&n.p&&(!e||r&65536)&&Ce(n,t,s,s[16],e?De(t,s[16],r,null):Me(s[16]),null)},i(s){e||(b(n,s),e=!0)},o(s){v(n,s),e=!1},d(s){n&&n.d(s)}}}function St(o){let e,t,n,s;function r(l){o[14](l)}function i(l){o[15](l)}let a={container:o[1],offsetY:o[2],$$slots:{default:[Ft]},$$scope:{ctx:o}};return o[0]!==void 0&&(a.open=o[0]),o[3]!==void 0&&(a.ref=o[3]),e=new Ye({props:a}),F.push(()=>G(e,"open",r)),F.push(()=>G(e,"ref",i)),{c(){w(e.$$.fragment)},l(l){E(e.$$.fragment,l)},m(l,f){k(e,l,f),s=!0},p(l,[f]){const c={};f&2&&(c.container=l[1]),f&4&&(c.offsetY=l[2]),f&65536&&(c.$$scope={dirty:f,ctx:l}),!t&&f&1&&(t=!0,c.open=l[0],Q(()=>t=!1)),!n&&f&8&&(n=!0,c.ref=l[3],Q(()=>n=!1)),e.$set(c)},i(l){s||(b(e.$$.fragment,l),s=!0)},o(l){v(e.$$.fragment,l),s=!1},d(l){C(e,l)}}}function Yt(o,e,t){let n,s,r,i,a,l,{$$slots:f={},$$scope:c}=e,{container:u=void 0}=e,{open:h=!1}=e,{offsetY:m=4}=e;const g=he();Z(o,g,D=>t(12,l=D));const N=et();Z(o,N,D=>t(11,a=D));const I=Te();Z(o,I,D=>t(10,i=D));let d;function _(D){h=D,t(0,h),t(3,d),t(8,s),t(9,r),t(7,n),t(11,a),t(10,i),t(12,l)}function B(D){d=D,t(3,d)}return o.$$set=D=>{"container"in D&&t(1,u=D.container),"open"in D&&t(0,h=D.open),"offsetY"in D&&t(2,m=D.offsetY),"$$scope"in D&&t(16,c=D.$$scope)},o.$$.update=()=>{if(o.$$.dirty&4096&&t(7,n=l),o.$$.dirty&2048&&t(8,s=a),o.$$.dirty&1024&&t(9,r=i),o.$$.dirty&904&&d)if(!s||!r||Oe.isCollapsed(s)||oe.string(n,s)==="")t(0,h=!1);else{const[D]=Array.from(oe.nodes(n,{at:oe.unhangRange(n,n.selection),match:Ae}));D||t(0,h=!0)}},[h,u,m,d,g,N,I,n,s,r,i,a,l,f,_,B,c]}class Rt extends U{constructor(e){super(),X(this,e,Yt,St,$e,{container:1,open:0,offsetY:2})}}function qt(o,e){e===void 0&&(e={enabled:!0});var t=Be(e),n=t.enabled,s=t.eventType,r=t.nodeForEvent,i=t.options,a=t.capture,l=function(f){o&&!o.contains(f.target)&&!f.defaultPrevented&&o.dispatchEvent(new CustomEvent("clickoutside",{detail:f}))};return e.enabled!==!1&&r.addEventListener(s,l,i),{update:function(f){var c;r.removeEventListener(s,l,a),c=Be(f),n=c.enabled,s=c.eventType,r=c.nodeForEvent,i=c.options,a=c.capture,n&&r.addEventListener(s,l,i)},destroy:function(){r.removeEventListener(s,l,a)}}}function Be(o){var e,t,n,s,r;return{enabled:(e=o.enabled)!==null&&e!==void 0?e:!0,nodeForEvent:(n=(t=o.limit)===null||t===void 0?void 0:t.parent)!==null&&n!==void 0?n:document,eventType:(s=o.event)!==null&&s!==void 0?s:"click",options:o.options,capture:typeof o.options=="object"?(r=o.options)===null||r===void 0?void 0:r.capture:o.options}}function Ut(o){let e;return{c(){e=se("Update")},l(t){e=ie(t,"Update")},m(t,n){q(t,e,n)},d(t){t&&M(e)}}}function Xt(o){let e;return{c(){e=se("Insert")},l(t){e=ie(t,"Insert")},m(t,n){q(t,e,n)},d(t){t&&M(e)}}}function Wt(o){let e;return{c(){e=se("Inline")},l(t){e=ie(t,"Inline")},m(t,n){q(t,e,n)},d(t){t&&M(e)}}}function jt(o){let e;return{c(){e=se("Block")},l(t){e=ie(t,"Block")},m(t,n){q(t,e,n)},d(t){t&&M(e)}}}function Gt(o){let e,t,n,s,r,i,a,l,f,c,u,h,m,g;function N(V,H){return V[4]?Xt:Ut}let I=N(o),d=I(o);function _(V,H){return V[2]?jt:Wt}let B=_(o),D=B(o);return{c(){e=z("div"),t=z("div"),n=se(o[3]),s=z("div"),r=z("div"),i=z("div"),a=z("textarea"),l=z("div"),f=z("button"),d.c(),c=z("button"),D.c(),u=z("div"),h=z("span"),this.h()},l(V){e=P(V,"DIV",{class:!0});var H=O(e);t=P(H,"DIV",{class:!0});var A=O(t);n=ie(A,o[3]),A.forEach(M),s=P(H,"DIV",{class:!0});var j=O(s);r=P(j,"DIV",{class:!0});var $=O(r);i=P($,"DIV",{class:!0});var p=O(i);a=P(p,"TEXTAREA",{class:!0}),O(a).forEach(M),p.forEach(M),l=P($,"DIV",{class:!0});var L=O(l);f=P(L,"BUTTON",{class:!0});var R=O(f);d.l(R),R.forEach(M),c=P(L,"BUTTON",{class:!0});var J=O(c);D.l(J),J.forEach(M),L.forEach(M),u=P($,"DIV",{class:!0});var ee=O(u);h=P(ee,"SPAN",{class:!0}),O(h).forEach(M),ee.forEach(M),$.forEach(M),j.forEach(M),H.forEach(M),this.h()},h(){y(t,"class","math-editor-title svelte-17vn65m"),y(a,"class","svelte-17vn65m"),y(i,"class","math-editor-latexinput svelte-17vn65m"),y(f,"class","svelte-17vn65m"),W(f,"active",!o[1]),y(c,"class","svelte-17vn65m"),W(c,"active",!o[2]),y(l,"class","math-editor-buttons"),y(h,"class","svelte-17vn65m"),y(u,"class","math-editor-rendering svelte-17vn65m"),y(r,"class","math-editor-math svelte-17vn65m"),y(s,"class","math-editor-content"),y(e,"class","math-editor-body svelte-17vn65m")},m(V,H){q(V,e,H),S(e,t),S(t,n),S(e,s),S(s,r),S(r,i),S(i,a),o[16](a),Ne(a,o[1]),S(r,l),S(l,f),d.m(f,null),S(l,c),D.m(c,null),S(r,u),S(u,h),o[18](h),o[19](e),m||(g=[K(a,"input",o[17]),K(f,"click",o[10]),K(c,"click",o[11]),Ve(qt.call(null,e)),K(e,"clickoutside",o[12])],m=!0)},p(V,H){H&8&&xe(n,V[3]),H&2&&Ne(a,V[1]),I!==(I=N(V))&&(d.d(1),d=I(V),d&&(d.c(),d.m(f,null))),H&2&&W(f,"active",!V[1]),B!==(B=_(V))&&(D.d(1),D=B(V),D&&(D.c(),D.m(c,null))),H&4&&W(c,"active",!V[2])},d(V){V&&M(e),o[16](null),d.d(),D.d(),o[18](null),o[19](null),m=!1,Ie(g)}}}function Qt(o){let e,t,n;function s(i){o[20](i)}let r={container:o[8],$$slots:{default:[Gt]},$$scope:{ctx:o}};return o[0]!==void 0&&(r.open=o[0]),e=new Ye({props:r}),F.push(()=>G(e,"open",s)),{c(){w(e.$$.fragment)},l(i){E(e.$$.fragment,i)},m(i,a){k(e,i,a),n=!0},p(i,[a]){const l={};a&256&&(l.container=i[8]),a&4194558&&(l.$$scope={dirty:a,ctx:i}),!t&&a&1&&(t=!0,l.open=i[0],Q(()=>t=!1)),e.$set(l)},i(i){n||(b(e.$$.fragment,i),n=!0)},o(i){v(e.$$.fragment,i),n=!1},d(i){C(e,i)}}}function Jt(o,e){if(e){let t=e.parentNode;for(;t;){if(o===t)return!0;t=t.parentNode}}return!1}function Kt(o,e,t){let n,s,{open:r=!1}=e,{title:i="LaTeX Editor"}=e,{math:a=""}=e,{inline:l=!0}=e,{isNew:f=!0}=e,{onDone:c}=e;const u=tt();Z(o,u,$=>t(15,s=$));let h=Date.now(),m=r;function g(){t(0,r=!1),c(a,l)}function N(){t(2,l=!l)}let I;function d(){var $;h+500<Date.now()&&!Jt(I,($=window.getSelection())==null?void 0:$.focusNode)&&t(0,r=!1)}let _,B;function D($){F[$?"unshift":"push"](()=>{_=$,t(5,_)})}function V(){a=this.value,t(1,a)}function H($){F[$?"unshift":"push"](()=>{B=$,t(6,B)})}function A($){F[$?"unshift":"push"](()=>{I=$,t(7,I)})}function j($){r=$,t(0,r)}return o.$$set=$=>{"open"in $&&t(0,r=$.open),"title"in $&&t(3,i=$.title),"math"in $&&t(1,a=$.math),"inline"in $&&t(2,l=$.inline),"isNew"in $&&t(4,f=$.isNew),"onDone"in $&&t(13,c=$.onDone)},o.$$.update=()=>{o.$$.dirty&32768&&t(8,n=s),o.$$.dirty&16385&&m!==r&&(h=Date.now(),t(14,m=r)),o.$$.dirty&71&&r&&B&&He.render(a,B,{displayMode:!l,output:"html",throwOnError:!1}),o.$$.dirty&33&&r&&_&&Ze().then(()=>{_.focus()})},[r,a,l,i,f,_,B,I,n,u,g,N,d,c,m,s,D,V,H,A,j]}class Re extends U{constructor(e){super(),X(this,e,Kt,Qt,$e,{open:0,title:3,math:1,inline:2,isNew:4,onDone:13})}}function Zt(o){let e;return{c(){e=fe("path"),this.h()},l(t){e=ue(t,"path",{d:!0}),O(e).forEach(M),this.h()},h(){y(e,"d","M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z")},m(t,n){q(t,e,n)},p:ce,d(t){t&&M(e)}}}function xt(o){let e,t;const n=[{viewBox:"0 0 24 24"},o[0]];let s={$$slots:{default:[Zt]},$$scope:{ctx:o}};for(let r=0;r<n.length;r+=1)s=Y(s,n[r]);return e=new de({props:s}),{c(){w(e.$$.fragment)},l(r){E(e.$$.fragment,r)},m(r,i){k(e,r,i),t=!0},p(r,[i]){const a=i&1?ae(n,[n[0],le(r[0])]):{};i&2&&(a.$$scope={dirty:i,ctx:r}),e.$set(a)},i(r){t||(b(e.$$.fragment,r),t=!0)},o(r){v(e.$$.fragment,r),t=!1},d(r){C(e,r)}}}function en(o,e,t){return o.$$set=n=>{t(0,e=Y(Y({},e),x(n)))},e=x(e),[e]}class tn extends U{constructor(e){super(),X(this,e,en,xt,te,{})}}function nn(o){let e;return{c(){e=fe("path"),this.h()},l(t){e=ue(t,"path",{d:!0}),O(e).forEach(M),this.h()},h(){y(e,"d","M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z")},m(t,n){q(t,e,n)},p:ce,d(t){t&&M(e)}}}function on(o){let e,t;const n=[{viewBox:"0 0 24 24"},o[0]];let s={$$slots:{default:[nn]},$$scope:{ctx:o}};for(let r=0;r<n.length;r+=1)s=Y(s,n[r]);return e=new de({props:s}),{c(){w(e.$$.fragment)},l(r){E(e.$$.fragment,r)},m(r,i){k(e,r,i),t=!0},p(r,[i]){const a=i&1?ae(n,[n[0],le(r[0])]):{};i&2&&(a.$$scope={dirty:i,ctx:r}),e.$set(a)},i(r){t||(b(e.$$.fragment,r),t=!0)},o(r){v(e.$$.fragment,r),t=!1},d(r){C(e,r)}}}function rn(o,e,t){return o.$$set=n=>{t(0,e=Y(Y({},e),x(n)))},e=x(e),[e]}class sn extends U{constructor(e){super(),X(this,e,rn,on,te,{})}}function an(o){let e;return{c(){e=fe("path"),this.h()},l(t){e=ue(t,"path",{d:!0}),O(e).forEach(M),this.h()},h(){y(e,"d","M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z")},m(t,n){q(t,e,n)},p:ce,d(t){t&&M(e)}}}function ln(o){let e,t;const n=[{viewBox:"0 0 24 24"},o[0]];let s={$$slots:{default:[an]},$$scope:{ctx:o}};for(let r=0;r<n.length;r+=1)s=Y(s,n[r]);return e=new de({props:s}),{c(){w(e.$$.fragment)},l(r){E(e.$$.fragment,r)},m(r,i){k(e,r,i),t=!0},p(r,[i]){const a=i&1?ae(n,[n[0],le(r[0])]):{};i&2&&(a.$$scope={dirty:i,ctx:r}),e.$set(a)},i(r){t||(b(e.$$.fragment,r),t=!0)},o(r){v(e.$$.fragment,r),t=!1},d(r){C(e,r)}}}function fn(o,e,t){return o.$$set=n=>{t(0,e=Y(Y({},e),x(n)))},e=x(e),[e]}class un extends U{constructor(e){super(),X(this,e,fn,ln,te,{})}}function cn(o){let e,t,n,s,r,i,a,l,f,c,u,h,m,g,N,I,d,_;function B(p){o[28](p)}function D(p){o[29](p)}function V(p){o[30](p)}function H(p){o[31](p)}let A={onDone:o[17]};o[8]!==void 0&&(A.open=o[8]),o[10]!==void 0&&(A.math=o[10]),o[11]!==void 0&&(A.inline=o[11]),o[12]!==void 0&&(A.isNew=o[12]),e=new Re({props:A}),F.push(()=>G(e,"open",B)),F.push(()=>G(e,"math",D)),F.push(()=>G(e,"inline",V)),F.push(()=>G(e,"isNew",H)),u=new tn({}),m=new sn({}),N=new un({});const j=o[27].default,$=ke(j,o,o[26],null);return{c(){w(e.$$.fragment),i=z("div"),a=z("div"),l=z("span"),f=z("div"),c=z("button"),w(u.$$.fragment),h=z("button"),w(m.$$.fragment),g=z("button"),w(N.$$.fragment),$&&$.c(),this.h()},l(p){E(e.$$.fragment,p),i=P(p,"DIV",{class:!0,"data-slate-node":!0,"data-slate-inline":!0,"data-slate-void":!0,dir:!0,contenteditable:!0});var L=O(i);a=P(L,"DIV",{class:!0,contenteditable:!0});var R=O(a);l=P(R,"SPAN",{}),O(l).forEach(M),f=P(R,"DIV",{class:!0});var J=O(f);c=P(J,"BUTTON",{class:!0});var ee=O(c);E(u.$$.fragment,ee),ee.forEach(M),h=P(J,"BUTTON",{class:!0});var ge=O(h);E(m.$$.fragment,ge),ge.forEach(M),g=P(J,"BUTTON",{class:!0});var ne=O(g);E(N.$$.fragment,ne),ne.forEach(M),J.forEach(M),R.forEach(M),$&&$.l(L),L.forEach(M),this.h()},h(){y(c,"class","svelte-1v8xkls"),y(h,"class","svelte-1v8xkls"),y(g,"class","svelte-1v8xkls"),y(f,"class","math-edit svelte-1v8xkls"),W(f,"math-selected",o[13]),y(a,"class","math-value svelte-1v8xkls"),y(a,"contenteditable",!1),W(a,"math-selectable",!o[7]),W(a,"math-inline",o[5]),W(a,"math-selected",o[13]),y(i,"class","math-element svelte-1v8xkls"),y(i,"data-slate-node","element"),y(i,"data-slate-inline",o[1]),y(i,"data-slate-void",o[2]),y(i,"dir",o[4]),y(i,"contenteditable",o[3]),W(i,"math-inline",o[5])},m(p,L){k(e,p,L),q(p,i,L),S(i,a),S(a,l),o[32](l),S(a,f),S(f,c),k(u,c,null),S(f,h),k(m,h,null),S(f,g),k(N,g,null),o[33](f),$&&$.m(i,null),o[34](i),I=!0,d||(_=[K(c,"mousedown",o[20]),K(c,"touchstart",o[20],{passive:!0}),K(h,"mousedown",o[19]),K(h,"touchstart",o[19],{passive:!0}),K(g,"mousedown",o[18]),K(g,"touchstart",o[18],{passive:!0})],d=!0)},p(p,L){const R={};!t&&L[0]&256&&(t=!0,R.open=p[8],Q(()=>t=!1)),!n&&L[0]&1024&&(n=!0,R.math=p[10],Q(()=>n=!1)),!s&&L[0]&2048&&(s=!0,R.inline=p[11],Q(()=>s=!1)),!r&&L[0]&4096&&(r=!0,R.isNew=p[12],Q(()=>r=!1)),e.$set(R),(!I||L[0]&8192)&&W(f,"math-selected",p[13]),(!I||L[0]&128)&&W(a,"math-selectable",!p[7]),(!I||L[0]&32)&&W(a,"math-inline",p[5]),(!I||L[0]&8192)&&W(a,"math-selected",p[13]),$&&$.p&&(!I||L[0]&67108864)&&Ce($,j,p,p[26],I?De(j,p[26],L,null):Me(p[26]),null),(!I||L[0]&2)&&y(i,"data-slate-inline",p[1]),(!I||L[0]&4)&&y(i,"data-slate-void",p[2]),(!I||L[0]&16)&&y(i,"dir",p[4]),(!I||L[0]&8)&&y(i,"contenteditable",p[3]),(!I||L[0]&32)&&W(i,"math-inline",p[5])},i(p){I||(b(e.$$.fragment,p),b(u.$$.fragment,p),b(m.$$.fragment,p),b(N.$$.fragment,p),b($,p),I=!0)},o(p){v(e.$$.fragment,p),v(u.$$.fragment,p),v(m.$$.fragment,p),v(N.$$.fragment,p),v($,p),I=!1},d(p){C(e,p),p&&M(i),o[32](null),C(u),C(m),C(N),o[33](null),$&&$.d(p),o[34](null),d=!1,Ie(_)}}}const we="math";function Le(o){return o.type===we}function dn(o){const{isVoid:e,isInline:t,insertBreak:n}=o;return o.isInline=s=>Le(s)?!!s.inline:t(s),o.isVoid=s=>Le(s)?!0:e(s),o.insertBreak=()=>{!o.selection||!Oe.isCollapsed(o.selection)?n():oe.isVoid(o,nt.get(o,ot.parent(o.selection.anchor.path)))?oe.insertNode(o,{type:ze,children:[{text:""}]}):n()},o}function mn(o,e,t,n){const s={type:we,math:e,inline:t,children:[{text:""}]};t?oe.withoutNormalizing(o,()=>{re.insertNodes(o,s,{at:n})}):re.insertNodes(o,s,{at:n})}function hn(o,e,t){let n,s,r,i,a,l,{$$slots:f={},$$scope:c}=e,{element:u}=e,{isInline:h}=e,{isVoid:m}=e,{contenteditable:g}=e,{ref:N=void 0}=e,{dir:I=void 0}=e;const d=rt(),_=st();Z(o,_,T=>t(24,a=T));const B=Te();Z(o,B,T=>t(23,i=T));const D=it();Z(o,D,T=>t(25,l=T));let V=u.math,H=u.inline,A=!1;function j(T,_e){if(u.inline!==_e){$();const ye={type:"math",math:T,inline:_e,children:[{text:""}]};_e?re.insertNodes(d,{type:ze,children:[ye]},{at:r}):re.insertNodes(d,ye,{at:r.slice(0,-1)})}else re.setNodes(d,{math:T,inline:_e},{at:r}),t(8,A=!1);t(12,ee=!0)}function $(){t(8,A=!1),re.delete(d,{at:r})}function p(){navigator.clipboard.writeText(V)}let L,R=V,J=H,ee;function ge(){Pe(d)||(t(10,R=V),t(11,J=H),lt(L),t(8,A=!0),t(12,ee=!1))}let ne;function qe(T){A=T,t(8,A)}function Ue(T){R=T,t(10,R)}function Xe(T){J=T,t(11,J)}function We(T){ee=T,t(12,ee)}function je(T){F[T?"unshift":"push"](()=>{ne=T,t(6,ne)})}function Ge(T){F[T?"unshift":"push"](()=>{L=T,t(9,L)})}function Qe(T){F[T?"unshift":"push"](()=>{N=T,t(0,N)})}return o.$$set=T=>{"element"in T&&t(21,u=T.element),"isInline"in T&&t(1,h=T.isInline),"isVoid"in T&&t(2,m=T.isVoid),"contenteditable"in T&&t(3,g=T.contenteditable),"ref"in T&&t(0,N=T.ref),"dir"in T&&t(4,I=T.dir),"$$scope"in T&&t(26,c=T.$$scope)},o.$$.update=()=>{o.$$.dirty[0]&33554432&&t(7,n=l),o.$$.dirty[0]&25165952&&t(13,s=n?!1:a&&i),o.$$.dirty[0]&2097152&&(r=at(u)),o.$$.dirty[0]&6291456&&V!==u.math&&t(22,V=u.math),o.$$.dirty[0]&2097184&&H!==u.inline&&t(5,H=u.inline),o.$$.dirty[0]&4194400&&ne&&He.render(V,ne,{displayMode:!H,output:"html",throwOnError:!1})},[N,h,m,g,I,H,ne,n,A,L,R,J,ee,s,_,B,D,j,$,p,ge,u,V,i,a,l,c,f,qe,Ue,Xe,We,je,Ge,Qe]}class gn extends U{constructor(e){super(),X(this,e,hn,cn,$e,{element:21,isInline:1,isVoid:2,contenteditable:3,ref:0,dir:4},null,[-1,-1])}}function _n(o,e=500){let t=null;function n(){t=setTimeout(()=>{o.dispatchEvent(new CustomEvent("longpress"))},e)}function s(){t!==null&&(clearTimeout(t),t=null)}return o.addEventListener("mousedown",n),o.addEventListener("touchstart",n),o.addEventListener("mouseup",s),o.addEventListener("touchend",s),{update(r){s(),e=r},destroy(){s(),o.removeEventListener("mousedown",n),o.removeEventListener("touchstart",n),o.removeEventListener("mouseup",s),o.removeEventListener("touchend",s)}}}function pn(o){let e,t;return e=new Fe({}),{c(){w(e.$$.fragment)},l(n){E(e.$$.fragment,n)},m(n,s){k(e,n,s),t=!0},i(n){t||(b(e.$$.fragment,n),t=!0)},o(n){v(e.$$.fragment,n),t=!1},d(n){C(e,n)}}}function $n(o){let e,t;return e=new ve({props:{active:o[0],onMouseDown:o[1],$$slots:{default:[pn]},$$scope:{ctx:o}}}),{c(){w(e.$$.fragment)},l(n){E(e.$$.fragment,n)},m(n,s){k(e,n,s),t=!0},p(n,[s]){const r={};s&1&&(r.active=n[0]),s&2&&(r.onMouseDown=n[1]),s&32&&(r.$$scope={dirty:s,ctx:n}),e.$set(r)},i(n){t||(b(e.$$.fragment,n),t=!0)},o(n){v(e.$$.fragment,n),t=!1},d(n){C(e,n)}}}function bn(o,e,t){let n,s,r,i;const a=he();return Z(o,a,l=>t(4,i=l)),o.$$.update=()=>{o.$$.dirty&16&&t(3,n=i),o.$$.dirty&8&&t(0,s=be(n,"code")),o.$$.dirty&9&&t(1,r=()=>!s&&vt(n))},[s,r,a,n,i]}class vn extends U{constructor(e){super(),X(this,e,bn,$n,te,{})}}function wn(o){let e;return{c(){e=fe("path"),this.h()},l(t){e=ue(t,"path",{d:!0}),O(e).forEach(M),this.h()},h(){y(e,"d","M14 10H2v2h12v-2zm0-4H2v2h12V6zM2 16h8v-2H2v2zm19.5-4.5L23 13l-6.99 7-4.51-4.5L13 14l3.01 3 5.49-5.5z")},m(t,n){q(t,e,n)},p:ce,d(t){t&&M(e)}}}function En(o){let e,t;const n=[{viewBox:"0 0 24 24"},o[0]];let s={$$slots:{default:[wn]},$$scope:{ctx:o}};for(let r=0;r<n.length;r+=1)s=Y(s,n[r]);return e=new de({props:s}),{c(){w(e.$$.fragment)},l(r){E(e.$$.fragment,r)},m(r,i){k(e,r,i),t=!0},p(r,[i]){const a=i&1?ae(n,[n[0],le(r[0])]):{};i&2&&(a.$$scope={dirty:i,ctx:r}),e.$set(a)},i(r){t||(b(e.$$.fragment,r),t=!0)},o(r){v(e.$$.fragment,r),t=!1},d(r){C(e,r)}}}function kn(o,e,t){return o.$$set=n=>{t(0,e=Y(Y({},e),x(n)))},e=x(e),[e]}class Cn extends U{constructor(e){super(),X(this,e,kn,En,te,{})}}function Mn(o){let e,t;return e=new Cn({}),{c(){w(e.$$.fragment)},l(n){E(e.$$.fragment,n)},m(n,s){k(e,n,s),t=!0},i(n){t||(b(e.$$.fragment,n),t=!0)},o(n){v(e.$$.fragment,n),t=!1},d(n){C(e,n)}}}function Dn(o){let e,t;return e=new ve({props:{active:o[1],onMouseDown:o[0],$$slots:{default:[Mn]},$$scope:{ctx:o}}}),{c(){w(e.$$.fragment)},l(n){E(e.$$.fragment,n)},m(n,s){k(e,n,s),t=!0},p(n,[s]){const r={};s&2&&(r.active=n[1]),s&1&&(r.onMouseDown=n[0]),s&32&&(r.$$scope={dirty:s,ctx:n}),e.$set(r)},i(n){t||(b(e.$$.fragment,n),t=!0)},o(n){v(e.$$.fragment,n),t=!1},d(n){C(e,n)}}}function In(o,e,t){let n,s,r,i;const a=he();return Z(o,a,l=>t(4,i=l)),o.$$.update=()=>{o.$$.dirty&16&&t(3,n=i),o.$$.dirty&8&&t(1,s=be(n,"check-list-item")),o.$$.dirty&8&&t(0,r=()=>ft(n))},[r,s,a,n,i]}class Tn extends U{constructor(e){super(),X(this,e,In,Dn,te,{})}}function yn(o){let e;return{c(){e=fe("path"),this.h()},l(t){e=ue(t,"path",{d:!0}),O(e).forEach(M),this.h()},h(){y(e,"d","M18 4H6v2l6.5 6L6 18v2h12v-3h-7l5-5-5-5h7z")},m(t,n){q(t,e,n)},p:ce,d(t){t&&M(e)}}}function Nn(o){let e,t;const n=[{viewBox:"0 0 24 24"},o[0]];let s={$$slots:{default:[yn]},$$scope:{ctx:o}};for(let r=0;r<n.length;r+=1)s=Y(s,n[r]);return e=new de({props:s}),{c(){w(e.$$.fragment)},l(r){E(e.$$.fragment,r)},m(r,i){k(e,r,i),t=!0},p(r,[i]){const a=i&1?ae(n,[n[0],le(r[0])]):{};i&2&&(a.$$scope={dirty:i,ctx:r}),e.$set(a)},i(r){t||(b(e.$$.fragment,r),t=!0)},o(r){v(e.$$.fragment,r),t=!1},d(r){C(e,r)}}}function Bn(o,e,t){return o.$$set=n=>{t(0,e=Y(Y({},e),x(n)))},e=x(e),[e]}class Ln extends U{constructor(e){super(),X(this,e,Bn,Nn,te,{})}}function Vn(o){let e,t;return e=new Ln({}),{c(){w(e.$$.fragment)},l(n){E(e.$$.fragment,n)},m(n,s){k(e,n,s),t=!0},i(n){t||(b(e.$$.fragment,n),t=!0)},o(n){v(e.$$.fragment,n),t=!1},d(n){C(e,n)}}}function On(o){let e,t,n,s,r,i;function a(u){o[11](u)}function l(u){o[12](u)}function f(u){o[13](u)}let c={onDone:o[7]};return o[0]!==void 0&&(c.open=o[0]),o[1]!==void 0&&(c.math=o[1]),o[2]!==void 0&&(c.inline=o[2]),e=new Re({props:c}),F.push(()=>G(e,"open",a)),F.push(()=>G(e,"math",l)),F.push(()=>G(e,"inline",f)),r=new ve({props:{active:o[3],onMouseDown:o[6],$$slots:{default:[Vn]},$$scope:{ctx:o}}}),{c(){w(e.$$.fragment),w(r.$$.fragment)},l(u){E(e.$$.fragment,u),E(r.$$.fragment,u)},m(u,h){k(e,u,h),k(r,u,h),i=!0},p(u,[h]){const m={};!t&&h&1&&(t=!0,m.open=u[0],Q(()=>t=!1)),!n&&h&2&&(n=!0,m.math=u[1],Q(()=>n=!1)),!s&&h&4&&(s=!0,m.inline=u[2],Q(()=>s=!1)),e.$set(m);const g={};h&8&&(g.active=u[3]),h&131072&&(g.$$scope={dirty:h,ctx:u}),r.$set(g)},i(u){i||(b(e.$$.fragment,u),b(r.$$.fragment,u),i=!0)},o(u){v(e.$$.fragment,u),v(r.$$.fragment,u),i=!1},d(u){C(e,u),C(r,u)}}}function Hn(o,e,t){let n,s,r,i,a;const l=he();Z(o,l,B=>t(10,a=B));const f=Te();Z(o,f,B=>t(9,i=B));let c,u=!1,h="",m=!0;function g(){c=n.selection?n.selection.anchor||n.selection.focus:void 0,t(1,h=""),t(2,m=!0),t(0,u=!u)}function N(B,D){mn(n,B,D,c)}ut("onKeyDown",B=>{ct("ctrl+m",B)&&(s?(c=n.selection?n.selection.anchor||n.selection.focus:void 0,t(1,h=""),t(2,m=!0),t(0,u=!0)):t(0,u=!1))});function I(B){u=B,t(0,u)}function d(B){h=B,t(1,h)}function _(B){m=B,t(2,m)}return o.$$.update=()=>{o.$$.dirty&1024&&t(8,n=a),o.$$.dirty&512&&(s=i),o.$$.dirty&256&&t(3,r=be(n,we))},[u,h,m,r,l,f,g,N,n,i,a,I,d,_]}class zn extends U{constructor(e){super(),X(this,e,Hn,On,te,{})}}function Pn(o){let e;return{c(){e=fe("path"),this.h()},l(t){e=ue(t,"path",{d:!0}),O(e).forEach(M),this.h()},h(){y(e,"d","M464 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zM224 416H64v-96h160v96zm0-160H64v-96h160v96zm224 160H288v-96h160v96zm0-160H288v-96h160v96z")},m(t,n){q(t,e,n)},p:ce,d(t){t&&M(e)}}}function An(o){let e,t;const n=[{viewBox:"0 0 512 512"},o[0]];let s={$$slots:{default:[Pn]},$$scope:{ctx:o}};for(let r=0;r<n.length;r+=1)s=Y(s,n[r]);return e=new de({props:s}),{c(){w(e.$$.fragment)},l(r){E(e.$$.fragment,r)},m(r,i){k(e,r,i),t=!0},p(r,[i]){const a=i&1?ae(n,[n[0],le(r[0])]):{};i&2&&(a.$$scope={dirty:i,ctx:r}),e.$set(a)},i(r){t||(b(e.$$.fragment,r),t=!0)},o(r){v(e.$$.fragment,r),t=!1},d(r){C(e,r)}}}function Fn(o,e,t){return o.$$set=n=>{t(0,e=Y(Y({},e),x(n)))},e=x(e),[e]}class Sn extends U{constructor(e){super(),X(this,e,Fn,An,te,{})}}function Yn(o){let e,t;return e=new Sn({}),{c(){w(e.$$.fragment)},l(n){E(e.$$.fragment,n)},m(n,s){k(e,n,s),t=!0},i(n){t||(b(e.$$.fragment,n),t=!0)},o(n){v(e.$$.fragment,n),t=!1},d(n){C(e,n)}}}function Rn(o){let e,t;return e=new ve({props:{active:o[1],onMouseDown:o[0],$$slots:{default:[Yn]},$$scope:{ctx:o}}}),{c(){w(e.$$.fragment)},l(n){E(e.$$.fragment,n)},m(n,s){k(e,n,s),t=!0},p(n,[s]){const r={};s&2&&(r.active=n[1]),s&1&&(r.onMouseDown=n[0]),s&32&&(r.$$scope={dirty:s,ctx:n}),e.$set(r)},i(n){t||(b(e.$$.fragment,n),t=!0)},o(n){v(e.$$.fragment,n),t=!1},d(n){C(e,n)}}}function qn(o,e,t){let n,s,r,i;const a=he();return Z(o,a,l=>t(4,i=l)),o.$$.update=()=>{o.$$.dirty&16&&t(3,n=i),o.$$.dirty&8&&t(1,s=be(n,"void")),o.$$.dirty&8&&t(0,r=()=>dt(n))},[r,s,a,n,i]}class Un extends U{constructor(e){super(),X(this,e,qn,Rn,te,{})}}function Xn(o){let e,t;return e=new Tt({}),{c(){w(e.$$.fragment)},l(n){E(e.$$.fragment,n)},m(n,s){k(e,n,s),t=!0},i(n){t||(b(e.$$.fragment,n),t=!0)},o(n){v(e.$$.fragment,n),t=!1},d(n){C(e,n)}}}function Wn(o){let e,t;return e=new yt({}),{c(){w(e.$$.fragment)},l(n){E(e.$$.fragment,n)},m(n,s){k(e,n,s),t=!0},i(n){t||(b(e.$$.fragment,n),t=!0)},o(n){v(e.$$.fragment,n),t=!1},d(n){C(e,n)}}}function jn(o){let e,t;return e=new Nt({}),{c(){w(e.$$.fragment)},l(n){E(e.$$.fragment,n)},m(n,s){k(e,n,s),t=!0},i(n){t||(b(e.$$.fragment,n),t=!0)},o(n){v(e.$$.fragment,n),t=!1},d(n){C(e,n)}}}function Gn(o){let e,t;return e=new Fe({}),{c(){w(e.$$.fragment)},l(n){E(e.$$.fragment,n)},m(n,s){k(e,n,s),t=!0},i(n){t||(b(e.$$.fragment,n),t=!0)},o(n){v(e.$$.fragment,n),t=!1},d(n){C(e,n)}}}function Qn(o){let e,t;return e=new Bt({}),{c(){w(e.$$.fragment)},l(n){E(e.$$.fragment,n)},m(n,s){k(e,n,s),t=!0},i(n){t||(b(e.$$.fragment,n),t=!0)},o(n){v(e.$$.fragment,n),t=!1},d(n){C(e,n)}}}function Jn(o){let e,t;return e=new Lt({}),{c(){w(e.$$.fragment)},l(n){E(e.$$.fragment,n)},m(n,s){k(e,n,s),t=!0},i(n){t||(b(e.$$.fragment,n),t=!0)},o(n){v(e.$$.fragment,n),t=!1},d(n){C(e,n)}}}function Kn(o){let e,t;return e=new Vt({}),{c(){w(e.$$.fragment)},l(n){E(e.$$.fragment,n)},m(n,s){k(e,n,s),t=!0},i(n){t||(b(e.$$.fragment,n),t=!0)},o(n){v(e.$$.fragment,n),t=!1},d(n){C(e,n)}}}function Zn(o){let e,t;return e=new Ot({}),{c(){w(e.$$.fragment)},l(n){E(e.$$.fragment,n)},m(n,s){k(e,n,s),t=!0},i(n){t||(b(e.$$.fragment,n),t=!0)},o(n){v(e.$$.fragment,n),t=!1},d(n){C(e,n)}}}function xn(o){let e,t;return e=new Ht({}),{c(){w(e.$$.fragment)},l(n){E(e.$$.fragment,n)},m(n,s){k(e,n,s),t=!0},i(n){t||(b(e.$$.fragment,n),t=!0)},o(n){v(e.$$.fragment,n),t=!1},d(n){C(e,n)}}}function eo(o){let e,t,n,s,r,i,a,l,f,c,u,h,m,g,N,I;return t=new pe({props:{format:"bold",$$slots:{default:[Xn]},$$scope:{ctx:o}}}),n=new pe({props:{format:"italic",$$slots:{default:[Wn]},$$scope:{ctx:o}}}),s=new pe({props:{format:"underline",$$slots:{default:[jn]},$$scope:{ctx:o}}}),r=new pe({props:{format:"code",$$slots:{default:[Gn]},$$scope:{ctx:o}}}),i=new me({props:{format:"heading1",$$slots:{default:[Qn]},$$scope:{ctx:o}}}),a=new me({props:{format:"heading2",$$slots:{default:[Jn]},$$scope:{ctx:o}}}),l=new me({props:{format:"block-quote",$$slots:{default:[Kn]},$$scope:{ctx:o}}}),f=new me({props:{format:"numbered-list",$$slots:{default:[Zn]},$$scope:{ctx:o}}}),c=new me({props:{format:"bulleted-list",$$slots:{default:[xn]},$$scope:{ctx:o}}}),u=new It({}),h=new Tn({}),m=new vn({}),g=new zn({}),N=new Un({}),{c(){e=z("div"),w(t.$$.fragment),w(n.$$.fragment),w(s.$$.fragment),w(r.$$.fragment),w(i.$$.fragment),w(a.$$.fragment),w(l.$$.fragment),w(f.$$.fragment),w(c.$$.fragment),w(u.$$.fragment),w(h.$$.fragment),w(m.$$.fragment),w(g.$$.fragment),w(N.$$.fragment),this.h()},l(d){e=P(d,"DIV",{class:!0});var _=O(e);E(t.$$.fragment,_),E(n.$$.fragment,_),E(s.$$.fragment,_),E(r.$$.fragment,_),E(i.$$.fragment,_),E(a.$$.fragment,_),E(l.$$.fragment,_),E(f.$$.fragment,_),E(c.$$.fragment,_),E(u.$$.fragment,_),E(h.$$.fragment,_),E(m.$$.fragment,_),E(g.$$.fragment,_),E(N.$$.fragment,_),_.forEach(M),this.h()},h(){y(e,"class","toolbar svelte-mszq1p")},m(d,_){q(d,e,_),k(t,e,null),k(n,e,null),k(s,e,null),k(r,e,null),k(i,e,null),k(a,e,null),k(l,e,null),k(f,e,null),k(c,e,null),k(u,e,null),k(h,e,null),k(m,e,null),k(g,e,null),k(N,e,null),I=!0},p(d,_){const B={};_&512&&(B.$$scope={dirty:_,ctx:d}),t.$set(B);const D={};_&512&&(D.$$scope={dirty:_,ctx:d}),n.$set(D);const V={};_&512&&(V.$$scope={dirty:_,ctx:d}),s.$set(V);const H={};_&512&&(H.$$scope={dirty:_,ctx:d}),r.$set(H);const A={};_&512&&(A.$$scope={dirty:_,ctx:d}),i.$set(A);const j={};_&512&&(j.$$scope={dirty:_,ctx:d}),a.$set(j);const $={};_&512&&($.$$scope={dirty:_,ctx:d}),l.$set($);const p={};_&512&&(p.$$scope={dirty:_,ctx:d}),f.$set(p);const L={};_&512&&(L.$$scope={dirty:_,ctx:d}),c.$set(L)},i(d){I||(b(t.$$.fragment,d),b(n.$$.fragment,d),b(s.$$.fragment,d),b(r.$$.fragment,d),b(i.$$.fragment,d),b(a.$$.fragment,d),b(l.$$.fragment,d),b(f.$$.fragment,d),b(c.$$.fragment,d),b(u.$$.fragment,d),b(h.$$.fragment,d),b(m.$$.fragment,d),b(g.$$.fragment,d),b(N.$$.fragment,d),I=!0)},o(d){v(t.$$.fragment,d),v(n.$$.fragment,d),v(s.$$.fragment,d),v(r.$$.fragment,d),v(i.$$.fragment,d),v(a.$$.fragment,d),v(l.$$.fragment,d),v(f.$$.fragment,d),v(c.$$.fragment,d),v(u.$$.fragment,d),v(h.$$.fragment,d),v(m.$$.fragment,d),v(g.$$.fragment,d),v(N.$$.fragment,d),I=!1},d(d){d&&M(e),C(t),C(n),C(s),C(r),C(i),C(a),C(l),C(f),C(c),C(u),C(h),C(m),C(g),C(N)}}}function to(o){let e,t,n,s,r,i,a,l;function f(m){o[6](m)}let c={container:o[2],$$slots:{default:[eo]},$$scope:{ctx:o}};o[1]!==void 0&&(c.open=o[1]),e=new Rt({props:c}),F.push(()=>G(e,"open",f));function u(m){o[7](m)}let h={placeholder:"Enter some plain text..."};return o[2]!==void 0&&(h.ref=o[2]),s=new pt({props:h}),F.push(()=>G(s,"ref",u)),{c(){w(e.$$.fragment),n=z("div"),w(s.$$.fragment),this.h()},l(m){E(e.$$.fragment,m),n=P(m,"DIV",{class:!0});var g=O(n);E(s.$$.fragment,g),g.forEach(M),this.h()},h(){y(n,"class","editor svelte-mszq1p")},m(m,g){k(e,m,g),q(m,n,g),k(s,n,null),i=!0,a||(l=[Ve(_n.call(null,n)),K(n,"longpress",o[5])],a=!0)},p(m,g){const N={};g&4&&(N.container=m[2]),g&512&&(N.$$scope={dirty:g,ctx:m}),!t&&g&2&&(t=!0,N.open=m[1],Q(()=>t=!1)),e.$set(N);const I={};!r&&g&4&&(r=!0,I.ref=m[2],Q(()=>r=!1)),s.$set(I)},i(m){i||(b(e.$$.fragment,m),b(s.$$.fragment,m),i=!0)},o(m){v(e.$$.fragment,m),v(s.$$.fragment,m),i=!1},d(m){C(e,m),m&&M(n),C(s),a=!1,Ie(l)}}}function no(o){let e,t,n,s,r,i;function a(f){o[8](f)}let l={editor:o[3],plugins:o[4],$$slots:{default:[to]},$$scope:{ctx:o}};return o[0]!==void 0&&(l.value=o[0]),s=new mt({props:l}),F.push(()=>G(s,"value",a)),{c(){e=z("p"),t=z("a"),n=se(`Source
	`),w(s.$$.fragment),this.h()},l(f){e=P(f,"P",{});var c=O(e);t=P(c,"A",{target:!0,href:!0});var u=O(t);n=ie(u,`Source
	`),u.forEach(M),c.forEach(M),E(s.$$.fragment,f),this.h()},h(){y(t,"target","_blank"),y(t,"href","https://github.com/nathanfaucett/svelte-slate/blob/main/src/routes/plugins/+page.svelte")},m(f,c){q(f,e,c),S(e,t),S(t,n),k(s,f,c),i=!0},p(f,[c]){const u={};c&518&&(u.$$scope={dirty:c,ctx:f}),!r&&c&1&&(r=!0,u.value=f[0],Q(()=>r=!1)),s.$set(u)},i(f){i||(b(s.$$.fragment,f),i=!0)},o(f){v(s.$$.fragment,f),i=!1},d(f){f&&M(e),C(s,f)}}}function oo(o,e,t){const n=ht(gt(_t()));let s={...$t,[wt]:{component:Et,withFn:kt},[Ct]:{component:Mt,withFn:Dt},[we]:{component:gn,withFn:dn}},r=[{type:"paragraph",children:[{text:"This is editable "},{text:"rich",bold:!0},{text:" text, "},{text:"much",italic:!0},{text:" better than a "},{text:"<textarea>",code:!0},{text:"!"}]},{type:"paragraph",children:[{text:"Since it's rich text, you can do things like turn a selection of text "},{text:"bold",bold:!0},{text:", or add a semantically rendered block quote in the middle of the page, like this:"}]},{type:"block-quote",children:[{text:"A wise quote."}]},{type:"image",url:"https://source.unsplash.com/kFrdX5IeQzI",children:[{text:""}]},{type:"paragraph",children:[{text:"Try it out for yourself!"}]},{type:"check-list-item",checked:!0,children:[{text:"Checked list item"}]},{type:"check-list-item",checked:!1,children:[{text:"Todo"}]},{type:"math",inline:!1,math:"\\frac{\\pi}{2}",children:[{text:""}]},{type:"code",language:"javascript",children:[{type:"code-line",children:[{text:'console.log("Hello world!");'}]}]},{type:"heading3",children:[{text:"Numbered Lists"}]},{type:"numbered-list",children:[{type:"list-item",children:[{text:"One"}]},{type:"list-item",children:[{text:"Two"}]}]},{type:"heading3",children:[{text:"Bulleted Lists"}]},{type:"bulleted-list",children:[{type:"list-item",children:[{text:"One"}]},{type:"list-item",children:[{text:"Two"}]}]},{type:"table",children:[{type:"table-row",children:[{type:"table-row-header",children:[{text:"Id"}]},{type:"table-row-header",children:[{text:"Name"}]}]},{type:"table-row",children:[{type:"table-row-data",children:[{text:"1"}]},{type:"table-row-data",children:[{text:"Nathan"}]}]}]}],i=!1,a;function l(){if(!Pe(n)){const[h]=Array.from(oe.nodes(n,{at:oe.unhangRange(n,n.selection),match:Ae}));h||t(1,i=!0)}}function f(h){i=h,t(1,i)}function c(h){a=h,t(2,a)}function u(h){r=h,t(0,r)}return[r,i,a,n,s,l,f,c,u]}class uo extends U{constructor(e){super(),X(this,e,oo,no,te,{})}}export{uo as default};

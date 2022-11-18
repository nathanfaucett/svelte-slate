import{S as x,i as $,G as ae,_ as Xe,u as z,v as S,w as U,T as q,b as R,t as A,x as X,ab as Fe,H as pe,h as V,j as M,k as N,d as w,l as C,a as G,K as be,L as ve,M as we,O as Y,P as Q,Q as Z,N as J,y as We,n as ie,p as se,Z as P,J as H,ac as ye,R as je,q as qe,U as Te,s as le,A as W,B as ue,C as ce,D as te,E as de,F as he,z as me,o as Ge}from"./index-0d38893a.js";import{O as Ie,Q as Ke,n as Ee,R as Ve,E as oe,U as Qe,V as Me,W as Ze,X as Je,l as Oe,g as xe,m as $e,b as et,k as tt,T as ne,i as nt,Y as ot,Z as it,_ as st}from"./withSvelte-f7c59922.js";import{i as lt}from"./ImageElement-6e819d8c.js";import{P as rt,j as ft}from"./MdFormatQuote-f1041b6d.js";import{I as _e}from"./IconBase-f29b1c3c.js";import"./preload-helper-176e53da.js";const{window:ge}=Fe;function at(n){let e,t;const i=n[7].default,s=pe(i,n,n[10],null);return{c(){e=V("div"),s&&s.c(),this.h()},l(o){e=M(o,"DIV",{class:!0});var l=N(e);s&&s.l(l),l.forEach(w),this.h()},h(){C(e,"class","hovering-menu svelte-1us4u7o")},m(o,l){G(o,e,l),s&&s.m(e,null),n[9](e),t=!0},p(o,l){s&&s.p&&(!t||l&1024)&&be(s,i,o,o[10],t?we(i,o[10],l,null):ve(o[10]),null)},i(o){t||(R(s,o),t=!0)},o(o){A(s,o),t=!1},d(o){o&&w(e),s&&s.d(o),n[9](null)}}}function ut(n){let e,t,i,s;return Xe(n[8]),e=new rt({props:{$$slots:{default:[at]},$$scope:{ctx:n}}}),{c(){z(e.$$.fragment)},l(o){S(e.$$.fragment,o)},m(o,l){U(e,o,l),t=!0,i||(s=q(ge,"resize",n[8]),i=!0)},p(o,[l]){const r={};l&1025&&(r.$$scope={dirty:l,ctx:o}),e.$set(r)},i(o){t||(R(e.$$.fragment,o),t=!0)},o(o){A(e.$$.fragment,o),t=!1},d(o){X(e,o),i=!1,s()}}}function Be(n,e,t,i,s,o){const l=window.getSelection();if(!l||l.type.toLowerCase()==="none"){o>0&&setTimeout(()=>{Be(n,e,t,i,s,o-1)},100);return}const f=l.getRangeAt(0).getBoundingClientRect(),u=e.getBoundingClientRect();f.left+window.pageXOffset-n.offsetWidth/2<u.left?n.style.left=`${u.left+window.pageXOffset}px`:f.right+window.pageXOffset+n.offsetWidth/2>u.right?n.style.left=`${u.right+window.pageXOffset-n.offsetWidth}px`:n.style.left=`${f.left+window.pageXOffset-n.offsetWidth/2+f.width/2}px`,f.top+window.pageYOffset-n.offsetHeight<u.top?n.style.top=`${f.bottom+window.pageYOffset+s}px`:n.style.top=`${f.top+window.pageYOffset-n.offsetHeight-s}px`,n.style.opacity="1"}function ct(n,e,t){let{$$slots:i={},$$scope:s}=e,{container:o=void 0}=e,{ref:l=void 0}=e,{open:r=!1}=e,{offsetY:f=4}=e,{retires:u=2}=e,c=640,a=480;function _(){t(1,c=ge.innerWidth),t(2,a=ge.innerHeight)}function b(g){Y[g?"unshift":"push"](()=>{l=g,t(0,l)})}return n.$$set=g=>{"container"in g&&t(3,o=g.container),"ref"in g&&t(0,l=g.ref),"open"in g&&t(4,r=g.open),"offsetY"in g&&t(5,f=g.offsetY),"retires"in g&&t(6,u=g.retires),"$$scope"in g&&t(10,s=g.$$scope)},n.$$.update=()=>{n.$$.dirty&8&&o===void 0&&typeof document<"u"&&t(3,o=document.body),n.$$.dirty&127&&l&&(r?Be(l,o,c,a,f,u):l.removeAttribute("style"))},[l,c,a,o,r,f,u,i,_,b,s]}class Le extends x{constructor(e){super(),$(this,e,ct,ut,ae,{container:3,ref:0,open:4,offsetY:5,retires:6})}}function dt(n){let e;const t=n[13].default,i=pe(t,n,n[16],null);return{c(){i&&i.c()},l(s){i&&i.l(s)},m(s,o){i&&i.m(s,o),e=!0},p(s,o){i&&i.p&&(!e||o&65536)&&be(i,t,s,s[16],e?we(t,s[16],o,null):ve(s[16]),null)},i(s){e||(R(i,s),e=!0)},o(s){A(i,s),e=!1},d(s){i&&i.d(s)}}}function ht(n){let e,t,i,s;function o(f){n[14](f)}function l(f){n[15](f)}let r={container:n[1],offsetY:n[2],$$slots:{default:[dt]},$$scope:{ctx:n}};return n[0]!==void 0&&(r.open=n[0]),n[3]!==void 0&&(r.ref=n[3]),e=new Le({props:r}),Y.push(()=>Q(e,"open",o)),Y.push(()=>Q(e,"ref",l)),{c(){z(e.$$.fragment)},l(f){S(e.$$.fragment,f)},m(f,u){U(e,f,u),s=!0},p(f,[u]){const c={};u&2&&(c.container=f[1]),u&4&&(c.offsetY=f[2]),u&65536&&(c.$$scope={dirty:u,ctx:f}),!t&&u&1&&(t=!0,c.open=f[0],Z(()=>t=!1)),!i&&u&8&&(i=!0,c.ref=f[3],Z(()=>i=!1)),e.$set(c)},i(f){s||(R(e.$$.fragment,f),s=!0)},o(f){A(e.$$.fragment,f),s=!1},d(f){X(e,f)}}}function mt(n,e,t){let i,s,o,l,r,f,{$$slots:u={},$$scope:c}=e,{container:a=void 0}=e,{open:_=!1}=e,{offsetY:b=4}=e;const g=Ie();J(n,g,h=>t(12,f=h));const T=Ke();J(n,T,h=>t(11,r=h));const v=Ee();J(n,v,h=>t(10,l=h));let y;function O(h){_=h,t(0,_),t(3,y),t(8,s),t(9,o),t(7,i),t(11,r),t(10,l),t(12,f)}function I(h){y=h,t(3,y)}return n.$$set=h=>{"container"in h&&t(1,a=h.container),"open"in h&&t(0,_=h.open),"offsetY"in h&&t(2,b=h.offsetY),"$$scope"in h&&t(16,c=h.$$scope)},n.$$.update=()=>{if(n.$$.dirty&4096&&t(7,i=f),n.$$.dirty&2048&&t(8,s=r),n.$$.dirty&1024&&t(9,o=l),n.$$.dirty&904&&y)if(!s||!o||Ve.isCollapsed(s)||oe.string(i,s)==="")t(0,_=!1);else{const[h]=Array.from(oe.nodes(i,{at:oe.unhangRange(i,i.selection),match:lt}));h||t(0,_=!0)}},[_,a,b,y,g,T,v,i,s,o,l,r,f,u,O,I,c]}class xt extends x{constructor(e){super(),$(this,e,mt,ht,ae,{container:1,open:0,offsetY:2})}}function _t(n,e){e===void 0&&(e={enabled:!0});var t=De(e),i=t.enabled,s=t.eventType,o=t.nodeForEvent,l=t.options,r=t.capture,f=function(u){n&&!n.contains(u.target)&&!u.defaultPrevented&&n.dispatchEvent(new CustomEvent("clickoutside",{detail:u}))};return e.enabled!==!1&&o.addEventListener(s,f,l),{update:function(u){var c;o.removeEventListener(s,f,r),c=De(u),i=c.enabled,s=c.eventType,o=c.nodeForEvent,l=c.options,r=c.capture,i&&o.addEventListener(s,f,l)},destroy:function(){o.removeEventListener(s,f,r)}}}function De(n){var e,t,i,s,o;return{enabled:(e=n.enabled)!==null&&e!==void 0?e:!0,nodeForEvent:(i=(t=n.limit)===null||t===void 0?void 0:t.parent)!==null&&i!==void 0?i:document,eventType:(s=n.event)!==null&&s!==void 0?s:"click",options:n.options,capture:typeof n.options=="object"?(o=n.options)===null||o===void 0?void 0:o.capture:n.options}}function gt(n){let e;return{c(){e=ie("Update")},l(t){e=se(t,"Update")},m(t,i){G(t,e,i)},d(t){t&&w(e)}}}function pt(n){let e;return{c(){e=ie("Insert")},l(t){e=se(t,"Insert")},m(t,i){G(t,e,i)},d(t){t&&w(e)}}}function bt(n){let e;return{c(){e=ie("Inline")},l(t){e=se(t,"Inline")},m(t,i){G(t,e,i)},d(t){t&&w(e)}}}function vt(n){let e;return{c(){e=ie("Block")},l(t){e=se(t,"Block")},m(t,i){G(t,e,i)},d(t){t&&w(e)}}}function wt(n){let e,t,i,s,o,l,r,f,u,c,a,_,b,g;function T(E,D){return E[4]?pt:gt}let v=T(n),y=v(n);function O(E,D){return E[2]?vt:bt}let I=O(n),h=I(n);return{c(){e=V("div"),t=V("div"),i=ie(n[3]),s=V("div"),o=V("div"),l=V("div"),r=V("textarea"),f=V("div"),u=V("button"),y.c(),c=V("button"),h.c(),a=V("div"),_=V("span"),this.h()},l(E){e=M(E,"DIV",{class:!0});var D=N(e);t=M(D,"DIV",{class:!0});var B=N(t);i=se(B,n[3]),B.forEach(w),s=M(D,"DIV",{class:!0});var K=N(s);o=M(K,"DIV",{class:!0});var m=N(o);l=M(m,"DIV",{class:!0});var d=N(l);r=M(d,"TEXTAREA",{class:!0}),N(r).forEach(w),d.forEach(w),f=M(m,"DIV",{class:!0});var k=N(f);u=M(k,"BUTTON",{class:!0});var L=N(u);y.l(L),L.forEach(w),c=M(k,"BUTTON",{class:!0});var F=N(c);h.l(F),F.forEach(w),k.forEach(w),a=M(m,"DIV",{class:!0});var j=N(a);_=M(j,"SPAN",{class:!0}),N(_).forEach(w),j.forEach(w),m.forEach(w),K.forEach(w),D.forEach(w),this.h()},h(){C(t,"class","math-editor-title svelte-17vn65m"),C(r,"class","svelte-17vn65m"),C(l,"class","math-editor-latexinput svelte-17vn65m"),C(u,"class","svelte-17vn65m"),P(u,"active",!n[1]),C(c,"class","svelte-17vn65m"),P(c,"active",!n[2]),C(f,"class","math-editor-buttons"),C(_,"class","svelte-17vn65m"),C(a,"class","math-editor-rendering svelte-17vn65m"),C(o,"class","math-editor-math svelte-17vn65m"),C(s,"class","math-editor-content"),C(e,"class","math-editor-body svelte-17vn65m")},m(E,D){G(E,e,D),H(e,t),H(t,i),H(e,s),H(s,o),H(o,l),H(l,r),n[16](r),ye(r,n[1]),H(o,f),H(f,u),y.m(u,null),H(f,c),h.m(c,null),H(o,a),H(a,_),n[18](_),n[19](e),b||(g=[q(r,"input",n[17]),q(u,"click",n[10]),q(c,"click",n[11]),je(_t.call(null,e)),q(e,"clickoutside",n[12])],b=!0)},p(E,D){D&8&&qe(i,E[3]),D&2&&ye(r,E[1]),v!==(v=T(E))&&(y.d(1),y=v(E),y&&(y.c(),y.m(u,null))),D&2&&P(u,"active",!E[1]),I!==(I=O(E))&&(h.d(1),h=I(E),h&&(h.c(),h.m(c,null))),D&4&&P(c,"active",!E[2])},d(E){E&&w(e),n[16](null),y.d(),h.d(),n[18](null),n[19](null),b=!1,Te(g)}}}function Et(n){let e,t,i;function s(l){n[20](l)}let o={container:n[8],$$slots:{default:[wt]},$$scope:{ctx:n}};return n[0]!==void 0&&(o.open=n[0]),e=new Le({props:o}),Y.push(()=>Q(e,"open",s)),{c(){z(e.$$.fragment)},l(l){S(e.$$.fragment,l)},m(l,r){U(e,l,r),i=!0},p(l,[r]){const f={};r&256&&(f.container=l[8]),r&4194558&&(f.$$scope={dirty:r,ctx:l}),!t&&r&1&&(t=!0,f.open=l[0],Z(()=>t=!1)),e.$set(f)},i(l){i||(R(e.$$.fragment,l),i=!0)},o(l){A(e.$$.fragment,l),i=!1},d(l){X(e,l)}}}function Ct(n,e){if(e){let t=e.parentNode;for(;t;){if(n===t)return!0;t=t.parentNode}}return!1}function kt(n,e,t){let i,s,{open:o=!1}=e,{title:l="LaTeX Editor"}=e,{math:r=""}=e,{inline:f=!0}=e,{isNew:u=!0}=e,{onDone:c}=e;const a=Qe();J(n,a,m=>t(15,s=m));let _=Date.now(),b=o;function g(){t(0,o=!1),c(r,f)}function T(){t(2,f=!f)}let v;function y(){var m;_+500<Date.now()&&!Ct(v,(m=window.getSelection())==null?void 0:m.focusNode)&&t(0,o=!1)}let O,I;function h(m){Y[m?"unshift":"push"](()=>{O=m,t(5,O)})}function E(){r=this.value,t(1,r)}function D(m){Y[m?"unshift":"push"](()=>{I=m,t(6,I)})}function B(m){Y[m?"unshift":"push"](()=>{v=m,t(7,v)})}function K(m){o=m,t(0,o)}return n.$$set=m=>{"open"in m&&t(0,o=m.open),"title"in m&&t(3,l=m.title),"math"in m&&t(1,r=m.math),"inline"in m&&t(2,f=m.inline),"isNew"in m&&t(4,u=m.isNew),"onDone"in m&&t(13,c=m.onDone)},n.$$.update=()=>{n.$$.dirty&32768&&t(8,i=s),n.$$.dirty&16385&&b!==o&&(_=Date.now(),t(14,b=o)),n.$$.dirty&71&&o&&I&&Me.render(r,I,{displayMode:!f,output:"html",throwOnError:!1}),n.$$.dirty&33&&o&&O&&We().then(()=>{O.focus()})},[o,r,f,l,u,O,I,v,i,a,g,T,y,c,b,s,h,E,D,B,K]}class He extends x{constructor(e){super(),$(this,e,kt,Et,ae,{open:0,title:3,math:1,inline:2,isNew:4,onDone:13})}}function yt(n){let e;return{c(){e=de("path"),this.h()},l(t){e=he(t,"path",{d:!0}),N(e).forEach(w),this.h()},h(){C(e,"d","M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z")},m(t,i){G(t,e,i)},p:me,d(t){t&&w(e)}}}function Dt(n){let e,t;const i=[{viewBox:"0 0 24 24"},n[0]];let s={$$slots:{default:[yt]},$$scope:{ctx:n}};for(let o=0;o<i.length;o+=1)s=W(s,i[o]);return e=new _e({props:s}),{c(){z(e.$$.fragment)},l(o){S(e.$$.fragment,o)},m(o,l){U(e,o,l),t=!0},p(o,[l]){const r=l&1?ue(i,[i[0],ce(o[0])]):{};l&2&&(r.$$scope={dirty:l,ctx:o}),e.$set(r)},i(o){t||(R(e.$$.fragment,o),t=!0)},o(o){A(e.$$.fragment,o),t=!1},d(o){X(e,o)}}}function Nt(n,e,t){return n.$$set=i=>{t(0,e=W(W({},e),te(i)))},e=te(e),[e]}class Tt extends x{constructor(e){super(),$(this,e,Nt,Dt,le,{})}}function It(n){let e;return{c(){e=de("path"),this.h()},l(t){e=he(t,"path",{d:!0}),N(e).forEach(w),this.h()},h(){C(e,"d","M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z")},m(t,i){G(t,e,i)},p:me,d(t){t&&w(e)}}}function Vt(n){let e,t;const i=[{viewBox:"0 0 24 24"},n[0]];let s={$$slots:{default:[It]},$$scope:{ctx:n}};for(let o=0;o<i.length;o+=1)s=W(s,i[o]);return e=new _e({props:s}),{c(){z(e.$$.fragment)},l(o){S(e.$$.fragment,o)},m(o,l){U(e,o,l),t=!0},p(o,[l]){const r=l&1?ue(i,[i[0],ce(o[0])]):{};l&2&&(r.$$scope={dirty:l,ctx:o}),e.$set(r)},i(o){t||(R(e.$$.fragment,o),t=!0)},o(o){A(e.$$.fragment,o),t=!1},d(o){X(e,o)}}}function Mt(n,e,t){return n.$$set=i=>{t(0,e=W(W({},e),te(i)))},e=te(e),[e]}class Ot extends x{constructor(e){super(),$(this,e,Mt,Vt,le,{})}}function Bt(n){let e;return{c(){e=de("path"),this.h()},l(t){e=he(t,"path",{d:!0}),N(e).forEach(w),this.h()},h(){C(e,"d","M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z")},m(t,i){G(t,e,i)},p:me,d(t){t&&w(e)}}}function Lt(n){let e,t;const i=[{viewBox:"0 0 24 24"},n[0]];let s={$$slots:{default:[Bt]},$$scope:{ctx:n}};for(let o=0;o<i.length;o+=1)s=W(s,i[o]);return e=new _e({props:s}),{c(){z(e.$$.fragment)},l(o){S(e.$$.fragment,o)},m(o,l){U(e,o,l),t=!0},p(o,[l]){const r=l&1?ue(i,[i[0],ce(o[0])]):{};l&2&&(r.$$scope={dirty:l,ctx:o}),e.$set(r)},i(o){t||(R(e.$$.fragment,o),t=!0)},o(o){A(e.$$.fragment,o),t=!1},d(o){X(e,o)}}}function Ht(n,e,t){return n.$$set=i=>{t(0,e=W(W({},e),te(i)))},e=te(e),[e]}class Rt extends x{constructor(e){super(),$(this,e,Ht,Lt,le,{})}}function At(n){let e,t,i,s,o,l,r,f,u,c,a,_,b,g,T,v,y,O;function I(d){n[28](d)}function h(d){n[29](d)}function E(d){n[30](d)}function D(d){n[31](d)}let B={onDone:n[17]};n[8]!==void 0&&(B.open=n[8]),n[10]!==void 0&&(B.math=n[10]),n[11]!==void 0&&(B.inline=n[11]),n[12]!==void 0&&(B.isNew=n[12]),e=new He({props:B}),Y.push(()=>Q(e,"open",I)),Y.push(()=>Q(e,"math",h)),Y.push(()=>Q(e,"inline",E)),Y.push(()=>Q(e,"isNew",D)),a=new Tt({}),b=new Ot({}),T=new Rt({});const K=n[27].default,m=pe(K,n,n[26],null);return{c(){z(e.$$.fragment),l=V("div"),r=V("div"),f=V("span"),u=V("div"),c=V("button"),z(a.$$.fragment),_=V("button"),z(b.$$.fragment),g=V("button"),z(T.$$.fragment),m&&m.c(),this.h()},l(d){S(e.$$.fragment,d),l=M(d,"DIV",{class:!0,"data-slate-node":!0,"data-slate-inline":!0,"data-slate-void":!0,dir:!0,contenteditable:!0});var k=N(l);r=M(k,"DIV",{class:!0,contenteditable:!0});var L=N(r);f=M(L,"SPAN",{}),N(f).forEach(w),u=M(L,"DIV",{class:!0});var F=N(u);c=M(F,"BUTTON",{class:!0});var j=N(c);S(a.$$.fragment,j),j.forEach(w),_=M(F,"BUTTON",{class:!0});var re=N(_);S(b.$$.fragment,re),re.forEach(w),g=M(F,"BUTTON",{class:!0});var ee=N(g);S(T.$$.fragment,ee),ee.forEach(w),F.forEach(w),L.forEach(w),m&&m.l(k),k.forEach(w),this.h()},h(){C(c,"class","svelte-1v8xkls"),C(_,"class","svelte-1v8xkls"),C(g,"class","svelte-1v8xkls"),C(u,"class","math-edit svelte-1v8xkls"),P(u,"math-selected",n[13]),C(r,"class","math-value svelte-1v8xkls"),C(r,"contenteditable",!1),P(r,"math-selectable",!n[7]),P(r,"math-inline",n[5]),P(r,"math-selected",n[13]),C(l,"class","math-element svelte-1v8xkls"),C(l,"data-slate-node","element"),C(l,"data-slate-inline",n[1]),C(l,"data-slate-void",n[2]),C(l,"dir",n[4]),C(l,"contenteditable",n[3]),P(l,"math-inline",n[5])},m(d,k){U(e,d,k),G(d,l,k),H(l,r),H(r,f),n[32](f),H(r,u),H(u,c),U(a,c,null),H(u,_),U(b,_,null),H(u,g),U(T,g,null),n[33](u),m&&m.m(l,null),n[34](l),v=!0,y||(O=[q(c,"mousedown",n[20]),q(c,"touchstart",n[20],{passive:!0}),q(_,"mousedown",n[19]),q(_,"touchstart",n[19],{passive:!0}),q(g,"mousedown",n[18]),q(g,"touchstart",n[18],{passive:!0})],y=!0)},p(d,k){const L={};!t&&k[0]&256&&(t=!0,L.open=d[8],Z(()=>t=!1)),!i&&k[0]&1024&&(i=!0,L.math=d[10],Z(()=>i=!1)),!s&&k[0]&2048&&(s=!0,L.inline=d[11],Z(()=>s=!1)),!o&&k[0]&4096&&(o=!0,L.isNew=d[12],Z(()=>o=!1)),e.$set(L),(!v||k[0]&8192)&&P(u,"math-selected",d[13]),(!v||k[0]&128)&&P(r,"math-selectable",!d[7]),(!v||k[0]&32)&&P(r,"math-inline",d[5]),(!v||k[0]&8192)&&P(r,"math-selected",d[13]),m&&m.p&&(!v||k[0]&67108864)&&be(m,K,d,d[26],v?we(K,d[26],k,null):ve(d[26]),null),(!v||k[0]&2)&&C(l,"data-slate-inline",d[1]),(!v||k[0]&4)&&C(l,"data-slate-void",d[2]),(!v||k[0]&16)&&C(l,"dir",d[4]),(!v||k[0]&8)&&C(l,"contenteditable",d[3]),(!v||k[0]&32)&&P(l,"math-inline",d[5])},i(d){v||(R(e.$$.fragment,d),R(a.$$.fragment,d),R(b.$$.fragment,d),R(T.$$.fragment,d),R(m,d),v=!0)},o(d){A(e.$$.fragment,d),A(a.$$.fragment,d),A(b.$$.fragment,d),A(T.$$.fragment,d),A(m,d),v=!1},d(d){X(e,d),d&&w(l),n[32](null),X(a),X(b),X(T),n[33](null),m&&m.d(d),n[34](null),y=!1,Te(O)}}}const Ce="math";function Ne(n){return n.type===Ce}function $t(n){const{isVoid:e,isInline:t,insertBreak:i}=n;return n.isInline=s=>Ne(s)?!!s.inline:t(s),n.isVoid=s=>Ne(s)?!0:e(s),n.insertBreak=()=>{!n.selection||!Ve.isCollapsed(n.selection)?i():oe.isVoid(n,Ze.get(n,Je.parent(n.selection.anchor.path)))?oe.insertNode(n,{type:Oe,children:[{text:""}]}):i()},n}function Yt(n,e,t,i){const s={type:Ce,math:e,inline:t,children:[{text:""}]};t?oe.withoutNormalizing(n,()=>{ne.insertNodes(n,s,{at:i})}):ne.insertNodes(n,s,{at:i})}function Pt(n,e,t){let i,s,o,l,r,f,{$$slots:u={},$$scope:c}=e,{element:a}=e,{isInline:_}=e,{isVoid:b}=e,{contenteditable:g}=e,{ref:T=void 0}=e,{dir:v=void 0}=e;const y=xe(),O=$e();J(n,O,p=>t(24,r=p));const I=Ee();J(n,I,p=>t(23,l=p));const h=et();J(n,h,p=>t(25,f=p));let E=a.math,D=a.inline,B=!1;function K(p,fe){if(a.inline!==fe){m();const ke={type:"math",math:p,inline:fe,children:[{text:""}]};fe?ne.insertNodes(y,{type:Oe,children:[ke]},{at:o}):ne.insertNodes(y,ke,{at:o.slice(0,-1)})}else ne.setNodes(y,{math:p,inline:fe},{at:o}),t(8,B=!1);t(12,j=!0)}function m(){t(8,B=!1),ne.delete(y,{at:o})}function d(){navigator.clipboard.writeText(E)}let k,L=E,F=D,j;function re(){nt(y)||(t(10,L=E),t(11,F=D),ot(k),t(8,B=!0),t(12,j=!1))}let ee;function Re(p){B=p,t(8,B)}function Ae(p){L=p,t(10,L)}function Ye(p){F=p,t(11,F)}function Pe(p){j=p,t(12,j)}function ze(p){Y[p?"unshift":"push"](()=>{ee=p,t(6,ee)})}function Se(p){Y[p?"unshift":"push"](()=>{k=p,t(9,k)})}function Ue(p){Y[p?"unshift":"push"](()=>{T=p,t(0,T)})}return n.$$set=p=>{"element"in p&&t(21,a=p.element),"isInline"in p&&t(1,_=p.isInline),"isVoid"in p&&t(2,b=p.isVoid),"contenteditable"in p&&t(3,g=p.contenteditable),"ref"in p&&t(0,T=p.ref),"dir"in p&&t(4,v=p.dir),"$$scope"in p&&t(26,c=p.$$scope)},n.$$.update=()=>{n.$$.dirty[0]&33554432&&t(7,i=f),n.$$.dirty[0]&25165952&&t(13,s=i?!1:r&&l),n.$$.dirty[0]&2097152&&(o=tt(a)),n.$$.dirty[0]&6291456&&E!==a.math&&t(22,E=a.math),n.$$.dirty[0]&2097184&&D!==a.inline&&t(5,D=a.inline),n.$$.dirty[0]&4194400&&ee&&Me.render(E,ee,{displayMode:!D,output:"html",throwOnError:!1})},[T,_,b,g,v,D,ee,i,B,k,L,F,j,s,O,I,h,K,m,d,re,a,E,l,r,f,c,u,Re,Ae,Ye,Pe,ze,Se,Ue]}class en extends x{constructor(e){super(),$(this,e,Pt,At,ae,{element:21,isInline:1,isVoid:2,contenteditable:3,ref:0,dir:4},null,[-1,-1])}}function tn(n,e=500){let t=null;function i(){t=setTimeout(()=>{n.dispatchEvent(new CustomEvent("longpress"))},e)}function s(){t!==null&&(clearTimeout(t),t=null)}return n.addEventListener("mousedown",i),n.addEventListener("touchstart",i),n.addEventListener("mouseup",s),n.addEventListener("touchend",s),{update(o){s(),e=o},destroy(){s(),n.removeEventListener("mousedown",i),n.removeEventListener("touchstart",i),n.removeEventListener("mouseup",s),n.removeEventListener("touchend",s)}}}function zt(n){let e;return{c(){e=de("path"),this.h()},l(t){e=he(t,"path",{d:!0}),N(e).forEach(w),this.h()},h(){C(e,"d","M18 4H6v2l6.5 6L6 18v2h12v-3h-7l5-5-5-5h7z")},m(t,i){G(t,e,i)},p:me,d(t){t&&w(e)}}}function St(n){let e,t;const i=[{viewBox:"0 0 24 24"},n[0]];let s={$$slots:{default:[zt]},$$scope:{ctx:n}};for(let o=0;o<i.length;o+=1)s=W(s,i[o]);return e=new _e({props:s}),{c(){z(e.$$.fragment)},l(o){S(e.$$.fragment,o)},m(o,l){U(e,o,l),t=!0},p(o,[l]){const r=l&1?ue(i,[i[0],ce(o[0])]):{};l&2&&(r.$$scope={dirty:l,ctx:o}),e.$set(r)},i(o){t||(R(e.$$.fragment,o),t=!0)},o(o){A(e.$$.fragment,o),t=!1},d(o){X(e,o)}}}function Ut(n,e,t){return n.$$set=i=>{t(0,e=W(W({},e),te(i)))},e=te(e),[e]}class Xt extends x{constructor(e){super(),$(this,e,Ut,St,le,{})}}function Ft(n){let e,t;return e=new Xt({}),{c(){z(e.$$.fragment)},l(i){S(e.$$.fragment,i)},m(i,s){U(e,i,s),t=!0},i(i){t||(R(e.$$.fragment,i),t=!0)},o(i){A(e.$$.fragment,i),t=!1},d(i){X(e,i)}}}function Wt(n){let e,t,i,s,o,l;function r(a){n[11](a)}function f(a){n[12](a)}function u(a){n[13](a)}let c={onDone:n[7]};return n[0]!==void 0&&(c.open=n[0]),n[1]!==void 0&&(c.math=n[1]),n[2]!==void 0&&(c.inline=n[2]),e=new He({props:c}),Y.push(()=>Q(e,"open",r)),Y.push(()=>Q(e,"math",f)),Y.push(()=>Q(e,"inline",u)),o=new ft({props:{active:n[3],onMouseDown:n[6],$$slots:{default:[Ft]},$$scope:{ctx:n}}}),{c(){z(e.$$.fragment),z(o.$$.fragment)},l(a){S(e.$$.fragment,a),S(o.$$.fragment,a)},m(a,_){U(e,a,_),U(o,a,_),l=!0},p(a,[_]){const b={};!t&&_&1&&(t=!0,b.open=a[0],Z(()=>t=!1)),!i&&_&2&&(i=!0,b.math=a[1],Z(()=>i=!1)),!s&&_&4&&(s=!0,b.inline=a[2],Z(()=>s=!1)),e.$set(b);const g={};_&8&&(g.active=a[3]),_&131072&&(g.$$scope={dirty:_,ctx:a}),o.$set(g)},i(a){l||(R(e.$$.fragment,a),R(o.$$.fragment,a),l=!0)},o(a){A(e.$$.fragment,a),A(o.$$.fragment,a),l=!1},d(a){X(e,a),X(o,a)}}}function jt(n,e,t){let i,s,o,l,r;const f=Ie();J(n,f,h=>t(10,r=h));const u=Ee();J(n,u,h=>t(9,l=h));let c,a=!1,_="",b=!0;function g(){c=i.selection?i.selection.anchor||i.selection.focus:void 0,t(1,_=""),t(2,b=!0),t(0,a=!a)}function T(h,E){Yt(i,h,E,c)}function v(h){st("ctrl+m",h)&&(s?(c=i.selection?i.selection.anchor||i.selection.focus:void 0,t(1,_=""),t(2,b=!0),t(0,a=!0)):t(0,a=!1))}Ge(()=>(document.body.addEventListener("keydown",v),()=>{document.body.removeEventListener("keydown",v)}));function y(h){a=h,t(0,a)}function O(h){_=h,t(1,_)}function I(h){b=h,t(2,b)}return n.$$.update=()=>{n.$$.dirty&1024&&t(8,i=r),n.$$.dirty&512&&(s=l),n.$$.dirty&256&&t(3,o=it(i,Ce))},[a,_,b,o,f,u,g,T,i,l,r,y,O,I]}class nn extends x{constructor(e){super(),$(this,e,jt,Wt,le,{})}}export{xt as H,Ce as M,en as a,nn as b,tn as l,$t as w};
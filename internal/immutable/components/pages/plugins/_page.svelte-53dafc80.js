import{S as j,i as G,G as $e,u as b,v,w,b as p,t as $,x as E,H as Ee,h as P,j as A,k as V,d as M,l as y,a as U,K as ke,L as Ce,M as Me,O as S,P as Q,Q as W,N as J,y as Xe,n as se,p as ie,a1 as Y,J as O,ac as ye,a2 as ee,a9 as Ne,q as Je,a3 as De,s as te,A as R,B as ae,C as le,D as K,E as fe,F as ue,z as ce}from"../../../chunks/index-dd4d0fe6.js";import{J as he,Q as Ke,I as Ie,R as Ve,q as oe,U as Ze,V as He,W as xe,X as et,P as ze,g as tt,G as nt,s as ot,f as rt,T as re,Y as Pe,Z as st,M as be,_ as it,v as at,p as lt,$ as ft,S as ut,w as ct,a as mt,c as dt,E as ht,D as gt}from"../../../chunks/index.es-78050fc1.js";import{P as _t,a as Ae,p as ve,q as pt,j as Fe,c as $t,I as bt,w as vt,d as wt,C as Et,e as kt,M as pe,B as de,b as Ct,f as Mt,g as Dt,h as It,k as Tt,l as yt,m as Bt,n as Lt,o as Nt}from"../../../chunks/MdFormatQuote-9c9615f1.js";import{I as me}from"../../../chunks/IconBase-83977586.js";/* empty css                                                             */import"../../../chunks/preload-helper-176e53da.js";function Vt(o){let e,n;const t=o[4].default,s=Ee(t,o,o[6],null);return{c(){e=P("div"),s&&s.c(),this.h()},l(r){e=A(r,"DIV",{class:!0,contenteditable:!0});var i=V(e);s&&s.l(i),i.forEach(M),this.h()},h(){y(e,"class","hovering-menu svelte-1us4u7o"),y(e,"contenteditable",!1)},m(r,i){U(r,e,i),s&&s.m(e,null),o[5](e),n=!0},p(r,i){s&&s.p&&(!n||i&64)&&ke(s,t,r,r[6],n?Me(t,r[6],i,null):Ce(r[6]),null)},i(r){n||(p(s,r),n=!0)},o(r){$(s,r),n=!1},d(r){r&&M(e),s&&s.d(r),o[5](null)}}}function Ht(o){let e,n;return e=new _t({props:{target:o[0],$$slots:{default:[Vt]},$$scope:{ctx:o}}}),{c(){b(e.$$.fragment)},l(t){v(e.$$.fragment,t)},m(t,s){w(e,t,s),n=!0},p(t,[s]){const r={};s&1&&(r.target=t[0]),s&66&&(r.$$scope={dirty:s,ctx:t}),e.$set(r)},i(t){n||(p(e.$$.fragment,t),n=!0)},o(t){$(e.$$.fragment,t),n=!1},d(t){E(e,t)}}}function Oe(o,e,n){const t=window.getSelection();if(!t||t.type.toLowerCase()==="none"){n>0&&setTimeout(()=>{Oe(o,e,n-1)},100);return}const r=t.getRangeAt(0).getBoundingClientRect(),i=e.getBoundingClientRect();let a=r.left-i.left-(o.offsetWidth-r.width)/2,l=r.top-i.top-o.offsetHeight;const c=l,f=a+o.offsetWidth,u=l+o.offsetHeight;a<0?a=0:f>i.width&&(a=i.width-o.offsetWidth),c<0?l=r.bottom-i.top:u>i.height&&(l=i.height-o.offsetHeight),o.style.left=`${a}px`,o.style.top=`${l}px`,o.style.opacity="1"}function zt(o,e,n){let{$$slots:t={},$$scope:s}=e,{container:r=void 0}=e,{ref:i=void 0}=e,{open:a=!1}=e,{retires:l=2}=e;function c(f){S[f?"unshift":"push"](()=>{i=f,n(1,i)})}return o.$$set=f=>{"container"in f&&n(0,r=f.container),"ref"in f&&n(1,i=f.ref),"open"in f&&n(2,a=f.open),"retires"in f&&n(3,l=f.retires),"$$scope"in f&&n(6,s=f.$$scope)},o.$$.update=()=>{o.$$.dirty&1&&r===void 0&&typeof document<"u"&&n(0,r=document.body),o.$$.dirty&15&&i&&(a?Oe(i,r,l):i.removeAttribute("style"))},[r,i,a,l,t,c,s]}class Se extends j{constructor(e){super(),G(this,e,zt,Ht,$e,{container:0,ref:1,open:2,retires:3})}}function Pt(o){let e;const n=o[12].default,t=Ee(n,o,o[15],null);return{c(){t&&t.c()},l(s){t&&t.l(s)},m(s,r){t&&t.m(s,r),e=!0},p(s,r){t&&t.p&&(!e||r&32768)&&ke(t,n,s,s[15],e?Me(n,s[15],r,null):Ce(s[15]),null)},i(s){e||(p(t,s),e=!0)},o(s){$(t,s),e=!1},d(s){t&&t.d(s)}}}function At(o){let e,n,t,s;function r(l){o[13](l)}function i(l){o[14](l)}let a={container:o[1],$$slots:{default:[Pt]},$$scope:{ctx:o}};return o[0]!==void 0&&(a.open=o[0]),o[2]!==void 0&&(a.ref=o[2]),e=new Se({props:a}),S.push(()=>Q(e,"open",r)),S.push(()=>Q(e,"ref",i)),{c(){b(e.$$.fragment)},l(l){v(e.$$.fragment,l)},m(l,c){w(e,l,c),s=!0},p(l,[c]){const f={};c&2&&(f.container=l[1]),c&32768&&(f.$$scope={dirty:c,ctx:l}),!n&&c&1&&(n=!0,f.open=l[0],W(()=>n=!1)),!t&&c&4&&(t=!0,f.ref=l[2],W(()=>t=!1)),e.$set(f)},i(l){s||(p(e.$$.fragment,l),s=!0)},o(l){$(e.$$.fragment,l),s=!1},d(l){E(e,l)}}}function Ft(o,e,n){let t,s,r,i,a,l,{$$slots:c={},$$scope:f}=e,{container:u=void 0}=e,{open:d=!1}=e;const h=he();J(o,h,k=>n(11,l=k));const C=Ke();J(o,C,k=>n(10,a=k));const B=Ie();J(o,B,k=>n(9,i=k));let D;function m(k){d=k,n(0,d),n(2,D),n(7,s),n(8,r),n(6,t),n(10,a),n(9,i),n(11,l)}function g(k){D=k,n(2,D)}return o.$$set=k=>{"container"in k&&n(1,u=k.container),"open"in k&&n(0,d=k.open),"$$scope"in k&&n(15,f=k.$$scope)},o.$$.update=()=>{if(o.$$.dirty&2048&&n(6,t=l),o.$$.dirty&1024&&n(7,s=a),o.$$.dirty&512&&n(8,r=i),o.$$.dirty&452&&D)if(!s||!r||Ve.isCollapsed(s)||oe.string(t,s)==="")n(0,d=!1);else{const[k]=Array.from(oe.nodes(t,{at:oe.unhangRange(t,t.selection),match:Ae}));k||n(0,d=!0)}},[d,u,D,h,C,B,t,s,r,i,a,l,c,m,g,f]}class Ot extends j{constructor(e){super(),G(this,e,Ft,At,$e,{container:1,open:0})}}function St(o,e){e===void 0&&(e={enabled:!0});var n=Be(e),t=n.enabled,s=n.eventType,r=n.nodeForEvent,i=n.options,a=n.capture,l=function(c){o&&!o.contains(c.target)&&!c.defaultPrevented&&o.dispatchEvent(new CustomEvent("clickoutside",{detail:c}))};return e.enabled!==!1&&r.addEventListener(s,l,i),{update:function(c){var f;r.removeEventListener(s,l,a),f=Be(c),t=f.enabled,s=f.eventType,r=f.nodeForEvent,i=f.options,a=f.capture,t&&r.addEventListener(s,l,i)},destroy:function(){r.removeEventListener(s,l,a)}}}function Be(o){var e,n,t,s,r;return{enabled:(e=o.enabled)!==null&&e!==void 0?e:!0,nodeForEvent:(t=(n=o.limit)===null||n===void 0?void 0:n.parent)!==null&&t!==void 0?t:document,eventType:(s=o.event)!==null&&s!==void 0?s:"click",options:o.options,capture:typeof o.options=="object"?(r=o.options)===null||r===void 0?void 0:r.capture:o.options}}function Rt(o){let e;return{c(){e=se("Update")},l(n){e=ie(n,"Update")},m(n,t){U(n,e,t)},d(n){n&&M(e)}}}function qt(o){let e;return{c(){e=se("Insert")},l(n){e=ie(n,"Insert")},m(n,t){U(n,e,t)},d(n){n&&M(e)}}}function Ut(o){let e;return{c(){e=se("Inline")},l(n){e=ie(n,"Inline")},m(n,t){U(n,e,t)},d(n){n&&M(e)}}}function jt(o){let e;return{c(){e=se("Block")},l(n){e=ie(n,"Block")},m(n,t){U(n,e,t)},d(n){n&&M(e)}}}function Gt(o){let e,n,t,s,r,i,a,l,c,f,u,d,h,C;function B(N,H){return N[4]?qt:Rt}let D=B(o),m=D(o);function g(N,H){return N[2]?jt:Ut}let k=g(o),F=k(o);return{c(){e=P("div"),n=P("div"),t=se(o[3]),s=P("div"),r=P("div"),i=P("div"),a=P("textarea"),l=P("div"),c=P("button"),m.c(),f=P("button"),F.c(),u=P("div"),d=P("span"),this.h()},l(N){e=A(N,"DIV",{class:!0});var H=V(e);n=A(H,"DIV",{class:!0});var I=V(n);t=ie(I,o[3]),I.forEach(M),s=A(H,"DIV",{class:!0});var Z=V(s);r=A(Z,"DIV",{class:!0});var z=V(r);i=A(z,"DIV",{class:!0});var _=V(i);a=A(_,"TEXTAREA",{class:!0}),V(a).forEach(M),_.forEach(M),l=A(z,"DIV",{class:!0});var L=V(l);c=A(L,"BUTTON",{class:!0});var q=V(c);m.l(q),q.forEach(M),f=A(L,"BUTTON",{class:!0});var X=V(f);F.l(X),X.forEach(M),L.forEach(M),u=A(z,"DIV",{class:!0});var x=V(u);d=A(x,"SPAN",{class:!0}),V(d).forEach(M),x.forEach(M),z.forEach(M),Z.forEach(M),H.forEach(M),this.h()},h(){y(n,"class","math-editor-title svelte-17vn65m"),y(a,"class","svelte-17vn65m"),y(i,"class","math-editor-latexinput svelte-17vn65m"),y(c,"class","svelte-17vn65m"),Y(c,"active",!o[1]),y(f,"class","svelte-17vn65m"),Y(f,"active",!o[2]),y(l,"class","math-editor-buttons"),y(d,"class","svelte-17vn65m"),y(u,"class","math-editor-rendering svelte-17vn65m"),y(r,"class","math-editor-math svelte-17vn65m"),y(s,"class","math-editor-content"),y(e,"class","math-editor-body svelte-17vn65m")},m(N,H){U(N,e,H),O(e,n),O(n,t),O(e,s),O(s,r),O(r,i),O(i,a),o[15](a),ye(a,o[1]),O(r,l),O(l,c),m.m(c,null),O(l,f),F.m(f,null),O(r,u),O(u,d),o[17](d),h||(C=[ee(a,"input",o[16]),ee(c,"click",o[9]),ee(f,"click",o[10]),Ne(St.call(null,e)),ee(e,"clickoutside",o[11])],h=!0)},p(N,H){H&8&&Je(t,N[3]),H&2&&ye(a,N[1]),D!==(D=B(N))&&(m.d(1),m=D(N),m&&(m.c(),m.m(c,null))),H&2&&Y(c,"active",!N[1]),k!==(k=g(N))&&(F.d(1),F=k(N),F&&(F.c(),F.m(f,null))),H&4&&Y(f,"active",!N[2])},d(N){N&&M(e),o[15](null),m.d(),F.d(),o[17](null),h=!1,De(C)}}}function Yt(o){let e,n,t;function s(i){o[18](i)}let r={container:o[7],$$slots:{default:[Gt]},$$scope:{ctx:o}};return o[0]!==void 0&&(r.open=o[0]),e=new Se({props:r}),S.push(()=>Q(e,"open",s)),{c(){b(e.$$.fragment)},l(i){v(e.$$.fragment,i)},m(i,a){w(e,i,a),t=!0},p(i,[a]){const l={};a&128&&(l.container=i[7]),a&1048702&&(l.$$scope={dirty:a,ctx:i}),!n&&a&1&&(n=!0,l.open=i[0],W(()=>n=!1)),e.$set(l)},i(i){t||(p(e.$$.fragment,i),t=!0)},o(i){$(e.$$.fragment,i),t=!1},d(i){E(e,i)}}}function Qt(o,e,n){let t,s,{open:r=!1}=e,{title:i="LaTeX Editor"}=e,{math:a=""}=e,{inline:l=!0}=e,{isNew:c=!0}=e,{onDone:f}=e;const u=Ze();J(o,u,I=>n(14,s=I));let d=Date.now(),h=r;function C(){n(0,r=!1),f(a,l)}function B(){n(2,l=!l)}function D(){d+100<Date.now()&&n(0,r=!1)}let m,g;function k(I){S[I?"unshift":"push"](()=>{m=I,n(5,m)})}function F(){a=this.value,n(1,a)}function N(I){S[I?"unshift":"push"](()=>{g=I,n(6,g)})}function H(I){r=I,n(0,r)}return o.$$set=I=>{"open"in I&&n(0,r=I.open),"title"in I&&n(3,i=I.title),"math"in I&&n(1,a=I.math),"inline"in I&&n(2,l=I.inline),"isNew"in I&&n(4,c=I.isNew),"onDone"in I&&n(12,f=I.onDone)},o.$$.update=()=>{o.$$.dirty&16384&&n(7,t=s),o.$$.dirty&8193&&h!==r&&(d=Date.now(),n(13,h=r)),o.$$.dirty&71&&r&&g&&He.render(a,g,{displayMode:!l,output:"html",throwOnError:!1}),o.$$.dirty&33&&r&&m&&Xe().then(()=>{m.focus()})},[r,a,l,i,c,m,g,t,u,C,B,D,f,h,s,k,F,N,H]}class Re extends j{constructor(e){super(),G(this,e,Qt,Yt,$e,{open:0,title:3,math:1,inline:2,isNew:4,onDone:12})}}function Wt(o){let e;return{c(){e=fe("path"),this.h()},l(n){e=ue(n,"path",{d:!0}),V(e).forEach(M),this.h()},h(){y(e,"d","M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z")},m(n,t){U(n,e,t)},p:ce,d(n){n&&M(e)}}}function Xt(o){let e,n;const t=[{viewBox:"0 0 24 24"},o[0]];let s={$$slots:{default:[Wt]},$$scope:{ctx:o}};for(let r=0;r<t.length;r+=1)s=R(s,t[r]);return e=new me({props:s}),{c(){b(e.$$.fragment)},l(r){v(e.$$.fragment,r)},m(r,i){w(e,r,i),n=!0},p(r,[i]){const a=i&1?ae(t,[t[0],le(r[0])]):{};i&2&&(a.$$scope={dirty:i,ctx:r}),e.$set(a)},i(r){n||(p(e.$$.fragment,r),n=!0)},o(r){$(e.$$.fragment,r),n=!1},d(r){E(e,r)}}}function Jt(o,e,n){return o.$$set=t=>{n(0,e=R(R({},e),K(t)))},e=K(e),[e]}class Kt extends j{constructor(e){super(),G(this,e,Jt,Xt,te,{})}}function Zt(o){let e;return{c(){e=fe("path"),this.h()},l(n){e=ue(n,"path",{d:!0}),V(e).forEach(M),this.h()},h(){y(e,"d","M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z")},m(n,t){U(n,e,t)},p:ce,d(n){n&&M(e)}}}function xt(o){let e,n;const t=[{viewBox:"0 0 24 24"},o[0]];let s={$$slots:{default:[Zt]},$$scope:{ctx:o}};for(let r=0;r<t.length;r+=1)s=R(s,t[r]);return e=new me({props:s}),{c(){b(e.$$.fragment)},l(r){v(e.$$.fragment,r)},m(r,i){w(e,r,i),n=!0},p(r,[i]){const a=i&1?ae(t,[t[0],le(r[0])]):{};i&2&&(a.$$scope={dirty:i,ctx:r}),e.$set(a)},i(r){n||(p(e.$$.fragment,r),n=!0)},o(r){$(e.$$.fragment,r),n=!1},d(r){E(e,r)}}}function en(o,e,n){return o.$$set=t=>{n(0,e=R(R({},e),K(t)))},e=K(e),[e]}class tn extends j{constructor(e){super(),G(this,e,en,xt,te,{})}}function nn(o){let e;return{c(){e=fe("path"),this.h()},l(n){e=ue(n,"path",{d:!0}),V(e).forEach(M),this.h()},h(){y(e,"d","M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z")},m(n,t){U(n,e,t)},p:ce,d(n){n&&M(e)}}}function on(o){let e,n;const t=[{viewBox:"0 0 24 24"},o[0]];let s={$$slots:{default:[nn]},$$scope:{ctx:o}};for(let r=0;r<t.length;r+=1)s=R(s,t[r]);return e=new me({props:s}),{c(){b(e.$$.fragment)},l(r){v(e.$$.fragment,r)},m(r,i){w(e,r,i),n=!0},p(r,[i]){const a=i&1?ae(t,[t[0],le(r[0])]):{};i&2&&(a.$$scope={dirty:i,ctx:r}),e.$set(a)},i(r){n||(p(e.$$.fragment,r),n=!0)},o(r){$(e.$$.fragment,r),n=!1},d(r){E(e,r)}}}function rn(o,e,n){return o.$$set=t=>{n(0,e=R(R({},e),K(t)))},e=K(e),[e]}class sn extends j{constructor(e){super(),G(this,e,rn,on,te,{})}}function an(o){let e,n,t,s,r,i,a,l,c,f,u,d,h,C,B,D,m,g;function k(_){o[28](_)}function F(_){o[29](_)}function N(_){o[30](_)}function H(_){o[31](_)}let I={onDone:o[17]};o[8]!==void 0&&(I.open=o[8]),o[10]!==void 0&&(I.math=o[10]),o[11]!==void 0&&(I.inline=o[11]),o[12]!==void 0&&(I.isNew=o[12]),e=new Re({props:I}),S.push(()=>Q(e,"open",k)),S.push(()=>Q(e,"math",F)),S.push(()=>Q(e,"inline",N)),S.push(()=>Q(e,"isNew",H)),u=new Kt({}),h=new tn({}),B=new sn({});const Z=o[27].default,z=Ee(Z,o,o[26],null);return{c(){b(e.$$.fragment),i=P("div"),a=P("div"),l=P("span"),c=P("div"),f=P("button"),b(u.$$.fragment),d=P("button"),b(h.$$.fragment),C=P("button"),b(B.$$.fragment),z&&z.c(),this.h()},l(_){v(e.$$.fragment,_),i=A(_,"DIV",{class:!0,"data-slate-node":!0,"data-slate-inline":!0,"data-slate-void":!0,dir:!0,contenteditable:!0});var L=V(i);a=A(L,"DIV",{class:!0,contenteditable:!0});var q=V(a);l=A(q,"SPAN",{}),V(l).forEach(M),c=A(q,"DIV",{class:!0});var X=V(c);f=A(X,"BUTTON",{class:!0});var x=V(f);v(u.$$.fragment,x),x.forEach(M),d=A(X,"BUTTON",{class:!0});var ge=V(d);v(h.$$.fragment,ge),ge.forEach(M),C=A(X,"BUTTON",{class:!0});var ne=V(C);v(B.$$.fragment,ne),ne.forEach(M),X.forEach(M),q.forEach(M),z&&z.l(L),L.forEach(M),this.h()},h(){y(f,"class","svelte-1v8xkls"),y(d,"class","svelte-1v8xkls"),y(C,"class","svelte-1v8xkls"),y(c,"class","math-edit svelte-1v8xkls"),Y(c,"math-selected",o[13]),y(a,"class","math-value svelte-1v8xkls"),y(a,"contenteditable",!1),Y(a,"math-selectable",!o[7]),Y(a,"math-inline",o[5]),Y(a,"math-selected",o[13]),y(i,"class","math-element svelte-1v8xkls"),y(i,"data-slate-node","element"),y(i,"data-slate-inline",o[1]),y(i,"data-slate-void",o[2]),y(i,"dir",o[4]),y(i,"contenteditable",o[3]),Y(i,"math-inline",o[5])},m(_,L){w(e,_,L),U(_,i,L),O(i,a),O(a,l),o[32](l),O(a,c),O(c,f),w(u,f,null),O(c,d),w(h,d,null),O(c,C),w(B,C,null),o[33](c),z&&z.m(i,null),o[34](i),D=!0,m||(g=[ee(f,"mousedown",o[20]),ee(f,"touchstart",o[20],{passive:!0}),ee(d,"mousedown",o[19]),ee(d,"touchstart",o[19],{passive:!0}),ee(C,"mousedown",o[18]),ee(C,"touchstart",o[18],{passive:!0})],m=!0)},p(_,L){const q={};!n&&L[0]&256&&(n=!0,q.open=_[8],W(()=>n=!1)),!t&&L[0]&1024&&(t=!0,q.math=_[10],W(()=>t=!1)),!s&&L[0]&2048&&(s=!0,q.inline=_[11],W(()=>s=!1)),!r&&L[0]&4096&&(r=!0,q.isNew=_[12],W(()=>r=!1)),e.$set(q),(!D||L[0]&8192)&&Y(c,"math-selected",_[13]),(!D||L[0]&128)&&Y(a,"math-selectable",!_[7]),(!D||L[0]&32)&&Y(a,"math-inline",_[5]),(!D||L[0]&8192)&&Y(a,"math-selected",_[13]),z&&z.p&&(!D||L[0]&67108864)&&ke(z,Z,_,_[26],D?Me(Z,_[26],L,null):Ce(_[26]),null),(!D||L[0]&2)&&y(i,"data-slate-inline",_[1]),(!D||L[0]&4)&&y(i,"data-slate-void",_[2]),(!D||L[0]&16)&&y(i,"dir",_[4]),(!D||L[0]&8)&&y(i,"contenteditable",_[3]),(!D||L[0]&32)&&Y(i,"math-inline",_[5])},i(_){D||(p(e.$$.fragment,_),p(u.$$.fragment,_),p(h.$$.fragment,_),p(B.$$.fragment,_),p(z,_),D=!0)},o(_){$(e.$$.fragment,_),$(u.$$.fragment,_),$(h.$$.fragment,_),$(B.$$.fragment,_),$(z,_),D=!1},d(_){E(e,_),_&&M(i),o[32](null),E(u),E(h),E(B),o[33](null),z&&z.d(_),o[34](null),m=!1,De(g)}}}const we="math";function Le(o){return o.type===we}function ln(o){const{isVoid:e,isInline:n,insertBreak:t}=o;return o.isInline=s=>Le(s)?!!s.inline:n(s),o.isVoid=s=>Le(s)?!0:e(s),o.insertBreak=()=>{!o.selection||!Ve.isCollapsed(o.selection)?t():oe.isVoid(o,xe.get(o,et.parent(o.selection.anchor.path)))?oe.insertNode(o,{type:ze,children:[{text:""}]}):t()},o}function fn(o,e,n,t){const s={type:we,math:e,inline:n,children:[{text:""}]};n?oe.withoutNormalizing(o,()=>{re.insertNodes(o,s,{at:t})}):re.insertNodes(o,s,{at:t})}function un(o,e,n){let t,s,r,i,a,l,{$$slots:c={},$$scope:f}=e,{element:u}=e,{isInline:d}=e,{isVoid:h}=e,{contenteditable:C}=e,{ref:B=void 0}=e,{dir:D=void 0}=e;const m=tt(),g=nt();J(o,g,T=>n(24,a=T));const k=Ie();J(o,k,T=>n(23,i=T));const F=ot();J(o,F,T=>n(25,l=T));let N=u.math,H=u.inline,I=!1;function Z(T,_e){if(u.inline!==_e){z();const Te={type:"math",math:T,inline:_e,children:[{text:""}]};_e?re.insertNodes(m,{type:ze,children:[Te]},{at:r}):re.insertNodes(m,Te,{at:r.slice(0,-1)})}else re.setNodes(m,{math:T,inline:_e},{at:r}),n(8,I=!1);n(12,x=!0)}function z(){n(8,I=!1),re.delete(m,{at:r})}function _(){navigator.clipboard.writeText(N)}let L,q=N,X=H,x;function ge(){Pe(m)||(n(10,q=N),n(11,X=H),st(L),n(8,I=!0),n(12,x=!1))}let ne;function qe(T){I=T,n(8,I)}function Ue(T){q=T,n(10,q)}function je(T){X=T,n(11,X)}function Ge(T){x=T,n(12,x)}function Ye(T){S[T?"unshift":"push"](()=>{ne=T,n(6,ne)})}function Qe(T){S[T?"unshift":"push"](()=>{L=T,n(9,L)})}function We(T){S[T?"unshift":"push"](()=>{B=T,n(0,B)})}return o.$$set=T=>{"element"in T&&n(21,u=T.element),"isInline"in T&&n(1,d=T.isInline),"isVoid"in T&&n(2,h=T.isVoid),"contenteditable"in T&&n(3,C=T.contenteditable),"ref"in T&&n(0,B=T.ref),"dir"in T&&n(4,D=T.dir),"$$scope"in T&&n(26,f=T.$$scope)},o.$$.update=()=>{o.$$.dirty[0]&33554432&&n(7,t=l),o.$$.dirty[0]&25165952&&n(13,s=t?!1:a&&i),o.$$.dirty[0]&2097152&&(r=rt(u)),o.$$.dirty[0]&6291456&&N!==u.math&&n(22,N=u.math),o.$$.dirty[0]&2097184&&H!==u.inline&&n(5,H=u.inline),o.$$.dirty[0]&4194400&&ne&&He.render(N,ne,{displayMode:!H,output:"html",throwOnError:!1})},[B,d,h,C,D,H,ne,t,I,L,q,X,x,s,g,k,F,Z,z,_,ge,u,N,i,a,l,f,c,qe,Ue,je,Ge,Ye,Qe,We]}class cn extends j{constructor(e){super(),G(this,e,un,an,$e,{element:21,isInline:1,isVoid:2,contenteditable:3,ref:0,dir:4},null,[-1,-1])}}function mn(o,e=500){let n=null;function t(){n=setTimeout(()=>{o.dispatchEvent(new CustomEvent("longpress"))},e)}function s(){n!==null&&(clearTimeout(n),n=null)}return o.addEventListener("mousedown",t),o.addEventListener("touchstart",t),o.addEventListener("mouseup",s),o.addEventListener("touchend",s),{update(r){s(),e=r},destroy(){s(),o.removeEventListener("mousedown",t),o.removeEventListener("touchstart",t),o.removeEventListener("mouseup",s),o.removeEventListener("touchend",s)}}}function dn(o){let e,n;return e=new Fe({}),{c(){b(e.$$.fragment)},l(t){v(e.$$.fragment,t)},m(t,s){w(e,t,s),n=!0},i(t){n||(p(e.$$.fragment,t),n=!0)},o(t){$(e.$$.fragment,t),n=!1},d(t){E(e,t)}}}function hn(o){let e,n;return e=new ve({props:{active:o[0],onMouseDown:o[1],$$slots:{default:[dn]},$$scope:{ctx:o}}}),{c(){b(e.$$.fragment)},l(t){v(e.$$.fragment,t)},m(t,s){w(e,t,s),n=!0},p(t,[s]){const r={};s&1&&(r.active=t[0]),s&2&&(r.onMouseDown=t[1]),s&32&&(r.$$scope={dirty:s,ctx:t}),e.$set(r)},i(t){n||(p(e.$$.fragment,t),n=!0)},o(t){$(e.$$.fragment,t),n=!1},d(t){E(e,t)}}}function gn(o,e,n){let t,s,r,i;const a=he();return J(o,a,l=>n(4,i=l)),o.$$.update=()=>{o.$$.dirty&16&&n(3,t=i),o.$$.dirty&8&&n(0,s=be(t,"code")),o.$$.dirty&9&&n(1,r=()=>!s&&pt(t))},[s,r,a,t,i]}class _n extends j{constructor(e){super(),G(this,e,gn,hn,te,{})}}function pn(o){let e;return{c(){e=fe("path"),this.h()},l(n){e=ue(n,"path",{d:!0}),V(e).forEach(M),this.h()},h(){y(e,"d","M14 10H2v2h12v-2zm0-4H2v2h12V6zM2 16h8v-2H2v2zm19.5-4.5L23 13l-6.99 7-4.51-4.5L13 14l3.01 3 5.49-5.5z")},m(n,t){U(n,e,t)},p:ce,d(n){n&&M(e)}}}function $n(o){let e,n;const t=[{viewBox:"0 0 24 24"},o[0]];let s={$$slots:{default:[pn]},$$scope:{ctx:o}};for(let r=0;r<t.length;r+=1)s=R(s,t[r]);return e=new me({props:s}),{c(){b(e.$$.fragment)},l(r){v(e.$$.fragment,r)},m(r,i){w(e,r,i),n=!0},p(r,[i]){const a=i&1?ae(t,[t[0],le(r[0])]):{};i&2&&(a.$$scope={dirty:i,ctx:r}),e.$set(a)},i(r){n||(p(e.$$.fragment,r),n=!0)},o(r){$(e.$$.fragment,r),n=!1},d(r){E(e,r)}}}function bn(o,e,n){return o.$$set=t=>{n(0,e=R(R({},e),K(t)))},e=K(e),[e]}class vn extends j{constructor(e){super(),G(this,e,bn,$n,te,{})}}function wn(o){let e,n;return e=new vn({}),{c(){b(e.$$.fragment)},l(t){v(e.$$.fragment,t)},m(t,s){w(e,t,s),n=!0},i(t){n||(p(e.$$.fragment,t),n=!0)},o(t){$(e.$$.fragment,t),n=!1},d(t){E(e,t)}}}function En(o){let e,n;return e=new ve({props:{active:o[1],onMouseDown:o[0],$$slots:{default:[wn]},$$scope:{ctx:o}}}),{c(){b(e.$$.fragment)},l(t){v(e.$$.fragment,t)},m(t,s){w(e,t,s),n=!0},p(t,[s]){const r={};s&2&&(r.active=t[1]),s&1&&(r.onMouseDown=t[0]),s&32&&(r.$$scope={dirty:s,ctx:t}),e.$set(r)},i(t){n||(p(e.$$.fragment,t),n=!0)},o(t){$(e.$$.fragment,t),n=!1},d(t){E(e,t)}}}function kn(o,e,n){let t,s,r,i;const a=he();return J(o,a,l=>n(4,i=l)),o.$$.update=()=>{o.$$.dirty&16&&n(3,t=i),o.$$.dirty&8&&n(1,s=be(t,"check-list-item")),o.$$.dirty&8&&n(0,r=()=>it(t))},[r,s,a,t,i]}class Cn extends j{constructor(e){super(),G(this,e,kn,En,te,{})}}function Mn(o){let e;return{c(){e=fe("path"),this.h()},l(n){e=ue(n,"path",{d:!0}),V(e).forEach(M),this.h()},h(){y(e,"d","M18 4H6v2l6.5 6L6 18v2h12v-3h-7l5-5-5-5h7z")},m(n,t){U(n,e,t)},p:ce,d(n){n&&M(e)}}}function Dn(o){let e,n;const t=[{viewBox:"0 0 24 24"},o[0]];let s={$$slots:{default:[Mn]},$$scope:{ctx:o}};for(let r=0;r<t.length;r+=1)s=R(s,t[r]);return e=new me({props:s}),{c(){b(e.$$.fragment)},l(r){v(e.$$.fragment,r)},m(r,i){w(e,r,i),n=!0},p(r,[i]){const a=i&1?ae(t,[t[0],le(r[0])]):{};i&2&&(a.$$scope={dirty:i,ctx:r}),e.$set(a)},i(r){n||(p(e.$$.fragment,r),n=!0)},o(r){$(e.$$.fragment,r),n=!1},d(r){E(e,r)}}}function In(o,e,n){return o.$$set=t=>{n(0,e=R(R({},e),K(t)))},e=K(e),[e]}class Tn extends j{constructor(e){super(),G(this,e,In,Dn,te,{})}}function yn(o){let e,n;return e=new Tn({}),{c(){b(e.$$.fragment)},l(t){v(e.$$.fragment,t)},m(t,s){w(e,t,s),n=!0},i(t){n||(p(e.$$.fragment,t),n=!0)},o(t){$(e.$$.fragment,t),n=!1},d(t){E(e,t)}}}function Bn(o){let e,n,t,s,r,i;function a(u){o[11](u)}function l(u){o[12](u)}function c(u){o[13](u)}let f={onDone:o[7]};return o[0]!==void 0&&(f.open=o[0]),o[1]!==void 0&&(f.math=o[1]),o[2]!==void 0&&(f.inline=o[2]),e=new Re({props:f}),S.push(()=>Q(e,"open",a)),S.push(()=>Q(e,"math",l)),S.push(()=>Q(e,"inline",c)),r=new ve({props:{active:o[3],onMouseDown:o[6],$$slots:{default:[yn]},$$scope:{ctx:o}}}),{c(){b(e.$$.fragment),b(r.$$.fragment)},l(u){v(e.$$.fragment,u),v(r.$$.fragment,u)},m(u,d){w(e,u,d),w(r,u,d),i=!0},p(u,[d]){const h={};!n&&d&1&&(n=!0,h.open=u[0],W(()=>n=!1)),!t&&d&2&&(t=!0,h.math=u[1],W(()=>t=!1)),!s&&d&4&&(s=!0,h.inline=u[2],W(()=>s=!1)),e.$set(h);const C={};d&8&&(C.active=u[3]),d&65536&&(C.$$scope={dirty:d,ctx:u}),r.$set(C)},i(u){i||(p(e.$$.fragment,u),p(r.$$.fragment,u),i=!0)},o(u){$(e.$$.fragment,u),$(r.$$.fragment,u),i=!1},d(u){E(e,u),E(r,u)}}}function Ln(o,e,n){let t,s,r,i,a;const l=he();J(o,l,k=>n(10,a=k));const c=Ie();J(o,c,k=>n(9,i=k));let f,u=!1,d="",h=!0;function C(){f=t.selection?t.selection.anchor||t.selection.focus:void 0,n(1,d=""),n(2,h=!0),n(0,u=!u)}function B(k,F){fn(t,k,F,f)}at("onKeyDown",k=>{lt("ctrl+m",k)&&(s?(f=t.selection?t.selection.anchor||t.selection.focus:void 0,n(1,d=""),n(2,h=!0),n(0,u=!0)):n(0,u=!1))});function D(k){u=k,n(0,u)}function m(k){d=k,n(1,d)}function g(k){h=k,n(2,h)}return o.$$.update=()=>{o.$$.dirty&1024&&n(8,t=a),o.$$.dirty&512&&(s=i),o.$$.dirty&256&&n(3,r=be(t,we))},[u,d,h,r,l,c,C,B,t,i,a,D,m,g]}class Nn extends j{constructor(e){super(),G(this,e,Ln,Bn,te,{})}}function Vn(o){let e;return{c(){e=fe("path"),this.h()},l(n){e=ue(n,"path",{d:!0}),V(e).forEach(M),this.h()},h(){y(e,"d","M464 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zM224 416H64v-96h160v96zm0-160H64v-96h160v96zm224 160H288v-96h160v96zm0-160H288v-96h160v96z")},m(n,t){U(n,e,t)},p:ce,d(n){n&&M(e)}}}function Hn(o){let e,n;const t=[{viewBox:"0 0 512 512"},o[0]];let s={$$slots:{default:[Vn]},$$scope:{ctx:o}};for(let r=0;r<t.length;r+=1)s=R(s,t[r]);return e=new me({props:s}),{c(){b(e.$$.fragment)},l(r){v(e.$$.fragment,r)},m(r,i){w(e,r,i),n=!0},p(r,[i]){const a=i&1?ae(t,[t[0],le(r[0])]):{};i&2&&(a.$$scope={dirty:i,ctx:r}),e.$set(a)},i(r){n||(p(e.$$.fragment,r),n=!0)},o(r){$(e.$$.fragment,r),n=!1},d(r){E(e,r)}}}function zn(o,e,n){return o.$$set=t=>{n(0,e=R(R({},e),K(t)))},e=K(e),[e]}class Pn extends j{constructor(e){super(),G(this,e,zn,Hn,te,{})}}function An(o){let e,n;return e=new Pn({}),{c(){b(e.$$.fragment)},l(t){v(e.$$.fragment,t)},m(t,s){w(e,t,s),n=!0},i(t){n||(p(e.$$.fragment,t),n=!0)},o(t){$(e.$$.fragment,t),n=!1},d(t){E(e,t)}}}function Fn(o){let e,n;return e=new ve({props:{active:o[1],onMouseDown:o[0],$$slots:{default:[An]},$$scope:{ctx:o}}}),{c(){b(e.$$.fragment)},l(t){v(e.$$.fragment,t)},m(t,s){w(e,t,s),n=!0},p(t,[s]){const r={};s&2&&(r.active=t[1]),s&1&&(r.onMouseDown=t[0]),s&32&&(r.$$scope={dirty:s,ctx:t}),e.$set(r)},i(t){n||(p(e.$$.fragment,t),n=!0)},o(t){$(e.$$.fragment,t),n=!1},d(t){E(e,t)}}}function On(o,e,n){let t,s,r,i;const a=he();return J(o,a,l=>n(4,i=l)),o.$$.update=()=>{o.$$.dirty&16&&n(3,t=i),o.$$.dirty&8&&n(1,s=be(t,"void")),o.$$.dirty&8&&n(0,r=()=>ft(t))},[r,s,a,t,i]}class Sn extends j{constructor(e){super(),G(this,e,On,Fn,te,{})}}function Rn(o){let e,n;return e=new Mt({}),{c(){b(e.$$.fragment)},l(t){v(e.$$.fragment,t)},m(t,s){w(e,t,s),n=!0},i(t){n||(p(e.$$.fragment,t),n=!0)},o(t){$(e.$$.fragment,t),n=!1},d(t){E(e,t)}}}function qn(o){let e,n;return e=new Dt({}),{c(){b(e.$$.fragment)},l(t){v(e.$$.fragment,t)},m(t,s){w(e,t,s),n=!0},i(t){n||(p(e.$$.fragment,t),n=!0)},o(t){$(e.$$.fragment,t),n=!1},d(t){E(e,t)}}}function Un(o){let e,n;return e=new It({}),{c(){b(e.$$.fragment)},l(t){v(e.$$.fragment,t)},m(t,s){w(e,t,s),n=!0},i(t){n||(p(e.$$.fragment,t),n=!0)},o(t){$(e.$$.fragment,t),n=!1},d(t){E(e,t)}}}function jn(o){let e,n;return e=new Fe({}),{c(){b(e.$$.fragment)},l(t){v(e.$$.fragment,t)},m(t,s){w(e,t,s),n=!0},i(t){n||(p(e.$$.fragment,t),n=!0)},o(t){$(e.$$.fragment,t),n=!1},d(t){E(e,t)}}}function Gn(o){let e,n;return e=new Tt({}),{c(){b(e.$$.fragment)},l(t){v(e.$$.fragment,t)},m(t,s){w(e,t,s),n=!0},i(t){n||(p(e.$$.fragment,t),n=!0)},o(t){$(e.$$.fragment,t),n=!1},d(t){E(e,t)}}}function Yn(o){let e,n;return e=new yt({}),{c(){b(e.$$.fragment)},l(t){v(e.$$.fragment,t)},m(t,s){w(e,t,s),n=!0},i(t){n||(p(e.$$.fragment,t),n=!0)},o(t){$(e.$$.fragment,t),n=!1},d(t){E(e,t)}}}function Qn(o){let e,n;return e=new Bt({}),{c(){b(e.$$.fragment)},l(t){v(e.$$.fragment,t)},m(t,s){w(e,t,s),n=!0},i(t){n||(p(e.$$.fragment,t),n=!0)},o(t){$(e.$$.fragment,t),n=!1},d(t){E(e,t)}}}function Wn(o){let e,n;return e=new Lt({}),{c(){b(e.$$.fragment)},l(t){v(e.$$.fragment,t)},m(t,s){w(e,t,s),n=!0},i(t){n||(p(e.$$.fragment,t),n=!0)},o(t){$(e.$$.fragment,t),n=!1},d(t){E(e,t)}}}function Xn(o){let e,n;return e=new Nt({}),{c(){b(e.$$.fragment)},l(t){v(e.$$.fragment,t)},m(t,s){w(e,t,s),n=!0},i(t){n||(p(e.$$.fragment,t),n=!0)},o(t){$(e.$$.fragment,t),n=!1},d(t){E(e,t)}}}function Jn(o){let e,n,t,s,r,i,a,l,c,f,u,d,h,C,B,D;return n=new pe({props:{format:"bold",$$slots:{default:[Rn]},$$scope:{ctx:o}}}),t=new pe({props:{format:"italic",$$slots:{default:[qn]},$$scope:{ctx:o}}}),s=new pe({props:{format:"underline",$$slots:{default:[Un]},$$scope:{ctx:o}}}),r=new pe({props:{format:"code",$$slots:{default:[jn]},$$scope:{ctx:o}}}),i=new de({props:{format:"heading1",$$slots:{default:[Gn]},$$scope:{ctx:o}}}),a=new de({props:{format:"heading2",$$slots:{default:[Yn]},$$scope:{ctx:o}}}),l=new de({props:{format:"block-quote",$$slots:{default:[Qn]},$$scope:{ctx:o}}}),c=new de({props:{format:"numbered-list",$$slots:{default:[Wn]},$$scope:{ctx:o}}}),f=new de({props:{format:"bulleted-list",$$slots:{default:[Xn]},$$scope:{ctx:o}}}),u=new Ct({}),d=new Cn({}),h=new _n({}),C=new Nn({}),B=new Sn({}),{c(){e=P("div"),b(n.$$.fragment),b(t.$$.fragment),b(s.$$.fragment),b(r.$$.fragment),b(i.$$.fragment),b(a.$$.fragment),b(l.$$.fragment),b(c.$$.fragment),b(f.$$.fragment),b(u.$$.fragment),b(d.$$.fragment),b(h.$$.fragment),b(C.$$.fragment),b(B.$$.fragment),this.h()},l(m){e=A(m,"DIV",{class:!0});var g=V(e);v(n.$$.fragment,g),v(t.$$.fragment,g),v(s.$$.fragment,g),v(r.$$.fragment,g),v(i.$$.fragment,g),v(a.$$.fragment,g),v(l.$$.fragment,g),v(c.$$.fragment,g),v(f.$$.fragment,g),v(u.$$.fragment,g),v(d.$$.fragment,g),v(h.$$.fragment,g),v(C.$$.fragment,g),v(B.$$.fragment,g),g.forEach(M),this.h()},h(){y(e,"class","toolbar svelte-mszq1p")},m(m,g){U(m,e,g),w(n,e,null),w(t,e,null),w(s,e,null),w(r,e,null),w(i,e,null),w(a,e,null),w(l,e,null),w(c,e,null),w(f,e,null),w(u,e,null),w(d,e,null),w(h,e,null),w(C,e,null),w(B,e,null),D=!0},p(m,g){const k={};g&512&&(k.$$scope={dirty:g,ctx:m}),n.$set(k);const F={};g&512&&(F.$$scope={dirty:g,ctx:m}),t.$set(F);const N={};g&512&&(N.$$scope={dirty:g,ctx:m}),s.$set(N);const H={};g&512&&(H.$$scope={dirty:g,ctx:m}),r.$set(H);const I={};g&512&&(I.$$scope={dirty:g,ctx:m}),i.$set(I);const Z={};g&512&&(Z.$$scope={dirty:g,ctx:m}),a.$set(Z);const z={};g&512&&(z.$$scope={dirty:g,ctx:m}),l.$set(z);const _={};g&512&&(_.$$scope={dirty:g,ctx:m}),c.$set(_);const L={};g&512&&(L.$$scope={dirty:g,ctx:m}),f.$set(L)},i(m){D||(p(n.$$.fragment,m),p(t.$$.fragment,m),p(s.$$.fragment,m),p(r.$$.fragment,m),p(i.$$.fragment,m),p(a.$$.fragment,m),p(l.$$.fragment,m),p(c.$$.fragment,m),p(f.$$.fragment,m),p(u.$$.fragment,m),p(d.$$.fragment,m),p(h.$$.fragment,m),p(C.$$.fragment,m),p(B.$$.fragment,m),D=!0)},o(m){$(n.$$.fragment,m),$(t.$$.fragment,m),$(s.$$.fragment,m),$(r.$$.fragment,m),$(i.$$.fragment,m),$(a.$$.fragment,m),$(l.$$.fragment,m),$(c.$$.fragment,m),$(f.$$.fragment,m),$(u.$$.fragment,m),$(d.$$.fragment,m),$(h.$$.fragment,m),$(C.$$.fragment,m),$(B.$$.fragment,m),D=!1},d(m){m&&M(e),E(n),E(t),E(s),E(r),E(i),E(a),E(l),E(c),E(f),E(u),E(d),E(h),E(C),E(B)}}}function Kn(o){let e,n,t,s,r,i,a,l;function c(h){o[6](h)}let f={container:o[2],$$slots:{default:[Jn]},$$scope:{ctx:o}};o[1]!==void 0&&(f.open=o[1]),e=new Ot({props:f}),S.push(()=>Q(e,"open",c));function u(h){o[7](h)}let d={placeholder:"Enter some plain text..."};return o[2]!==void 0&&(d.ref=o[2]),s=new ht({props:d}),S.push(()=>Q(s,"ref",u)),{c(){b(e.$$.fragment),t=P("div"),b(s.$$.fragment),this.h()},l(h){v(e.$$.fragment,h),t=A(h,"DIV",{class:!0});var C=V(t);v(s.$$.fragment,C),C.forEach(M),this.h()},h(){y(t,"class","editor svelte-mszq1p")},m(h,C){w(e,h,C),U(h,t,C),w(s,t,null),i=!0,a||(l=[Ne(mn.call(null,t)),ee(t,"longpress",o[5])],a=!0)},p(h,C){const B={};C&4&&(B.container=h[2]),C&512&&(B.$$scope={dirty:C,ctx:h}),!n&&C&2&&(n=!0,B.open=h[1],W(()=>n=!1)),e.$set(B);const D={};!r&&C&4&&(r=!0,D.ref=h[2],W(()=>r=!1)),s.$set(D)},i(h){i||(p(e.$$.fragment,h),p(s.$$.fragment,h),i=!0)},o(h){$(e.$$.fragment,h),$(s.$$.fragment,h),i=!1},d(h){E(e,h),h&&M(t),E(s),a=!1,De(l)}}}function Zn(o){let e,n,t,s,r,i;function a(c){o[8](c)}let l={editor:o[3],plugins:o[4],$$slots:{default:[Kn]},$$scope:{ctx:o}};return o[0]!==void 0&&(l.value=o[0]),s=new ut({props:l}),S.push(()=>Q(s,"value",a)),{c(){e=P("p"),n=P("a"),t=se(`Source
	`),b(s.$$.fragment),this.h()},l(c){e=A(c,"P",{});var f=V(e);n=A(f,"A",{target:!0,href:!0});var u=V(n);t=ie(u,`Source
	`),u.forEach(M),f.forEach(M),v(s.$$.fragment,c),this.h()},h(){y(n,"target","_blank"),y(n,"href","https://github.com/nathanfaucett/svelte-slate/blob/main/src/routes/plugins/+page.svelte")},m(c,f){U(c,e,f),O(e,n),O(n,t),w(s,c,f),i=!0},p(c,[f]){const u={};f&518&&(u.$$scope={dirty:f,ctx:c}),!r&&f&1&&(r=!0,u.value=c[0],W(()=>r=!1)),s.$set(u)},i(c){i||(p(s.$$.fragment,c),i=!0)},o(c){$(s.$$.fragment,c),i=!1},d(c){c&&M(e),E(s,c)}}}function xn(o,e,n){const t=ct(mt(dt()));let s={...gt,[$t]:{component:bt,withFn:vt},[wt]:{component:Et,withFn:kt},[we]:{component:cn,withFn:ln}},r=[{type:"paragraph",children:[{text:"This is editable "},{text:"rich",bold:!0},{text:" text, "},{text:"much",italic:!0},{text:" better than a "},{text:"<textarea>",code:!0},{text:"!"}]},{type:"paragraph",children:[{text:"Since it's rich text, you can do things like turn a selection of text "},{text:"bold",bold:!0},{text:", or add a semantically rendered block quote in the middle of the page, like this:"}]},{type:"block-quote",children:[{text:"A wise quote."}]},{type:"image",url:"https://source.unsplash.com/kFrdX5IeQzI",children:[{text:""}]},{type:"paragraph",children:[{text:"Try it out for yourself!"}]},{type:"check-list-item",checked:!0,children:[{text:"Checked list item"}]},{type:"check-list-item",checked:!1,children:[{text:"Todo"}]},{type:"math",inline:!1,math:"\\frac{\\pi}{2}",children:[{text:""}]},{type:"code",language:"javascript",children:[{type:"code-line",children:[{text:'console.log("Hello world!");'}]}]},{type:"heading3",children:[{text:"Numbered Lists"}]},{type:"numbered-list",children:[{type:"list-item",children:[{text:"One"}]},{type:"list-item",children:[{text:"Two"}]}]},{type:"heading3",children:[{text:"Bulleted Lists"}]},{type:"bulleted-list",children:[{type:"list-item",children:[{text:"One"}]},{type:"list-item",children:[{text:"Two"}]}]},{type:"table",children:[{type:"table-row",children:[{type:"table-row-header",children:[{text:"Id"}]},{type:"table-row-header",children:[{text:"Name"}]}]},{type:"table-row",children:[{type:"table-row-data",children:[{text:"1"}]},{type:"table-row-data",children:[{text:"Nathan"}]}]}]}],i=!1,a;function l(){if(!Pe(t)){const[d]=Array.from(oe.nodes(t,{at:oe.unhangRange(t,t.selection),match:Ae}));d||n(1,i=!0)}}function c(d){i=d,n(1,i)}function f(d){a=d,n(2,a)}function u(d){r=d,n(0,r)}return[r,i,a,t,s,l,c,f,u]}class io extends j{constructor(e){super(),G(this,e,xn,Zn,te,{})}}export{io as default};
import{S as k,i as j,s as x,O as P,P as C,h as f,n as L,u as $,j as p,k as d,p as q,d as u,v,l as _,a as g,J as h,w as b,Q as z,b as w,t as E,x as S,z as A}from"../../../chunks/index-895749dd.js";import{S as D,w as H,a as I,c as J,e as O}from"../../../chunks/withSvelte-fe688671.js";import{E as Q}from"../../../chunks/Element-7a4a3da1.js";import{c as V,L as B}from"../../../chunks/CodeElement-00f3fbd4.js";function F(o){let t,a,n;return a=new O({props:{Element:Q,Leaf:B,placeholder:"Enter some plain text..."}}),{c(){t=f("div"),$(a.$$.fragment),this.h()},l(e){t=p(e,"DIV",{class:!0});var r=d(t);v(a.$$.fragment,r),r.forEach(u),this.h()},h(){_(t,"class","editor svelte-1j4lewl")},m(e,r){g(e,t,r),b(a,t,null),n=!0},p:A,i(e){n||(w(a.$$.fragment,e),n=!0)},o(e){E(a.$$.fragment,e),n=!1},d(e){e&&u(t),S(a)}}}function G(o){let t,a,n,e,r,i;function y(s){o[2](s)}let m={editor:o[1],$$slots:{default:[F]},$$scope:{ctx:o}};return o[0]!==void 0&&(m.value=o[0]),e=new D({props:m}),P.push(()=>C(e,"value",y)),{c(){t=f("p"),a=f("a"),n=L(`Source
	`),$(e.$$.fragment),this.h()},l(s){t=p(s,"P",{});var l=d(t);a=p(l,"A",{target:!0,href:!0});var c=d(a);n=q(c,`Source
	`),c.forEach(u),l.forEach(u),v(e.$$.fragment,s),this.h()},h(){_(a,"target","_blank"),_(a,"href","https://github.com/nathanfaucett/svelte-slate/blob/main/src/routes/editor/+page.svelte")},m(s,l){g(s,t,l),h(t,a),h(a,n),b(e,s,l),i=!0},p(s,[l]){const c={};l&8&&(c.$$scope={dirty:l,ctx:s}),!r&&l&1&&(r=!0,c.value=s[0],z(()=>r=!1)),e.$set(c)},i(s){i||(w(e.$$.fragment,s),i=!0)},o(s){E(e.$$.fragment,s),i=!1},d(s){s&&u(t),S(e,s)}}}function K(o,t,a){const n=H(V(I(J())));let e=[{type:"code",language:"javascript",children:[{type:"code-line",children:[{text:""}]}]}];function r(i){e=i,a(0,e)}return[e,n,r]}class U extends k{constructor(t){super(),j(this,t,K,G,x,{})}}export{U as default};
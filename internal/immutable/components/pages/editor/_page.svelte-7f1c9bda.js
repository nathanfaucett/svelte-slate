import{S as k,i as x,s as j,O as P,P as C,h as p,n as q,u as $,j as f,k as d,p as z,d as u,v,l as m,a as g,J as h,w as b,Q as A,b as w,t as E,x as S,z as D}from"../../../chunks/index-9a178cb0.js";import{S as H,w as I,a as J,c as L,x as O,v as Q}from"../../../chunks/index.es-d99b9a5f.js";import{c as V}from"../../../chunks/ImageElement-bfd4af19.js";/* empty css                                                             */import{E as B}from"../../../chunks/Element-693bf832.js";function F(o){let t,a,n;return a=new O({props:{Element:B,Leaf:Q,placeholder:"Enter some plain text..."}}),{c(){t=p("div"),$(a.$$.fragment),this.h()},l(e){t=f(e,"DIV",{class:!0});var r=d(t);v(a.$$.fragment,r),r.forEach(u),this.h()},h(){m(t,"class","editor svelte-1j4lewl")},m(e,r){g(e,t,r),b(a,t,null),n=!0},p:D,i(e){n||(w(a.$$.fragment,e),n=!0)},o(e){E(a.$$.fragment,e),n=!1},d(e){e&&u(t),S(a)}}}function G(o){let t,a,n,e,r,i;function y(s){o[2](s)}let _={editor:o[1],$$slots:{default:[F]},$$scope:{ctx:o}};return o[0]!==void 0&&(_.value=o[0]),e=new H({props:_}),P.push(()=>C(e,"value",y)),{c(){t=p("p"),a=p("a"),n=q(`Source
	`),$(e.$$.fragment),this.h()},l(s){t=f(s,"P",{});var l=d(t);a=f(l,"A",{target:!0,href:!0});var c=d(a);n=z(c,`Source
	`),c.forEach(u),l.forEach(u),v(e.$$.fragment,s),this.h()},h(){m(a,"target","_blank"),m(a,"href","https://github.com/nathanfaucett/svelte-slate/blob/main/src/routes/editor/+page.svelte")},m(s,l){g(s,t,l),h(t,a),h(a,n),b(e,s,l),i=!0},p(s,[l]){const c={};l&8&&(c.$$scope={dirty:l,ctx:s}),!r&&l&1&&(r=!0,c.value=s[0],A(()=>r=!1)),e.$set(c)},i(s){i||(w(e.$$.fragment,s),i=!0)},o(s){E(e.$$.fragment,s),i=!1},d(s){s&&u(t),S(e,s)}}}function K(o,t,a){const n=I(V(J(L())));let e=[{type:"code",language:"javascript",children:[{type:"code-line",children:[{text:""}]}]}];function r(i){e=i,a(0,e)}return[e,n,r]}class W extends k{constructor(t){super(),x(this,t,K,G,j,{})}}export{W as default};

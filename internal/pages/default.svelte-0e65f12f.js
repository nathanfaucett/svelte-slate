import{S as m,i as _,s as g,O as h,P as v,w as u,x as f,y as c,Q as b,q as $,o as p,B as d,R as w,T as S,M as k}from"../chunks/vendor-1f71fe40.js";import{S as E,w as j,E as q}from"../chunks/withSvelte-d4d9c327.js";function T(s){let e,n;return e=new q({props:{placeholder:"Enter some plain text..."}}),{c(){u(e.$$.fragment)},l(t){f(e.$$.fragment,t)},m(t,r){c(e,t,r),n=!0},p:k,i(t){n||($(e.$$.fragment,t),n=!0)},o(t){p(e.$$.fragment,t),n=!1},d(t){d(e,t)}}}function x(s){let e,n,t;function r(a){s[2](a)}let l={editor:s[1],$$slots:{default:[T]},$$scope:{ctx:s}};return s[0]!==void 0&&(l.value=s[0]),e=new E({props:l}),h.push(()=>v(e,"value",r)),{c(){u(e.$$.fragment)},l(a){f(e.$$.fragment,a)},m(a,o){c(e,a,o),t=!0},p(a,[o]){const i={};o&8&&(i.$$scope={dirty:o,ctx:a}),!n&&o&1&&(n=!0,i.value=a[0],b(()=>n=!1)),e.$set(i)},i(a){t||($(e.$$.fragment,a),t=!0)},o(a){p(e.$$.fragment,a),t=!1},d(a){d(e,a)}}}function y(s,e,n){const t=w(j(S()));let r=[{children:[{text:"This is editable"}]}];function l(a){r=a,n(0,r)}return[r,t,l]}class D extends m{constructor(e){super();_(this,e,y,x,g,{})}}export{D as default};

(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{39:function(e,t,n){},40:function(e,t,n){"use strict";n.r(t);var c=n(15),a=n.n(c),o=n(1),r=n(2),i=n(4),u=n.n(i),s=n(0),b=function(e){var t=e.filterState,n=Object(o.a)(t,2),c=n[0],a=n[1];return Object(s.jsxs)("form",{children:["filter shown with ",Object(s.jsx)("input",{value:c,onChange:function(e){a(e.target.value)}})]})},j=n(6),d=function(e){var t=e.baseURL,n=e.personsState,c=e.nameState,a=e.numberState,r=e.showNotification,i=Object(o.a)(n,2),b=i[0],d=i[1],l=Object(o.a)(c,2),f=l[0],h=l[1],m=Object(o.a)(a,2),O=m[0],v=m[1],p=function(e){e.preventDefault();var n=b.find((function(e){return e.name===f}));if(n)window.confirm("".concat(n.name," is already added to phonebook, replace the opld number with a sew one?"))&&u.a.put("".concat(t,"/").concat(n.id),Object(j.a)(Object(j.a)({},n),{},{number:O})).then((function(e){r("Changed number of ".concat(e.data.name),"green"),d(b.map((function(t){return t.id!==n.id?t:e.data})))})).catch((function(){return r("Number change of ".concat(n.name," failed"),"red")}));else{var c={name:f,number:O};u.a.post(t,c).then((function(e){d(b.concat(e.data)),r("Added ".concat(e.data.name),"green")})),h(""),v("")}};return Object(s.jsxs)("form",{onSubmit:p,children:[Object(s.jsx)("h2",{children:"add a new"}),Object(s.jsxs)("div",{children:["name:"," ",Object(s.jsx)("input",{value:f,onChange:function(e){h(e.target.value)}})]}),Object(s.jsxs)("div",{children:["number:"," ",Object(s.jsx)("input",{value:O,onChange:function(e){v(e.target.value)}})]}),Object(s.jsx)("div",{children:Object(s.jsx)("button",{onClick:p,children:"add"})})]})},l=function(e){var t=e.baseURL,n=e.personsState,c=e.listFilter,a=e.showNotification,r=Object(o.a)(n,2),i=r[0],b=r[1];return Object(s.jsx)("ul",{children:i.filter((function(e){return e.name.toLocaleLowerCase().includes(c)})).map((function(e){return Object(s.jsxs)("li",{children:[e.name," ",e.number," ",Object(s.jsx)("button",{onClick:function(){return function(e){var n=i.find((function(t){return t.id===e}));window.confirm("Delete ".concat(n.name,"?"))&&u.a.delete("".concat(t,"/").concat(e)).then((function(){a("".concat(n.name," was removed"),"green")})).catch((function(){a("Information of ".concat(n.name," has already been removed from the server"),"red")})).finally((function(){return b(i.filter((function(t){return t.id!==e})))}))}(e.id)},children:"delete"})]},e.name)}))})},f=function(e){var t=e.message,n=e.color;return t?Object(s.jsx)(s.Fragment,{children:Object(s.jsx)("div",{className:"notification",style:{color:n},children:t})}):null},h="/api/persons",m=function(){var e=Object(r.useState)([]),t=Object(o.a)(e,2),n=t[0],c=t[1],a=Object(r.useState)(""),i=Object(o.a)(a,2),j=i[0],m=i[1],O=Object(r.useState)(""),v=Object(o.a)(O,2),p=v[0],x=v[1],g=Object(r.useState)(""),w=Object(o.a)(g,2),S=w[0],k=w[1],C=Object(r.useState)(null),N=Object(o.a)(C,2),L=N[0],y=N[1],R=Object(r.useState)("green"),U=Object(o.a)(R,2),F=U[0],D=U[1];Object(r.useEffect)((function(){u.a.get(h).then((function(e){c(e.data)}))}),[]);var E=function(e,t){y(e),D(t),setTimeout((function(){return y(null)}),5e3)};return Object(s.jsxs)("div",{children:[Object(s.jsx)("h2",{children:"Phonebook"}),Object(s.jsx)(f,{message:L,color:F}),Object(s.jsx)(b,{filterState:[S,k]}),Object(s.jsx)(d,{baseURL:h,personsState:[n,c],nameState:[j,m],numberState:[p,x],showNotification:E}),Object(s.jsx)("h2",{children:"Numbers"}),Object(s.jsx)(l,{baseURL:h,personsState:[n,c],listFilter:S,showNotification:E})]})};n(39);a.a.render(Object(s.jsx)(m,{}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.10ffb81e.chunk.js.map
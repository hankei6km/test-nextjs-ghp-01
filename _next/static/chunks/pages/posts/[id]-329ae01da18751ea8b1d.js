_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[11],{"/a9y":function(t,e,n){"use strict";var a=n("lwsE"),r=n("W8MJ"),i=n("7W2i"),o=n("a1gu"),c=n("Nsbk");function s(t){var e=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,a=c(t);if(e){var r=c(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return o(this,n)}}var l=n("TqRt");e.__esModule=!0,e.default=void 0;var p=l(n("q1tI")),d=l(n("8Kt/")),u={400:"Bad Request",404:"This page could not be found",405:"Method Not Allowed",500:"Internal Server Error"};function f(t){var e=t.res,n=t.err;return{statusCode:e&&e.statusCode?e.statusCode:n?n.statusCode:404}}var g=function(t){i(n,t);var e=s(n);function n(){return a(this,n),e.apply(this,arguments)}return r(n,[{key:"render",value:function(){var t=this.props.statusCode,e=this.props.title||u[t]||"An unexpected error has occurred";return p.default.createElement("div",{style:m.error},p.default.createElement(d.default,null,p.default.createElement("title",null,t,": ",e)),p.default.createElement("div",null,p.default.createElement("style",{dangerouslySetInnerHTML:{__html:"body { margin: 0 }"}}),t?p.default.createElement("h1",{style:m.h1},t):null,p.default.createElement("div",{style:m.desc},p.default.createElement("h2",{style:m.h2},e,"."))))}}]),n}(p.default.Component);e.default=g,g.displayName="ErrorPage",g.getInitialProps=f,g.origGetInitialProps=f;var m={error:{color:"#000",background:"#fff",fontFamily:'-apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", "Fira Sans", Avenir, "Helvetica Neue", "Lucida Grande", sans-serif',height:"100vh",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},desc:{display:"inline-block",textAlign:"left",lineHeight:"49px",height:"49px",verticalAlign:"middle"},h1:{display:"inline-block",borderRight:"1px solid rgba(0, 0, 0,.3)",margin:0,marginRight:"20px",padding:"10px 23px 10px 0",fontSize:"24px",fontWeight:500,verticalAlign:"top"},h2:{fontSize:"14px",fontWeight:"normal",lineHeight:"inherit",margin:0,padding:0}}},eomm:function(t,e,n){t.exports=n("/a9y")},u7QL:function(t,e,n){"use strict";n.r(e),n.d(e,"__N_SSG",(function(){return k})),n.d(e,"default",(function(){return w}));var a=n("KQm4"),r=n("rePB"),i=n("q1tI"),o=n.n(i),c=n("eomm"),s=n.n(c),l=n("R/WZ"),p=n("apO0"),d=n("f4ym"),u=n("hlFM"),f=n("1G0x"),g=n("iq4c"),m=n("3LdE"),h=n("sx9v"),y=n("ZQAi"),b=o.a.createElement;function v(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function x(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?v(Object(n),!0).forEach((function(e){Object(r.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):v(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var O=Object(l.a)((function(t){return{pageMain:x(x(x({},Object(h.b)("& .".concat(m.a.iamgeConfig.contentImageClassName),{maxWidth:"100%",maxHeight:"100%",objectFit:"scale-down"})),{},{maxWidth:t.breakpoints.values.sm},t.typography.body1),{},{paddingLeft:t.spacing(1),paddingRight:t.spacing(1),"& article > h3":x(x({},t.typography.h6),{},{marginTop:t.spacing(1),paddingTop:t.spacing(.5),paddingBottom:t.spacing(.5),paddingLeft:t.spacing(1),paddingRight:t.spacing(1),borderLeft:"6px solid ".concat(t.palette.primary.main),backgroundColor:t.palette.divider}),"& article > h4":x(x({},t.typography.h6),{},{display:"inline",marginTop:t.spacing(1),paddingLeft:t.spacing(1),paddingRight:t.spacing(1),color:t.palette.getContrastText(t.palette.primary.main),backgroundColor:t.palette.primary.main})}),"SectionItem-root":{},"SectionItem-title":{}}})),E=Object(f.c)({naked:!0}),k=!0;function w(t){var e=t.pageData,n=O();return e?b(y.a.Provider,{value:e},b(p.a,{headerSections:e.header,title:e.title,topSections:e.top,bottomSections:[{title:"",content:[{kind:"partsNavContentToc"}]}].concat(Object(a.a)(e.bottom)),footerSections:e.footer},b(g.a,{sections:[{title:"",content:[{kind:"partsNavBreadcrumbs",lastBreadcrumb:e.title}]}],classes:x({},n)}),b(u.a,{component:"section",className:n.pageMain},b(g.a,{sections:[{title:"",content:[{kind:"partsPageTitle",link:""},{kind:"partsUpdated"}]}],config:E,classes:x({},n)}),b(u.a,{display:"block",component:"article"},b(g.a,{sections:e.sections,config:E,classes:x({},n)}))),b(g.a,{sections:[{title:"",content:[{kind:"partsNavCategory",all:!1,categoryPath:"/posts/category"}]}],classes:x({},n)}),b(d.a,{href:"/posts"},"Back to posts"))):b(s.a,{statusCode:404})}},wyEa:function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/posts/[id]",function(){return n("u7QL")}])}},[["wyEa",0,2,1,3,4]]]);
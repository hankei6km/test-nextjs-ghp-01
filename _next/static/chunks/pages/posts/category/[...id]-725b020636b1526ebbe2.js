_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[12],{"/a9y":function(e,t,n){"use strict";var r=n("lwsE"),a=n("W8MJ"),o=n("7W2i"),i=n("a1gu"),s=n("Nsbk");function c(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=s(e);if(t){var a=s(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return i(this,n)}}var l=n("TqRt");t.__esModule=!0,t.default=void 0;var u=l(n("q1tI")),f=l(n("8Kt/")),p={400:"Bad Request",404:"This page could not be found",405:"Method Not Allowed",500:"Internal Server Error"};function d(e){var t=e.res,n=e.err;return{statusCode:t&&t.statusCode?t.statusCode:n?n.statusCode:404}}var g=function(e){o(n,e);var t=c(n);function n(){return r(this,n),t.apply(this,arguments)}return a(n,[{key:"render",value:function(){var e=this.props.statusCode,t=this.props.title||p[e]||"An unexpected error has occurred";return u.default.createElement("div",{style:h.error},u.default.createElement(f.default,null,u.default.createElement("title",null,e,": ",t)),u.default.createElement("div",null,u.default.createElement("style",{dangerouslySetInnerHTML:{__html:"body { margin: 0 }"}}),e?u.default.createElement("h1",{style:h.h1},e):null,u.default.createElement("div",{style:h.desc},u.default.createElement("h2",{style:h.h2},t,"."))))}}]),n}(u.default.Component);t.default=g,g.displayName="ErrorPage",g.getInitialProps=d,g.origGetInitialProps=d;var h={error:{color:"#000",background:"#fff",fontFamily:'-apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", "Fira Sans", Avenir, "Helvetica Neue", "Lucida Grande", sans-serif',height:"100vh",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},desc:{display:"inline-block",textAlign:"left",lineHeight:"49px",height:"49px",verticalAlign:"middle"},h1:{display:"inline-block",borderRight:"1px solid rgba(0, 0, 0,.3)",margin:0,marginRight:"20px",padding:"10px 23px 10px 0",fontSize:"24px",fontWeight:500,verticalAlign:"top"},h2:{fontSize:"14px",fontWeight:"normal",lineHeight:"inherit",margin:0,padding:0}}},"8YJa":function(e,t,n){"use strict";n.r(t),n.d(t,"__N_SSG",(function(){return P})),n.d(t,"default",(function(){return E}));var r=n("rePB"),a=n("q1tI"),o=n.n(a),i=n("eomm"),s=n.n(i),c=n("R/WZ"),l=n("apO0"),u=n("f4ym"),f=n("hlFM"),p=n("iq4c"),d=n("3LdE"),g=n("sx9v"),h=n("ZQAi"),y=o.a.createElement;function m(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function v(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?m(Object(n),!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):m(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var b=Object(c.a)((function(){return{pageMain:v({},Object(g.b)("& .".concat(d.a.iamgeConfig.contentImageClassName),{maxWidth:"100%",objectFit:"contain"})),"SectionItem-root":{},"SectionItem-title":{width:"100%",display:"flex",justifyContent:"center"}}})),O=["page"],P=!0;function E(e){var t=e.pageData,n=b();return t?y(h.a.Provider,{value:t},y(l.a,{headerSections:t.header,title:t.title,footerSections:t.footer},y(f.a,{my:1},y(p.a,{sections:[{title:"",content:[{kind:"partsNavCategory",all:!0,categoryPath:"/posts/category"},{kind:"partsPageTitle",link:""}]}],classes:v({},n)}),y(p.a,{sections:t.top,classes:v({},n)}),y(f.a,{className:n.pageMain},y(p.a,{sections:t.sections,classes:v({},n)})),y(p.a,{sections:t.bottom,classes:v({},n)}),y(p.a,{sections:[{title:"",content:[{kind:"partsNavPagination",href:"/posts/category/[...id]",baseAs:"/posts/category",pagePath:O,firstPageHref:""}]}],classes:v({},n)})),y(u.a,{href:"/posts"},"Back to posts"))):y(s.a,{statusCode:404})}},ANMQ:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/posts/category/[...id]",function(){return n("8YJa")}])},eomm:function(e,t,n){e.exports=n("/a9y")}},[["ANMQ",0,2,1,3,4]]]);
(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{72:function(e,r,t){"use strict";t.r(r),t.d(r,"frontMatter",(function(){return i})),t.d(r,"metadata",(function(){return a})),t.d(r,"toc",(function(){return s})),t.d(r,"default",(function(){return l}));var n=t(3),o=t(7),c=(t(0),t(88)),i={id:"pusher-service",title:"Pusher Service"},a={unversionedId:"pusher-service",id:"pusher-service",isDocsHomePage:!1,title:"Pusher Service",description:"Using Pusher Service",source:"@site/docs/pusher-service.md",slug:"/pusher-service",permalink:"/docs/pusher-service",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/pusher-service.md",version:"current"},s=[{value:"Using Pusher Service",id:"using-pusher-service",children:[]},{value:"Usage",id:"usage",children:[]}],u={toc:s};function l(e){var r=e.components,t=Object(o.a)(e,["components"]);return Object(c.b)("wrapper",Object(n.a)({},u,t,{components:r,mdxType:"MDXLayout"}),Object(c.b)("h2",{id:"using-pusher-service"},"Using Pusher Service"),Object(c.b)("p",null,"Sometimes you might need to use directly ",Object(c.b)("inlineCode",{parentName:"p"},"PusherService")," when decorators are not\navailable or somehow you need to do something it doesn't offer. For example, if you do use\nnestjs CQRS module only and want to invoke manually, its something that decorators\ncan't handle unless you explicitly return"),Object(c.b)("h2",{id:"usage"},"Usage"),Object(c.b)("p",null,"All you need is to have PusherModule configured globally and then just request on your constructor\nto be injected PusherService"),Object(c.b)("pre",null,Object(c.b)("code",{parentName:"pre",className:"language-typescript"},"import { Injectable } from '@nestjs/common';\nimport { PusherService } from 'nestjs-pusher'\n\n@Injectable()\nexport class CatsService {\n  constructor(private readonly pusherService: PusherService) {\n  }\n}\n\n")))}l.isMDXComponent=!0},88:function(e,r,t){"use strict";t.d(r,"a",(function(){return p})),t.d(r,"b",(function(){return m}));var n=t(0),o=t.n(n);function c(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function i(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function a(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?i(Object(t),!0).forEach((function(r){c(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function s(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},c=Object.keys(e);for(n=0;n<c.length;n++)t=c[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(n=0;n<c.length;n++)t=c[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var u=o.a.createContext({}),l=function(e){var r=o.a.useContext(u),t=r;return e&&(t="function"==typeof e?e(r):a(a({},r),e)),t},p=function(e){var r=l(e.components);return o.a.createElement(u.Provider,{value:r},e.children)},d={inlineCode:"code",wrapper:function(e){var r=e.children;return o.a.createElement(o.a.Fragment,{},r)}},f=o.a.forwardRef((function(e,r){var t=e.components,n=e.mdxType,c=e.originalType,i=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),p=l(t),f=n,m=p["".concat(i,".").concat(f)]||p[f]||d[f]||c;return t?o.a.createElement(m,a(a({ref:r},u),{},{components:t})):o.a.createElement(m,a({ref:r},u))}));function m(e,r){var t=arguments,n=r&&r.mdxType;if("string"==typeof e||n){var c=t.length,i=new Array(c);i[0]=f;var a={};for(var s in r)hasOwnProperty.call(r,s)&&(a[s]=r[s]);a.originalType=e,a.mdxType="string"==typeof e?e:n,i[1]=a;for(var u=2;u<c;u++)i[u]=t[u];return o.a.createElement.apply(null,i)}return o.a.createElement.apply(null,t)}f.displayName="MDXCreateElement"}}]);
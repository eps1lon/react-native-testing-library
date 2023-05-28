"use strict";(self.webpackChunkreact_native_testing_library_website=self.webpackChunkreact_native_testing_library_website||[]).push([[471],{3905:function(t,e,n){n.d(e,{Zo:function(){return c},kt:function(){return y}});var r=n(7294);function i(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function a(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function l(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?a(Object(n),!0).forEach((function(e){i(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function o(t,e){if(null==t)return{};var n,r,i=function(t,e){if(null==t)return{};var n,r,i={},a=Object.keys(t);for(r=0;r<a.length;r++)n=a[r],e.indexOf(n)>=0||(i[n]=t[n]);return i}(t,e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);for(r=0;r<a.length;r++)n=a[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(i[n]=t[n])}return i}var s=r.createContext({}),u=function(t){var e=r.useContext(s),n=e;return t&&(n="function"==typeof t?t(e):l(l({},e),t)),n},c=function(t){var e=u(t.components);return r.createElement(s.Provider,{value:e},t.children)},p="mdxType",b={inlineCode:"code",wrapper:function(t){var e=t.children;return r.createElement(r.Fragment,{},e)}},g=r.forwardRef((function(t,e){var n=t.components,i=t.mdxType,a=t.originalType,s=t.parentName,c=o(t,["components","mdxType","originalType","parentName"]),p=u(n),g=i,y=p["".concat(s,".").concat(g)]||p[g]||b[g]||a;return n?r.createElement(y,l(l({ref:e},c),{},{components:n})):r.createElement(y,l({ref:e},c))}));function y(t,e){var n=arguments,i=e&&e.mdxType;if("string"==typeof t||i){var a=n.length,l=new Array(a);l[0]=g;var o={};for(var s in e)hasOwnProperty.call(e,s)&&(o[s]=e[s]);o.originalType=t,o[p]="string"==typeof t?t:i,l[1]=o;for(var u=2;u<a;u++)l[u]=n[u];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}g.displayName="MDXCreateElement"},5882:function(t,e,n){n.r(e),n.d(e,{assets:function(){return c},contentTitle:function(){return s},default:function(){return y},frontMatter:function(){return o},metadata:function(){return u},toc:function(){return p}});var r=n(7462),i=n(3366),a=(n(7294),n(3905)),l=["components"],o={id:"eslint-plugin-testing-library",title:"ESLint Plugin Testing Library Compatibility"},s=void 0,u={unversionedId:"eslint-plugin-testing-library",id:"eslint-plugin-testing-library",title:"ESLint Plugin Testing Library Compatibility",description:"Most of the rules of the eslint-plugin-testing-library are compatible with this library except the following:",source:"@site/docs/EslintPLluginTestingLibrary.md",sourceDirName:".",slug:"/eslint-plugin-testing-library",permalink:"/react-native-testing-library/docs/eslint-plugin-testing-library",draft:!1,editUrl:"https://github.com/callstack/react-native-testing-library/blob/main/website/docs/EslintPLluginTestingLibrary.md",tags:[],version:"current",frontMatter:{id:"eslint-plugin-testing-library",title:"ESLint Plugin Testing Library Compatibility"},sidebar:"docs",previous:{title:"How Should I Query?",permalink:"/react-native-testing-library/docs/how-should-i-query"},next:{title:"Testing Environment",permalink:"/react-native-testing-library/docs/testing-env"}},c={},p=[],b={toc:p},g="wrapper";function y(t){var e=t.components,n=(0,i.Z)(t,l);return(0,a.kt)(g,(0,r.Z)({},b,n,{components:e,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"Most of the rules of the ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/testing-library/eslint-plugin-testing-library"},"eslint-plugin-testing-library")," are compatible with this library except the following:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/prefer-user-event.md"},"prefer-user-event"),": ",(0,a.kt)("inlineCode",{parentName:"li"},"userEvent")," requires a DOM environment so it is not compatible with this library")),(0,a.kt)("p",null,"Also, some rules have become useless, unless maybe you're using an old version of the library:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("a",{parentName:"p",href:"https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/prefer-wait-for.md"},"prefer-wait-for"),": the wait utility is no longer available")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("a",{parentName:"p",href:"https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-wait-for-empty-callback.md"},"no-wait-for-empty-callback"),": waitFor callback param is no longer optional"))),(0,a.kt)("p",null,"To get the rule ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/consistent-data-testid.md"},"consistent-data-testid")," to work, you need to configure it to check the testID attribute by adding the following in your eslint config file, the ",(0,a.kt)("inlineCode",{parentName:"p"},"testIdPattern")," being whichever pattern you want to enforce:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},'{\n  "testing-library/consistent-data-testid": [\n    2,\n    {\n      "testIdAttribute": ["testID"],\n      "testIdPattern": "^TestId(__[A-Z]*)?$"\n    }\n  ]\n}\n')))}y.isMDXComponent=!0}}]);
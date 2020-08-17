(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{67:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return s})),n.d(t,"metadata",(function(){return o})),n.d(t,"rightToc",(function(){return c})),n.d(t,"default",(function(){return b}));var a=n(1),i=n(6),r=(n(0),n(80)),s={id:"getting-started",title:"Getting Started"},o={unversionedId:"getting-started",id:"getting-started",isDocsHomePage:!1,title:"Getting Started",description:"The problem",source:"@site/docs/GettingStarted.md",permalink:"/react-native-testing-library/docs/getting-started",editUrl:"https://github.com/callstack/react-native-testing-library/blob/master/docs/GettingStarted.md",sidebar:"docs",next:{title:"API",permalink:"/react-native-testing-library/docs/api"}},c=[{value:"The problem",id:"the-problem",children:[]},{value:"This solution",id:"this-solution",children:[]},{value:"Installation",id:"installation",children:[{value:"Additional Jest matchers",id:"additional-jest-matchers",children:[]},{value:"Flow",id:"flow",children:[]}]},{value:"Example",id:"example",children:[]}],l={rightToc:c};function b(e){var t=e.components,n=Object(i.a)(e,["components"]);return Object(r.b)("wrapper",Object(a.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(r.b)("h2",{id:"the-problem"},"The problem"),Object(r.b)("p",null,"You want to write maintainable tests for your React Native components. As a part of this goal, you want your tests to avoid including implementation details of your components and rather focus on making your tests give you the confidence for which they are intended. As part of this, you want your testbase to be maintainable in the long run so refactors of your components (changes to implementation but not functionality) don't break your tests and slow you and your team down."),Object(r.b)("h2",{id:"this-solution"},"This solution"),Object(r.b)("p",null,"The React Native Testing Library (RNTL) is a lightweight solution for testing React Native components. It provides light utility functions on top of ",Object(r.b)("inlineCode",{parentName:"p"},"react-test-renderer"),", in a way that encourages better testing practices. Its primary guiding principle is:"),Object(r.b)("blockquote",null,Object(r.b)("p",{parentName:"blockquote"},"The more your tests resemble the way your software is used, the more confidence they can give you.")),Object(r.b)("p",null,"This project is inspired by ",Object(r.b)("a",Object(a.a)({parentName:"p"},{href:"https://github.com/testing-library/react-testing-library"}),"React Testing Library"),". Tested to work with Jest, but it should work with other test runners as well."),Object(r.b)("p",null,"You can find the source of ",Object(r.b)("inlineCode",{parentName:"p"},"QuestionsBoard")," component and this example ",Object(r.b)("a",Object(a.a)({parentName:"p"},{href:"https://github.com/callstack/react-native-testing-library/blob/master/src/__tests__/questionsBoard.test.js"}),"here"),"."),Object(r.b)("h2",{id:"installation"},"Installation"),Object(r.b)("p",null,"Open a Terminal in your project's folder and run:"),Object(r.b)("h4",{id:"using-yarn"},"Using ",Object(r.b)("inlineCode",{parentName:"h4"},"yarn")),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-sh"}),"yarn add --dev @testing-library/react-native\n")),Object(r.b)("h4",{id:"using-npm"},"Using ",Object(r.b)("inlineCode",{parentName:"h4"},"npm")),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-sh"}),"npm install --save-dev @testing-library/react-native\n")),Object(r.b)("p",null,"This library has a peerDependencies listing for ",Object(r.b)("inlineCode",{parentName:"p"},"react-test-renderer")," and, of course, ",Object(r.b)("inlineCode",{parentName:"p"},"react"),". Make sure to install them too!"),Object(r.b)("div",{className:"admonition admonition-info alert alert--info"},Object(r.b)("div",Object(a.a)({parentName:"div"},{className:"admonition-heading"}),Object(r.b)("h5",{parentName:"div"},Object(r.b)("span",Object(a.a)({parentName:"h5"},{className:"admonition-icon"}),Object(r.b)("svg",Object(a.a)({parentName:"span"},{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"}),Object(r.b)("path",Object(a.a)({parentName:"svg"},{fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"})))),"info")),Object(r.b)("div",Object(a.a)({parentName:"div"},{className:"admonition-content"}),Object(r.b)("p",{parentName:"div"},"In order to properly use helpers for async tests (",Object(r.b)("inlineCode",{parentName:"p"},"findBy")," queries and ",Object(r.b)("inlineCode",{parentName:"p"},"waitFor"),") you need at least React >=16.9.0 (featuring async ",Object(r.b)("inlineCode",{parentName:"p"},"act"),") or React Native >=0.60 (which comes with React >=16.9.0)."))),Object(r.b)("h3",{id:"additional-jest-matchers"},"Additional Jest matchers"),Object(r.b)("p",null,"In order to use addtional React Native-specific jest matchers from ",Object(r.b)("a",Object(a.a)({parentName:"p"},{href:"https://github.com/testing-library/jest-native"}),"@testing-library/jest-native")," package add it to your project:"),Object(r.b)("h4",{id:"using-yarn-1"},"Using ",Object(r.b)("inlineCode",{parentName:"h4"},"yarn")),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-sh"}),"yarn add --dev @testing-library/jest-native\n")),Object(r.b)("h4",{id:"using-npm-1"},"Using ",Object(r.b)("inlineCode",{parentName:"h4"},"npm")),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-sh"}),"npm install --save-dev @testing-library/jest-native\n")),Object(r.b)("p",null,"Then automatically add it to your jest tests by using ",Object(r.b)("inlineCode",{parentName:"p"},"setupFilesAfterEnv")," option in your Jest configuration (it's usually located either in ",Object(r.b)("inlineCode",{parentName:"p"},"package.json")," under ",Object(r.b)("inlineCode",{parentName:"p"},'"jest"')," key or in a ",Object(r.b)("inlineCode",{parentName:"p"},"jest.config.js")," file):"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-json"}),'{\n  "preset": "react-native",\n  "setupFilesAfterEnv": ["@testing-library/jest-native/extend-expect"]\n}\n')),Object(r.b)("h3",{id:"flow"},"Flow"),Object(r.b)("p",null,"Note for ",Object(r.b)("a",Object(a.a)({parentName:"p"},{href:"https://flow.org"}),"Flow")," users \u2013 you'll also need to install typings for ",Object(r.b)("inlineCode",{parentName:"p"},"react-test-renderer"),":"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-sh"}),"flow-typed install react-test-renderer\n")),Object(r.b)("h2",{id:"example"},"Example"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-jsx"}),"import { render, fireEvent } from '@testing-library/react-native';\nimport { QuestionsBoard } from '../QuestionsBoard';\n\ntest('form submits two answers', () => {\n  const allQuestions = ['q1', 'q2'];\n  const mockFn = jest.fn();\n\n  const { getAllByA11yLabel, getByText } = render(\n    <QuestionsBoard questions={allQuestions} onSubmit={mockFn} />\n  );\n\n  const answerInputs = getAllByA11yLabel('answer input');\n\n  fireEvent.changeText(answerInputs[0], 'a1');\n  fireEvent.changeText(answerInputs[1], 'a2');\n  fireEvent.press(getByText('Submit'));\n\n  expect(mockFn).toBeCalledWith({\n    '1': { q: 'q1', a: 'a1' },\n    '2': { q: 'q2', a: 'a2' },\n  });\n});\n")),Object(r.b)("p",null,"You can find the source of ",Object(r.b)("inlineCode",{parentName:"p"},"QuestionsBoard")," component and this example ",Object(r.b)("a",Object(a.a)({parentName:"p"},{href:"https://github.com/callstack/react-native-testing-library/blob/master/src/__tests__/questionsBoard.test.js"}),"here"),"."))}b.isMDXComponent=!0}}]);
(()=>{(self.webpackChunkapp=self.webpackChunkapp||[]).push([[1461],{12202:o=>{const c=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],l=["true","false","null","undefined","NaN","Infinity"],d=["Intl","DataView","Number","Math","Date","String","RegExp","Object","Function","Boolean","Error","Symbol","Set","Map","WeakSet","WeakMap","Proxy","Reflect","JSON","Promise","Float64Array","Int16Array","Int32Array","Int8Array","Uint16Array","Uint32Array","Float32Array","Array","Uint8Array","Uint8ClampedArray","ArrayBuffer","BigInt64Array","BigUint64Array","BigInt"],u=["EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],E=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],S=["arguments","this","super","console","window","document","localStorage","module","global"],g=[].concat(E,S,d,u);function _(e){const A=["npm","print"],b=["yes","no","on","off","it","that","void"],I=["then","unless","until","loop","of","by","when","and","or","is","isnt","not","it","that","otherwise","from","to","til","fallthrough","case","enum","native","list","map","__hasProp","__extends","__slice","__bind","__indexOf"],t={keyword:c.concat(I),literal:l.concat(b),built_in:g.concat(A)},n="[A-Za-z$_](?:-[0-9A-Za-z$_]|[0-9A-Za-z$_])*",r=e.inherit(e.TITLE_MODE,{begin:n}),a={className:"subst",begin:/#\{/,end:/\}/,keywords:t},i={className:"subst",begin:/#[A-Za-z$_]/,end:/(?:-[0-9A-Za-z$_]|[0-9A-Za-z$_])*/,keywords:t},s=[e.BINARY_NUMBER_MODE,{className:"number",begin:"(\\b0[xX][a-fA-F0-9_]+)|(\\b\\d(\\d|_\\d)*(\\.(\\d(\\d|_\\d)*)?)?(_*[eE]([-+]\\d(_\\d|\\d)*)?)?[_a-z]*)",relevance:0,starts:{end:"(\\s*/)?",relevance:0}},{className:"string",variants:[{begin:/'''/,end:/'''/,contains:[e.BACKSLASH_ESCAPE]},{begin:/'/,end:/'/,contains:[e.BACKSLASH_ESCAPE]},{begin:/"""/,end:/"""/,contains:[e.BACKSLASH_ESCAPE,a,i]},{begin:/"/,end:/"/,contains:[e.BACKSLASH_ESCAPE,a,i]},{begin:/\\/,end:/(\s|$)/,excludeEnd:!0}]},{className:"regexp",variants:[{begin:"//",end:"//[gim]*",contains:[a,e.HASH_COMMENT_MODE]},{begin:/\/(?![ *])(\\.|[^\\\n])*?\/[gim]*(?=\W)/}]},{begin:"@"+n},{begin:"``",end:"``",excludeBegin:!0,excludeEnd:!0,subLanguage:"javascript"}];a.contains=s;const p={className:"params",begin:"\\(",returnBegin:!0,contains:[{begin:/\(/,end:/\)/,keywords:t,contains:["self"].concat(s)}]},y={begin:"(#=>|=>|\\|>>|-?->|!->)"};return{name:"LiveScript",aliases:["ls"],keywords:t,illegal:/\/\*/,contains:s.concat([e.COMMENT("\\/\\*","\\*\\/"),e.HASH_COMMENT_MODE,y,{className:"function",contains:[r,p],returnBegin:!0,variants:[{begin:"("+n+"\\s*(?:=|:=)\\s*)?(\\(.*\\)\\s*)?\\B->\\*?",end:"->\\*?"},{begin:"("+n+"\\s*(?:=|:=)\\s*)?!?(\\(.*\\)\\s*)?\\B[-~]{1,2}>\\*?",end:"[-~]{1,2}>\\*?"},{begin:"("+n+"\\s*(?:=|:=)\\s*)?(\\(.*\\)\\s*)?\\B!?[-~]{1,2}>\\*?",end:"!?[-~]{1,2}>\\*?"}]},{className:"class",beginKeywords:"class",end:"$",illegal:/[:="\[\]]/,contains:[{beginKeywords:"extends",endsWithParent:!0,illegal:/[:="\[\]]/,contains:[r]},r]},{begin:n+":",end:":",returnBegin:!0,returnEnd:!0,relevance:0}])}}o.exports=_}}]);})();

//# sourceMappingURL=react-syntax-highlighter_languages_highlight_livescript.7442137e.chunk.js.map
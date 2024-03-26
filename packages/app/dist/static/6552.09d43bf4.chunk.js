"use strict";(()=>{(self.webpackChunkapp=self.webpackChunkapp||[]).push([[6552],{20767:(te,D,e)=>{e.d(D,{L:()=>N});var o=e(58837),h=e(77125),M=e(72501),u=e(5893),z=e(24709),H=e(44913),r=e(14041),F=e(23127),X=e(23180);const Y=(0,o.A)({svgIcon:{display:"inline-block","& svg":{display:"inline-block",fontSize:"inherit",verticalAlign:"baseline"}}});function B(s){const{href:i,text:c,Icon:A}=s,v=Y();return r.createElement(h.A,{display:"flex"},r.createElement(h.A,{mr:1,className:v.svgIcon},r.createElement(M.A,{component:"div"},A?r.createElement(A,null):r.createElement(F.A,null))),r.createElement(h.A,{flexGrow:"1"},r.createElement(X.N_,{to:i,target:"_blank",rel:"noopener"},c||i)))}const t={xs:1,sm:1,md:1,lg:2,xl:3};function Q(s){var i,c;const A=[(0,u.A)(a=>a.breakpoints.up("xl"))?"xl":null,(0,u.A)(a=>a.breakpoints.up("lg"))?"lg":null,(0,u.A)(a=>a.breakpoints.up("md"))?"md":null,(0,u.A)(a=>a.breakpoints.up("sm"))?"sm":null,(0,u.A)(a=>a.breakpoints.up("xs"))?"xs":null];let v=1;if(typeof s=="number")v=s;else{const a=(i=A.find(K=>K!==null))!=null?i:"xs";v=(c=s==null?void 0:s[a])!=null?c:t[a]}return v}function N(s){const{items:i,cols:c=void 0}=s,A=Q(c);return r.createElement(z.A,{rowHeight:"auto",cols:A},i.map(({text:v,href:a,Icon:K},Z)=>r.createElement(H.A,{key:Z},r.createElement(B,{href:a,text:v!=null?v:a,Icon:K}))))}},66552:(te,D,e)=>{e.r(D),e.d(D,{AboutCard:()=>ue,AboutContent:()=>ne,AboutField:()=>f});var o=e(29835),h=e(58837),M=e(72501),u=e(42899),z=e(67720),H=e(40703),r=e(45685),F=e(29365),X=e(37197),Y=e(48653),B=e(23180),t=e(14041),Q=e(33478),N=e(11638),s=e(48821),i=e(58054),c=e(92651),A=e(41241),v=e(20767),a=e(74011),K=e(25534),Z=e(4832),le=e(75625),ae=e(10015),oe=e(90749),se=e(99993);const ie=(0,h.A)(m=>({value:{fontWeight:"bold",overflow:"hidden",lineHeight:"24px",wordBreak:"break-word"},label:{color:m.palette.text.secondary,textTransform:"uppercase",fontSize:"10px",fontWeight:"bold",letterSpacing:.5,overflow:"hidden",whiteSpace:"nowrap"}}));function f(m){const{label:g,value:d,gridSizes:E,children:I}=m,L=ie(),S=(0,N.OJ)(I,C=>C.getElements()),O=S.length>0?S:t.createElement(M.A,{variant:"body2",className:L.value},d||"unknown");return t.createElement(u.A,{item:!0,...E},t.createElement(M.A,{variant:"h2",className:L.label},g),O)}const ce=(0,h.A)({description:{wordBreak:"break-word"}});function re(m,g,d){if(g==="url"||m.includes("://"))return m;const E=d.type==="file"?`file://${d.target}`:d.target;return g==="file"||d.type==="file"?new URL(m,E).href:E}function ne(m){var g,d,E,I,L,S,O,C;const{entity:n}=m,U=ce(),l=n.kind.toLocaleLowerCase("en-US")==="system",$=n.kind.toLocaleLowerCase("en-US")==="resource",T=n.kind.toLocaleLowerCase("en-US")==="component",b=n.kind.toLocaleLowerCase("en-US")==="api",V=n.kind.toLocaleLowerCase("en-US")==="template",R=n.kind.toLocaleLowerCase("en-US")==="location",W=n.kind.toLocaleLowerCase("en-US")==="group",k=(0,i.g)(n,o.jn,{kind:"system"}),x=(0,i.g)(n,o.jn,{kind:"component"}),P=(0,i.g)(n,o.jn,{kind:"domain"}),y=(0,i.g)(n,o.vv);let G;try{G=(0,o.Cr)(n)}catch{G=void 0}return t.createElement(u.A,{container:!0},t.createElement(f,{label:"Description",gridSizes:{xs:12}},t.createElement(B.h2,{className:U.description,content:((g=n==null?void 0:n.metadata)==null?void 0:g.description)||"No description"})),t.createElement(f,{label:"Owner",value:"No Owner",gridSizes:{xs:12,sm:6,lg:4}},y.length>0&&t.createElement(c.iI,{entityRefs:y,defaultKind:"group"})),(l||P.length>0)&&t.createElement(f,{label:"Domain",value:"No Domain",gridSizes:{xs:12,sm:6,lg:4}},P.length>0&&t.createElement(c.iI,{entityRefs:P,defaultKind:"domain"})),(b||T||$||k.length>0)&&t.createElement(f,{label:"System",value:"No System",gridSizes:{xs:12,sm:6,lg:4}},k.length>0&&t.createElement(c.iI,{entityRefs:k,defaultKind:"system"})),T&&x.length>0&&t.createElement(f,{label:"Parent Component",value:"No Parent Component",gridSizes:{xs:12,sm:6,lg:4}},t.createElement(c.iI,{entityRefs:x,defaultKind:"component"})),(b||T||$||V||W||R||typeof((d=n==null?void 0:n.spec)==null?void 0:d.type)=="string")&&t.createElement(f,{label:"Type",value:(E=n==null?void 0:n.spec)==null?void 0:E.type,gridSizes:{xs:12,sm:6,lg:4}}),(b||T||typeof((I=n==null?void 0:n.spec)==null?void 0:I.lifecycle)=="string")&&t.createElement(f,{label:"Lifecycle",value:(L=n==null?void 0:n.spec)==null?void 0:L.lifecycle,gridSizes:{xs:12,sm:6,lg:4}}),t.createElement(f,{label:"Tags",value:"No Tags",gridSizes:{xs:12,sm:6,lg:4}},(((S=n==null?void 0:n.metadata)==null?void 0:S.tags)||[]).map(p=>t.createElement(z.A,{key:p,size:"small",label:p}))),R&&(((O=n==null?void 0:n.spec)==null?void 0:O.targets)||((C=n==null?void 0:n.spec)==null?void 0:C.target))&&t.createElement(f,{label:"Targets",gridSizes:{xs:12}},t.createElement(v.L,{cols:1,items:(n.spec.targets||[n.spec.target]).map(p=>p).map(p=>{var j;return{text:p,href:re(p,((j=n==null?void 0:n.spec)==null?void 0:j.type)||"unknown",G)}})})))}const de="backstage.io/techdocs-ref",w="backstage.io/techdocs-entity",me=(0,h.A)({gridItemCard:{display:"flex",flexDirection:"column",height:"calc(100% - 10px)",marginBottom:"10px"},fullHeightCard:{display:"flex",flexDirection:"column",height:"100%"},gridItemCardContent:{flex:1},fullHeightCardContent:{flex:1}});function ue(m){var g,d,E,I,L,S,O;const{variant:C}=m,n=(0,N.nm)(),U=me(),{entity:l}=(0,i.u)(),$=(0,s.u)(Q.YT),T=(0,s.u)(c.vp),b=(0,s.u)(s.l),V=(0,s.u)(s.r),R=(0,N.Sf)(A.v),W=(0,N.Sf)(A.b),{allowed:k}=(0,oe.Az)(se.tS),x=(0,c.Cr)(l,$),P=(g=l.metadata.annotations)==null?void 0:g[o.P];let y;if((d=l.metadata.annotations)!=null&&d[w])try{y=(0,o.KU)((E=l.metadata.annotations)==null?void 0:E[w])}catch{y=void 0}const G={label:"View Source",disabled:!x,icon:t.createElement(Q.L7,{type:x==null?void 0:x.integrationType}),href:x==null?void 0:x.locationTargetUrl},p={label:"View TechDocs",disabled:!((I=l.metadata.annotations)!=null&&I[de]||(L=l.metadata.annotations)!=null&&L[w])||!R,icon:t.createElement(Z.A,null),href:R&&R(y?{namespace:y.namespace||o.oQ,kind:y.kind,name:y.name}:{namespace:l.metadata.namespace||o.oQ,kind:l.kind,name:l.metadata.name})},j=[G,p];if((0,ae.c)(l)){const ee=(S=n.getSystemIcon("scaffolder"))!=null?S:K.A,ge={label:"Launch Template",icon:t.createElement(ee,null),disabled:!W,href:W&&W({templateName:l.metadata.name,namespace:l.metadata.namespace||o.oQ})};j.push(ge)}let q="";C==="gridItem"?q=U.gridItemCard:C==="fullHeight"&&(q=U.fullHeightCard);let _="";C==="gridItem"?_=U.gridItemCardContent:C==="fullHeight"&&(_=U.fullHeightCardContent);const J=(O=l.metadata.annotations)==null?void 0:O[o.Eo],ve=(J==null?void 0:J.startsWith("url:"))||(J==null?void 0:J.startsWith("file:")),fe=(0,t.useCallback)(async()=>{try{await T.refreshEntity((0,o.U2)(l)),b.post({message:"Refresh scheduled",severity:"info",display:"transient"})}catch(ee){V.post(ee)}},[T,b,V,l]);return t.createElement(H.A,{className:q},t.createElement(r.A,{title:"About",action:t.createElement(t.Fragment,null,ve&&k&&t.createElement(F.A,{"aria-label":"Refresh",title:"Schedule entity refresh",onClick:fe},t.createElement(a.A,null)),t.createElement(F.A,{component:B.N_,"aria-label":"Edit",disabled:!P,title:"Edit Metadata",to:P!=null?P:"#"},t.createElement(le.A,null))),subheader:t.createElement(B.Pu,{links:j})}),t.createElement(X.A,null),t.createElement(Y.A,{className:_},t.createElement(ne,{entity:l})))}var Ee=e(25033),pe=e(96403),he=e(45250)},74011:(te,D,e)=>{var o,h=e(4293),M=e(78920);o={value:!0},D.A=void 0;var u=M(e(14041)),z=h(e(74044)),H=(0,z.default)(u.createElement("path",{d:"M19 8l-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z"}),"Cached");D.A=H}}]);})();

//# sourceMappingURL=6552.09d43bf4.chunk.js.map
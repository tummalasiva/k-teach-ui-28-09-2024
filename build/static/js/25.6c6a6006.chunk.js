"use strict";(self.webpackChunkschoolerp=self.webpackChunkschoolerp||[]).push([[25],{8244:(e,o,i)=>{i.r(o),i.d(o,{default:()=>P});var t=i(65043),s=i(71198),r=i(73216),l=i(92382),n=i(34535),a=i(85865),d=i(96446),c=i(88911),p=i(42518),x=i(12110),g=i(36591),h=i(26494),m=i(59371),w=i(14275),f=i(70579);const b=(0,n.Ay)(a.A)((()=>({display:"-webkit-box",overflow:"hidden",WebkitBoxOrient:"vertical",WebkitLineClamp:1,fontWeight:600,color:w.A.darkPalette.primary.main,fontSize:"18px"}))),u=(0,n.Ay)(a.A)((()=>({display:"-webkit-box",overflow:"hidden",WebkitBoxOrient:"vertical",WebkitLineClamp:2}))),S=e=>{var o;let{data:i,setModalOpen:t}=e,s=(0,r.Zp)();return(0,f.jsx)(f.Fragment,{children:(0,f.jsxs)(d.A,{children:[(0,f.jsx)(c.A,{direction:"row",sx:{zIndex:50,position:"relative",bottom:"-20px",left:"10px",gap:"10px"},children:i.role2&&(0,f.jsx)(p.A,{variant:"contained",size:"small",onClick:()=>(e=>{s(e)})(i.path2),sx:{bgcolor:"#1779f7",color:"white",border:"solid #1779f7","&:hover":{color:"white",bgcolor:"#ff4500",border:"solid #ff4500"}},children:i.role2})}),(0,f.jsxs)(x.A,{children:[(0,f.jsx)(l.A,{lazyLoad:"progressive",dots:!0,sx:{backgroundColor:"black"},...m.tY,children:null===(o=i.images)||void 0===o?void 0:o.map(((e,o)=>(0,f.jsx)(g.A,{component:"img",image:e,alt:"loading...",height:"260",onClick:()=>t({open:!0,imageData:i.images,viewSingleImg:e})},o)))}),(0,f.jsxs)(h.A,{sx:{mt:1,height:"80px"},children:[(0,f.jsx)(b,{gutterBottom:!0,variant:"h5",component:"div",children:i.title}),(0,f.jsx)(u,{variant:"body2",color:"text.secondary",children:i.note||"Added new images"})]})]})]})})};var A=i(17392),k=i(73368),v=i(12220),y=i(74802),j=(i(39525),i(93886),i(11224),i(81728)),T=i(13059),C=i(87715);const z=(0,n.Ay)(a.A)((e=>{let{theme:o}=e;return{textAlign:"center",marginTop:"25px",fontSize:"40px",color:w.A.darkPalette.primary.main,fontWeight:"bold",textShadow:"10px 8px 8px #969c96",[o.breakpoints.down("sm")]:{textAlign:"center",margin:0,padding:"0"}}})),I=(0,n.Ay)(d.A)((e=>{let{theme:o}=e;return{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:650,height:"auto",background:"#fff",borderRadius:"5px",boxShadow:24,p:4}})),W=(0,n.Ay)(d.A)((e=>{let{theme:o}=e;return{display:"grid",paddingBottom:"30px",gridTemplateColumns:"300px 300px 300px 300px",justifyContent:"space-evenly",gap:"15px",[o.breakpoints.down(1e3)]:{gridTemplateColumns:"300px 300px  "},[o.breakpoints.down(660)]:{gridTemplateColumns:"400px   "},[o.breakpoints.down(400)]:{gridTemplateColumns:"300px   "}}})),D=(0,n.Ay)(a.A)((e=>{let{theme:o}=e;return{marginTop:"2rem",textAlign:"center",color:w.A.darkPalette.primary.main,fontSize:"1rem",fontFamily:"sans-serif",fontWeight:"bold",paddingTop:"20px"}})),H=(0,n.Ay)(d.A)((e=>{let{theme:o}=e;return{display:"flex",gap:"10px",flexWrap:"wrap",justifyContent:"center",padding:"15px 0px"}})),L=(0,n.Ay)(a.A)((e=>{let{theme:o}=e;return{textAlign:"center",fontWeight:"bold",fontSize:"18px",borderLeft:"3px solid ".concat(w.A.darkPalette.primary.main),paddingLeft:"0.5rem"}})),O=(0,n.Ay)(d.A)((e=>{let{}=e;return{background:"#fff",borderRadius:"8px"}}));function P(e){var o,i,r;let{show:n}=e;const{selectedSetting:a}=(0,t.useContext)(j.A),[d,c]=(0,t.useState)([]),[p,x]=t.useState({open:!1,imageData:[],viewSingleImg:{}}),h=null===p||void 0===p||null===(o=p.imageData)||void 0===o?void 0:o.findIndex((e=>e._id===p.viewSingleImg._id)),m=[...null===p||void 0===p||null===(i=p.imageData)||void 0===i?void 0:i.slice(0,h),...null===p||void 0===p||null===(r=p.imageData)||void 0===r?void 0:r.slice(h+1)];return(0,t.useEffect)((()=>{(async()=>{try{const{data:e}=await(0,C.Jt)(T.r.gallery.listPublic,{params:{schoolId:a._id}});c(e.result),console.log(e.result,"ggggfgffgffff")}catch(e){console.log(e)}})()}),[a]),(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(s.A,{show:n,title:"Gallery",leftSideHeader:"Home",rightSideHeader:"Gallery"}),(0,f.jsxs)(O,{children:[(0,f.jsx)(D,{children:"DISCOVER NEW"}),(0,f.jsx)(z,{children:"Our Gallery"}),(0,f.jsx)(H,{children:(0,f.jsx)(L,{children:"ALL"})}),(0,f.jsx)(W,{children:d.map(((e,o)=>(0,f.jsx)(t.Fragment,{children:(0,f.jsx)(S,{data:e,setModalOpen:x})},o)))})]}),(0,f.jsx)(k.A,{"aria-labelledby":"transition-modal-title","aria-describedby":"transition-modal-description",open:p.open,onClose:()=>x({open:!1,imageData:[],viewSingleImg:{}}),closeAfterTransition:!0,slots:{backdrop:v.A},slotProps:{backdrop:{timeout:500}},children:(0,f.jsxs)(I,{children:[(0,f.jsx)(A.A,{"aria-label":"close",onClick:()=>x({open:!1,imageData:[],viewSingleImg:{}}),sx:{position:"absolute",right:8,top:8,zIndex:9},children:(0,f.jsx)(y.A,{})}),(0,f.jsx)(l.A,{children:null===m||void 0===m?void 0:m.map(((e,o)=>(0,f.jsx)(g.A,{component:"img",image:e,alt:"loading...",height:"460",sx:{borderRadius:"5px",objectFit:"contain",px:"15px"},loading:!0},o)))})]})})]})}},71198:(e,o,i)=>{i.d(o,{A:()=>p});var t=i(34535),s=i(96446),r=i(85865);i(65043);const l=i.p+"static/media/HeaderImage.032f52496a04e01f804a.png";var n=i(35475),a=i(70579);const d=(0,t.Ay)(s.A)((e=>{let{theme:o}=e;return{color:"white",padding:"80px",backgroundImage:"linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.1)),url(".concat(l,")"),backgroundSize:"cover",backgroundPosition:"center",backgroundRepeat:"no-repeat",textAlign:"center",[o.breakpoints.down("sm")]:{padding:"15px"}}})),c=(0,t.Ay)(r.A)((e=>{let{theme:o}=e;return{fontSize:"40px",color:"#fff",[o.breakpoints.down("md")]:{fontSize:"30px"},[o.breakpoints.down("sm")]:{fontSize:"25px"}}}));function p(e){let{title:o="",leftSideHeader:i="",rightSideHeader:t="",show:s=!0}=e;return(0,a.jsx)(a.Fragment,{children:s&&(0,a.jsxs)(d,{variant:"h4",align:"center",children:[(0,a.jsx)(c,{children:o.toUpperCase()}),(0,a.jsxs)(r.A,{sx:{color:"white"},children:[(0,a.jsx)(n.N_,{to:"/",style:{textDecoration:"none",color:"white"},children:i.toUpperCase()}),"\xa0 / ",t.toUpperCase()]})]})})}},59371:(e,o,i)=>{i.d(o,{Rx:()=>d,W0:()=>a,tY:()=>c});i(65043);var t=i(56658),s=i(44448),r=i(70579);function l(e){const{className:o,style:i,onClick:s}=e;return(0,r.jsx)("div",{style:{...i,display:"block"},onClick:s,children:(0,r.jsx)(t.A,{size:"3x",className:"slick-arrow-icon-right"})})}function n(e){const{className:o,style:i,onClick:t}=e;return(0,r.jsx)("div",{style:{...i,display:"block"},onClick:t,children:(0,r.jsx)(s.A,{size:"3x",style:{},className:"slick-arrow-icon-left"})})}const a={infinite:!0,speed:500,slidesToShow:1,slidesToScroll:1,initialSlide:0,autoplay:!1,arrows:!0,nextArrow:(0,r.jsx)(l,{}),prevArrow:(0,r.jsx)(n,{}),responsive:[{breakpoint:1536,settings:{slidesToShow:1,slidesToScroll:1,arrows:!0}},{breakpoint:1280,settings:{slidesToShow:1,slidesToScroll:1,arrows:!0}},{breakpoint:900,settings:{slidesToShow:1,slidesToScroll:1,arrows:!0}},{breakpoint:600,settings:{slidesToShow:1,slidesToScroll:1,arrows:!0}},{breakpoint:300,settings:{slidesToShow:1,slidesToScroll:1,arrows:!0}}]},d=e=>({infinite:!0,slidesToShow:e>=4?3:e,speed:900,autoplaySpeed:3e3,slidesToScroll:1,initialSlide:0,autoplay:!0,pauseOnHover:!0,arrows:!0,nextArrow:(0,r.jsx)(l,{}),prevArrow:(0,r.jsx)(n,{}),responsive:[{breakpoint:1536,settings:{slidesToShow:e>=4?3:e,slidesToScroll:2,arrows:!0}},{breakpoint:1280,settings:{slidesToShow:e>=3?3:e,slidesToScroll:1,arrows:!0}},{breakpoint:1034,settings:{slidesToShow:2,slidesToScroll:1,arrows:!0}},{breakpoint:900,settings:{slidesToShow:2,slidesToScroll:1,arrows:!0}},{breakpoint:768,settings:{slidesToShow:1,slidesToScroll:1,arrows:!1}},{breakpoint:300,settings:{slidesToShow:1,slidesToScroll:1,arrows:!1}}]}),c={infinite:!0,speed:500,slidesToShow:1,slidesToScroll:1,initialSlide:0,dots:!1,autoplay:!0,autoplaySpeed:1500,arrows:!0,nextArrow:(0,r.jsx)(l,{}),prevArrow:(0,r.jsx)(n,{}),responsive:[{breakpoint:1024,settings:{slidesToShow:1,slidesToScroll:1,infinite:!0}},{breakpoint:600,settings:{slidesToShow:1,infinite:!0,slidesToScroll:1}},{breakpoint:480,width:200,settings:{slidesToShow:1,infinite:!0,slidesToScroll:1}},{breakpoint:300,width:200,settings:{slidesToShow:1,slidesToScroll:1}}]}},11224:(e,o,i)=>{e.exports=i.p+"static/media/school-green.0eec40fdd8ddc7a4b6b3.avif"},93886:(e,o,i)=>{e.exports=i.p+"static/media/school-white.2c059264352996103c3a.avif"},39525:(e,o,i)=>{e.exports=i.p+"static/media/school1.3be81131cc6f40e9c5d0.avif"}}]);
//# sourceMappingURL=25.6c6a6006.chunk.js.map
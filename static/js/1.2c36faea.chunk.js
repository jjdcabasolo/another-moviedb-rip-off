(window["webpackJsonpanother-moviedb-rip-off"]=window["webpackJsonpanother-moviedb-rip-off"]||[]).push([[1],{343:function(e,t,a){"use strict";a.r(t);var n=a(27),c=a(9),r=a(0),i=a.n(r),l=a(331),o=a.n(l),m=a(6),s=a(43),u=a(83),b=a(26),p=a(257),g=a(341),v=a(101),d=a(59),f=a(49),E=a(60),h=a.n(E),j=a(38),O=a(315),w=Object(u.a)((function(e){return{note:{padding:e.spacing(8,2)},title:{fontWeight:600},chipContainer:{margin:e.spacing(1,0)},chip:{margin:e.spacing(.25,.5,.25,0)},description:{marginTop:e.spacing(2)}}})),y=function(){var e=w(),t=Object(b.a)(),a=Object(p.a)(t.breakpoints.only("xs")),n=Object(m.c)((function(e){return e.movies.movie})),c=n.runtime,r=n.title,l=n.status,o=n.release_date,s=n.genres,u=n.overview,g=n.original_title,d=c,f=~~(c/60),E=c%60;return i.a.createElement(v.a,{item:!0,xs:12,container:!0,spacing:1},i.a.createElement(v.a,{item:!0,xs:12},i.a.createElement(j.a,{variant:a?"h4":"h2",className:e.title},r||g)),i.a.createElement(v.a,{item:!0,xs:12,container:!0,alignItems:"center"},"Released"===l&&i.a.createElement(v.a,{item:!0},i.a.createElement(O.a,{label:"Released",variant:"outlined",size:a?"small":"medium"}),"\xa0"),i.a.createElement(v.a,{item:!0},i.a.createElement(j.a,{variant:a?"body1":"h5"},"\xb7\xa0",h()(o).format("YYYY"),"\xa0 \xb7\xa0",d?"".concat(f,"hr ").concat(E,"min"):"No runtime yet."))),s.length>0&&i.a.createElement(v.a,{item:!0,xs:12},s.map((function(t){return i.a.createElement(O.a,{label:t.name,className:e.chip,size:a?"small":"medium"})}))),i.a.createElement(v.a,{item:!0,xs:12,className:e.description},i.a.createElement(j.a,{variant:"body1"},u)))},k=a(301),x=a(344),N=a(338),_=a(14),z=Object(u.a)((function(e){return{subtitle:{fontWeight:"400"},title:{fontWeight:e.typography.fontWeightMedium},avatar:{width:e.spacing(12),height:e.spacing(12)},text:{marginTop:e.spacing(1)}}})),S=function(e){var t=e.content,a=e.col,n=z();return t?i.a.createElement(v.a,{item:!0,xs:a,container:!0,justify:"center",alignItems:"center",direction:"column",wrap:"nowrap"},i.a.createElement(v.a,{item:!0},i.a.createElement(x.a,{src:null!==t.profile_path?"".concat(_.n,"/w780").concat(t.profile_path):"",className:n.avatar},null===t.profile_path&&i.a.createElement(N.a,{fontSize:"large"}))),i.a.createElement(v.a,{item:!0,className:n.text},i.a.createElement(j.a,{variant:"body1",className:n.title,align:"center"},t.character)),i.a.createElement(v.a,{item:!0},i.a.createElement(j.a,{vairant:"body2",className:n.subtitle,align:"center",color:"textSecondary"},t.name))):null},I=a(8),T=a(29),C=function(){var e=Object(b.a)(),t=Object(p.a)(e.breakpoints.only("xs")),a=Object(p.a)(e.breakpoints.only("sm")),c=Object(p.a)(e.breakpoints.only("md")),l=Object(p.a)(e.breakpoints.up("lg")),o=Object(m.c)((function(e){return e.movies.movie})),s=Object(m.c)((function(e){return e.movies.castShowMore})),u=Object(m.b)(),g=o.cast,d=Object(r.useState)(0),f=Object(n.a)(d,2),E=f[0],h=f[1],j=2*E;return Object(r.useEffect)((function(){h(Object(T.c)(t,a))}),[t,a,c,l]),i.a.createElement(i.a.Fragment,null,i.a.createElement(v.a,{container:!0,spacing:2},g.slice(0,j).map((function(e){return i.a.createElement(S,{content:e,col:12/E})})),s&&g.slice(j,g.length).map((function(e){return i.a.createElement(S,{content:e,col:12/E})})),i.a.createElement(v.a,{item:!0,xs:12,container:!0,justify:"flex-end"},i.a.createElement(k.a,{onClick:function(){return u(I.c.setCastShowMore(!s))}},s?"Show less":"Show all"))))},M=a(337),B=a(295),F=a(283),W=a(339),D=a(287),L=Object(u.a)((function(e){return{demo:{backgroundColor:e.palette.background.paper},title:{fontWeight:e.typography.h6.fontWeight}}})),A=function(e){var t=e.title,a=e.content,n=L();return i.a.createElement(v.a,{item:!0,xs:12},i.a.createElement(j.a,{variant:"body1",className:n.title},t),i.a.createElement(B.a,{disablePadding:!0},a.map((function(e){var t=null!==e.profile_path;return i.a.createElement(F.a,null,i.a.createElement(W.a,null,i.a.createElement(x.a,{alt:t?"Image not loading? Visit ".concat(e.profile_path," to view."):"".concat(e.name,"'s avatar."),src:t?"".concat(_.n,"/w154").concat(e.profile_path):""},!t&&i.a.createElement(N.a,null))),i.a.createElement(D.a,{primary:e.name,secondary:e.job}))}))))},Y=a(2),R=a(316),J=a(340),P=Object(u.a)((function(e){return{icon:{marginLeft:e.spacing(1),fontSize:e.typography.overline.fontSize},divider:{height:e.spacing(4)},cols3Adjustment:{maxWidth:"33%",flexBasis:"33%"}}})),V=function(e){var t=e.count,a=e.col,n=e.label,r=e.isTotal,l=e.divider,o=P(),m=Object(b.a)(),s=Object(p.a)(m.breakpoints.down("sm")),u=a-1;return i.a.createElement(i.a.Fragment,null,i.a.createElement(v.a,{item:!0,xs:u,container:!0,justify:"center",alignItems:"center",direction:"column",className:Object(Y.a)(Object(c.a)({},o.cols3Adjustment,3===u))},i.a.createElement(v.a,{item:!0},i.a.createElement(j.a,{variant:s?"h5":"h4"},t)),i.a.createElement(v.a,{item:!0},i.a.createElement(j.a,{variant:"overline",color:"textSecondary"},n,r&&i.a.createElement(R.a,{enterTouchDelay:0,leaveTouchDelay:2500,title:"Crew count is wholly based on the efforts of the TMDb community. It may or may not reflect the exact head count."},i.a.createElement(J.a,{className:o.icon}))))),l&&i.a.createElement(v.a,{item:!0},i.a.createElement(g.a,{orientation:"vertical",className:o.divider})))},q=function(){var e=Object(b.a)(),t=Object(p.a)(e.breakpoints.only("xs")),a=Object(p.a)(e.breakpoints.only("sm")),c=Object(p.a)(e.breakpoints.only("md")),l=Object(p.a)(e.breakpoints.up("lg")),o=Object(m.c)((function(e){return e.movies.movie})),s=Object(m.c)((function(e){return e.movies.crewShowMore})),u=Object(m.b)(),g=o.crew,f=Object(r.useState)({}),E=Object(n.a)(f,2),h=E[0],j=E[1],O=Object(r.useState)([]),w=Object(n.a)(O,2),y=w[0],x=w[1],N=Object(r.useState)(Object(T.d)()),z=Object(n.a)(N,2),S=z[0],C=z[1],B=h.lighting,F=h.visualEffects;Object(r.useEffect)((function(){C(Object(T.d)(t,a))}),[t,a,c,l]),Object(r.useEffect)((function(){var e=o.crew,t=Object(T.e)(e,"directing",["director"]),a=Object(n.a)(t,1)[0],c=Object(T.e)(e,"writing"),r=Object(n.a)(c,1)[0],i=Object(T.e)(e,"production",["producer","executive producer"]),l=Object(n.a)(i,2),m=l[0],s=l[1],u=Object(T.e)(e,"sound",["original music composer"]),b=Object(n.a)(u,1)[0],p=Object(T.e)(e,"camera",["director of photography"]),g=Object(n.a)(p,1)[0],v=Object(T.e)(e,"editing",["editor"]),d=Object(n.a)(v,1)[0],f=Object(T.e)(e,"costume & make-up",["costume design","makeup artist"]),E=Object(n.a)(f,2),h=E[0],O=E[1],w=Object(T.e)(e,"lighting"),y=Object(n.a)(w,1)[0],k=Object(T.e)(e,"visual effects"),N=Object(n.a)(k,1)[0],z={director:a,writer:r,production:[].concat(Object(M.a)(m),Object(M.a)(s)),composer:b,cinematography:g,editor:d,costume:h,makeup:O,lighting:y,visualEffects:N};j(z),x([]),_.i.forEach((function(e){z[e.identifier].length>0&&x((function(t){return[].concat(Object(M.a)(t),[e.identifier])}))}))}),[o]);return"director"in h?i.a.createElement(i.a.Fragment,null,i.a.createElement(v.a,{container:!0,spacing:2},function(){for(var e=[],t=0;t<S;++t){for(var a=[],n=function(e){if(!s&&("production"===y[e]||"composer"===y[e]||"cinematography"===y[e]||"editor"===y[e]||"costume"===y[e]||"makeup"===y[e]))return"break";var t=h[y[e]],n=_.i.filter((function(t){return t.identifier===y[e]}))[0];a.push(i.a.createElement(A,{title:n.label(t.length),content:t}))},c=t;c<y.length;c+=S){if("break"===n(c))break}e.push(i.a.createElement(v.a,{item:!0,xs:12/S},a))}return e}(),s?i.a.createElement(v.a,{item:!0,container:!0,justify:"center",alignItems:"center"},function(){var e=B.length>0,t=F.length>0,a=1;e&&a++,t&&a++;var n=12/a;return[e&&i.a.createElement(V,{col:n,count:B.length,label:"Lighting",divider:!0}),t&&i.a.createElement(V,{col:n,count:F.length,label:"VFX",divider:!0}),i.a.createElement(V,{col:n,count:g.length,label:"Total",isTotal:!0})]}()):i.a.createElement(V,{count:g.length,label:"Total Crew",isTotal:!0}),i.a.createElement(v.a,{item:!0,xs:12,container:!0,justify:"flex-end"},i.a.createElement(k.a,{onClick:function(){return u(I.c.setCrewShowMore(!s))}},s?"Show less":"Show all")))):i.a.createElement(d.a,null)},X=a(258),G=a(88),H=a(292),K=function(){return i.a.createElement("svg",{viewBox:"-110 1 511 511.99996",xmlns:"http://www.w3.org/2000/svg"},i.a.createElement("path",{d:"m180 512h-81.992188c-13.695312 0-24.835937-11.140625-24.835937-24.835938v-184.9375h-47.835937c-13.695313 0-24.835938-11.144531-24.835938-24.835937v-79.246094c0-13.695312 11.140625-24.835937 24.835938-24.835937h47.835937v-39.683594c0-39.347656 12.355469-72.824219 35.726563-96.804688 23.476562-24.089843 56.285156-36.820312 94.878906-36.820312l62.53125.101562c13.671875.023438 24.792968 11.164063 24.792968 24.835938v73.578125c0 13.695313-11.136718 24.835937-24.828124 24.835937l-42.101563.015626c-12.839844 0-16.109375 2.574218-16.808594 3.363281-1.152343 1.308593-2.523437 5.007812-2.523437 15.222656v31.351563h58.269531c4.386719 0 8.636719 1.082031 12.289063 3.121093 7.878906 4.402344 12.777343 12.726563 12.777343 21.722657l-.03125 79.246093c0 13.6875-11.140625 24.828125-24.835937 24.828125h-58.46875v184.941406c0 13.695313-11.144532 24.835938-24.839844 24.835938zm-76.8125-30.015625h71.632812v-193.195313c0-9.144531 7.441407-16.582031 16.582032-16.582031h66.726562l.027344-68.882812h-66.757812c-9.140626 0-16.578126-7.4375-16.578126-16.582031v-44.789063c0-11.726563 1.191407-25.0625 10.042969-35.085937 10.695313-12.117188 27.550781-13.515626 39.300781-13.515626l36.921876-.015624v-63.226563l-57.332032-.09375c-62.023437 0-100.566406 39.703125-100.566406 103.609375v53.117188c0 9.140624-7.4375 16.582031-16.578125 16.582031h-56.09375v68.882812h56.09375c9.140625 0 16.578125 7.4375 16.578125 16.582031zm163.0625-451.867187h.003906zm0 0"}))},Q=function(){return i.a.createElement("svg",{viewBox:"0 0 512.00096 512.00096",xmlns:"http://www.w3.org/2000/svg"},i.a.createElement("path",{d:"m373.40625 0h-234.8125c-76.421875 0-138.59375 62.171875-138.59375 138.59375v234.816406c0 76.417969 62.171875 138.589844 138.59375 138.589844h234.816406c76.417969 0 138.589844-62.171875 138.589844-138.589844v-234.816406c0-76.421875-62.171875-138.59375-138.59375-138.59375zm108.578125 373.410156c0 59.867188-48.707031 108.574219-108.578125 108.574219h-234.8125c-59.871094 0-108.578125-48.707031-108.578125-108.574219v-234.816406c0-59.871094 48.707031-108.578125 108.578125-108.578125h234.816406c59.867188 0 108.574219 48.707031 108.574219 108.578125zm0 0"}),i.a.createElement("path",{d:"m256 116.003906c-77.195312 0-139.996094 62.800782-139.996094 139.996094s62.800782 139.996094 139.996094 139.996094 139.996094-62.800782 139.996094-139.996094-62.800782-139.996094-139.996094-139.996094zm0 249.976563c-60.640625 0-109.980469-49.335938-109.980469-109.980469 0-60.640625 49.339844-109.980469 109.980469-109.980469 60.644531 0 109.980469 49.339844 109.980469 109.980469 0 60.644531-49.335938 109.980469-109.980469 109.980469zm0 0"}),i.a.createElement("path",{d:"m399.34375 66.285156c-22.8125 0-41.367188 18.558594-41.367188 41.367188 0 22.8125 18.554688 41.371094 41.367188 41.371094s41.371094-18.558594 41.371094-41.371094-18.558594-41.367188-41.371094-41.367188zm0 52.71875c-6.257812 0-11.351562-5.09375-11.351562-11.351562 0-6.261719 5.09375-11.351563 11.351562-11.351563 6.261719 0 11.355469 5.089844 11.355469 11.351563 0 6.257812-5.09375 11.351562-11.355469 11.351562zm0 0"}))},U=function(){return i.a.createElement("svg",{viewBox:"0 -45 512.00013 512",xmlns:"http://www.w3.org/2000/svg"},i.a.createElement("path",{d:"m194.816406 422.710938c-85.453125 0-152.992187-14.929688-185.304687-40.953126l-.628907-.507812-.570312-.570312c-7.675781-7.679688-10.191406-17.753907-6.894531-27.636719l.300781-.820313c4-10.003906 13.800781-16.738281 24.421875-16.800781 21.859375-.378906 40.984375-2.984375 58.339844-8.042969-27.683594-12.875-46.914063-35.167968-58.355469-67.433594-3.847656-10.0625-.527344-21.21875 8.339844-27.871093 2.1875-1.644531 4.660156-2.886719 7.277344-3.71875-15.382813-17.757813-26.746094-37.964844-33.109376-59.335938l-.199218-.664062-.136719-.679688c-2.160156-10.808593 2.671875-21.921875 11.527344-26.707031 3.714843-2.132812 7.75-3.238281 11.800781-3.332031-4.367188-9.40625-7.542969-19.0625-9.425781-28.777344-5.226563-26.921875-.914063-53.910156 12.8125-80.214844l3.175781-6.351562c2.542969-5.082031 7.402344-8.652344 13.003906-9.5625 5.601563-.90625 11.34375.945312 15.355469 4.957031l5.785156 5.792969c45.703125 47.914062 86.640625 70.648437 157.417969 86.203125 3.160156-27.167969 14.90625-52.421875 33.855469-72.296875 22.550781-23.648438 52.664062-36.917969 84.792969-37.371094h.210937c23.441406 0 52.519531 13.382813 70.105469 22.820313 15.085937-4.9375 33.261718-12.582032 52.121094-20.664063 8.824218-4.140625 19.703124-2.2460938 26.640624 4.691406 6.800782 6.800781 8.6875 16.390625 5.078126 25.710938-1.371094 3.816406-2.925782 7.5625-4.65625 11.226562 2.582031 1.183594 4.945312 2.789063 6.941406 4.785157 6.035156 6.035156 8.550781 15.480468 6.40625 24.066406l-.230469.816406c-7.226563 23.289062-21.109375 42.257812-39.46875 54.164062-3.066406 163.285157-126.027344 295.078126-276.730469 295.078126zm-156.511718-57.675782c30.449218 17.226563 88.476562 27.648438 156.511718 27.648438 65.410156 0 127.136719-28.082032 173.804688-79.074219 47.050781-51.410156 72.960937-119.679687 72.960937-192.234375v-.816406c0-6.570313 3.617188-12.566406 9.4375-15.652344 11.808594-6.253906 21.371094-16.90625 27.589844-30.527344-6.414063 1.011719-12.933594-1.5625-16.929687-6.929687-4.644532-6.238281-4.695313-14.664063-.128907-20.957031 2.464844-3.398438 4.699219-6.933594 6.691407-10.589844-16.285157 6.839844-31.75 12.972656-45.175782 17.046875-4.878906 1.476562-10.316406.898437-14.773437-1.589844-23.902344-13.316406-46.164063-21.277344-59.585938-21.316406-49.527343.757812-89.796875 43.175781-89.796875 94.605469 0 5.316406-2.359375 10.300781-6.464844 13.679687-4.109374 3.375-9.453124 4.726563-14.671874 3.695313-81.609376-16.078126-129.96875-40.1875-180.257813-90.722657-7.207031 17.269531-9.175781 34.664063-5.84375 51.839844 3.378906 17.398437 12.367187 34.832031 25.996094 50.414063 5.179687 5.914062 5.867187 14.375 1.710937 21.050781-4.140625 6.652343-12.011718 9.761719-19.578125 7.734375-5.914062-1.585938-11.351562-3.667969-16.507812-6.34375 10.503906 22.816406 28.570312 43.917968 51.28125 59.480468 6.582031 4.511719 9.332031 12.921876 6.691406 20.453126-2.644531 7.542968-10.03125 12.398437-18.015625 11.804687-8.699219-.644531-16.40625-2.296875-23.5-5.082031 12.734375 25.933594 33.082031 40.203125 64.429688 45.65625 7.464843 1.300781 13.277343 7.195312 14.464843 14.667968 1.191407 7.472657-2.507812 14.878907-9.199219 18.429688-26.71875 14.164062-55.921874 21.765625-91.140624 23.628906zm0 0"}))},Z=function(){return i.a.createElement("svg",{viewBox:"0 -62 512.00199 512",xmlns:"http://www.w3.org/2000/svg"},i.a.createElement("path",{d:"m334.808594 170.992188-113.113282-61.890626c-6.503906-3.558593-14.191406-3.425781-20.566406.351563-6.378906 3.78125-10.183594 10.460937-10.183594 17.875v122.71875c0 7.378906 3.78125 14.046875 10.117188 17.832031 3.308594 1.976563 6.976562 2.96875 10.652344 2.96875 3.367187 0 6.742187-.832031 9.847656-2.503906l113.117188-60.824219c6.714843-3.613281 10.90625-10.59375 10.9375-18.222656.027343-7.628906-4.113282-14.640625-10.808594-18.304687zm-113.859375 63.617187v-91.71875l84.539062 46.257813zm0 0"}),i.a.createElement("path",{d:"m508.234375 91.527344-.023437-.234375c-.433594-4.121094-4.75-40.777344-22.570313-59.421875-20.597656-21.929688-43.949219-24.59375-55.179687-25.871094-.929688-.105469-1.78125-.203125-2.542969-.304688l-.894531-.09375c-67.6875-4.921874-169.910157-5.5937495-170.933594-5.59765575l-.089844-.00390625-.089844.00390625c-1.023437.00390625-103.246094.67578175-171.542968 5.59765575l-.902344.09375c-.726563.097657-1.527344.1875-2.398438.289063-11.101562 1.28125-34.203125 3.949219-54.859375 26.671875-16.972656 18.445312-21.878906 54.316406-22.382812 58.347656l-.058594.523438c-.152344 1.714844-3.765625 42.539062-3.765625 83.523437v38.3125c0 40.984375 3.613281 81.808594 3.765625 83.527344l.027344.257813c.433593 4.054687 4.746093 40.039062 22.484375 58.691406 19.367187 21.195312 43.855468 24 57.027344 25.507812 2.082031.238282 3.875.441406 5.097656.65625l1.183594.164063c39.082031 3.71875 161.617187 5.550781 166.8125 5.625l.15625.003906.15625-.003906c1.023437-.003907 103.242187-.675781 170.929687-5.597657l.894531-.09375c.855469-.113281 1.816406-.214843 2.871094-.324218 11.039062-1.171875 34.015625-3.605469 54.386719-26.019532 16.972656-18.449218 21.882812-54.320312 22.382812-58.347656l.058594-.523437c.152344-1.71875 3.769531-42.539063 3.769531-83.523438v-38.3125c-.003906-40.984375-3.617187-81.804687-3.769531-83.523437zm-26.238281 121.835937c0 37.933594-3.3125 77-3.625 80.585938-1.273438 9.878906-6.449219 32.574219-14.71875 41.5625-12.75 14.027343-25.847656 15.417969-35.410156 16.429687-1.15625.121094-2.226563.238282-3.195313.359375-65.46875 4.734375-163.832031 5.460938-168.363281 5.488281-5.082032-.074218-125.824219-1.921874-163.714844-5.441406-1.941406-.316406-4.039062-.558594-6.25-.808594-11.214844-1.285156-26.566406-3.042968-38.371094-16.027343l-.277344-.296875c-8.125-8.464844-13.152343-29.6875-14.429687-41.148438-.238281-2.710937-3.636719-42.238281-3.636719-80.703125v-38.3125c0-37.890625 3.304688-76.914062 3.625-80.574219 1.519532-11.636718 6.792969-32.957031 14.71875-41.574218 13.140625-14.453125 26.996094-16.054688 36.160156-17.113282.875-.101562 1.691407-.195312 2.445313-.292968 66.421875-4.757813 165.492187-5.464844 169.046875-5.492188 3.554688.023438 102.589844.734375 168.421875 5.492188.808594.101562 1.691406.203125 2.640625.3125 9.425781 1.074218 23.671875 2.699218 36.746094 16.644531l.121094.128906c8.125 8.464844 13.152343 30.058594 14.429687 41.75.226563 2.558594 3.636719 42.171875 3.636719 80.71875zm0 0"}))},$=Object(u.a)((function(){return{logo:{width:"1em"}}})),ee=function(){var e=$(),t=Object(m.c)((function(e){return e.sidebar.darkMode})),a=Object(m.c)((function(e){return e.movies.movie})),n=a.facebook,c=a.instagram,r=a.twitter,l=a.youtube,o=a.imdb,s=a.tmdb,u=function(e,t,a){return i.a.createElement(X.a,{onClick:function(){return window.open(t,"_blank")}},a?e:i.a.createElement(G.a,null,e))},b=function(a,n,c){return i.a.createElement("img",{alt:a,className:e.logo,src:t?n:c})};return i.a.createElement(i.a.Fragment,null,i.a.createElement(v.a,{container:!0,spacing:2},i.a.createElement(v.a,{container:!0,xs:12,item:!0},null!==n&&u(i.a.createElement(K,null),n),null!==c&&u(i.a.createElement(Q,null),c),null!==r&&u(i.a.createElement(U,null),r),null!==l&&u(i.a.createElement(Z,null),l),null!==o&&u(b("IMDb Logo",_.k,_.j),o,!0),null!==s&&u(b("TMDb Logo",_.w,_.v),s,!0)),i.a.createElement(v.a,{item:!0},i.a.createElement(j.a,{variant:"caption"},"Icons made by\xa0",i.a.createElement(H.a,{href:"https://www.flaticon.com/authors/freepik",title:"Freepik"},"Freepik"),"\xa0from\xa0",i.a.createElement(H.a,{href:"https://www.flaticon.com/",title:"Flaticon"},"www.flaticon.com")))))},te=function(){var e=Object(m.c)((function(e){return e.movies.movie})),t=e.budget,a=e.revenue;return i.a.createElement(v.a,{item:!0,container:!0,justify:"center",alignItems:"center"},function(){var e=a-t,n=e>0;return[i.a.createElement(V,{col:4,count:Object(T.f)(a),label:"Revenue",divider:!0}),i.a.createElement(V,{col:4,count:Object(T.f)(t),label:"Budget",divider:a&&n}),n&&i.a.createElement(V,{col:4,count:Object(T.f)(e),label:"Income"})]}())},ae=Object(u.a)((function(e){return{chip:{margin:e.spacing(.5,1,.5,0)},avatar:{width:e.spacing(10)}}})),ne=function(){var e=ae(),t=Object(m.c)((function(e){return e.movies.movie})).production_companies;return i.a.createElement(v.a,{container:!0,spacing:2},i.a.createElement(v.a,{item:!0,xs:12},t.map((function(t){var a=t.name;return t.origin_country&&(a+=" (".concat(t.origin_country,")")),i.a.createElement(O.a,{variant:"outlined",label:a,className:e.chip})}))))},ce=a(277),re=a(278),ie=a(279),le=Object(u.a)((function(e){return{collectionImg:{height:0,paddingTop:e.spacing(20),width:"100%"},typoOverlay:{position:"absolute",marginTop:e.spacing(-9),padding:e.spacing(4,2,2,2),color:e.palette.common.white,pointerEvents:"none",overflow:"hidden",width:"100%",backgroundImage:"linear-gradient(to top, rgba(33, 33, 33, 0.6), #0000)"}}})),oe=function(){var e=le(),t=Object(m.c)((function(e){return e.movies.movie})).belongs_to_collection,a=_.n;return t.backdrop_path?a+="/w780".concat(t.backdrop_path):t.poster_path?a+="/w780".concat(t.poster_path):a=i.a.createElement("div",{className:e.brokenImgContainer},i.a.createElement(j.a,{variant:"body1"},"No image available.")),i.a.createElement(v.a,{container:!0,spacing:2},i.a.createElement(v.a,{item:!0,xs:12},i.a.createElement(ce.a,null,i.a.createElement(re.a,null,!("string"===typeof a)&&a,i.a.createElement(ie.a,{className:e.collectionImg,image:a}),i.a.createElement("div",{gutterBottom:!0,variant:"button",className:e.typoOverlay},i.a.createElement(j.a,{variant:"h6",className:e.cardTitle,noWrap:!0},t.name))))))},me=function(e){var t=e.title,a=e.children,n=e.visible,c=void 0===n||n,r=e.col,l=void 0===r?12:r;return c?i.a.createElement(v.a,{item:!0,xs:l},t&&i.a.createElement(j.a,{variant:"h5",gutterBottom:!0},t),a):null},se=a(36),ue=Object(u.a)((function(e){var t;return{root:{padding:e.spacing(0,2)},trailer:(t={},Object(c.a)(t,e.breakpoints.down("sm"),{height:"".concat(e.spacing(30),"px !important")}),Object(c.a)(t,e.breakpoints.between("sm","md"),{height:"".concat(e.spacing(40),"px !important")}),Object(c.a)(t,e.breakpoints.up("md"),{height:"".concat(e.spacing(50),"px !important")}),t),note:{padding:e.spacing(8,2)}}}));t.default=function(){var e=Object(b.a)(),t=Object(p.a)(e.breakpoints.up("md")),a=ue(),c=Object(m.c)((function(e){return e.movies.movie})),l=Object(m.c)((function(e){return e.movies.isMovieLoading})),u=Object(m.b)(),E=Object(r.useState)(!0),h=Object(n.a)(E,2),j=h[0],O=h[1],w=Object(s.i)().movieId,k=c.budget,x=c.revenue,N=c.youtube,z=c.production_companies,S=c.belongs_to_collection;Object(r.useEffect)((function(){Object(se.c)(Object(T.a)(),w,(function(e){u(I.c.setActiveMovie(e)),u(I.c.setDetailsLoading(!1)),O(!0)}),(function(e){e.response&&(u(I.c.setActiveMovie({})),O(e.response.data.status_code))}))}),[w,u]);var M=function(){return i.a.createElement(me,null,i.a.createElement(g.a,null))};return void 0===w?i.a.createElement("div",{className:a.note},i.a.createElement(f.a,{details:_.q})):l?i.a.createElement(d.a,null):34===j?i.a.createElement("div",{className:a.note},i.a.createElement(f.a,{details:_.o})):0===Object.keys(c).length&&c.constructor===Object?i.a.createElement(d.a,null):i.a.createElement(v.a,{container:!0,spacing:8,className:a.root},i.a.createElement(y,null),i.a.createElement(me,{visible:k&&x},i.a.createElement(te,null)),M(),i.a.createElement(me,{title:"Trailer",visible:N},i.a.createElement(o.a,{className:a.trailer,controls:!0,light:!0,pip:!0,url:N,width:"100%"})),M(),i.a.createElement(me,{title:"Cast"},i.a.createElement(C,null)),M(),i.a.createElement(me,{title:"Crew"},i.a.createElement(q,null)),M(),i.a.createElement(me,{visible:S,title:"Collection",col:t?6:12},i.a.createElement(oe,null)),i.a.createElement(me,{visible:z,title:"Production",col:t&&S?6:12},i.a.createElement(ne,null)),i.a.createElement(me,null,i.a.createElement(ee,null)))}}}]);
//# sourceMappingURL=1.2c36faea.chunk.js.map
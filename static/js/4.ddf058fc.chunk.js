(this["webpackJsonpanother-moviedb-rip-off"]=this["webpackJsonpanother-moviedb-rip-off"]||[]).push([[4],{301:function(e,t,a){"use strict";a.r(t);var n=a(20),c=a(8),r=a(0),i=a.n(r),o=a(31),l=a.n(o),s=a(274),m=a.n(s),u=a(4),d=a(40),b=a(86),p=a(34),g=a(188),v=a(53),f=a(48),h=a(265),j=a(266),E=a(22),O=a(250),y=a(101),k=a(247),w=a(267),x=a(36),I=a(15),_=Object(b.a)((function(e){var t;return{container:(t={},Object(c.a)(t,e.breakpoints.only("xs"),{margin:e.spacing(2,0)}),Object(c.a)(t,"position","relative"),Object(c.a)(t,"width","inherit"),t),horizontalScrollItemSpacing:{margin:e.spacing(0,1)},lastEntry:{padding:e.spacing(1.5)}}})),N=function(){var e=Object(p.a)(),t=Object(g.a)(e.breakpoints.only("xs")),a=Object(g.a)(e.breakpoints.only("sm")),c=Object(g.a)(e.breakpoints.only("md")),o=Object(g.a)(e.breakpoints.up("lg")),l=_(),s=Object(u.c)((function(e){return e.movies.movie})),m=Object(E.g)(),d=s.cast,b=s.original_title,f=s.title,h=Object(r.useState)(0),j=Object(n.a)(h,2),N=j[0],S=j[1];Object(r.useEffect)((function(){S(Object(x.c)(t,a))}),[t,a,c,o]);return i.a.createElement(v.a,{container:!0,className:l.container},i.a.createElement(k.a,{appbarTitle:[f||b,"Cast"],collapsedClickEvent:function(){return Object(x.g)("movie-cast")},collapsedContent:i.a.createElement(O.a,{handleSeeMore:function(){m.push("".concat(m.location.pathname,"/").concat("cast"))},isWithSeeMore:d.length>I.e,scrollAmount:144},d.slice(0,I.e).map((function(e){return i.a.createElement("div",{className:l.horizontalScrollItemSpacing,key:"movie-cast-person-avatar-".concat(e.id)},i.a.createElement(w.a,{character:e.character,col:12,image:e.profile_path,name:e.name,isHorizontalScroll:!0}))})),d.length<=I.e&&t&&i.a.createElement("div",{className:l.lastEntry})),expandedContent:i.a.createElement(v.a,{container:!0,spacing:2},i.a.createElement(y.a,{contents:d,maxItemPerLoad:20,node:i.a.createElement(w.a,null),otherProps:{col:12/N},type:"itemCast"})),isButtonShown:d.length>I.e,sectionId:"cast",seeMoreText:"Show all ".concat(d.length," cast")}))},S=a(257),C=function(e){var t=e.anchorId,a=Object(u.c)((function(e){return e.movies.movie})),n=a.collection_content,c=a.original_title,r=a.title;if(!n)return null;var o=n.overview,l=n.parts;return i.a.createElement(S.a,{appbarTitle:[r||c,"Collection"],anchorId:t,items:l,isOverviewCollapsed:!0,overview:o})},R=a(289),T=a(18),M=a(9),L=a.n(M),P=a(225),A=a(197),B=a(298),W=a(243),z=a(222),F=a(102),Y=Object(b.a)((function(e){return{demo:{backgroundColor:e.palette.colorScheme.background},primary:{fontWeight:600},secondary:{fontWeight:200},brokenImage:{color:e.palette.action.disabled},avatar:{border:"1px solid ".concat(e.palette.brokenImage.border),"& img":{filter:"brightness(".concat("dark"===e.palette.type?"70%":"90%",")")}},listItem:{"&:last-child":{marginBottom:e.spacing(2)}}}})),H=function(e){var t=e.col,a=void 0===t?12:t,n=e.content,c=e.title,r=Y();return i.a.createElement(v.a,{item:!0,xs:a},c&&i.a.createElement(T.a,{variant:"body2",color:"textSecondary"},c),i.a.createElement(P.a,{disablePadding:!0},n.map((function(e){var t=e.job,a=e.name,n=e.profile_path,c=null!==n;return i.a.createElement(A.a,{key:"person-avatar-list-".concat(a),className:r.listItem},i.a.createElement(B.a,null,c?i.a.createElement(W.a,{alt:"".concat(a,"'s avatar."),className:r.avatar,src:"".concat(I.v,"/w154").concat(n)}):i.a.createElement(F.a,{type:"avatar",avatarSize:"small"})),i.a.createElement(z.a,{primary:i.a.createElement(T.a,{variant:"body2",className:r.primary},a),secondary:i.a.createElement(T.a,{variant:"body2",className:r.secondary},t)}))}))))};H.defaultProps={col:12,content:L.a.arrayOf(L.a.shape({profile_path:""}))};var D=H,J=a(258),V=Object(b.a)((function(e){return{moreCrew:{marginBottom:e.spacing(2),marginTop:e.spacing(-2),paddingLeft:e.spacing(9)},moreCrewText:{fontWeight:300}}})),q=function(){var e=Object(p.a)(),t=Object(g.a)(e.breakpoints.only("xs")),a=Object(g.a)(e.breakpoints.only("sm")),c=Object(g.a)(e.breakpoints.only("md")),o=Object(g.a)(e.breakpoints.up("lg")),l=V(),s=Object(u.c)((function(e){return e.movies.movie})),m=s.crew,d=s.original_title,b=s.title,f=Object(r.useState)({}),h=Object(n.a)(f,2),j=h[0],E=h[1],O=Object(r.useState)([]),y=Object(n.a)(O,2),w=y[0],_=y[1],N=Object(r.useState)(Object(x.d)()),S=Object(n.a)(N,2),C=S[0],M=S[1];Object(r.useEffect)((function(){M(Object(x.d)(t,a))}),[t,a,c,o]),Object(r.useEffect)((function(){if(m&&m.length>0){var e=Object(x.e)(m,"directing",["director"]),t=Object(n.a)(e,1)[0],a=Object(x.e)(m,"writing"),c=Object(n.a)(a,1)[0],r=Object(x.e)(m,"production",["producer","executive producer"]),i=Object(n.a)(r,2),o=i[0],l=i[1],s=Object(x.e)(m,"sound",["original music composer"]),u=Object(n.a)(s,1)[0],d=Object(x.e)(m,"camera",["director of photography"]),b=Object(n.a)(d,1)[0],p=Object(x.e)(m,"editing",["editor"]),g=Object(n.a)(p,1)[0],v=Object(x.e)(m,"costume & make-up",["costume design","makeup artist"]),f=Object(n.a)(v,2),h=f[0],j=f[1],O=Object(x.e)(m,"lighting"),y=Object(n.a)(O,1)[0],k=Object(x.e)(m,"visual effects"),w=Object(n.a)(k,1)[0],N={director:t,writer:c,production:[].concat(Object(R.a)(o),Object(R.a)(l)),composer:u,cinematography:b,editor:g,costume:h,makeup:j,lighting:y,visualEffects:w};E(N),_([]),I.a.forEach((function(e){N[e.identifier].length>0&&_((function(t){return[].concat(Object(R.a)(t),[e.identifier])}))}))}}),[s,m]);var L=function(e){for(var t,a=Array(C).fill([]),n=Array(C).fill(0),c=0,r=function(r){if(!e&&("composer"===w[r]||"cinematography"===w[r]||"editor"===w[r]||"costume"===w[r]||"makeup"===w[r]||"lighting"===w[r]||"visualEffects"===w[r]))return"break";var o=Object(R.a)(j[w[r]]);c=o.length;var s=e?o:Object(R.a)(o.splice(0,I.g)),m=I.a.filter((function(e){return e.identifier===w[r]}))[0],u=m.label(o.length);if(t=i.a.createElement(i.a.Fragment,null,i.a.createElement(D,{key:"movie-crew-person-avatar-list-".concat(m.identifier),content:s,title:u}),!e&&o.length>0&&i.a.createElement(v.a,{item:!0,xs:12,className:l.moreCrew},i.a.createElement(T.a,{variant:"caption",color:"textSecondary",className:l.moreCrewText},"...and ".concat(o.length," more")))),C>1){for(var d=n[0],b=0,p=1;p<C;p+=1)d>n[p]&&(d=n[p],b=p);n[b]+=c,a[b]=[].concat(Object(R.a)(a[b]),[t])}else a[0]=[].concat(Object(R.a)(a[0]),[t])},o=0;o<w.length;o+=1){if("break"===r(o))break}return a.map((function(e,t){return i.a.createElement(v.a,{item:!0,xs:12/C,key:"movie-crew-masonry-grid-".concat(t)},e)}))};return"director"in j?i.a.createElement(v.a,{container:!0},i.a.createElement(k.a,{appbarTitle:[b||d,"Crew"],collapsedClickEvent:function(){return Object(x.g)("movie-crew")},collapsedContent:i.a.createElement(v.a,{container:!0},L()),expandedContent:i.a.createElement(v.a,{container:!0,spacing:2},L(!0),i.a.createElement(v.a,{item:!0,container:!0,justify:"center",alignItems:"center"},i.a.createElement(J.a,{col:12/m.length,count:m.length,isTotal:!0,label:"Total Crew"}))),sectionId:"crew",seeMoreText:"Show all ".concat(m.length," crew")})):null},G=a(248),K=a(272),Q=a(269),U=Object(b.a)((function(e){return{chip:{margin:e.spacing(.25,.5,.25,0)},ellipsis:{fontSize:"1rem",fontFamily:'"Roboto", "Helvetica", "Arial", sans-serif',fontWeight:"400",lineHeight:"1.5",letterSpacing:"0.00938em"},posterImage:{filter:"brightness(".concat("dark"===e.palette.type?"70%":"90%",")"),border:"1px solid ".concat(e.palette.colorScheme.divider),borderRadius:e.shape.borderRadius,height:"355px",margin:e.spacing(1),width:"250px",objectFit:"cover",objectPosition:"50% 0%"},container:{height:"fit-content"}}})),X=function(e){var t=e.sectionVisibility,a=U(),c=Object(p.a)(),o=Object(g.a)(c.breakpoints.up("lg")),l=Object(u.c)((function(e){return e.movies.movie})),s=Object(r.useState)(!1),m=Object(n.a)(s,2),d=m[0],b=m[1],f=l.budget,h=l.facebook,j=l.genres,E=l.imdb,O=l.instagram,y=l.original_title,k=l.overview,w=l.poster_path,_=l.revenue,N=l.tagline,S=l.title,C=l.tmdb,R=l.twitter,M=o&&w,L=I.j.filter((function(e){return t[e.visibilityId]}));Object(r.useEffect)((function(){b(!1)}),[w]);return i.a.createElement(i.a.Fragment,null,M&&i.a.createElement(v.a,{item:!0,xs:4,container:!0,spacing:2},i.a.createElement("img",{src:"".concat(I.v,"/w500").concat(w),alt:"".concat(S||y,"'s background cover."),className:a.posterImage,style:d?{}:{display:"none"},onLoad:function(){return b(!0)}})),i.a.createElement(v.a,{item:!0,xs:M?8:12,container:!0,spacing:2,justifyContent:"flex-start",alignItems:"flex-start",className:a.container},i.a.createElement(v.a,{item:!0,xs:12},j.map((function(e){return i.a.createElement(G.a,{className:a.chip,key:"movie-header-chip-".concat(e.id),label:e.name,variant:"outlined"})}))),i.a.createElement(v.a,{item:!0,xs:12},i.a.createElement(Q.a,{facebook:h,imdb:E,instagram:O,tmdb:C,twitter:R})),k&&k.length>0&&i.a.createElement(v.a,{item:!0,xs:12},i.a.createElement(T.a,{variant:"body2"},k)),N&&i.a.createElement(v.a,{item:!0,xs:12},i.a.createElement(T.a,{color:"textSecondary",variant:"body2",className:a.tagline},i.a.createElement("em",null,'"',N,'"'))),i.a.createElement(v.a,{item:!0,xs:12},i.a.createElement(K.a,{content:L})),i.a.createElement(v.a,{item:!0,xs:12},i.a.createElement(v.a,{container:!0,justify:"center",alignItems:"center"},function(){var e=_-f,t=e>0;return[0!==_&&i.a.createElement(J.a,{col:4,count:Object(x.j)(_),divider:!0,key:"movie-budget-revenue",label:"Revenue"}),0!==f&&i.a.createElement(J.a,{col:4,count:Object(x.j)(f),divider:!Number.isNaN(_)&&t,key:"movie-budget-budget",label:"Budget"}),t&&i.a.createElement(J.a,{col:4,count:Object(x.j)(e),key:"movie-budget-income",label:"Income"})]}()))))},Z=a(268),$=Object(b.a)((function(e){return{title:{width:"100%"},name:{fontWeight:600}}})),ee=function(){var e=Object(p.a)(),t=Object(g.a)(e.breakpoints.only("xs")),a=$(),n=Object(u.c)((function(e){return e.movies.movie})),c=n.production_companies,r=n.production_countries,o=n.spoken_languages,l=c&&c.length>0,s=r&&r.length>0,m=o&&o.length>0,d=function(e,n){var c=arguments.length>2&&void 0!==arguments[2]?arguments[2]:t?12:6;return i.a.createElement(v.a,{item:!0,xs:c,container:!0},i.a.createElement(T.a,{variant:"body2",gutterBottom:!0,className:a.title,color:"textSecondary"},e),n)},b=function(e,t,n,c){var r="";return 0===n&&1===c?r="":n===c-2?r=", and ":n<c-1&&(r=", "),i.a.createElement(i.a.Fragment,null,i.a.createElement("span",{className:a.name},e)," (",t,")",r)};return i.a.createElement(v.a,{item:!0,container:!0},i.a.createElement(v.a,{alignItems:"flex-start",container:!0,direction:"row",item:!0,justify:"flex-start",spacing:3,xs:12},l&&d("Companies",c.map((function(e){var t=e.id,a=e.logo_path,n=e.name,c=e.origin_country;return i.a.createElement(v.a,{item:!0,key:"tv-show-production-production-company-chip-".concat(t)},i.a.createElement(Z.a,{country:c,image:a,name:n}))})),12),s&&d("Country",i.a.createElement(T.a,{variant:"body2"},r.map((function(e,t){return b(e.name,e.iso_3166_1,t,r.length)})))),m&&d("Spoken Languages",i.a.createElement(T.a,{variant:"body2"},o.map((function(e,t){return b(e.english_name,e.iso_639_1,t,o.length)}))))))},te=function(e){var t=e.anchorId,a=Object(u.c)((function(e){return e.movies.movie})),n=a.original_title,c=a.title,r=a.recommendations;return r?i.a.createElement(S.a,{anchorId:t,appbarTitle:[c||n,"Recommendations"],areRecommendations:!0,items:r,overview:"If you liked ".concat(c||n,", check out these other movies:")}):null},ae=a(273),ne=function(){var e=Object(u.c)((function(e){return e.movies.movie})),t=e.original_title,a=e.reviews,n=e.title;if(!a)return null;var c=a.map((function(e,t){var a=e.author,n=e.author_details,c=e.created_at,r=e.content,o=n.rating;return i.a.createElement(ae.a,{author:a,content:r,date:c,rating:o,divider:0!==t})}));return i.a.createElement(v.a,{container:!0},i.a.createElement(k.a,{appbarTitle:[n||t,"Reviews"],collapsedClickEvent:function(){return Object(x.g)("movie-reviews")},collapsedContent:c[0],expandedContent:i.a.createElement(y.a,{contents:a,maxItemPerLoad:5,node:i.a.createElement(ae.a,null),type:"itemReviews"}),isButtonShown:a.length>1,isEpisode:!0,sectionId:"reviews",seeMoreText:"Show all ".concat(a.length," reviews")}))},ce=a(55),re=a(270),ie=a(271),oe=a(30),le=a(5),se=Object(b.a)((function(e){var t;return{root:{padding:e.spacing(0,2)},trailer:(t={},Object(c.a)(t,e.breakpoints.only("xs"),{height:"".concat(e.spacing(24),"px !important")}),Object(c.a)(t,e.breakpoints.only("sm"),{height:"".concat(e.spacing(35),"px !important")}),Object(c.a)(t,e.breakpoints.between("sm","md"),{height:"".concat(e.spacing(45),"px !important")}),Object(c.a)(t,e.breakpoints.up("md"),{height:"".concat(e.spacing(60),"px !important")}),Object(c.a)(t,"& .react-player__preview",{border:"1px solid ".concat(e.palette.brokenImage.border),borderRadius:e.shape.borderRadius}),Object(c.a)(t,"& iframe",{border:"1px solid ".concat(e.palette.brokenImage.border),borderRadius:e.shape.borderRadius}),t),note:{padding:e.spacing(16,2)}}}));t.default=function(){var e=Object(p.a)(),t=Object(g.a)(e.breakpoints.only("xs")),a=se(),c=Object(u.c)((function(e){return e.sidebar.itemDrawerOpen})),o=Object(u.c)((function(e){return e.sidebar.isSearchOpen})),s=Object(u.c)((function(e){return e.movies.movie})),b=Object(u.c)((function(e){return e.movies.isMovieLoading})),E=Object(u.b)(),O=Object(r.useState)(!0),y=Object(n.a)(O,2),k=y[0],w=y[1],x=Object(d.a)(),_=Object(n.a)(x,2)[1],S=s.belongs_to_collection,R=s.budget,T=s.cast,M=s.collection_content,L=s.crew,P=s.original_title,A=s.production_companies,B=s.recommendations,W=s.release_date,z=s.revenue,F=s.reviews,Y=s.title,H=s.tmdb,D=s.youtube,J={trailer:D&&D.length>0,cast:T&&T.length>0,crew:L&&L.length>0,production:A&&A.length>0,collection:S&&Object.keys(S).length>0,recommendations:B&&B.length>0,reviews:F&&F.length>0},V=!Number.isNaN(R)&&!Number.isNaN(z)&&0!==R&&0!==z;return Object(r.useEffect)((function(){if("search"!==_&&_){Object(oe.c)("e3fc17b9ce8e777600cb94bed3edf1b1",_,(function(e){E(le.c.setActiveMovie(e)),w(!0)}),(function(e){e.response&&(E(le.c.setActiveMovie({})),w(e.response.data.status_code))}),(function(){E(le.c.setDetailsLoading(!1))}))}}),[_,E]),void 0===_?i.a.createElement("div",{className:a.note},i.a.createElement(ce.a,{details:I.n})):b?i.a.createElement(f.a,{location:"itemcontainer"}):34===k?i.a.createElement("div",{className:a.note},i.a.createElement(ce.a,{details:I.m})):0===Object.keys(s).length&&s.constructor===Object?o?i.a.createElement("div",{className:a.note},i.a.createElement(ce.a,{details:I.r})):i.a.createElement(f.a,{location:"itemcontainer"}):i.a.createElement(h.a,null,i.a.createElement(v.a,{container:!0,spacing:t?4:8,className:a.root},i.a.createElement(ie.a,{anchorId:"movie-header",divider:!V,isCollapsible:!1,visible:0!==Object.keys(s).length&&s.constructor===Object},i.a.createElement(X,{sectionVisibility:J})),i.a.createElement(ie.a,{anchorId:"movie-trailer",title:"Trailer",visible:J.trailer},i.a.createElement(m.a,{className:a.trailer,controls:!0,light:!0,pip:!0,url:D,width:"100%"})),i.a.createElement(ie.a,{anchorId:"movie-cast",title:"Cast",visible:J.cast},i.a.createElement(N,null)),i.a.createElement(ie.a,{anchorId:"movie-crew",title:"Crew",visible:J.crew},i.a.createElement(q,null)),i.a.createElement(ie.a,{anchorId:"movie-production",divider:!0,title:"Production",visible:J.production},i.a.createElement(ee,null)),i.a.createElement(ie.a,{anchorId:"movie-reviews",divider:!0,title:"Reviews",visible:J.reviews},i.a.createElement(ne,null)),i.a.createElement(ie.a,{anchorId:"movie-collection",title:M?M.name:"",visible:J.collection},i.a.createElement(C,{anchorId:"movie-collection"})),i.a.createElement(ie.a,{anchorId:"movie-recommendations",title:"Recommendations",visible:J.recommendations},i.a.createElement(te,{anchorId:"movie-recommendations"})),i.a.createElement(ie.a,{anchorId:"movie-end-credits",divider:!1},i.a.createElement(j.a,{companies:A.map((function(e){return e.name})),link:H,title:Y||P,year:W?l()(W).format("YYYY"):""}))),!c&&i.a.createElement(re.a,null))}}}]);
//# sourceMappingURL=4.ddf058fc.chunk.js.map
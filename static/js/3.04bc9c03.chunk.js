/*! For license information please see 3.04bc9c03.chunk.js.LICENSE.txt */
(this["webpackJsonpanother-moviedb-rip-off"]=this["webpackJsonpanother-moviedb-rip-off"]||[]).push([[3],{357:function(e,t,n){e.exports=function(e){var t={};function n(a){if(t[a])return t[a].exports;var r=t[a]={i:a,l:!1,exports:{}};return e[a].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(a,r,function(t){return e[t]}.bind(null,r));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t,n){e.exports=n(3)()},function(e,t){e.exports=n(0)},function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return p}));var a=n(1),r=n.n(a),o=n(0),i=n.n(o);function c(e){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function s(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function l(e){return(l=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function u(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function m(e,t){return(m=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var p=function(e){function t(e){var n,a;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(n=!(a=l(t).call(this,e))||"object"!==c(a)&&"function"!=typeof a?u(this):a).element=null,n.original=e.text,n.watch=!0,n.lineHeight=0,n.start=0,n.middle=0,n.end=0,n.uuid=e.id,n.state={expanded:!0,noClamp:!1,text:e.text.substring(0,20)},n.ssr="undefined"==typeof window,n.action=n.action.bind(u(n)),n.clickHandler=n.clickHandler.bind(u(n)),n.ssr?n.state.text=e.text.substring(0,20):n.debounced=n.debounce(n.action,e.delay),n}var n,o;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&m(e,t)}(t,a.PureComponent),n=t,(o=[{key:"componentDidMount",value:function(){this.props.text&&!this.ssr&&(this.lineHeight=this.element.clientHeight+1,this.clampLines(),this.watch&&window.addEventListener("resize",this.debounced))}},{key:"componentWillUnmount",value:function(){this.ssr||window.removeEventListener("resize",this.debounced)}},{key:"componentDidUpdate",value:function(e){e.text!==this.props.text&&(this.original=this.props.text,this.clampLines())}},{key:"debounce",value:function(e,t,n){var a,r=this,o=arguments;return function(){var i=r,c=o,s=n&&!a;clearTimeout(a),a=setTimeout((function(){a=null,n||e.apply(i,c)}),t),s&&e.apply(i,c)}}},{key:"action",value:function(){this.watch&&(this.setState({noClamp:!1}),this.clampLines(),this.setState({expanded:!this.state.expanded}))}},{key:"clampLines",value:function(){if(this.element){this.setState({text:""});var e=this.lineHeight*this.props.lines+1;for(this.start=0,this.middle=0,this.end=this.original.length;this.start<=this.end;){if(this.middle=Math.floor((this.start+this.end)/2),this.element.innerText=this.original.slice(0,this.middle),this.middle===this.original.length)return void this.setState({text:this.original,noClamp:!0});this.moveMarkers(e)}this.element.innerText=this.original.slice(0,this.middle-5)+this.getEllipsis(),this.setState({text:this.original.slice(0,this.middle-5)+this.getEllipsis()})}}},{key:"moveMarkers",value:function(e){this.element.clientHeight<=e?this.start=this.middle+1:this.end=this.middle-1}},{key:"getClassName",value:function(){var e=this.props.className||"";return"clamp-lines ".concat(e)}},{key:"getEllipsis",value:function(){return this.watch&&!this.state.noClamp?this.props.ellipsis:""}},{key:"getButton",value:function(){if(!this.state.noClamp&&this.props.buttons){var e=this.watch?this.props.moreText:this.props.lessText;return r.a.createElement("button",{className:"clamp-lines__button",onClick:this.clickHandler,"aria-controls":"clamped-content-".concat(this.uuid),"aria-expanded":!this.state.expanded},e)}}},{key:"clickHandler",value:function(e){var t=this.props.stopPropagation;e.preventDefault(),t&&e.stopPropagation(),this.watch=!this.watch,this.watch?this.clampLines():this.setState({text:this.original}),this.setState({expanded:!this.state.expanded})}},{key:"render",value:function(){var e=this;if(!this.props.text)return null;var t=r.a.createElement(this.props.innerElement,{ref:function(t){e.element=t},id:"clamped-content-".concat(this.uuid),"aria-hidden":this.state.expanded},this.state.text);return r.a.createElement("div",{className:this.getClassName()},t,this.getButton())}}])&&s(n.prototype,o),t}();p.propTypes={text:i.a.string.isRequired,id:i.a.string.isRequired,lines:i.a.number,ellipsis:i.a.string,buttons:i.a.bool,moreText:i.a.string,lessText:i.a.string,className:i.a.string,delay:i.a.number,stopPropagation:i.a.bool,innerElement:i.a.string},p.defaultProps={lines:3,ellipsis:"...",buttons:!0,moreText:"Read more",lessText:"Read less",delay:300,innerElement:"div"}},function(e,t,n){"use strict";var a=n(4);function r(){}function o(){}o.resetWarningCache=r,e.exports=function(){function e(e,t,n,r,o,i){if(i!==a){var c=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw c.name="Invariant Violation",c}}function t(){return e}e.isRequired=e;var n={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:o,resetWarningCache:r};return n.PropTypes=n,n}},function(e,t,n){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"}])},358:function(e,t,n){"use strict";e.exports=n(359)},359:function(e,t,n){"use strict";var a=60103,r=60106,o=60107,i=60108,c=60114,s=60109,l=60110,u=60112,m=60113,p=60120,d=60115,f=60116,h=60121,b=60122,g=60117,v=60129,y=60131;if("function"===typeof Symbol&&Symbol.for){var E=Symbol.for;a=E("react.element"),r=E("react.portal"),o=E("react.fragment"),i=E("react.strict_mode"),c=E("react.profiler"),s=E("react.provider"),l=E("react.context"),u=E("react.forward_ref"),m=E("react.suspense"),p=E("react.suspense_list"),d=E("react.memo"),f=E("react.lazy"),h=E("react.block"),b=E("react.server.block"),g=E("react.fundamental"),v=E("react.debug_trace_mode"),y=E("react.legacy_hidden")}function j(e){if("object"===typeof e&&null!==e){var t=e.$$typeof;switch(t){case a:switch(e=e.type){case o:case c:case i:case m:case p:return e;default:switch(e=e&&e.$$typeof){case l:case u:case f:case d:case s:return e;default:return t}}case r:return t}}}var O=s,w=a,x=u,S=o,_=f,k=d,C=r,I=c,N=i,T=m;t.ContextConsumer=l,t.ContextProvider=O,t.Element=w,t.ForwardRef=x,t.Fragment=S,t.Lazy=_,t.Memo=k,t.Portal=C,t.Profiler=I,t.StrictMode=N,t.Suspense=T,t.isAsyncMode=function(){return!1},t.isConcurrentMode=function(){return!1},t.isContextConsumer=function(e){return j(e)===l},t.isContextProvider=function(e){return j(e)===s},t.isElement=function(e){return"object"===typeof e&&null!==e&&e.$$typeof===a},t.isForwardRef=function(e){return j(e)===u},t.isFragment=function(e){return j(e)===o},t.isLazy=function(e){return j(e)===f},t.isMemo=function(e){return j(e)===d},t.isPortal=function(e){return j(e)===r},t.isProfiler=function(e){return j(e)===c},t.isStrictMode=function(e){return j(e)===i},t.isSuspense=function(e){return j(e)===m},t.isValidElementType=function(e){return"string"===typeof e||"function"===typeof e||e===o||e===c||e===v||e===i||e===m||e===p||e===y||"object"===typeof e&&null!==e&&(e.$$typeof===f||e.$$typeof===d||e.$$typeof===s||e.$$typeof===l||e.$$typeof===u||e.$$typeof===g||e.$$typeof===h||e[0]===b)},t.typeOf=j},377:function(e,t,n){"use strict";n.r(t);var a=n(19),r=n(0),o=n.n(r),i=n(42),c=n.n(i),s=n(6),l=n(44),u=n(72),m=n(31),p=n(225),d=n(61),f=n(64),h=n(343),b=n(52),g=n(347),v=n(348),y=n(9),E=n(22),j=n(328),O=n(114),w=n(325),x=n(344),S=n(21),_=n(11),k=Object(u.a)((function(e){var t;return{container:(t={},Object(y.a)(t,e.breakpoints.only("xs"),{margin:e.spacing(2,0)}),Object(y.a)(t,"position","relative"),Object(y.a)(t,"width","inherit"),t),horizontalScrollItemSpacing:{margin:e.spacing(0,1)},lastEntry:{padding:e.spacing(1.5)}}})),C=function(){var e=k(),t=Object(m.a)(),n=Object(p.a)(t.breakpoints.only("xs")),i=Object(p.a)(t.breakpoints.only("sm")),c=Object(p.a)(t.breakpoints.only("md")),l=Object(p.a)(t.breakpoints.up("lg")),u=Object(s.c)((function(e){return e.tvShows.tvShow})),f=Object(E.g)(),h=Object(r.useState)(0),b=Object(a.a)(h,2),g=b[0],v=b[1],y=u.cast,C=u.name,I=u.original_name;Object(r.useEffect)((function(){v(Object(S.d)(n,i))}),[n,i,c,l]);return o.a.createElement(d.a,{container:!0,className:e.container},o.a.createElement(w.a,{appbarTitle:[C||I,"Cast"],collapsedClickEvent:function(){return Object(S.h)("tvshow-cast")},collapsedContent:o.a.createElement(j.a,{handleSeeMore:function(){f.push("".concat(f.location.pathname,"/").concat("cast"))},isWithSeeMore:y.length>_.o,scrollAmount:144},y.slice(0,_.o).map((function(t){return o.a.createElement("div",{className:e.horizontalScrollItemSpacing,key:"tv-show-cast-person-avatar-".concat(t.id)},o.a.createElement(x.a,{character:t.character,col:12,image:t.profile_path,name:t.name,isHorizontalScroll:!0}))})),y.length<=_.o&&n&&o.a.createElement("div",{className:e.lastEntry})),expandedContent:o.a.createElement(d.a,{container:!0,spacing:2},o.a.createElement(O.a,{contents:y,maxItemPerLoad:20,node:o.a.createElement(x.a,null),otherProps:{col:12/g},type:"itemCast"})),isButtonShown:y.length>_.o,sectionId:"cast",seeMoreText:"Show all ".concat(y.length," cast")}))},I=n(36),N=n(320),T=n(239),P=n(312),L=n(1),M=n(3),R=(n(7),n(358),n(2)),Y=n(4),W={small:-16,medium:null},z=r.forwardRef((function(e,t){var n=e.children,a=e.classes,o=e.className,i=e.max,c=void 0===i?5:i,s=e.spacing,l=void 0===s?"medium":s,u=Object(M.a)(e,["children","classes","className","max","spacing"]),m=c<2?2:c,p=r.Children.toArray(n).filter((function(e){return r.isValidElement(e)})),d=p.length>m?p.length-m+1:0,f=l&&void 0!==W[l]?W[l]:-l;return r.createElement("div",Object(L.a)({className:Object(R.a)(a.root,o),ref:t},u),p.slice(0,p.length-d).map((function(e,t){return r.cloneElement(e,{className:Object(R.a)(e.props.className,a.avatar),style:Object(L.a)({zIndex:p.length-t,marginLeft:0===t?void 0:f},e.props.style)})})),d?r.createElement(T.a,{className:a.avatar,style:{zIndex:0,marginLeft:f}},"+",d):null)})),D=Object(Y.a)((function(e){return{root:{display:"flex"},avatar:{border:"2px solid ".concat(e.palette.background.default),marginLeft:-8,"&:first-child":{marginLeft:0}}}}),{name:"MuiAvatarGroup"})(z),$=n(113);function B(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function H(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function V(e,t){return(V=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function A(e){return(A=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function F(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function U(e){return(U="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function q(e,t){return!t||"object"!==U(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}var G=n(357),J=n.n(G),K=n(240),Q=n(227),X=n(16),Z=Object(X.a)(r.createElement("path",{d:"M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"}),"KeyboardArrowDown"),ee=n(373),te=Object(K.a)(Q.a)((function(e){return{marginTop:"8px !important",width:"100%",color:e.theme.palette.text.secondary,zIndex:1}})),ne=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&V(e,t)}(c,e);var t,n,a,r,i=(t=c,function(){var e,n=A(t);if(F()){var a=A(this).constructor;e=Reflect.construct(n,arguments,a)}else e=n.apply(this,arguments);return q(this,e)});function c(){return B(this,c),i.apply(this,arguments)}return n=c,(a=[{key:"getButton",value:function(){return this.state.noClamp||!this.props.buttons?null:o.a.createElement(te,{"aria-controls":"clamped-content-".concat(this.uuid),"aria-expanded":!this.state.expanded,className:"line-clamp-button",onClick:this.clickHandler,size:"small"},this.watch?o.a.createElement(Z,null):o.a.createElement(ee.a,null))}},{key:"render",value:function(){var e=this;if(!this.props.text)return null;var t=o.a.createElement(this.props.innerElement,{ref:function(t){e.element=t},id:"clamped-content-".concat(this.uuid),"aria-hidden":this.state.expanded},this.state.text);return o.a.createElement("div",{className:this.getClassName()},t,this.getButton())}}])&&H(n.prototype,a),r&&H(n,r),c}(J.a),ae=Object(u.a)((function(e){return{gridItem:{marginBottom:e.spacing(1),maxWidth:"100%"},dividerContainer:Object(y.a)({paddingTop:e.spacing(3),paddingBottom:e.spacing(2)},e.breakpoints.only("xs"),{paddingTop:e.spacing(4)}),image:{border:"1px solid ".concat(e.palette.brokenImage.border),borderRadius:e.shape.borderRadius,height:e.spacing(25),objectFit:"cover",objectPosition:"50% 0%",width:"100%"},brokenImageContainer:{alignItems:"center",borderRadius:e.shape.borderRadius,display:"flex",justifyContent:"center",marginBottom:e.spacing(.5),padding:e.spacing(1)},avatar:{border:"1px solid ".concat(e.palette.brokenImage.border),height:e.spacing(4),width:e.spacing(4)}}})),re=function(e,t){return e&&o.a.createElement(d.a,{item:!0,xs:6},o.a.createElement(I.a,{color:"textSecondary",variant:"caption"},t),o.a.createElement(I.a,{variant:"body2"},e.name||e.original_name))},oe=function(e){var t=e.episode,n=e.isCollapsed,r=e.isLastItem,i=Object(m.a)(),s=Object(p.a)(i.breakpoints.only("xs")),u=Object(p.a)(i.breakpoints.only("md")),f=ae(),h=Object(l.a)(),b=Object(a.a)(h,3)[2],g=b&&0!==b.length,v=u?12:10,y=t.air_date,E=t.crew,j=t.episode_number,O=t.guest_stars,w=t.name,x=t.overview,S=t.still_path;if(!y||c()(y).diff(c()())>0)return null;var k=_.v;S&&(k+="/w780".concat(S));var C=E.filter((function(e){return"Director"===e.job})),L=Object(a.a)(C,1)[0],M=E.filter((function(e){return"Writer"===e.job})),R=Object(a.a)(M,1)[0],Y=g?12:6;return o.a.createElement(d.a,{container:!0,direction:"column",item:!0,md:n?6:Y,sm:n?6:Y,xs:12},o.a.createElement(d.a,{item:!0,className:f.gridItem},S?o.a.createElement("img",{className:f.image,alt:"Season cover",src:k}):o.a.createElement($.a,{type:"baseImage",extraClass:"".concat(f.activeImage," ").concat(f.image," ").concat(f.brokenImageContainer)})),o.a.createElement(d.a,{item:!0,className:f.gridItem},o.a.createElement(I.a,{noWrap:!0},"".concat(j," \xb7 ").concat(w)),o.a.createElement(I.a,{color:"textSecondary",variant:"body2",noWrap:!0,gutterBottom:!0},y?c()(y).format("MMM D, YYYY"):_.D)),o.a.createElement(d.a,{item:!0,className:f.gridItem},o.a.createElement(ne,{text:x,lines:2,ellipsis:"...",moreText:"read more",lessText:"read less",className:"line-clamp"})),L&&Object.keys(L).length>0&&R&&Object.keys(R).length>0&&o.a.createElement(d.a,{item:!0,className:f.gridItem,container:!0},re(L,"Director"),re(R,"Writer")),O.length>0&&o.a.createElement(d.a,{item:!0,className:f.gridItem},o.a.createElement(I.a,{color:"textSecondary",variant:"caption"},"Guests"),o.a.createElement(D,{max:v},O.map((function(e,t){var n=e.id,a=e.profile_path,r=_.v;return S&&(r+="/w780".concat(a)),t<v?o.a.createElement(N.a,{enterTouchDelay:50,key:"tv-show-episode-avatar-group-".concat(n),title:"".concat(e.character," / ").concat(e.name),placement:"top"},o.a.createElement(T.a,{className:f.avatar,src:r})):null})))),!n&&(s||g)&&r&&o.a.createElement(d.a,{item:!0,className:f.dividerContainer},o.a.createElement(P.a,null)))};oe.defaultProps={episode:{air_date:"",crew:[],episode_number:0,guest_stars:[],name:"",overview:"",still_path:""},isCollapsed:!1,isLastItem:!1};var ie=oe,ce=function(){var e=Object(m.a)(),t=Object(p.a)(e.breakpoints.only("xs")),n=Object(s.c)((function(e){return e.tvShows.episodes})),a=Object(s.c)((function(e){return e.tvShows.isSeasonLoading})),r=Object(s.c)((function(e){return e.tvShows.isTVShowLoading})),i=Object(s.c)((function(e){return e.tvShows.selectedSeason})),l=Object(s.c)((function(e){return e.tvShows.tvShow})),u=l.name,h=l.original_name,b=t?1:2,g=n.filter((function(e){return!e.air_date&&e.air_date.length>0||c()(e.air_date).diff(c()())<0})),v=function(e,n){return o.a.createElement(d.a,{container:!0,spacing:t?3:2},o.a.createElement(O.a,{contents:e,hideLoader:n,node:o.a.createElement(ie,null),otherProps:{isCollapsed:n},type:"tvShowEpisode"}))};return a||r?o.a.createElement(f.a,{label:"Getting episodes from Season ".concat(i,"...")}):o.a.createElement(w.a,{appbarTitle:[u||h,"Season ".concat(i," Episodes")],collapsedClickEvent:function(){return Object(S.h)("tvshow-episodes")},collapsedContent:v(g.slice(0,b),!0),expandedContent:v(g,!1),isButtonShown:g.length>b,isEpisode:!0,maxWidth:"sm",sectionId:"episodes",seeMoreText:"Show all ".concat(g.length," episodes")})},se=n(321),le=n(345),ue=n(349),me=n(327),pe=Object(u.a)((function(e){return{title:{fontWeight:600},subtitle:{fontWeight:400},chip:{margin:e.spacing(.25,.5,.25,0)},releaseYear:Object(y.a)({color:e.palette.text.secondary,fontSize:e.typography.h4.fontSize,fontWeight:e.typography.fontWeightLight,marginLeft:e.spacing(2)},e.breakpoints.only("xs"),{marginLeft:e.spacing(1),fontSize:e.typography.h5.fontSize})}})),de=function(e){var t=e.sectionVisibility,n=pe(),a=Object(m.a)(),r=Object(p.a)(a.breakpoints.only("xs")),i=Object(s.c)((function(e){return e.tvShows.tvShow})),l=i.episode_run_time,u=i.facebook,f=i.first_air_date,h=i.genres,b=i.imdb,g=i.instagram,v=i.name,y=i.original_name,E=i.overview,j=i.status,O=i.tagline,w=i.tmdb,x=i.twitter,k=_.K.filter((function(e){return t[e.visibilityId]})),C=~~(l[0]/60),N=l[0]%60;return o.a.createElement(d.a,{item:!0,xs:12,container:!0,spacing:2},o.a.createElement(d.a,{item:!0,xs:12},o.a.createElement(I.a,{className:n.title,variant:r?"h4":"h2"},v||y,f&&o.a.createElement("span",{className:n.releaseYear},"(".concat(c()(f).format("YYYY"),")")))),o.a.createElement(d.a,{item:!0,xs:12,container:!0,alignItems:"center"},o.a.createElement(I.a,{className:n.subtitle,color:"textSecondary",variant:r?"body1":"h6"},f?c()(f).format("MMM D, YYYY"):_.D,l.length>0&&" \xb7 ".concat(C>0?"".concat(C,"hr"):""," ").concat(0!==N?"".concat(N,"min"):""))),o.a.createElement(d.a,{item:!0,xs:12},o.a.createElement(se.a,{className:n.chip,label:Object(S.g)(j),size:"small"}),h.map((function(e){return o.a.createElement(se.a,{key:"tv-show-header-chip-".concat(e.id),className:n.chip,label:e.name,size:"small",variant:"outlined"})}))),o.a.createElement(d.a,{item:!0,xs:12},o.a.createElement(ue.a,{facebook:u,imdb:b,instagram:g,tmdb:w,twitter:x})),E&&E.length>0&&o.a.createElement(d.a,{item:!0,xs:12},o.a.createElement(me.a,{overview:E,maxWords:_.E})),O&&o.a.createElement(d.a,{item:!0,xs:12},o.a.createElement(I.a,{color:"textSecondary",gutterBottom:!0,variant:"body1"},o.a.createElement("em",null,O))),o.a.createElement(d.a,{item:!0,xs:12},o.a.createElement(le.a,{content:k})))},fe=n(346),he=Object(u.a)((function(e){return{title:{fontWeight:e.typography.h6.fontWeight,width:"100%"}}})),be=function(){var e=Object(m.a)(),t=Object(p.a)(e.breakpoints.only("xs")),n=he(),a=Object(s.c)((function(e){return e.tvShows.tvShow})),r=a.created_by,i=a.networks,c=a.production_companies,l=a.production_countries,u=a.spoken_languages,f=r&&r.length>0,h=i&&i.length>0,b=c&&c.length>0,g=l&&l.length>0,v=u&&u.length>0,y=function(e,a){return o.a.createElement(d.a,{item:!0,xs:t?12:6,container:!0},o.a.createElement(I.a,{variant:"body1",gutterBottom:!0,className:n.title},e),a)};return o.a.createElement(d.a,{item:!0,container:!0},o.a.createElement(d.a,{alignItems:"flex-start",container:!0,direction:"row",item:!0,justify:"flex-start",spacing:3,xs:12},f&&y("Created by",r.map((function(e){var t=e.id,n=e.name,a=e.profile_path;return o.a.createElement(d.a,{item:!0,key:"tv-show-production-created-by-chip-".concat(t)},o.a.createElement(fe.a,{image:a,name:n}))}))),h&&y("Network",i.map((function(e){var t=e.id,n=e.logo_path,a=e.name,r=e.origin_country;return o.a.createElement(d.a,{item:!0,key:"tv-show-production-network-chip-".concat(t)},o.a.createElement(fe.a,{country:r,image:n,name:a}))}))),b&&y("Companies",c.map((function(e){var t=e.id,n=e.logo_path,a=e.name,r=e.origin_country;return o.a.createElement(d.a,{item:!0,key:"tv-show-production-production-company-chip-".concat(t)},o.a.createElement(fe.a,{country:r,image:n,name:a}))}))),g&&y("Country",o.a.createElement(I.a,null,Object(S.c)(l.map((function(e){return"".concat(e.name," (").concat(e.iso_3166_1,")")}))))),v&&y("Spoken Languages",o.a.createElement(I.a,null,Object(S.c)(u.map((function(e){return"".concat(e.english_name," (").concat(e.iso_639_1,")")})))))))},ge=n(336),ve=function(e){var t=e.anchorId,n=Object(s.c)((function(e){return e.tvShows.tvShow})),a=n.name,r=n.original_name,i=n.recommendations;return i?o.a.createElement(ge.a,{anchorId:t,appbarTitle:[a||r,"Recommendations"],areRecommendations:!0,items:i,overview:"If you liked ".concat(a||r,", check out these other TV shows:")}):null},ye=function(){var e=Object(s.c)((function(e){return e.tvShows.episodes})),t=Object(s.c)((function(e){return e.tvShows.selectedSeason})),n=Object(s.c)((function(e){return e.tvShows.tvShow})).seasons,a=Object(S.i)(n,t),r=a.air_date,i=a.name,l=a.overview,u=e.filter((function(e){return!e.air_date&&e.air_date.length>0||c()(e.air_date).diff(c()())<0})).length;return o.a.createElement(d.a,{item:!0,container:!0,spacing:2},o.a.createElement(d.a,{item:!0,xs:12},o.a.createElement(I.a,{variant:"h6"},i),o.a.createElement(I.a,{color:"textSecondary"},r?c()(r).format("MMM D, YYYY"):_.D,u>0&&o.a.createElement(o.a.Fragment,null,"\xa0\xa0\xb7\xa0\xa0","".concat(u," episode").concat(u>1?"s":"")))),l&&o.a.createElement(d.a,{item:!0,xs:12},o.a.createElement(me.a,{overview:l,maxWords:_.E})))},Ee=n(30),je=n(8),Oe=Object(u.a)((function(e){return{container:{position:"relative"},image:{border:"1px solid ".concat(e.palette.brokenImage.border),borderRadius:e.shape.borderRadius,height:e.spacing(25),objectFit:"cover",objectPosition:"50% 0%",width:e.spacing(18.75)},activeImage:{border:"1px solid ".concat(e.palette.divider," !important"),borderRadius:e.shape.borderRadius},emphasis:{fontWeight:600},horizontalScrollItemSpacing:Object(y.a)({border:"1px solid transparent",cursor:"pointer",margin:0,padding:e.spacing(1),maxWidth:e.spacing(22.25)},e.breakpoints.only("xs"),{"&:last-child":{marginRight:e.spacing(2)}}),gridItem:{maxWidth:"100%"},brokenImageContainer:{alignItems:"center",display:"flex",justifyContent:"center",padding:e.spacing(1)},lastEntry:{width:e.spacing(2.5)}}})),we=function(){var e=Object(m.a)(),t=Object(p.a)(e.breakpoints.only("xs")),n=Oe(),a=Object(s.c)((function(e){return e.tvShows.tvShow})),r=Object(s.c)((function(e){return e.tvShows.selectedSeason})),i=Object(s.b)(),l=a.seasons;return o.a.createElement(d.a,{container:!0,item:!0,xs:12,className:n.container},o.a.createElement(j.a,{imageSize:e.spacing(28),scrollAmount:e.spacing(63)},l.map((function(e){var t=e.air_date,s=e.id,l=e.name,u=e.poster_path,m=e.season_number,p=m===r,f=0===m?l:"S".concat(m),h=_.v;return u&&(h+="/w780".concat(u)),o.a.createElement(d.a,{className:Object(R.a)(n.horizontalScrollItemSpacing,Object(y.a)({},n.activeImage,p)),container:!0,direction:"column",onClick:function(){var e;r!==(e=m)&&(Object(Ee.i)(Object(S.b)(),a.id,e,(function(e){i(je.j.setEpisode(e))}),(function(){})),i(je.j.setSelectedSeason(e)))},spacing:1,key:"tv-show-season-list-".concat(s)},o.a.createElement(d.a,{item:!0,className:n.gridItem},u?o.a.createElement("img",{className:n.image,alt:"Season cover",src:h}):o.a.createElement($.a,{type:"baseImage",extraClass:"".concat(n.activeImage," ").concat(n.image," ").concat(n.brokenImageContainer)})),o.a.createElement(d.a,{item:!0,className:n.gridItem},o.a.createElement(I.a,{noWrap:!0,className:Object(R.a)(Object(y.a)({},n.emphasis,p))},f),o.a.createElement(I.a,{color:"textSecondary",variant:"body2",noWrap:!0},t?c()(t).format("MMM D, YYYY"):_.D)))})),t&&o.a.createElement(d.a,{container:!0,direction:"column",spacing:1},o.a.createElement(d.a,{item:!0,className:n.lastEntry}))))},xe=n(334),Se=function(){var e=Object(s.c)((function(e){return e.tvShows.tvShow})),t=e.number_of_episodes,n=e.number_of_seasons;return o.a.createElement(d.a,{item:!0,container:!0,justify:"center",alignItems:"center"},o.a.createElement(xe.a,{col:6,count:n,label:"Seasons",divider:!0}),o.a.createElement(xe.a,{col:6,count:t,label:"Episodes"}))},_e=Object(u.a)((function(e){return{root:{padding:e.spacing(0,2)},note:{padding:e.spacing(8,2)}}}));t.default=function(){var e=Object(m.a)(),t=Object(p.a)(e.breakpoints.only("xs")),n=_e(),i=Object(s.c)((function(e){return e.tvShows.episodes})),u=Object(s.c)((function(e){return e.sidebar.itemDrawerOpen})),y=Object(s.c)((function(e){return e.tvShows.isTVShowLoading})),E=Object(s.c)((function(e){return e.tvShows.tvShow})),j=Object(s.b)(),O=Object(r.useState)(!0),w=Object(a.a)(O,2),x=w[0],k=w[1],I=Object(l.a)(),N=Object(a.a)(I,2)[1],T=E.cast,P=E.created_by,L=E.first_air_date,M=E.name,R=E.number_of_episodes,Y=E.number_of_seasons,W=E.original_name,z=E.production_companies,D=E.recommendations,$=E.seasons,B=E.tmdb,H={cast:T&&T.length>0,episodes:i.filter((function(e){return!e.air_date&&e.air_date.length>0||c()(e.air_date).diff(c()())<0})).length>0,production:P&&P.length>0||z&&z.length>0,recommendations:D&&D.length>0,seasonList:$&&$.length>0},V=!Number.isNaN(R)&&!Number.isNaN(Y)&&0!==R&&0!==Y;return Object(r.useEffect)((function(){"search"!==N&&N&&Object(Ee.h)(Object(S.b)(),N,(function(e){var t=e.seasons;if(t){var n=t.sort((function(e,t){return t.season_number-e.season_number})).find((function(e){return e.season_number>0&&e.air_date})).season_number;Object(Ee.i)(Object(S.b)(),N,n,(function(t){j(je.j.setActiveTVShow(e,t,n)),j(je.j.setDetailsLoading(!1)),k(!0)}),(function(e){j(je.j.setActiveTVShow({})),k(e.response.data.status_code)}))}}),(function(e){e.response&&(j(je.j.setActiveTVShow({})),k(e.response.data.status_code))}))}),[N,j]),void 0===N||"search"===N?o.a.createElement("div",{className:n.note},o.a.createElement(b.a,{details:_.z})):y?o.a.createElement(f.a,{location:"itemcontainer"}):34===x?o.a.createElement("div",{className:n.note},o.a.createElement(b.a,{details:_.C})):0===Object.keys(E).length&&E.constructor===Object?o.a.createElement(f.a,{location:"itemcontainer"}):o.a.createElement(o.a.Fragment,null,o.a.createElement(d.a,{container:!0,spacing:t?4:8,className:n.root},o.a.createElement(v.a,{anchorId:"tvshow-budget",divider:!V,isCollapsible:!1,visible:0!==Object.keys(E).length&&E.constructor===Object},o.a.createElement(de,{sectionVisibility:H})),o.a.createElement(v.a,{anchorId:"tvshow-statistics",isCollapsible:!1,visible:V},o.a.createElement(Se,null)),o.a.createElement(v.a,{anchorId:"tvshow-seasons",divider:!1,title:"Seasons",visible:H.seasonList},o.a.createElement(we,null)),o.a.createElement(v.a,{anchorId:"tvshow-season-details",divider:!H.episodes,isCollapsible:!1,visible:H.seasonList},o.a.createElement(ye,null)),o.a.createElement(v.a,{anchorId:"tvshow-episodes",isCollapsible:!1,title:"Episodes",visible:H.episodes},o.a.createElement(ce,null)),o.a.createElement(v.a,{anchorId:"tvshow-cast",title:"Cast",visible:H.cast},o.a.createElement(C,null)),o.a.createElement(v.a,{anchorId:"tvshow-production",title:"Production",visible:H.production},o.a.createElement(be,null)),o.a.createElement(v.a,{anchorId:"tvshow-recommendations",title:"Recommendations",visible:H.recommendations},o.a.createElement(ve,{anchorId:"tvshow-recommendations"})),o.a.createElement(v.a,{anchorId:"tvshow-end-credits",divider:!1},o.a.createElement(h.a,{companies:z.map((function(e){return e.name})),link:B,title:M||W,year:L?c()(L).format("YYYY"):""}))),!u&&o.a.createElement(g.a,null))}}}]);
//# sourceMappingURL=3.04bc9c03.chunk.js.map
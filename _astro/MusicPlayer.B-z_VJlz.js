import{o as Da,b as Pa,i as za,a as N,s as rt,e as je}from"./props.Dw034hrW.js";import{a3 as $a,ao as Ia,au as Ra,av as Wa,o as Na,u as Ya,aw as qa,ax as ze,ay as Oa,v as Ka,az as ht,k as nt,i as tt,a as Y,p as Ua,b as Ha,s as o,m as F,ar as K,g as t,f as vt,d as v,c as r,r as i,n as Xa,t as Dt,j as h}from"./utils.0oUQ-pTb.js";import{a as Ga,s as V}from"./render.-PRsip0X.js";import{i as z,I as f}from"./Icon._Xld6K1j.js";import{e as Va,i as Ja}from"./each.CXuFkqAm.js";import{b as Se}from"./this.B2lb3xkQ.js";import{m as xt}from"./config.DCMDreeA.js";import{I as Qa}from"./zh_TW.D-fhrWWx.js";import{i as Za}from"./translation.DZASLY01.js";const ti=()=>performance.now(),J={tick:c=>requestAnimationFrame(c),now:()=>ti(),tasks:new Set};function $e(){const c=J.now();J.tasks.forEach(n=>{n.c(c)||(J.tasks.delete(n),n.f())}),J.tasks.size!==0&&J.tick($e)}function ei(c){let n;return J.tasks.size===0&&J.tick($e),{promise:new Promise(w=>{J.tasks.add(n={c,f:w})}),abort(){J.tasks.delete(n)}}}function Pt(c,n){ze(()=>{c.dispatchEvent(new CustomEvent(n))})}function ai(c){if(c==="float")return"cssFloat";if(c==="offset")return"cssOffset";if(c.startsWith("--"))return c;const n=c.split("-");return n.length===1?n[0]:n[0]+n.slice(1).map(w=>w[0].toUpperCase()+w.slice(1)).join("")}function De(c){const n={},w=c.split(";");for(const k of w){const[T,B]=k.split(":");if(!T||B===void 0)break;const $=ai(T.trim());n[$]=B.trim()}return n}const ii=c=>c;function ri(c,n,w,k){var T=(c&qa)!==0,B="both",$,x=n.inert,A=n.style.overflow,d,b;function P(){return ze(()=>$??=w()(n,k?.()??{},{direction:B}))}var E={is_global:T,in(){n.inert=x,Pt(n,"introstart"),d=ae(n,P(),b,1,()=>{Pt(n,"introend"),d?.abort(),d=$=void 0,n.style.overflow=A})},out(S){n.inert=!0,Pt(n,"outrostart"),b=ae(n,P(),d,0,()=>{Pt(n,"outroend"),S?.()})},stop:()=>{d?.abort(),b?.abort()}},M=$a;if((M.transitions??=[]).push(E),Ga){var j=T;if(!j){for(var u=M.parent;u&&(u.f&Ia)!==0;)for(;(u=u.parent)&&(u.f&Ra)===0;);j=!u||(u.f&Wa)!==0}j&&Na(()=>{Ya(()=>E.in())})}}function ae(c,n,w,k,T){var B=k===1;if(Oa(n)){var $,x=!1;return Ka(()=>{if(!x){var S=n({direction:B?"in":"out"});$=ae(c,S,w,k,T)}}),{abort:()=>{x=!0,$?.abort()},deactivate:()=>$.deactivate(),reset:()=>$.reset(),t:()=>$.t()}}if(w?.deactivate(),!n?.duration)return T(),{abort:ht,deactivate:ht,reset:ht,t:()=>k};const{delay:A=0,css:d,tick:b,easing:P=ii}=n;var E=[];if(B&&w===void 0&&(b&&b(0,1),d)){var M=De(d(0,1));E.push(M,M)}var j=()=>1-k,u=c.animate(E,{duration:A,fill:"forwards"});return u.onfinish=()=>{u.cancel();var S=w?.t()??1-k;w?.abort();var g=k-S,et=n.duration*Math.abs(g),at=[];if(et>0){var I=!1;if(d)for(var p=Math.ceil(et/16.666666666666668),y=0;y<=p;y+=1){var a=S+g*P(y/p),Q=De(d(a,1-a));at.push(Q),I||=Q.overflow==="hidden"}I&&(c.style.overflow="hidden"),j=()=>{var U=u.currentTime;return S+g*P(U/et)},b&&ei(()=>{if(u.playState!=="running")return!1;var U=j();return b(U,1-U),!0})}u=c.animate(at,{duration:et,fill:"forwards"}),u.onfinish=()=>{j=()=>k,b?.(k,1-k),T()}},{abort:()=>{u&&(u.cancel(),u.effect=null,u.onfinish=ht)},deactivate:()=>{T=ht},reset:()=>{k===0&&b?.(1,0)},t:()=>j()}}function Pe(c){return function(...n){var w=n[0];return w.stopPropagation(),c?.apply(this,n)}}function ni(c){const n=c-1;return n*n*n+1}function si(c,{delay:n=0,duration:w=400,easing:k=ni,axis:T="y"}={}){const B=getComputedStyle(c),$=+B.opacity,x=T==="y"?"height":"width",A=parseFloat(B[x]),d=T==="y"?["top","bottom"]:["left","right"],b=d.map(g=>`${g[0].toUpperCase()}${g.slice(1)}`),P=parseFloat(B[`padding${b[0]}`]),E=parseFloat(B[`padding${b[1]}`]),M=parseFloat(B[`margin${b[0]}`]),j=parseFloat(B[`margin${b[1]}`]),u=parseFloat(B[`border${b[0]}Width`]),S=parseFloat(B[`border${b[1]}Width`]);return{delay:n,duration:w,easing:k,css:g=>`overflow: hidden;opacity: ${Math.min(g*20,1)*$};${x}: ${g*A}px;padding-${d[0]}: ${g*P}px;padding-${d[1]}: ${g*E}px;margin-${d[0]}: ${g*M}px;margin-${d[1]}: ${g*j}px;border-${d[0]}-width: ${g*u}px;border-${d[1]}-width: ${g*S}px;min-${x}: 0`}}var li=vt('<div class="fixed bottom-20 left-4 z-[60] max-w-sm"><div class="bg-red-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-slide-up"><!> <span class="text-sm flex-1"> </span> <button class="text-white/80 hover:text-white transition-colors"><!></button></div></div>'),oi=vt('<div class="flex space-x-0.5"><div class="w-0.5 h-3 bg-white rounded-full animate-pulse"></div> <div class="w-0.5 h-4 bg-white rounded-full animate-pulse" style="animation-delay: 150ms;"></div> <div class="w-0.5 h-2 bg-white rounded-full animate-pulse" style="animation-delay: 300ms;"></div></div>'),ui=vt('<span class="text-sm text-[var(--content-meta)]"></span>'),ci=vt('<div role="button" tabindex="0"><div class="w-6 h-6 flex items-center justify-center"><!></div> <div class="w-10 h-10 rounded-lg overflow-hidden bg-[var(--btn-regular-bg)] flex-shrink-0"><img class="w-full h-full object-cover"/></div> <div class="flex-1 min-w-0"><div> </div> <div> </div></div></div>'),di=vt('<div class="playlist-panel float-panel fixed bottom-20 left-4 w-80 max-h-96 overflow-hidden z-50"><div class="playlist-header flex items-center justify-between p-4 border-b border-[var(--line-divider)]"><h3 class="text-lg font-semibold text-90"> </h3> <button class="btn-plain w-8 h-8 rounded-lg"><!></button></div> <div class="playlist-content overflow-y-auto max-h-80"></div></div>'),vi=vt(`<!> <div><div role="button" tabindex="0" aria-label="显示音乐播放器"><!></div> <div role="button" tabindex="0" aria-label="展开音乐播放器"><div class="flex items-center gap-3 cursor-pointer"><div class="cover-container relative w-12 h-12 rounded-full overflow-hidden"><img alt="封面"/> <div class="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"><!></div></div> <div class="flex-1 min-w-0"><div class="text-sm font-medium text-90 truncate"> </div> <div class="text-xs text-50 truncate"> </div></div> <div class="flex items-center gap-1"><button class="btn-plain w-8 h-8 rounded-lg flex items-center justify-center" title="隐藏播放器"><!></button> <button class="btn-plain w-8 h-8 rounded-lg flex items-center justify-center"><!></button></div></div></div> <div><div class="flex items-center gap-4 mb-4"><div class="cover-container relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0"><img alt="封面"/></div> <div class="flex-1 min-w-0"><div class="song-title text-lg font-bold text-90 truncate mb-1"> </div> <div class="song-artist text-sm text-50 truncate"> </div> <div class="text-xs text-30 mt-1"> </div></div> <div class="flex items-center gap-1"><button class="btn-plain w-8 h-8 rounded-lg flex items-center justify-center" title="隐藏播放器"><!></button> <button class="btn-plain w-8 h-8 rounded-lg flex items-center justify-center"><!></button></div></div> <div class="progress-section mb-4"><div class="progress-bar flex-1 h-2 bg-[var(--btn-regular-bg)] rounded-full cursor-pointer" role="slider" tabindex="0" aria-label="播放进度" aria-valuemin="0" aria-valuemax="100"><div class="h-full bg-[var(--primary)] rounded-full transition-all duration-100"></div></div></div> <div class="controls flex items-center justify-center gap-2 mb-4"><button><!></button> <button class="btn-plain w-10 h-10 rounded-lg"><!></button> <button><!></button> <button class="btn-plain w-10 h-10 rounded-lg"><!></button> <button><!></button></div> <div class="bottom-controls flex items-center gap-2"><button class="btn-plain w-8 h-8 rounded-lg"><!></button> <div class="flex-1 h-2 bg-[var(--btn-regular-bg)] rounded-full cursor-pointer" role="slider" tabindex="0" aria-label="音量控制" aria-valuemin="0" aria-valuemax="100"><div class="h-full bg-[var(--primary)] rounded-full transition-all duration-100"></div></div> <button><!></button></div></div> <!></div> <style>.orb-player {
	position: relative;
	backdrop-filter: blur(10px);
	-webkit-backdrop-filter: blur(10px);
}
.orb-player::before {
	content: '';
	position: absolute;
	inset: -2px;
	background: linear-gradient(45deg, var(--primary), transparent, var(--primary));
	border-radius: 50%;
	z-index: -1;
	opacity: 0;
	transition: opacity 0.3s ease;
}
.orb-player:hover::before {
	opacity: 0.3;
	animation: rotate 2s linear infinite;
}
.orb-player .animate-pulse {
	animation: musicWave 1.5s ease-in-out infinite;
}
@keyframes rotate {
	from { transform: rotate(0deg); }
	to { transform: rotate(360deg); }
}
@keyframes musicWave {
	0%, 100% { transform: scaleY(0.5); }
	50% { transform: scaleY(1); }
}
.music-player.hidden-mode {
	width: 48px;
	height: 48px;
}
.music-player {
    max-width: 320px;
    -webkit-user-select: none;
       -moz-user-select: none;
            user-select: none;
}
.mini-player {
    width: 280px;
    position: absolute;
    bottom: 0;
    left: 0;
}
.expanded-player {
    width: 320px;
}
.animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
@keyframes pulse {
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: 0.5;
    }
}
.progress-section div:hover,
.bottom-controls > div:hover {
    transform: scaleY(1.2);
    transition: transform 0.2s ease;
}
@media (max-width: 768px) {
    .music-player {
        max-width: 280px;
        left: 8px !important;
        bottom: 8px !important;
    }
    .music-player.expanded {
        width: calc(100vw - 16px);
        max-width: none;
        left: 8px !important;
        right: 8px !important;
    }
    .playlist-panel {
        width: calc(100vw - 16px) !important;
        left: 8px !important;
        right: 8px !important;
        max-width: none;
    }
    .controls {
        gap: 8px;
    }
    .controls button {
        width: 36px;
        height: 36px;
    }
    .controls button:nth-child(3) {
        width: 44px;
        height: 44px;
    }
}
@media (max-width: 480px) {
    .music-player {
        max-width: 260px;
    }
    .song-title {
        font-size: 14px;
    }
    .song-artist {
        font-size: 12px;
    }
    .controls {
        gap: 6px;
        margin-bottom: 12px;
    }
    .controls button {
        width: 32px;
        height: 32px;
    }
    .controls button:nth-child(3) {
        width: 40px;
        height: 40px;
    }
    .playlist-item {
        padding: 8px 12px;
    }
    .playlist-item .w-10 {
        width: 32px;
        height: 32px;
    }
}
@keyframes slide-up {
    from {
        transform: translateY(100%);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}
.animate-slide-up {
    animation: slide-up 0.3s ease-out;
}
@media (hover: none) and (pointer: coarse) {
    .music-player button,
    .playlist-item {
        min-height: 44px;
    }
    .progress-section > div,
    .bottom-controls > div:nth-child(2) {
        height: 12px;
    }
}
/* 自定义旋转动画，停止时保持当前位置 */
@keyframes spin-continuous {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
.cover-container img {
    animation: spin-continuous 3s linear infinite;
    animation-play-state: paused;
}
.cover-container img.spinning {
    animation-play-state: running;
}
/* 让主题色按钮更有视觉反馈 */
button.bg-\\[var\\(--primary\\)\\] {
    box-shadow: 0 0 0 2px var(--primary);
    border: none;
}</style>`,1);function wi(c,n){Ha(n,!1);let w=xt.mode??"meting",k=xt.meting_api??"https://www.bilibili.uno/api?server=:server&type=:type&id=:id&auth=:auth&r=:r",T=xt.id??"14164869977",B=xt.server??"netease",$=xt.type??"playlist",x=F(!1),A=F(!1),d=F(!1),b=F(!1),P=F(0),E=F(0),M=F(.7),j=F(!1),u=F(!1),S=F(!1),g=F(0),et=F(""),at=F(!1),I=F({title:"示例歌曲",artist:"示例艺术家",cover:"/favicon/favicon-light-192.png",url:"",duration:0}),p=F([]),y=F(0),a=F(),Q=F(),U=F();const Ie=[{id:1,title:"ひとり上手",artist:"Kaya",cover:"assets/music/cover/hitori.jpg",url:"assets/music/url/hitori.mp3",duration:240},{id:2,title:"眩耀夜行",artist:"スリーズブーケ",cover:"assets/music/cover/xryx.jpg",url:"assets/music/url/xryx.mp3",duration:180},{id:3,title:"春雷の頃",artist:"22/7",cover:"assets/music/cover/cl.jpg",url:"assets/music/url/cl.mp3",duration:200}];async function Re(){if(!k||!T)return;o(u,!0);const s=k.replace(":server",B).replace(":type",$).replace(":id",T).replace(":auth","").replace(":r",Date.now().toString());try{const D=await fetch(s);if(!D.ok)throw new Error("meting api error");const H=await D.json();o(p,H.map(W=>{let ft=W.name??W.title??"未知歌曲",Et=W.artist??W.author??"未知艺术家",R=W.duration??0;return R>1e4&&(R=Math.floor(R/1e3)),(!Number.isFinite(R)||R<=0)&&(R=0),{id:W.id,title:ft,artist:Et,cover:W.pic??"",url:W.url??"",duration:R}})),t(p).length>0&&$t(t(p)[0]),o(u,!1)}catch{It("Meting 歌单获取失败"),o(u,!1)}}function We(){!t(a)||!t(I).url||(t(x)?t(a).pause():t(a).play())}function yt(){o(A,!t(A)),t(A)&&(o(b,!1),o(d,!1))}function _t(){o(d,!t(d)),t(d)&&(o(A,!1),o(b,!1))}function ie(){o(b,!t(b))}function Ne(){o(S,!t(S))}function Ye(){o(g,(t(g)+1)%3)}function qe(){if(t(p).length<=1)return;const s=t(y)>0?t(y)-1:t(p).length-1;wt(s)}function zt(){if(t(p).length<=1)return;let s;if(t(S))do s=Math.floor(Math.random()*t(p).length);while(s===t(y)&&t(p).length>1);else s=t(y)<t(p).length-1?t(y)+1:0;wt(s)}function wt(s){if(s<0||s>=t(p).length)return;const D=t(x);o(y,s),t(a)&&t(a).pause(),$t(t(p)[t(y)]),(D||!t(x))&&setTimeout(()=>{t(a)&&(t(a).readyState>=2?t(a).play().catch(()=>{}):t(a).addEventListener("canplay",()=>{t(a).play().catch(()=>{})},{once:!0}))},100)}function kt(s){return s.startsWith("http://")||s.startsWith("https://")||s.startsWith("/")?s:`/${s}`}function $t(s){!s||!t(a)||(o(I,{...s}),s.url?(o(u,!0),t(a).pause(),K(a,t(a).currentTime=0),o(P,0),o(E,s.duration??0),t(a).removeEventListener("loadeddata",re),t(a).removeEventListener("error",ne),t(a).removeEventListener("loadstart",se),t(a).addEventListener("loadeddata",re,{once:!0}),t(a).addEventListener("error",ne,{once:!0}),t(a).addEventListener("loadstart",se,{once:!0}),K(a,t(a).src=kt(s.url)),t(a).load()):o(u,!1))}function re(){o(u,!1),t(a)?.duration&&t(a).duration>1&&(o(E,Math.floor(t(a).duration)),t(p)[t(y)]&&K(p,t(p)[t(y)].duration=t(E)),K(I,t(I).duration=t(E)))}function ne(s){o(u,!1),It(`无法播放 "${t(I).title}"，正在尝试下一首...`),t(p).length>1?setTimeout(()=>zt(),1e3):It("播放列表中没有可用的歌曲")}function se(){}function It(s){o(et,s),o(at,!0),setTimeout(()=>{o(at,!1)},3e3)}function Oe(){o(at,!1)}function Ke(s){if(!t(a)||!t(Q))return;const D=t(Q).getBoundingClientRect(),W=(s.clientX-D.left)/D.width*t(E);K(a,t(a).currentTime=W),o(P,W)}function Ue(s){if(!t(a)||!t(U))return;const D=t(U).getBoundingClientRect(),H=Math.max(0,Math.min(1,(s.clientX-D.left)/D.width));o(M,H),K(a,t(a).volume=t(M)),o(j,t(M)===0)}function le(){t(a)&&(o(j,!t(j)),K(a,t(a).muted=t(j)))}function oe(s){if(!Number.isFinite(s)||s<0)return"0:00";const D=Math.floor(s/60),H=Math.floor(s%60);return`${D}:${H.toString().padStart(2,"0")}`}function He(){t(a)&&(t(a).addEventListener("play",()=>{o(x,!0)}),t(a).addEventListener("pause",()=>{o(x,!1)}),t(a).addEventListener("timeupdate",()=>{o(P,t(a).currentTime)}),t(a).addEventListener("ended",()=>{t(g)===1?(K(a,t(a).currentTime=0),t(a).play().catch(()=>{})):t(g)===2||t(y)<t(p).length-1||t(S)?zt():o(x,!1)}),t(a).addEventListener("error",s=>{o(u,!1)}),t(a).addEventListener("stalled",()=>{}),t(a).addEventListener("waiting",()=>{}))}Da(()=>{o(a,new Audio),K(a,t(a).volume=t(M)),He(),w==="meting"?Re():(o(p,Ie),t(p).length>0&&$t(t(p)[0]))}),Pa(()=>{t(a)&&(t(a).pause(),K(a,t(a).src=""))}),za();var ue=nt(),Xe=tt(ue);{var Ge=s=>{var D=vi(),H=tt(D);{var W=e=>{var m=li(),_=r(m),C=r(_);f(C,{icon:"material-symbols:error",class:"text-xl flex-shrink-0"});var L=v(C,2),l=r(L,!0);i(L);var X=v(L,2),ct=r(X);f(ct,{icon:"material-symbols:close",class:"text-lg"}),i(X),i(_),i(m),Dt(()=>V(l,t(et))),h("click",X,Oe),Y(e,m)};z(H,e=>{t(at)&&e(W)})}var ft=v(H,2);let Et;var R=r(ft);let ce;var Ve=r(R);{var Je=e=>{f(e,{icon:"eos-icons:loading",class:"text-white text-lg"})},Qe=e=>{var m=nt(),_=tt(m);{var C=l=>{var X=oi();Y(l,X)},L=l=>{f(l,{icon:"material-symbols:music-note",class:"text-white text-lg"})};z(_,l=>{t(x)?l(C):l(L,!1)},!0)}Y(e,m)};z(Ve,e=>{t(u)?e(Je):e(Qe,!1)})}i(R);var st=v(R,2);let de;var ve=r(st),Rt=r(ve),Wt=r(Rt);let fe;var pe=v(Wt,2),Ze=r(pe);{var ta=e=>{f(e,{icon:"eos-icons:loading",class:"text-white text-xl"})},ea=e=>{var m=nt(),_=tt(m);{var C=l=>{f(l,{icon:"material-symbols:pause",class:"text-white text-xl"})},L=l=>{f(l,{icon:"material-symbols:play-arrow",class:"text-white text-xl"})};z(_,l=>{t(x)?l(C):l(L,!1)},!0)}Y(e,m)};z(Ze,e=>{t(u)?e(ta):e(ea,!1)})}i(pe),i(Rt);var Nt=v(Rt,2),Yt=r(Nt),aa=r(Yt,!0);i(Yt);var me=v(Yt,2),ia=r(me,!0);i(me),i(Nt);var be=v(Nt,2),Ft=r(be),ra=r(Ft);f(ra,{icon:"material-symbols:visibility-off",class:"text-lg"}),i(Ft);var qt=v(Ft,2),na=r(qt);f(na,{icon:"material-symbols:expand-less",class:"text-lg"}),i(qt),i(be),i(ve),i(st);var Bt=v(st,2);let ge;var Ot=r(Bt),Kt=r(Ot),he=r(Kt);let xe;i(Kt);var Ut=v(Kt,2),Ht=r(Ut),sa=r(Ht,!0);i(Ht);var Xt=v(Ht,2),la=r(Xt,!0);i(Xt);var ye=v(Xt,2),oa=r(ye);i(ye),i(Ut);var _e=v(Ut,2),Ct=r(_e),ua=r(Ct);f(ua,{icon:"material-symbols:visibility-off",class:"text-lg"}),i(Ct);var Gt=v(Ct,2),ca=r(Gt);f(ca,{icon:"material-symbols:expand-more",class:"text-lg"}),i(Gt),i(_e),i(Ot);var Vt=v(Ot,2),lt=r(Vt),da=r(lt);i(lt),Se(lt,e=>o(Q,e),()=>t(Q)),i(Vt);var Jt=v(Vt,2),ot=r(Jt);let we;var va=r(ot);f(va,{icon:"material-symbols:shuffle",class:"text-lg"}),i(ot);var pt=v(ot,2),fa=r(pt);f(fa,{icon:"material-symbols:skip-previous",class:"text-xl"}),i(pt);var ut=v(pt,2);let ke;var pa=r(ut);{var ma=e=>{f(e,{icon:"eos-icons:loading",class:"text-xl"})},ba=e=>{var m=nt(),_=tt(m);{var C=l=>{f(l,{icon:"material-symbols:pause",class:"text-xl"})},L=l=>{f(l,{icon:"material-symbols:play-arrow",class:"text-xl"})};z(_,l=>{t(x)?l(C):l(L,!1)},!0)}Y(e,m)};z(pa,e=>{t(u)?e(ma):e(ba,!1)})}i(ut);var mt=v(ut,2),ga=r(mt);f(ga,{icon:"material-symbols:skip-next",class:"text-xl"}),i(mt);var At=v(mt,2);let Ee;var ha=r(At);{var xa=e=>{f(e,{icon:"material-symbols:repeat-one",class:"text-lg"})},ya=e=>{var m=nt(),_=tt(m);{var C=l=>{f(l,{icon:"material-symbols:repeat",class:"text-lg"})},L=l=>{f(l,{icon:"material-symbols:repeat",class:"text-lg opacity-50"})};z(_,l=>{t(g)===2?l(C):l(L,!1)},!0)}Y(e,m)};z(ha,e=>{t(g)===1?e(xa):e(ya,!1)})}i(At),i(Jt);var Fe=v(Jt,2),Lt=r(Fe),_a=r(Lt);{var wa=e=>{f(e,{icon:"material-symbols:volume-off",class:"text-lg"})},ka=e=>{var m=nt(),_=tt(m);{var C=l=>{f(l,{icon:"material-symbols:volume-down",class:"text-lg"})},L=l=>{f(l,{icon:"material-symbols:volume-up",class:"text-lg"})};z(_,l=>{t(M)<.5?l(C):l(L,!1)},!0)}Y(e,m)};z(_a,e=>{t(j)||t(M)===0?e(wa):e(ka,!1)})}i(Lt);var it=v(Lt,2),Ea=r(it);i(it),Se(it,e=>o(U,e),()=>t(U));var Tt=v(it,2);let Be;var Fa=r(Tt);f(Fa,{icon:"material-symbols:queue-music",class:"text-lg"}),i(Tt),i(Fe),i(Bt);var Ba=v(Bt,2);{var Ca=e=>{var m=di(),_=r(m),C=r(_),L=r(C,!0);i(C);var l=v(C,2),X=r(l);f(X,{icon:"material-symbols:close",class:"text-lg"}),i(l),i(_);var ct=v(_,2);Va(ct,5,()=>t(p),Ja,(bt,Z,q)=>{var G=ci();let Mt;var gt=r(G),Aa=r(gt);{var La=O=>{f(O,{icon:"material-symbols:graphic-eq",class:"text-[var(--primary)] animate-pulse"})},Ta=O=>{var St=nt(),te=tt(St);{var ee=dt=>{f(dt,{icon:"material-symbols:pause",class:"text-[var(--primary)]"})},Sa=dt=>{var Me=ui();Me.textContent=q+1,Y(dt,Me)};z(te,dt=>{q===t(y)?dt(ee):dt(Sa,!1)},!0)}Y(O,St)};z(Aa,O=>{q===t(y)&&t(x)?O(La):O(Ta,!1)})}i(gt);var Qt=v(gt,2),Ce=r(Qt);i(Qt);var Ae=v(Qt,2),jt=r(Ae);let Le;var Ma=r(jt,!0);i(jt);var Zt=v(jt,2);let Te;var ja=r(Zt,!0);i(Zt),i(Ae),i(G),Dt((O,St,te,ee)=>{Mt=N(G,1,"playlist-item flex items-center gap-3 p-3 hover:bg-[var(--btn-plain-bg-hover)] cursor-pointer transition-colors",null,Mt,O),rt(G,"aria-label",`播放 ${t(Z).title??""} - ${t(Z).artist??""}`),rt(Ce,"src",St),rt(Ce,"alt",t(Z).title),Le=N(jt,1,"font-medium truncate",null,Le,te),V(Ma,t(Z).title),Te=N(Zt,1,"text-sm text-[var(--content-meta)] truncate",null,Te,ee),V(ja,t(Z).artist)},[()=>({"bg-[var(--btn-plain-bg)]":q===t(y),"text-[var(--primary)]":q===t(y)}),()=>kt(t(Z).cover),()=>({"text-[var(--primary)]":q===t(y),"text-90":q!==t(y)}),()=>({"text-[var(--primary)]":q===t(y)})]),h("click",G,()=>wt(q)),h("keydown",G,O=>{(O.key==="Enter"||O.key===" ")&&(O.preventDefault(),wt(q))}),Y(bt,G)}),i(ct),i(m),Dt(bt=>V(L,bt),[()=>Za(Qa.playlist)]),h("click",l,ie),ri(3,m,()=>si,()=>({duration:300,axis:"y"})),Y(e,m)};z(Ba,e=>{t(b)&&e(Ca)})}i(ft),Xa(2),Dt((e,m,_,C,L,l,X,ct,bt,Z,q,G,Mt,gt)=>{Et=N(ft,1,"music-player fixed bottom-4 left-4 z-50 transition-all duration-300 ease-in-out",null,Et,e),ce=N(R,1,"orb-player w-12 h-12 bg-[var(--primary)] rounded-full shadow-lg cursor-pointer transition-all duration-500 ease-in-out flex items-center justify-center hover:scale-110 active:scale-95",null,ce,m),de=N(st,1,"mini-player card-base bg-[var(--float-panel-bg)] shadow-xl rounded-2xl p-3 transition-all duration-500 ease-in-out",null,de,_),rt(Wt,"src",C),fe=N(Wt,1,"w-full h-full object-cover transition-transform duration-300",null,fe,L),V(aa,t(I).title),V(ia,t(I).artist),ge=N(Bt,1,"expanded-player card-base bg-[var(--float-panel-bg)] shadow-xl rounded-2xl p-4 transition-all duration-500 ease-in-out",null,ge,l),rt(he,"src",X),xe=N(he,1,"w-full h-full object-cover transition-transform duration-300",null,xe,ct),V(sa,t(I).title),V(la,t(I).artist),V(oa,`${bt??""} / ${Z??""}`),rt(lt,"aria-valuenow",t(E)>0?t(P)/t(E)*100:0),je(da,`width: ${t(E)>0?t(P)/t(E)*100:0}%`),we=N(ot,1,"w-10 h-10 rounded-lg",null,we,q),ot.disabled=t(p).length<=1,pt.disabled=t(p).length<=1,ke=N(ut,1,"btn-regular w-12 h-12 rounded-full",null,ke,G),ut.disabled=t(u),mt.disabled=t(p).length<=1,Ee=N(At,1,"w-10 h-10 rounded-lg",null,Ee,Mt),rt(it,"aria-valuenow",t(M)*100),je(Ea,`width: ${t(M)*100}%`),Be=N(Tt,1,"btn-plain w-8 h-8 rounded-lg",null,Be,gt)},[()=>({expanded:t(A),"hidden-mode":t(d)}),()=>({"opacity-0":!t(d),"scale-0":!t(d),"pointer-events-none":!t(d)}),()=>({"opacity-0":t(A)||t(d),"scale-95":t(A)||t(d),"pointer-events-none":t(A)||t(d)}),()=>kt(t(I).cover),()=>({spinning:t(x)&&!t(u),"animate-pulse":t(u)}),()=>({"opacity-0":!t(A),"scale-95":!t(A),"pointer-events-none":!t(A)}),()=>kt(t(I).cover),()=>({spinning:t(x)&&!t(u),"animate-pulse":t(u)}),()=>oe(t(P)),()=>oe(t(E)),()=>({"btn-regular":t(S),"btn-plain":!t(S)}),()=>({"opacity-50":t(u)}),()=>({"btn-regular":t(g)>0,"btn-plain":t(g)===0}),()=>({"text-[var(--primary)]":t(b)})]),h("click",R,_t),h("keydown",R,e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),_t())}),h("click",Ft,Pe(_t)),h("click",qt,Pe(yt)),h("click",st,yt),h("keydown",st,e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),yt())}),h("click",Ct,_t),h("click",Gt,yt),h("click",lt,Ke),h("keydown",lt,e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault(),t(Q).getBoundingClientRect();const _=.5*t(E);t(a)&&(K(a,t(a).currentTime=_),o(P,_))}}),h("click",ot,Ne),h("click",pt,qe),h("click",ut,We),h("click",mt,zt),h("click",At,Ye),h("click",Lt,le),h("click",it,Ue),h("keydown",it,e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),e.key==="Enter"&&le())}),h("click",Tt,ie),Y(s,D)};z(Xe,s=>{s(Ge)})}Y(c,ue),Ua()}export{wi as default};

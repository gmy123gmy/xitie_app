/*! JRollViewer v0.2.2 ~ (c) 2016 Author:BarZu Git:https://github.com/chjtx/JRoll/tree/master/plugins/jroll-viewer */
!function(e,t,r){"use strict";function l(e){var r=t.createElement("div");return r.className=e,r}var i,o=e.innerWidth,n=e.innerHeight,s=o/n,a=0,c=[],d=0,p=function(l,i){var a=this;o=e.innerWidth,n=e.innerHeight,s=o/n,a.el="string"==typeof l?t.querySelector(l):l,a.el.addEventListener("click",function(e){a._click(e)},!1),a.options={JRoll:r};for(var c in i)a.options[c]=i[c];a._init()};p.version="0.2.2",p.prototype={_createStyle:function(){var e=t.getElementById("jroll_style"),r="\n/* jroll-viewer */\n.jroll-viewer{display:none;height:100%;width:100%;overflow:hidden;background:#000;position:absolute;top:0;left:0;z-index:9999}.jroll-viewer.duration{-webkit-transition-duration:200ms;transition-duration:200ms}.jroll-viewer.small{-webkit-transform:scale(0.01,0.01);transform:scale(0.01,0.01);display:block}.jroll-viewer.normal{-webkit-transform:scale(1,1) !important;transform:scale(1,1) !important}.jroll-viewer-scroller{height:100%}.jroll-viewer-page{height:100%;position:absolute}.jroll-viewer-item{width:100%;height:100%;position:relative;overflow:hidden}.jroll-viewer-img{position:absolute;width:100%;height:auto}.jroll-viewer-pointer{color:#fff;font-size:12px;position:absolute;left:0;bottom:40px;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}.jroll-viewer-pointer span{display:block;width:4px;height:4px;border-radius:10px;background:#666;float:left;margin:0 5px}.jroll-viewer-pointer span.active{background:#fff}\n";e?/jroll-viewer/.test(e.innerHTML)||(e.innerHTML+=r):(e=t.createElement("style"),e.id="jroll_style",e.innerHTML=r,t.head.appendChild(e))},_createImg:function(e,t){var r,l=this,p="",v="";d=t.length,r="number"==typeof e?e:null;for(var w=0;w<d;w++)p+='<div class="jroll-viewer-page" style="width:'+o+"px;left:"+w*o+'px"><div class="jroll-viewer-item"><img src="'+(l.options.data?t[w].dataset[l.options.data]:t[w].src)+'" class="jroll-viewer-img"></div></div>',d<=5&&(v+="<span></span>"),null===r&&("object"==typeof e&&e===t[w]||"string"==typeof e&&e===t[w].getAttribute("src"))&&(r=w);l.scroller.innerHTML=p,l.pointer.innerHTML=v,i=l.pointer.querySelectorAll("span");var h,u=l.scroller.querySelectorAll(".jroll-viewer-item");for(w=0;w<d;w++)h=new l.options.JRoll(u[w],{id:t[w].getAttribute("jroll-viewer-id"),zoom:!0,scrollFree:!0,bounce:!1,autoStyle:!1,zoomDuration:0}),t[w].setAttribute("jroll-viewer-id",h.id),h.on("scroll",function(e){var t=this;if(e){var r=t.scroller.offsetHeight<=t.wrapper.clientHeight||Math.abs(t.jroll_viewer_start-e.touches[0].pageX)>50,i=t.x===t.maxScrollX&&r,o=t.x===t.minScrollX&&r;(i||o)&&e&&t.call(l.jroll,e)}}).on("scrollStart",function(e){this.jroll_viewer_start=e.touches[0].pageX}).on("zoomStart",function(){l["switch"](a)}).on("zoomEnd",function(){var e,t=this;t.scroller.jroll_viewer_ratio>s?(e=(n-t.scroller.height*t._z.scale)/2,t.scroller.style.top=e<0?0:e+"px"):(e=(o-t.scroller.width*t._z.scale)/2,t.scroller.style.left=e<0?0:e+"px")}).scroller.onload=function(){l._imgOnload(this)},c.push(h);return r},_click:function(e){var t=e.target,r=this;"IMG"===t.tagName&&t.hasAttribute("jroll-viewer-image")&&r.show(t)},_init:function(){var r=this;return r.viewer=t.getElementById("jroll_viewer"),r.viewer?(r.scroller=r.viewer.querySelector(".jroll-viewer-scroller"),r.pointer=r.viewer.querySelector(".jroll-viewer-pointer"),void(r.jroll=r.scroller.jroll)):(r._createStyle(),r.viewer=l("jroll-viewer"),r.scroller=l("jroll-viewer-scroller"),r.pointer=l("jroll-viewer-pointer"),r.viewer.id="jroll_viewer",r.viewer.appendChild(r.scroller),r.viewer.appendChild(r.pointer),t.body.appendChild(r.viewer),r.viewer.onclick=function(){r.hide()},r.jroll=new r.options.JRoll(r.viewer,{scrollY:!1,scrollX:!0,momentum:!1,edgeRelease:!1}).on("scrollStart",function(){this.viewerStartTime=(new Date).getTime()}).on("touchEnd",function(){var e=this,t=a*o+e.x;if(e.x!==e.minScrollX&&e.x!==e.maxScrollX&&0!==Math.abs(e.x%o)){var l;l=Math.abs(t)<((new Date).getTime()-e.viewerStartTime<300?10:100)?0:t>0?-1:1,r["switch"](a+l,200)}}).on("scroll",function(e){var t=this,r=c[a],l=t.directionX===-1&&t.x<-a*o&&r.x>r.maxScrollX,i=1===t.directionX&&t.x>-a*o&&r.x<r.minScrollX;(l||i)&&(t.scrollTo(-a*o,0),t.call(r,e))}),e.addEventListener("resize",r._rotate.bind(r)),void e.addEventListener("orientationchange",r._rotate.bind(r)))},_imgOnload:function(e){var t=this,r=e.width/e.height;e.jroll_viewer_ratio=r,r>s?(e.style.width="100%",e.style.height="auto",e.style.left="0",e.style.top=(n-o/r)/2+"px",e.jroll.options.zoomMax=t.options.zoomMax||e.naturalWidth/o||3):(e.style.width="auto",e.style.height="100%",e.style.left=(o-n*r)/2+"px",e.style.top="0",e.jroll.options.zoomMax=t.options.zoomMax||e.naturalHeight/n||3),e.jroll.maxScrollX=e.jroll.maxScrollY=e.jroll.minScrollX=e.jroll.minScrollY=0},_rotate:function(){o=e.innerWidth,n=e.innerHeight,s=o/n;var t=this;t.jroll.scroller.style.width=o*d+"px",c.forEach(function(e,r){t._imgOnload(e.scroller),e.wrapper.parentElement.style.width=o+"px",e.wrapper.parentElement.style.left=o*r+"px"}),t["switch"](a,0,!0)},_reset:function(e){var t=c[e].scroller,r=t.jroll_viewer_ratio;i&&i.length&&i[e].classList.remove("active"),r>s?t.style.top=(n-o/r)/2+"px":t.style.left=(o-n*r)/2+"px",c[e]._z.scale=1,c[e].scrollTo(0,0).refresh()},_dot:function(e){i&&i.length?i[e].classList.add("active"):this.pointer.innerHTML=e+1+" / "+d},"switch":function(e,t,r){var l=this,i=a;e=parseInt(e),e>=0&&e<d&&(a=e),a===i?(l.jroll.scrollTo(-(o*e),0,t||0),l._dot(a)):l.jroll.scrollTo(-(o*e),0,t||0,!1,function(){for(var i=0,o=d;i<o;i++)i===e?(l._dot(i),c[i].refresh(),r&&l._reset(i)):l._reset(i),i===e||i===e-1||i===e+1?c[i].wrapper.style.display="block":c[i].wrapper.style.display="none";"function"==typeof l.options.afterSwitch&&t&&l.options.afterSwitch(e)})},show:function(e){var r,l=this,i=l.el.querySelectorAll("img[jroll-viewer-image]");c=[],l.viewer.style.visibility="hidden",l.viewer.style.display="block",l.viewer.style.top=t.body.scrollTop+"px",l.scroller.style.width=o*i.length+"px",l.jroll.refresh(),r=l._createImg(e,i),l["switch"](r),l.viewer.classList.add("small"),setTimeout(function(){l.viewer.style.visibility="visible",l.viewer.classList.add("duration"),l.viewer.classList.add("normal")},0)},hide:function(){var e=this;e.viewer.classList.remove("normal"),setTimeout(function(){e.viewer.classList.remove("small"),e.viewer.classList.remove("duration"),e.viewer.style.display="none"},250)}},"undefined"!=typeof module&&module.exports&&(module.exports=p),"function"==typeof define&&define(function(){return p}),e.JRollViewer=p}(window,document,JRoll);
function tr(en,id,ar){const l=document.documentElement.lang;return l==="id"?id:l==="ar"?ar:en}
const onReady=(fn)=>document.readyState==="loading"?document.addEventListener("DOMContentLoaded",fn):fn();
onReady(()=>{
  const toggleBtn=document.querySelector(".nav-toggle");
  const primaryNav=document.getElementById("primary-nav");
  if(toggleBtn&&primaryNav){
    const setMenuState=(open)=>{
      toggleBtn.setAttribute("aria-expanded",String(open));
      toggleBtn.setAttribute("aria-label",open?tr("Close navigation menu","Tutup menu navigasi","إغلاق قائمة التنقل"):tr("Open navigation menu","Buka menu navigasi","فتح قائمة التنقل"));
      primaryNav.classList.toggle("is-open",open);
      document.body.style.overflow=open?"hidden":"";
    };
    toggleBtn.addEventListener("click",()=>{setMenuState(toggleBtn.getAttribute("aria-expanded")!=="true")});
    primaryNav.querySelectorAll(".nav-list a, .dropdown-content a").forEach((link)=>{link.addEventListener("click",()=>setMenuState(false))});
    document.addEventListener("keydown",(e)=>{
      if(e.key==="Escape"&&primaryNav.classList.contains("is-open")){setMenuState(false);toggleBtn.focus()}
    });
  }
  const navBtn=document.getElementById("about-menu-btn");
  const dropdownContainer=document.querySelector(".dropdown");
  const backBtn=document.querySelector(".d-content-back");
  if(navBtn&&dropdownContainer){
    const isTouchDevice="ontouchstart" in window||navigator.maxTouchPoints>0||window.matchMedia("(pointer: coarse)").matches;
    let hideTimer=null;
    const closeDropdown=()=>{
      clearTimeout(hideTimer);
      navBtn.classList.remove("active");
      navBtn.setAttribute("aria-expanded","false");
      if(document.activeElement&&dropdownContainer.contains(document.activeElement))document.activeElement.blur();
    };
    if(!isTouchDevice){
      dropdownContainer.addEventListener("mouseenter",()=>{clearTimeout(hideTimer);navBtn.classList.add("active");navBtn.setAttribute("aria-expanded","true")});
      dropdownContainer.addEventListener("mouseleave",()=>{clearTimeout(hideTimer);hideTimer=setTimeout(closeDropdown,300)});
    }
    navBtn.addEventListener("click",(e)=>{e.preventDefault();clearTimeout(hideTimer);const open=navBtn.classList.toggle("active");navBtn.setAttribute("aria-expanded",String(open))});
    document.addEventListener("click",(e)=>{if(!dropdownContainer.contains(e.target))closeDropdown()});
    if(backBtn)backBtn.addEventListener("click",(e)=>{e.preventDefault();closeDropdown()});
    document.addEventListener("keydown",(e)=>{if(e.key==="Escape")closeDropdown()});
  }
  const langBtn=document.getElementById("lang-toggle");
  const langList=document.getElementById("lang-list");
  if(langBtn&&langList){
    const setLangOpen=(open)=>{
      langBtn.setAttribute("aria-expanded",String(open));
      langList.hidden=!open;
    };
    langBtn.addEventListener("click",()=>{setLangOpen(langList.hidden)});
    document.addEventListener("click",(e)=>{
      if(!langList.hidden&&!langBtn.parentNode.contains(e.target))setLangOpen(false);
    });
    document.addEventListener("keydown",(e)=>{
      if(e.key==="Escape"&&!langList.hidden){setLangOpen(false);langBtn.focus()}
    });
  }
});
(()=>{
  "use strict";
  const THEME_KEY="radova-theme";
  const SUN_SVG='<svg width="16" height="16" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="20" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="128" cy="128" r="56"/><line x1="128" y1="36" x2="128" y2="16"/><line x1="128" y1="240" x2="128" y2="220"/><line x1="36" y1="128" x2="16" y2="128"/><line x1="240" y1="128" x2="220" y2="128"/><line x1="63" y1="63" x2="49" y2="49"/><line x1="207" y1="207" x2="193" y2="193"/><line x1="193" y1="63" x2="207" y2="49"/><line x1="49" y1="207" x2="63" y2="193"/></svg>';
  const MOON_SVG='<svg width="16" height="16" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="20" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M216.7 152.6A91.9 91.9 0 0 1 103.4 39.3a92 92 0 1 0 113.3 113.3Z"/></svg>';
  const getSavedTheme=()=>{try{const s=localStorage.getItem(THEME_KEY);if(s==="dark"||s==="light")return s}catch(_){}return"light"};
  const applyTheme=(theme)=>{
    const isDark=theme==="dark";
    document.documentElement.setAttribute("data-theme",isDark?"dark":"light");
    try{localStorage.setItem(THEME_KEY,isDark?"dark":"light")}catch(_){}
    const btn=document.getElementById("theme-toggle");
    if(!btn)return;
    const lbl=isDark?tr("Switch to light mode","Beralih ke mode terang","التبديل إلى الوضع الفاتح"):tr("Switch to dark mode","Beralih ke mode gelap","التبديل إلى الوضع الداكن");
    btn.setAttribute("aria-pressed",String(isDark));
    btn.setAttribute("aria-label",lbl);
    btn.setAttribute("title",lbl);
    btn.innerHTML=isDark?SUN_SVG:MOON_SVG;
  };
  onReady(()=>{const s=getSavedTheme();if(s!==document.documentElement.getAttribute("data-theme"))applyTheme(s)});
  document.addEventListener("click",(e)=>{if(!e.target.closest("#theme-toggle"))return;applyTheme(document.documentElement.getAttribute("data-theme")==="dark"?"light":"dark")});
  document.addEventListener("htmx:afterSwap",()=>{applyTheme(getSavedTheme())});
})();

window.PORTFOLIO_INITIAL_DATA = {"profile":{"name":"Dev Maru","eyebrow":"CREATIVE PORTFOLIO · 2026","title":"I turn ideas into *scroll-stopping* content.","bio":"I'm Dev Maru — a video editor, AI creator and social media manager helping brands show up with content people remember.","email":"","instagram":"https://instagram.com/imdevmaru","youtube":"https://www.youtube.com/@imdevmaru/videos","photo":"assets/site/hero-photo.webp"},"items":[{"id":"c1","section":"clients","title":"OFFER ZONE","media":"","thumb":"","logo":"assets/site/logo-offer-zone.webp","link":"","desc":"Retail & campaign content"},{"id":"c2","section":"clients","title":"CIYAA OPTICS","media":"","thumb":"","logo":"assets/site/logo-ciyaa-optics.webp","link":"","desc":"Brand content"},{"id":"c3","section":"clients","title":"JEKUKI","media":"","thumb":"","logo":"assets/site/logo-jekuki.webp","link":"","desc":"Product creatives"},{"id":"c4","section":"clients","title":"Riyancy homes","media":"","thumb":"","logo":"assets/site/logo-riyancy-homes.webp","link":"","desc":"Add a client name"},{"id":"f1","section":"clients","title":"Aaj Ni Shooping","media":"","thumb":"","logo":"assets/site/logo-aaj-ni-shopping.webp","link":"","desc":"Featured edit · replace with your reel"},{"id":"f2","section":"featured","title":"Brand Story","media":"https://youtube.com/shorts/CUvmXfpIXao","thumb":"","logo":"","link":"","desc":"Short-form storytelling"},{"id":"f3","section":"featured","title":"Fashion Campaign","media":"https://youtube.com/shorts/APV5KsxWdQs?feature=share","thumb":"","logo":"","link":"","desc":"Product showcase"},{"id":"f4","section":"featured","title":"Product Ghost Mannequin Reel","media":"https://youtube.com/shorts/5sLME_rMknk?feature=share","thumb":"","logo":"","link":"","desc":"Creative campaign"},{"id":"v1","section":"featured","title":"Real Estate Information Reel","media":"https://youtube.com/shorts/w_zVZlLgQDY?feature=share","thumb":"","logo":"","link":"","desc":"AI-generated concept"},{"id":"v2","section":"aiVideo","title":"Trending aI offers reel.","media":"https://youtube.com/shorts/3rucxU2pLJ4?feature=share","thumb":"","logo":"","link":"","desc":"AI visual experiment"},{"id":"v3","section":"aiVideo","title":"AI product showcasing reel.","media":"https://youtube.com/shorts/HuuGIZresec?feature=share","thumb":"","logo":"","link":"","desc":"AI video concept"},{"id":"v4","section":"aiVideo","title":"Ad Concept 01","media":"https://youtube.com/shorts/v69FJ1ffHRY?feature=share","thumb":"","logo":"","link":"","desc":"AI-powered storytelling"},{"id":"i1","section":"aiVideo","title":"Ai Video + ai song (Gujarati)","media":"https://youtube.com/shorts/13f5Ipk9RNc?feature=share","thumb":"","logo":"","link":"","desc":"AI image generation"},{"id":"i3","section":"aiVideo","title":"Creative Ad Campain","media":"https://youtube.com/shorts/NPuC3nAugeE?feature=share","thumb":"","logo":"","link":"","desc":"Visual experiment"},{"id":"item1792321527931","section":"clients","title":"Souasta","media":"","thumb":"","logo":"assets/site/logo-souasta.webp","link":"","desc":""}]};
const state=window.PORTFOLIO_INITIAL_DATA;
const assetManifest=window.PORTFOLIO_ASSETS;
if(!assetManifest)throw new Error("Asset manifest is missing.");
const videoFolders={featured:"Feature_work",aiVideo:"Trending_AI"};
state.items=state.items.filter(item=>item.section!=="featured"&&item.section!=="aiVideo"&&item.section!=="aiImages");
for(const filename of assetManifest.images){
 const title=filename.replace(/\.[^.]+$/,"").replace(/[_\s-]+/g," ").trim().toLowerCase().replace(/\bai\b/g,"AI").replace(/^./,character=>character.toUpperCase());
 state.items.push({id:`ai-image-${filename}`,section:"aiImages",title,desc:"AI image generation",media:"",thumb:`assets/Ai_images/${encodeURIComponent(filename)}`,link:""});
}
for(const [section,folder] of Object.entries(videoFolders)){
 const files=assetManifest.videos[section];
 if(!Array.isArray(files))throw new Error(`Video manifest is missing the ${section} file list.`);
 state.items.push(...files.map(filename=>{
  const title=filename.replace(/\.[^.]+$/,"").replace(/[_\s-]+/g," ").trim().toLowerCase().replace(/\bai\b/g,"AI").replace(/^./,character=>character.toUpperCase());
  return{id:`${section}-${filename}`,section,title,desc:"",media:`assets/${folder}/${encodeURIComponent(filename)}`,thumb:`assets/posters/${encodeURIComponent(filename.replace(/\.[^.]+$/,""))}.webp`,link:""};
 }));
}
function esc(s=""){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function safeUrl(s){try{let u=new URL(s,document.baseURI);return ["http:","https:","mailto:"].includes(u.protocol)?u.href:"#"}catch(e){return "#"}}
function repeated(items){return [...items,...items]}
function render(){
 const p=state.profile;
 document.querySelector(".brand").innerHTML=`<span>${esc((p.name||"Dev Maru").split(" ").map(x=>x[0]).join("").slice(0,2).toUpperCase())}</span> / ${esc(p.name||"Dev Maru").toUpperCase()}`;
 document.getElementById("heroEyebrow").textContent=p.eyebrow||"CREATIVE PORTFOLIO";
 document.getElementById("heroTitle").innerHTML=esc(p.title||"").replace(/\*([^*]+)\*/g,'<em>$1</em>');
 document.getElementById("heroBio").textContent=p.bio||"";
 const heroPhoto=document.getElementById("heroPhoto"),heroInitials=document.getElementById("heroInitials"),heroCard=document.getElementById("heroCard");
 if(p.photo){heroPhoto.setAttribute("fetchpriority","high");heroPhoto.decoding="async";heroPhoto.src=p.photo;heroPhoto.classList.remove("hidden");heroInitials.classList.add("hidden");heroCard.classList.add("has-photo")}else{heroPhoto.removeAttribute("src");heroPhoto.classList.add("hidden");heroInitials.classList.remove("hidden");heroCard.classList.remove("has-photo")}
 document.getElementById("navInstagram").href=safeUrl(p.instagram||"#");
 document.getElementById("emailButton").href=`mailto:${p.email||"devislive6@gmail.com"}`;
 document.getElementById("emailButton").textContent="Email me ↗";
 document.getElementById("youtubeButton").href=safeUrl(p.youtube||"#");
 document.getElementById("year").textContent=new Date().getFullYear();
 const items=state.items;
 document.getElementById("clientTrack").innerHTML=repeated(items.filter(x=>x.section==="clients" && x.logo)).map(x=>`<a class="client-pill" href="${safeUrl(x.link||"#")}" ${x.link?'target="_blank" rel="noreferrer"':''} aria-label="${esc(x.title||"Client logo")}"><span class="client-mark"><img loading="lazy" decoding="async" src="${esc(x.logo)}" alt="${esc(x.title||"Client")} logo"></span></a>`).join("");
 document.getElementById("featuredTrack").innerHTML=repeated(items.filter(x=>x.section==="featured")).map(cardHtml).join("");
 document.getElementById("aiVideoTrack").innerHTML=repeated(items.filter(x=>x.section==="aiVideo")).map(cardHtml).join("");
 document.getElementById("aiImageTrack").innerHTML=repeated(items.filter(x=>x.section==="aiImages")).map(imageHtml).join("");

}
function driveFileId(url){try{const u=new URL(url);if(!/(^|\.)drive\.google\.com$/.test(u.hostname))return "";let m=u.pathname.match(/\/(?:file\/d|document\/d|uc)\/([a-zA-Z0-9_-]+)/);if(m)return m[1];return u.searchParams.get("id")||""}catch(e){return ""}}
function youtubeVideoId(url){
 try{
  const u=new URL(url);
  const host=u.hostname.toLowerCase().replace(/^www\./,"").replace(/^m\./,"");
  if(host==="youtu.be"){const id=u.pathname.split("/").filter(Boolean)[0];return /^[a-zA-Z0-9_-]{11}$/.test(id||"")?id:""}
  if(host==="youtube.com"||host==="youtube-nocookie.com"){
   let id=u.searchParams.get("v");
   if(!id){const m=u.pathname.match(/^\/(?:embed|shorts|live|v)\/([a-zA-Z0-9_-]{11})/);if(m)id=m[1]}
   return /^[a-zA-Z0-9_-]{11}$/.test(id||"")?id:"";
  }
 }catch(e){}
 return "";
}
function videoKind(url){if(!url)return "";if(youtubeVideoId(url))return "youtube";if(driveFileId(url))return "drive";if(/\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url))return "direct";return ""}
function cardHtml(x){
 const media=x.media||"",thumb=x.thumb||"",kind=videoKind(media),driveId=kind==="drive"?driveFileId(media):"",ytId=kind==="youtube"?youtubeVideoId(media):"";
 let content="";
 if(thumb) content=`<img loading="lazy" decoding="async" src="${esc(thumb)}" alt="${esc(x.title)}" data-image-fallback="placeholder">`;
 else if(ytId) content=`<img loading="lazy" src="https://i.ytimg.com/vi/${encodeURIComponent(ytId)}/hqdefault.jpg" alt="${esc(x.title)}">`;
 else if(driveId) content=`<img loading="lazy" src="https://drive.google.com/thumbnail?id=${encodeURIComponent(driveId)}&sz=w640" alt="${esc(x.title)}">`;
 else if(kind==="direct") content=`<video muted playsinline preload="metadata" src="${esc(media)}" aria-label="Preview of ${esc(x.title)}"></video>`;
 else content=`<div class="placeholder">PLAY<span class="accent-period">.</span></div>`;
 const canPlay=!!kind;
 const videoAttrs=canPlay?`role="button" tabindex="0" data-video-url="${esc(media)}" data-video-title="${esc(x.title||"Project")}"`:'role="group"';
 return `<div class="work-card"><div class="work-card-click" ${videoAttrs}><div class="thumb">${content}</div><div class="work-info"><span class="tag">${x.section==="aiVideo"?"AI VIDEO":"FEATURED PROJECT"}</span><h3>${esc(x.title)}</h3></div></div>${x.link?`<div class="work-link-wrap"><a class="btn" href="${safeUrl(x.link)}" target="_blank" rel="noreferrer">Open project link ?</a></div>`:""}</div>`
}
function openProjectVideo(encodedUrl,encodedTitle){
 const url=decodeURIComponent(encodedUrl),title=decodeURIComponent(encodedTitle),kind=videoKind(url),id=driveFileId(url),ytId=youtubeVideoId(url);
 const content=document.getElementById("videoModalContent"),fallback=document.getElementById("driveFallback"),hint=document.getElementById("videoModalHint"),openDrive=document.getElementById("openDriveOriginal");
 document.getElementById("videoModalTitle").textContent=title||"Watch project";
 content.innerHTML=""; fallback.classList.remove("show"); hint.textContent="";
 if(kind==="youtube"&&ytId){
   const frame=document.createElement("iframe");
   frame.src="https://www.youtube-nocookie.com/embed/"+encodeURIComponent(ytId)+"?autoplay=1&playsinline=1&rel=0";
   frame.title=title||"Portfolio video";
   frame.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
   frame.allowFullscreen=true;
   frame.referrerPolicy="strict-origin-when-cross-origin";
   frame.loading="eager";
   content.appendChild(frame);
   hint.textContent="YouTube video · Unlisted videos can be embedded when embedding is allowed.";
 } else if(kind==="drive"&&id){
   const previewUrl="https://drive.google.com/file/d/"+encodeURIComponent(id)+"/preview";
   openDrive.href="https://drive.google.com/file/d/"+encodeURIComponent(id)+"/view";
   hint.textContent="Trying Google Drive preview…";
   const frame=document.createElement("iframe");
   frame.src=previewUrl;
   frame.referrerPolicy="strict-origin-when-cross-origin";
   frame.allow="autoplay; fullscreen; picture-in-picture";
   frame.allowFullscreen=true;
   frame.title=title||"Portfolio video";
   frame.loading="eager";
   content.appendChild(frame);
   fallback.classList.add("show");
   document.getElementById("retryDriveEmbed").onclick=()=>{hint.textContent="Reloading Google Drive preview…";frame.src="about:blank";setTimeout(()=>{frame.src=previewUrl},80)};
   // Browsers cannot read cross-origin Drive errors, so provide an explicit fallback rather than claiming playback succeeded.
   const timer=setTimeout(()=>{if(document.getElementById("videoModal").classList.contains("open"))hint.textContent="If the preview shows an error, use Open video in Google Drive or host the MP4 on a streaming service.";},2500);
 } else if(kind==="direct"){
   const video=document.createElement("video");video.src=url;video.controls=true;video.autoplay=true;video.playsInline=true;video.preload="metadata";
   video.onerror=()=>{hint.textContent="This video URL is not directly streamable. Use a direct MP4/WebM URL or a supported video-hosting embed link.";fallback.classList.remove("show")};
   content.appendChild(video);hint.textContent="Playing direct video"; 
 } else {
   hint.textContent="Unsupported video link. Use a Google Drive share link or direct MP4/WebM URL.";
   return;
 }
 document.getElementById("videoModal").classList.add("open");document.body.style.overflow="hidden";
}
function closeProjectVideo(){document.getElementById("videoModal").classList.remove("open");document.getElementById("videoModalContent").innerHTML="";document.body.style.overflow=""}
document.getElementById("closeVideoModal").onclick=closeProjectVideo;document.getElementById("videoModal").addEventListener("click",e=>{if(e.target.id==="videoModal")closeProjectVideo()});
function openImageModal(image,title){const modal=document.getElementById("imageModal");document.getElementById("imageModalTitle").textContent=title||"Portfolio image";const preview=document.getElementById("imageModalImage");preview.src=image;preview.alt=title||"Portfolio image";modal.classList.add("open");document.body.style.overflow="hidden"}
function closeImageModal(){document.getElementById("imageModal").classList.remove("open");document.getElementById("imageModalImage").removeAttribute("src");document.body.style.overflow=""}
document.getElementById("closeImageModal").onclick=closeImageModal;document.getElementById("imageModal").addEventListener("click",e=>{if(e.target.id==="imageModal")closeImageModal()});
document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeProjectVideo();closeImageModal()}});
function imageHtml(x){let media=x.thumb||x.media||"";return `<a class="image-card" href="${esc(media||"#")}" data-image-url="${esc(media)}" data-image-title="${esc(x.title||"AI Image")}">${media?`<img loading="lazy" decoding="async" src="${esc(media)}" alt="${esc(x.title)}">`:`<div class="placeholder">IMG.</div>`}</a>`}
function moveMarquee(button,direction){
 const shell=button.closest('.marquee-shell');
 const track=shell&&shell.querySelector('.marquee-track');
 if(!track)return;
 const animations=track.getAnimations();
 if(!animations.length)return;
 const animation=animations[0];
 const step=2400;
 const reverse=shell.classList.contains('reverse');
 const signedStep=direction*(reverse?-1:1)*step;
 const current=Number(animation.currentTime)||0;
 animation.currentTime=Math.max(0,current+signedStep);
}
document.querySelectorAll(".marquee-control[data-marquee-direction]").forEach(button=>button.addEventListener("click",()=>moveMarquee(button,Number(button.dataset.marqueeDirection))));
document.getElementById("aiImageTrack").addEventListener("click",event=>{const imageLink=event.target.closest("a.image-card[data-image-url]");if(!imageLink)return;event.preventDefault();openImageModal(imageLink.dataset.imageUrl,imageLink.dataset.imageTitle)});
document.addEventListener("click",e=>{const card=e.target.closest(".work-card-click[data-video-url]");if(card)openProjectVideo(encodeURIComponent(card.dataset.videoUrl),encodeURIComponent(card.dataset.videoTitle))});
document.addEventListener("keydown",e=>{if(e.key!=="Enter"&&e.key!==" ")return;const card=e.target.closest(".work-card-click[data-video-url]");if(!card)return;e.preventDefault();openProjectVideo(encodeURIComponent(card.dataset.videoUrl),encodeURIComponent(card.dataset.videoTitle))});
document.addEventListener("error",e=>{const image=e.target;if(!(image instanceof HTMLImageElement))return;image.classList.add("hidden");if(image.dataset.imageFallback==="placeholder"){const placeholder=document.createElement("div");placeholder.className="placeholder";placeholder.innerHTML='PLAY<span class="accent-period">.</span>';image.parentElement.insertBefore(placeholder,image)}},true);
render();

/* Bloom Media entry interaction — logo launch, letter scatter, then card-sheet reveal */
(function(){
  const intro=document.getElementById("bloomIntro");
  const trigger=document.getElementById("bloomEnter");
  const logo=document.getElementById("bloomMark");
  if(!intro||!trigger||!logo)return;

  document.body.classList.add("intro-locked");
  const words=(trigger.textContent||"CLICK THE BLOOM").trim();
  trigger.setAttribute("aria-label",words);
  trigger.replaceChildren();

  const chars=[...words];
  const middle=(chars.length-1)/2;
  chars.forEach((char,index)=>{
    const letter=document.createElement("span");
    letter.className="bloom-letter";
    letter.setAttribute("aria-hidden","true");
    letter.textContent=char===" "?"\u00a0":char;
    const offset=index-middle;
    const sign=offset<0?-1:1;
    letter.style.setProperty("--dx",`${(offset*4.1).toFixed(1)}vw`);
    letter.style.setProperty("--dy",`${((index%2===0?-1:1)*(8+Math.abs(offset)*1.25)).toFixed(1)}vh`);
    letter.style.setProperty("--turn",`${sign*(440+index*13)}deg`);
    letter.style.setProperty("--delay",`${index*28}ms`);
    trigger.appendChild(letter);
  });

  let started=false;
  function enter(){
    if(started)return;
    started=true;
    intro.classList.add("is-launching");

    // Let the logo finish its spin/zoom and leave the camera before opening the sheets.
    window.setTimeout(()=>{
      intro.classList.add("is-pages-opening");
      window.setTimeout(()=>{
        intro.classList.add("is-done");
        document.body.classList.remove("intro-locked");
        window.setTimeout(()=>intro.remove(),700);
      },1450);
    },2450);
  }

  trigger.addEventListener("click",enter);
  logo.addEventListener("click",enter);
})();
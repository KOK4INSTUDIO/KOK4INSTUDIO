
// ---- State ----
var curDetailName = '';
var carIdx = 0;
var carAuto;

<<<<<<< HEAD
=======
// ---- Admin configurable links (from localStorage) ----
function kok4GetAdminLinks(){
  try{
    var raw = localStorage.getItem('kok4_admin_links_v1');
    if(!raw) return null;
    return JSON.parse(raw);
  } catch(e){
    return null;
  }
}

function kok4AppendTextParam(url, textMsg){
  if(!url) return url;
  var sep = url.indexOf('?') >= 0 ? '&' : '?';
  return url + sep + 'text=' + encodeURIComponent(textMsg);
}

function kok4NormalizeWhatsapp(value){
  if(!value) return '';
  var v = String(value).trim();
  if(!v) return '';
  if(v.indexOf('http') === 0) return v;
  var digits = v.replace(/[^\d]/g,'');
  return digits ? ('https://wa.me/' + digits) : v;
}

>>>>>>> da8172f521cfab7225f85fb3db96a7b82685e229
// ---- Header scroll ----
window.addEventListener('scroll', function(){
  document.getElementById('header').classList.toggle('scrolled', window.scrollY > 20);
});

// ---- Scroll Reveal ----
(function(){
  var els = document.querySelectorAll('.reveal');
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('on'); io.unobserve(e.target); }
    });
  },{threshold:0.08});
  els.forEach(function(el){ io.observe(el); });
})();

// ---- BUY MODAL ----
function openBuy(name){
  curDetailName = name || '';
  document.getElementById('buyProdName').textContent = name ? name : 'Pilih platform untuk melanjutkan';
<<<<<<< HEAD
=======

  var adminLinks = kok4GetAdminLinks() || {};
>>>>>>> da8172f521cfab7225f85fb3db96a7b82685e229
  
  // Set dynamic WhatsApp message
  var waLink = document.querySelector('#buyModal .platform-link.wa');
  if (waLink) {
    var textMsg = "Halo KOK4INSTUDIO, saya ingin memesan produk: *" + curDetailName + "*";
<<<<<<< HEAD
    waLink.href = "https://wa.me/6289501798516?text=" + encodeURIComponent(textMsg);
=======
    var waBase = kok4NormalizeWhatsapp(adminLinks.social && adminLinks.social.whatsapp) || "https://wa.me/6289501798516";
    waLink.href = kok4AppendTextParam(waBase, textMsg);
>>>>>>> da8172f521cfab7225f85fb3db96a7b82685e229
  }

  // Set dynamic Shopee link if product specific
  var spLink = document.querySelector('#buyModal .platform-link.sp');
  if (spLink) {
<<<<<<< HEAD
    if (curDetailName.includes('Leopard')) {
      spLink.href = "https://shopee.co.id/KOK4INSTUDIO%E2%84%A2-Kacamata-Rectangle-Frame-Leopard-Retro-i.1818341376.57060915167";
    } else {
      // Fallback to Shopee store link
      spLink.href = "https://shopee.co.id/KOK4INSTUDIO%E2%84%A2-Kacamata-Rectangle-Frame-Leopard-Retro-i.1818341376.57060915167";
    }
=======
    var shopeeUrl = (adminLinks.marketplace && adminLinks.marketplace.shopee) || '';
    spLink.href = shopeeUrl || "https://shopee.co.id/KOK4INSTUDIO%E2%84%A2-Kacamata-Rectangle-Frame-Leopard-Retro-i.1818341376.57060915167";
>>>>>>> da8172f521cfab7225f85fb3db96a7b82685e229
  }

  document.getElementById('buyModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeBuy(){
  document.getElementById('buyModal').classList.remove('open');
  document.body.style.overflow = '';
}
document.getElementById('buyModal').addEventListener('click', function(e){
  if(e.target === this) closeBuy();
});

// ---- DETAIL MODAL ----
var EYEWEAR_IMG = 'https://down-id.img.susercontent.com/file/id-11134207-822wt-moi55fhhk1731a.webp';

function openDetail(shortName, fullName, price, badge, type, desc, imgUrl){
  curDetailName = fullName;
  document.getElementById('dName').textContent = fullName;
  document.getElementById('dPrice').textContent = price;
  document.getElementById('dDesc').textContent = desc;

  var badgeEl = document.getElementById('dBadge');
  badgeEl.textContent = badge==='best' ? 'Best Seller' : 'New';
  badgeEl.className = 'd-badge ' + (badge==='best' ? 'badge-best' : 'badge-new');

  var imgSide = document.getElementById('dImgSide');
  if(type === 'eyewear'){
    var finalImg = imgUrl || EYEWEAR_IMG;
    imgSide.innerHTML = '<img src="'+finalImg+'" alt="'+fullName+'" style="width:90%;max-width:320px;height:auto;object-fit:contain;">';
    document.getElementById('dColorWrap').style.display = 'block';
    document.getElementById('dSizeWrap').style.display = 'none';
    document.getElementById('dSpecMat').querySelector('.spec-v').textContent = 'Premium Acetate Frame';
  } else {
    if(imgUrl){
      imgSide.innerHTML = '<img src="'+imgUrl+'" alt="'+fullName+'" style="width:90%;max-width:320px;height:auto;object-fit:contain;">';
    } else {
      imgSide.innerHTML = '<div class="big-emoji" style="font-size:96px">' +
        (type==='apparel' ? (shortName.includes('Tee')?'👕':shortName.includes('Hoodie')?'🧥':shortName.includes('Cargo')?'👖':'🧢') : '🕶️') + '</div>';
    }
    document.getElementById('dColorWrap').style.display = 'none';
    document.getElementById('dSizeWrap').style.display = 'block';
    var sizes = shortName.includes('Cargo') ? ['28','30','32','34'] : (shortName.includes('Cap') ? ['Free'] : ['S','M','L','XL']);
    var html = '';
    sizes.forEach(function(s,i){ html += '<div class="d-size'+(i===1?' active':'')+'" onclick="pickSize(this)">'+s+'</div>'; });
    document.getElementById('dSizes').innerHTML = html;
    document.getElementById('dSpecMat').querySelector('.spec-v').textContent = shortName.includes('Tee') ? 'Cotton 230gsm' : (shortName.includes('Hoodie') ? 'Fleece Premium' : 'Canvas Twill');
  }

  document.getElementById('detailModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeDetail(){
  document.getElementById('detailModal').classList.remove('open');
  document.body.style.overflow = '';
}
function openBuyFromDetail(){
  closeDetail();
  openBuy(curDetailName);
}
document.getElementById('detailModal').addEventListener('click', function(e){
  if(e.target === this) closeDetail();
});

// ---- Size / Swatch picker ----
function pickSize(el){
  var wrap = el.closest('.d-sizes');
  wrap.querySelectorAll('.d-size').forEach(function(s){ s.classList.remove('active'); });
  el.classList.add('active');
}
function pickSwatch(el){
  el.closest('.d-colors').querySelectorAll('.swatch').forEach(function(s){ s.classList.remove('active'); });
  el.classList.add('active');
}

// ---- CAROUSEL ----
function getVisible(){
  var w = window.innerWidth;
  return w < 480 ? 1 : w < 860 ? 2 : 3;
}
function updateCarousel(){
  var track = document.getElementById('carTrack');
  var cards = track.querySelectorAll('.prod-card');
  if(!cards.length) return;
  var gap = 20;
  var cardW = cards[0].offsetWidth + gap;
  track.style.transform = 'translateX(-' + (carIdx * cardW) + 'px)';
  var dots = document.querySelectorAll('#carDots .dot');
  dots.forEach(function(d,i){ d.classList.toggle('active', i === carIdx); });
}
function carSlide(dir){
  var track = document.getElementById('carTrack');
  var total = track.querySelectorAll('.prod-card').length;
  var max = Math.max(0, total - getVisible());
  carIdx = Math.max(0, Math.min(carIdx + dir, max));
  updateCarousel();
}
document.getElementById('carPrev').addEventListener('click', function(){ carSlide(-1); resetAuto(); });
document.getElementById('carNext').addEventListener('click', function(){ carSlide(1); resetAuto(); });
document.querySelectorAll('#carDots .dot').forEach(function(d,i){
  d.addEventListener('click', function(){ carIdx=i; updateCarousel(); resetAuto(); });
});
function startAuto(){
  carAuto = setInterval(function(){
    var track = document.getElementById('carTrack');
    var total = track.querySelectorAll('.prod-card').length;
    var max = Math.max(0, total - getVisible());
    carIdx = carIdx >= max ? 0 : carIdx + 1;
    updateCarousel();
  }, 3500);
}
function resetAuto(){ clearInterval(carAuto); startAuto(); }
startAuto();
<<<<<<< HEAD
window.addEventListener('resize', function(){ carIdx=0; updateCarousel(); });
=======
window.addEventListener('resize', function(){ carIdx=0; updateCarousel(); });

// Expose functions to global scope so inline handlers continue to work
window.openBuy = openBuy;
window.closeBuy = closeBuy;
window.openDetail = openDetail;
window.closeDetail = closeDetail;
window.openBuyFromDetail = openBuyFromDetail;
window.pickSize = pickSize;
window.pickSwatch = pickSwatch;
window.carSlide = carSlide;

// ---- Apply Admin links across the public website (best-effort) ----
(function(){
  var links = kok4GetAdminLinks();
  if(!links) return;

  // Instagram
  if(links.social && links.social.instagram){
    document.querySelectorAll('a[href*="instagram.com"]').forEach(function(a){ a.href = links.social.instagram; });
  }
  // Shopee
  if(links.marketplace && links.marketplace.shopee){
    document.querySelectorAll('a[href*="shopee.co.id"]').forEach(function(a){ a.href = links.marketplace.shopee; });
  }
  // WhatsApp
  if(links.social && links.social.whatsapp){
    var wa = kok4NormalizeWhatsapp(links.social.whatsapp);
    if(wa){
      document.querySelectorAll('a[href*="wa.me/"]').forEach(function(a){ a.href = wa; });
      document.querySelectorAll('a[title="WhatsApp"]').forEach(function(a){ a.href = wa; });
    }
  }
  // TikTok (only if link is available; HTML already has placeholders)
  if(links.social && links.social.tiktok){
    document.querySelectorAll('a[title="TikTok"], a[title="TikTok Shop"]').forEach(function(a){ a.href = links.social.tiktok; });
    // Replace placeholder href="#"
    document.querySelectorAll('a.soc-btn[title="TikTok"], .contact-card').forEach(function(a){
      if(a.getAttribute('href') === '#'){
        var nameEl = a.querySelector && a.querySelector('.c-name');
        if(nameEl && /tiktok/i.test(nameEl.textContent || '')) a.href = links.social.tiktok;
      }
    });
  }
})();
>>>>>>> da8172f521cfab7225f85fb3db96a7b82685e229


// ---- State ----
var curDetailName = '';
var carIdx = 0;
var carAuto;

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
  
  // Set dynamic WhatsApp message
  var waLink = document.querySelector('#buyModal .platform-link.wa');
  if (waLink) {
    var textMsg = "Halo KOK4INSTUDIO, saya ingin memesan produk: *" + curDetailName + "*";
    waLink.href = "https://wa.me/6289501798516?text=" + encodeURIComponent(textMsg);
  }

  // Set dynamic Shopee link if product specific
  var spLink = document.querySelector('#buyModal .platform-link.sp');
  if (spLink) {
    if (curDetailName.includes('Leopard')) {
      spLink.href = "https://shopee.co.id/KOK4INSTUDIO%E2%84%A2-Kacamata-Rectangle-Frame-Leopard-Retro-i.1818341376.57060915167";
    } else {
      // Fallback to Shopee store link
      spLink.href = "https://shopee.co.id/KOK4INSTUDIO%E2%84%A2-Kacamata-Rectangle-Frame-Leopard-Retro-i.1818341376.57060915167";
    }
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
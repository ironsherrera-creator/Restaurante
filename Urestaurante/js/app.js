const CONFIG = {
  location: 'Ubicación de demostración · Bogotá, Colombia',
  hours: 'Lun–Dom · 12:00 m. – 10:00 p. m. (demo)',
  phone: '+57 300 000 0000 (demo)',
  whatsappNumber: '', // Reemplaza por indicativo y número, sin + ni espacios.
  currency: 'COP'
};

const PRODUCTS = [
  {id:'forjada',name:'La Forjada',category:'hamburguesas',desc:'Carne a la parrilla, queso, tocineta y salsa de la casa.',price:28900,image:'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=82',tag:'FAVORITA'},
  {id:'brava',name:'La Brava',category:'hamburguesas',desc:'Doble queso, cebolla caramelizada y mayo picante.',price:31900,image:'https://images.unsplash.com/photo-1553979459-d2229ba7433a?auto=format&fit=crop&w=800&q=82',tag:'PICANTE'},
  {id:'doble-carbon',name:'Doble Carbón',category:'hamburguesas',desc:'Dos carnes al carbón, cheddar y pepinillos.',price:35900,image:'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=82'},
  {id:'criolla',name:'Criolla Especial',category:'hamburguesas',desc:'Carne, hogao casero, queso y papa ripio.',price:29900,image:'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=800&q=82'},
  {id:'perro-tradicional',name:'Perro Tradicional',category:'perros',desc:'Salchicha, ripio, salsas de la casa y queso.',price:16900,image:'https://images.unsplash.com/photo-1612392062126-56cc9878b1d4?auto=format&fit=crop&w=800&q=82'},
  {id:'perro-especial',name:'Perro Especial',category:'perros',desc:'Salchicha premium, tocineta, queso y salsa brava.',price:21900,image:'https://images.unsplash.com/photo-1557872943-16a5ac26437e?auto=format&fit=crop&w=800&q=82'},
  {id:'perro-colombiano',name:'Perro Colombiano',category:'perros',desc:'Piña, queso, ripio y el toque dulce de la casa.',price:23900,image:'https://images.unsplash.com/photo-1599599810694-b5ac4dd9a3a3?auto=format&fit=crop&w=800&q=82'},
  {id:'salchipapa-clasica',name:'Salchipapa Clásica',category:'salchipapas',desc:'Papas crocantes, salchicha y salsas al gusto.',price:19900,image:'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=82'},
  {id:'salchipapa-especial',name:'Salchipapa Especial',category:'salchipapas',desc:'Papas, salchicha, pollo, queso y salsas.',price:27900,image:'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=800&q=82'},
  {id:'salchipapa-mixta',name:'Salchipapa Mixta',category:'salchipapas',desc:'Pollo, carne, salchicha y papas para compartir.',price:32900,image:'https://images.unsplash.com/photo-1518013431117-eb1465fa5752?auto=format&fit=crop&w=800&q=82'},
  {id:'mazorcada',name:'Mazorcada',category:'colombianos',desc:'Maíz dulce, pollo, tocineta, queso y salsas.',price:26900,image:'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=82',tag:'COLOMBIANA'},
  {id:'choripapa',name:'Choripapa',category:'colombianos',desc:'Chorizo a la brasa, papas crocantes y chimichurri.',price:24900,image:'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=82'},
  {id:'adiciones',name:'Adiciones & Acompañamientos',category:'colombianos',desc:'Papas, queso extra, tocineta y salsas de la casa.',price:8900,image:'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=82',tag:'PARA ACOMPAÑAR'}
];

const money = value => new Intl.NumberFormat('es-CO',{style:'currency',currency:CONFIG.currency,maximumFractionDigits:0}).format(value);
const grid = document.querySelector('#product-grid');
const cart = new Map();
let toastTimer;

function renderProducts(filter='todos') {
  const shown = PRODUCTS.filter(item => filter === 'todos' || item.category === filter);
  grid.innerHTML = shown.map((item,index)=>`<article class="product-card" style="animation-delay:${index*45}ms"><div class="product-image-wrap"><img src="${item.image}" alt="${item.name}, ${item.desc}" loading="lazy">${item.tag?`<span class="product-tag">${item.tag}</span>`:''}</div><div class="product-info"><div class="product-name-row"><h3 class="product-name">${item.name}</h3><span class="product-price">${money(item.price)}</span></div><p class="product-desc">${item.desc}</p><button class="product-add" data-add="${item.id}">SUMAR AL PEDIDO <span>+</span></button></div></article>`).join('');
}
function showToast(message){const toast=document.querySelector('.toast');toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2200)}
function addItem(id){const product=PRODUCTS.find(item=>item.id===id);if(!product)return;cart.set(id,(cart.get(id)||0)+1);updateCart();showToast(`${product.name} se sumó a tu pedido`)}
function updateCart(){const count=[...cart.values()].reduce((a,b)=>a+b,0);document.querySelectorAll('.cart-count').forEach(el=>el.textContent=count);const items=[...cart.entries()].map(([id,qty])=>{const p=PRODUCTS.find(item=>item.id===id);return `<div class="cart-line"><div><h3>${p.name}</h3><small>${money(p.price)} · ${money(p.price*qty)}</small></div><div class="cart-quantity"><button data-qty="${id}" data-delta="-1" aria-label="Quitar uno de ${p.name}">−</button><span>${qty}</span><button data-qty="${id}" data-delta="1" aria-label="Agregar uno de ${p.name}">+</button></div></div>`}).join('');document.querySelector('.cart-items').innerHTML=items;document.querySelector('.cart-empty').hidden=count>0;const summary=document.querySelector('.cart-summary');summary.classList.toggle('is-empty',count===0);summary.querySelector('strong').textContent=money([...cart.entries()].reduce((sum,[id,qty])=>sum+PRODUCTS.find(p=>p.id===id).price*qty,0))}
function openCart(){document.querySelector('.cart-drawer').classList.add('open');document.querySelector('.cart-drawer').setAttribute('aria-hidden','false');document.body.classList.add('cart-open');document.querySelector('.cart-close').focus()}
function closeCart(){document.querySelector('.cart-drawer').classList.remove('open');document.querySelector('.cart-drawer').setAttribute('aria-hidden','true');document.body.classList.remove('cart-open')}
function whatsappUrl(message){return CONFIG.whatsappNumber?`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`:''}

renderProducts();
document.querySelectorAll('[data-contact="location"]').forEach(el=>el.textContent=CONFIG.location);
document.querySelectorAll('[data-contact="hours"]').forEach(el=>el.textContent=CONFIG.hours);
document.querySelectorAll('[data-contact="phone"]').forEach(el=>el.textContent=CONFIG.phone);
document.querySelectorAll('.filter-btn').forEach(button=>button.addEventListener('click',()=>{const previous=document.querySelector('.filter-btn.active');previous?.classList.remove('active');previous?.setAttribute('aria-pressed','false');button.classList.add('active');button.setAttribute('aria-pressed','true');renderProducts(button.dataset.filter)}));
document.addEventListener('click',event=>{const add=event.target.closest('[data-add]');if(add)addItem(add.dataset.add);const qty=event.target.closest('[data-qty]');if(qty){const next=(cart.get(qty.dataset.qty)||0)+Number(qty.dataset.delta);next<1?cart.delete(qty.dataset.qty):cart.set(qty.dataset.qty,next);updateCart()}if(event.target.closest('.cart-trigger'))openCart();if(event.target.closest('.cart-close')||event.target.classList.contains('cart-backdrop'))closeCart();if(event.target.closest('.cart-browse')){closeCart();document.querySelector('#menu').scrollIntoView({behavior:'smooth'})}});
document.querySelector('.cart-checkout').addEventListener('click',()=>{if(!cart.size)return;const order=[...cart.entries()].map(([id,qty])=>`${qty} × ${PRODUCTS.find(p=>p.id===id).name}`).join('\n');const url=whatsappUrl(`Hola, quiero hacer este pedido:\n${order}\nSubtotal demostrativo: ${document.querySelector('.cart-summary strong').textContent}`);if(url)window.open(url,'_blank','noopener');else showToast('Configura el WhatsApp en js/app.js para recibir pedidos');});
const mobileToggle=document.querySelector('.menu-toggle'),nav=document.querySelector('.main-nav');mobileToggle.addEventListener('click',()=>{const open=mobileToggle.getAttribute('aria-expanded')!=='true';mobileToggle.setAttribute('aria-expanded',String(open));mobileToggle.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');nav.classList.toggle('open',open)});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobileToggle.setAttribute('aria-expanded','false');nav.classList.remove('open')}));
const header=document.querySelector('.site-header');const scrollHeader=()=>header.classList.toggle('scrolled',window.scrollY>40);window.addEventListener('scroll',scrollHeader,{passive:true});scrollHeader();
const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');revealObserver.unobserve(entry.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));
const form=document.querySelector('#contact-form');form.addEventListener('submit',event=>{event.preventDefault();const name=form.elements.name.value.trim(),email=form.elements.email.value.trim(),feedback=form.querySelector('.form-feedback');if(name.length<2){feedback.textContent='Escribe tu nombre para poder contactarte.';form.elements.name.focus();return}if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){feedback.textContent='Revisa el formato de tu correo.';form.elements.email.focus();return}feedback.textContent='¡Gracias! Este formulario es demostrativo; configura un servicio para recibir mensajes.';form.reset()});
const waLink=document.querySelector('.whatsapp-link'),waFloat=document.querySelector('.floating-whatsapp');const wa=whatsappUrl('Hola, quisiera conocer el menú de FORJA BRAVA.');if(wa){waLink.href=wa;waFloat.addEventListener('click',()=>window.open(wa,'_blank','noopener'))}else{waLink.addEventListener('click',event=>{event.preventDefault();showToast('Configura el WhatsApp en js/app.js para activar el enlace')});waFloat.addEventListener('click',()=>showToast('Configura el WhatsApp en js/app.js para activar el enlace'))}

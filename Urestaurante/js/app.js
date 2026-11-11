const CONFIG = {
  location: 'Ubicación de demostración · Bogotá, Colombia',
  hours: 'Lun–Dom · 12:00 m. – 10:00 p. m. (demo)',
  phone: '+57 300 000 0000 (demo)',
  whatsappNumber: '', // Reemplaza por indicativo y número, sin + ni espacios.
  currency: 'COP'
};

const PRODUCTS = [
  {id:'forjada',name:'La Forjada',category:'hamburguesas',desc:'Carne a la parrilla, queso, tocineta y salsa de la casa.',price:28900,image:'assets/images/producto-forjada.png',tag:'FAVORITA'},
  {id:'brava',name:'La Brava',category:'hamburguesas',desc:'Doble queso, cebolla caramelizada y mayo picante.',price:31900,image:'assets/images/producto-brava.png',tag:'PICANTE'},
  {id:'doble-carbon',name:'Doble Carbón',category:'hamburguesas',desc:'Dos carnes al carbón, cheddar y pepinillos.',price:35900,image:'assets/images/producto-doble-carbon.png'},
  {id:'criolla',name:'Criolla Especial',category:'hamburguesas',desc:'Carne, hogao casero, queso y papa ripio.',price:29900,image:'assets/images/producto-criolla.png'},
  {id:'perro-tradicional',name:'Perro Tradicional',category:'perros',desc:'Salchicha, ripio, salsas de la casa y queso.',price:16900,image:'assets/images/producto-perro-tradicional.png'},
  {id:'perro-especial',name:'Perro Especial',category:'perros',desc:'Salchicha premium, tocineta, queso y salsa brava.',price:21900,image:'assets/images/producto-perro-especial.png'},
  {id:'perro-colombiano',name:'Perro Colombiano',category:'perros',desc:'Piña, queso, ripio y el toque dulce de la casa.',price:23900,image:'assets/images/producto-perro-colombiano.png'},
  {id:'salchipapa-clasica',name:'Salchipapa Clásica',category:'salchipapas',desc:'Papas crocantes, salchicha y salsas al gusto.',price:19900,image:'assets/images/producto-salchipapa-clasica.png'},
  {id:'salchipapa-especial',name:'Salchipapa Especial',category:'salchipapas',desc:'Papas, salchicha, pollo, queso y salsas.',price:27900,image:'assets/images/producto-salchipapa-especial.png'},
  {id:'salchipapa-mixta',name:'Salchipapa Mixta',category:'salchipapas',desc:'Pollo, carne, salchicha y papas para compartir.',price:32900,image:'assets/images/producto-salchipapa-mixta.png'},
  {id:'mazorcada',name:'Mazorcada',category:'colombianos',desc:'Maíz dulce, pollo, tocineta, queso y salsas.',price:26900,image:'assets/images/producto-mazorcada.png',tag:'COLOMBIANA'},
  {id:'choripapa',name:'Choripapa',category:'colombianos',desc:'Chorizo a la brasa, papas crocantes y chimichurri.',price:24900,image:'assets/images/producto-choripapa.png'},
  {id:'adiciones',name:'Adiciones & Acompañamientos',category:'colombianos',desc:'Papas, queso extra, tocineta y salsas de la casa.',price:8900,image:'assets/images/producto-adiciones.png',tag:'PARA ACOMPAÑAR'}
];

// La administración mantiene el catálogo editable en la misma clave del prototipo.
const savedCatalog = JSON.parse(localStorage.getItem('forja-sigr-demo') || 'null');
if (savedCatalog?.products) {
  const categoryMap = {Hamburguesas:'hamburguesas',Perros:'perros',Salchipapas:'salchipapas',Antojos:'colombianos'};
  const availableProducts = savedCatalog.products.filter(product => product.available !== false);
  for (const product of availableProducts) {
    const existing = PRODUCTS.find(item => item.id === product.id);
    const mapped = {...product, category:categoryMap[product.category] || product.category || 'colombianos'};
    if (existing) Object.assign(existing, mapped);
    else PRODUCTS.push({...mapped, desc:product.desc || 'Preparado al momento, con el sabor de la casa.'});
  }
  for (let i = PRODUCTS.length - 1; i >= 0; i--) {
    if (!availableProducts.some(product => product.id === PRODUCTS[i].id)) PRODUCTS.splice(i, 1);
  }
}
// El checkout reutiliza exactamente el catálogo que alimenta el menú público.
window.FORJA_PRODUCTS = PRODUCTS;

const money = value => new Intl.NumberFormat('es-CO',{style:'currency',currency:CONFIG.currency,maximumFractionDigits:0}).format(value);
const grid = document.querySelector('#product-grid');
const cart = new Map(JSON.parse(localStorage.getItem('forja-cart')||'[]'));
let toastTimer;

function renderProducts(filter='todos') {
  const shown = PRODUCTS.filter(item => filter === 'todos' || item.category === filter);
  grid.innerHTML = shown.map((item,index)=>`<article class="product-card" style="animation-delay:${index*45}ms"><div class="product-image-wrap"><img src="${item.image}" alt="${item.name}, ${item.desc}" loading="lazy" onerror="this.onerror=null;this.src='assets/images/hero-forja-brava.png'">${item.tag?`<span class="product-tag">${item.tag}</span>`:''}</div><div class="product-info"><div class="product-name-row"><h3 class="product-name">${item.name}</h3><span class="product-price">${money(item.price)}</span></div><p class="product-desc">${item.desc}</p><button class="product-add" data-add="${item.id}">SUMAR AL PEDIDO <span>+</span></button></div></article>`).join('');
}
function showToast(message){const toast=document.querySelector('.toast');toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2200)}
function addItem(id){const product=PRODUCTS.find(item=>item.id===id);if(!product)return;cart.set(id,(cart.get(id)||0)+1);updateCart();showToast(`${product.name} se sumó a tu pedido`)}
function updateCart(){localStorage.setItem('forja-cart',JSON.stringify([...cart]));window.dispatchEvent(new CustomEvent('forja:cart-updated'));const count=[...cart.values()].reduce((a,b)=>a+b,0);document.querySelectorAll('.cart-count').forEach(el=>el.textContent=count);const items=[...cart.entries()].map(([id,qty])=>{const p=PRODUCTS.find(item=>item.id===id);if(!p)return '';return `<div class="cart-line"><div><h3>${p.name}</h3><small>${money(p.price)} · ${money(p.price*qty)}</small></div><div class="cart-quantity"><button data-qty="${id}" data-delta="-1" aria-label="Quitar uno de ${p.name}">−</button><span>${qty}</span><button data-qty="${id}" data-delta="1" aria-label="Agregar uno de ${p.name}">+</button></div></div>`}).join('');document.querySelector('.cart-items').innerHTML=items;document.querySelector('.cart-empty').hidden=count>0;const summary=document.querySelector('.cart-summary');summary.classList.toggle('is-empty',count===0);summary.querySelector('strong').textContent=money([...cart.entries()].reduce((sum,[id,qty])=>sum+(PRODUCTS.find(p=>p.id===id)?.price||0)*qty,0))}
function openCart(){document.querySelector('.cart-drawer').classList.add('open');document.querySelector('.cart-drawer').setAttribute('aria-hidden','false');document.body.classList.add('cart-open');document.querySelector('.cart-close').focus()}
function closeCart(){document.querySelector('.cart-drawer').classList.remove('open');document.querySelector('.cart-drawer').setAttribute('aria-hidden','true');document.body.classList.remove('cart-open')}
function whatsappUrl(message){return CONFIG.whatsappNumber?`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`:''}

renderProducts();
document.querySelectorAll('[data-contact="location"]').forEach(el=>el.textContent=CONFIG.location);
document.querySelectorAll('[data-contact="hours"]').forEach(el=>el.textContent=CONFIG.hours);
document.querySelectorAll('[data-contact="phone"]').forEach(el=>el.textContent=CONFIG.phone);
document.querySelectorAll('.filter-btn').forEach(button=>button.addEventListener('click',()=>{const previous=document.querySelector('.filter-btn.active');previous?.classList.remove('active');previous?.setAttribute('aria-pressed','false');button.classList.add('active');button.setAttribute('aria-pressed','true');renderProducts(button.dataset.filter)}));
document.addEventListener('click',event=>{const add=event.target.closest('[data-add]');if(add)addItem(add.dataset.add);const qty=event.target.closest('[data-qty]');if(qty){const next=(cart.get(qty.dataset.qty)||0)+Number(qty.dataset.delta);next<1?cart.delete(qty.dataset.qty):cart.set(qty.dataset.qty,next);updateCart()}if(event.target.closest('.cart-trigger'))openCart();if(event.target.closest('.cart-close')||event.target.classList.contains('cart-backdrop'))closeCart();if(event.target.closest('.cart-browse')){closeCart();document.querySelector('#menu').scrollIntoView({behavior:'smooth'})}});
const mobileToggle=document.querySelector('.menu-toggle'),nav=document.querySelector('.main-nav');mobileToggle.addEventListener('click',()=>{const open=mobileToggle.getAttribute('aria-expanded')!=='true';mobileToggle.setAttribute('aria-expanded',String(open));mobileToggle.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');nav.classList.toggle('open',open)});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobileToggle.setAttribute('aria-expanded','false');nav.classList.remove('open')}));
const header=document.querySelector('.site-header');const scrollHeader=()=>header.classList.toggle('scrolled',window.scrollY>40);window.addEventListener('scroll',scrollHeader,{passive:true});scrollHeader();
const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');revealObserver.unobserve(entry.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));
const form=document.querySelector('#contact-form');form.addEventListener('submit',event=>{event.preventDefault();const name=form.elements.name.value.trim(),email=form.elements.email.value.trim(),feedback=form.querySelector('.form-feedback');if(name.length<2){feedback.textContent='Escribe tu nombre para poder contactarte.';form.elements.name.focus();return}if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){feedback.textContent='Revisa el formato de tu correo.';form.elements.email.focus();return}feedback.textContent='¡Gracias! Este formulario es demostrativo; configura un servicio para recibir mensajes.';form.reset()});
const waLink=document.querySelector('.whatsapp-link'),waFloat=document.querySelector('.floating-whatsapp');const wa=whatsappUrl('Hola, quisiera conocer el menú de FORJA BRAVA.');if(wa){waLink.href=wa;waFloat.addEventListener('click',()=>window.open(wa,'_blank','noopener'))}else{waLink.addEventListener('click',event=>{event.preventDefault();showToast('Configura el WhatsApp en js/app.js para activar el enlace')});waFloat.addEventListener('click',()=>showToast('Configura el WhatsApp en js/app.js para activar el enlace'))}
const CLIENTS_KEY='forja-clientes-demo',CLIENT_SESSION_KEY='forja-cliente-session',authModal=document.querySelector('#auth-modal');let currentUser=null;
const readClients=()=>{try{const value=JSON.parse(localStorage.getItem(CLIENTS_KEY)||'[]');return Array.isArray(value)?value:[]}catch{return []}};
const publicClient=({id,name,email,phone})=>({id,name,email,phone});
function encodeBytes(bytes){let binary='';bytes.forEach(byte=>binary+=String.fromCharCode(byte));return btoa(binary)}
function decodeBytes(value){return Uint8Array.from(atob(value),char=>char.charCodeAt(0))}
async function passwordDigest(password,salt){if(!window.crypto?.subtle)throw new Error('Este navegador no permite la autenticación local segura. Abre el sitio mediante localhost o HTTPS.');const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(password),'PBKDF2',false,['deriveBits']);const bits=await crypto.subtle.deriveBits({name:'PBKDF2',salt:decodeBytes(salt),iterations:120000,hash:'SHA-256'},key,256);return encodeBytes(new Uint8Array(bits))}
function authOpen(tab='login'){authModal.classList.add('open');authModal.setAttribute('aria-hidden','false');document.body.classList.add('cart-open');if(tab==='profile'){showAccount();return}document.querySelector(`[data-auth-tab="${tab}"]`).click()}
function authClose(){authModal.classList.remove('open');authModal.setAttribute('aria-hidden','true');document.body.classList.remove('cart-open')}
function showAccount(){if(!currentUser){authOpen('login');return}document.querySelector('.auth-tabs').hidden=true;document.querySelector('#login-form').hidden=true;document.querySelector('#register-form').hidden=true;document.querySelector('.profile-view').hidden=false;document.querySelector('#auth-title').textContent='MI PERFIL.';document.querySelector('#profile-form [name=name]').value=currentUser.name;document.querySelector('#profile-form [name=email]').value=currentUser.email;document.querySelector('#profile-form [name=phone]').value=currentUser.phone||'';document.querySelector('.profile-message').textContent=`Sesión iniciada como ${currentUser.name}`}
function showAuthTabs(){document.querySelector('.auth-tabs').hidden=false;document.querySelector('.profile-view').hidden=true;document.querySelector('#auth-title').textContent='TU CUENTA.'}
function authSuccess(user){currentUser=publicClient(user);sessionStorage.setItem(CLIENT_SESSION_KEY,currentUser.id);document.querySelector('.account-trigger').textContent='MI CUENTA · '+currentUser.name.split(' ')[0];authClose();showToast(`Sesión iniciada. Hola, ${currentUser.name}.`)}
document.querySelectorAll('[data-auth-tab]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-auth-tab]').forEach(b=>b.classList.toggle('active',b===button));document.querySelector('#login-form').hidden=button.dataset.authTab!=='login';document.querySelector('#register-form').hidden=button.dataset.authTab!=='register';document.querySelector('.profile-view').hidden=true;document.querySelector('#auth-title').textContent=button.dataset.authTab==='register'?'CREAR CUENTA.':'TU CUENTA.';document.querySelectorAll('.auth-message').forEach(m=>m.textContent='')}));
document.querySelector('.account-trigger').addEventListener('click',()=>currentUser?authOpen('profile'):authOpen('login'));authModal.querySelectorAll('[data-auth-close]').forEach(el=>el.addEventListener('click',authClose));
document.querySelector('#login-form').addEventListener('submit',async e=>{e.preventDefault();const f=e.currentTarget,m=f.querySelector('.auth-message'),email=f.elements.email.value.trim().toLowerCase(),password=f.elements.password.value;try{const user=readClients().find(client=>client.email===email);if(!user||!await passwordDigest(password,user.passwordSalt).then(hash=>hash===user.passwordHash)){m.textContent='El correo o la contraseña no son correctos.';return}authSuccess(user);f.reset()}catch(err){m.textContent=err.message||'No se pudo iniciar sesión.'}});
document.querySelector('#register-form').addEventListener('submit',async e=>{e.preventDefault();const f=e.currentTarget,m=f.querySelector('.auth-message');if(!f.reportValidity())return;const name=f.elements.name.value.trim(),email=f.elements.email.value.trim().toLowerCase(),phone=f.elements.phone.value.trim(),password=f.elements.password.value;if(name.length<2){m.textContent='Escribe tu nombre completo.';return}if(password!==f.elements.confirmPassword.value){m.textContent='Las contraseñas no coinciden.';return}const clients=readClients();if(clients.some(client=>client.email.toLowerCase()===email)){m.textContent='Ya existe una cuenta con ese correo electrónico.';return}try{const saltBytes=crypto.getRandomValues(new Uint8Array(16)),passwordSalt=encodeBytes(saltBytes),passwordHash=await passwordDigest(password,passwordSalt),user={id:crypto.randomUUID(),name,email,phone,passwordSalt,passwordHash,createdAt:new Date().toISOString()};clients.push(user);localStorage.setItem(CLIENTS_KEY,JSON.stringify(clients));authSuccess(user);f.reset();showToast(`Cuenta creada correctamente. Hola, ${name}.`)}catch(err){m.textContent=err.message||'No se pudo guardar la cuenta en este navegador.'}});
document.querySelector('#profile-form').addEventListener('submit',e=>{e.preventDefault();const f=e.currentTarget,m=document.querySelector('.profile-message');if(!currentUser){m.textContent='Inicia sesión para consultar tu perfil.';showAuthTabs();return}const name=f.elements.name.value.trim(),phone=f.elements.phone.value.trim();if(name.length<2){m.textContent='Escribe tu nombre completo.';return}const clients=readClients(),index=clients.findIndex(client=>client.id===currentUser.id);if(index<0){sessionStorage.removeItem(CLIENT_SESSION_KEY);currentUser=null;showAuthTabs();m.textContent='No encontramos tu cuenta local. Inicia sesión de nuevo.';return}clients[index]={...clients[index],name,phone,updatedAt:new Date().toISOString()};try{localStorage.setItem(CLIENTS_KEY,JSON.stringify(clients));currentUser=publicClient(clients[index]);document.querySelector('.account-trigger').textContent='MI CUENTA · '+name.split(' ')[0];showAccount();showToast('Perfil actualizado correctamente.')}catch{m.textContent='No se pudieron guardar los cambios en este navegador.'}});
document.querySelector('.logout-button').addEventListener('click',()=>{sessionStorage.removeItem(CLIENT_SESSION_KEY);currentUser=null;showAuthTabs();document.querySelector('.account-trigger').textContent='MI CUENTA';authClose();showToast('Sesión cerrada.')});
function restoreClientSession(){const id=sessionStorage.getItem(CLIENT_SESSION_KEY);if(!id)return;const user=readClients().find(client=>client.id===id);if(user){currentUser=publicClient(user);document.querySelector('.account-trigger').textContent='MI CUENTA · '+currentUser.name.split(' ')[0]}else sessionStorage.removeItem(CLIENT_SESSION_KEY)}restoreClientSession();
document.querySelector('.cart-checkout').addEventListener('click',()=>{if(!cart.size)return;document.querySelector('.checkout-modal').classList.add('open');document.querySelector('.checkout-modal').setAttribute('aria-hidden','false');document.body.classList.add('cart-open');window.dispatchEvent(new CustomEvent('forja:checkout-open'))});

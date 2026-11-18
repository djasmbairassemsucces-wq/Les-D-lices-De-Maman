// Les Délices De Maman — panier et navigation
const numeroWhatsApp = "23564158045"; // À confirmer avec le restaurant
const panier = [];

function formaterPrix(prix) { return new Intl.NumberFormat("fr-FR").format(prix) + " FCFA"; }
function ajouterAuPanier(nom, prix) {
  const article = panier.find(a => a.nom === nom);
  if (article) article.quantite++;
  else panier.push({ nom, prix, quantite: 1 });
  afficherPanier();
}
function modifierQuantite(nom, variation) {
  const article = panier.find(a => a.nom === nom);
  if (!article) return;
  article.quantite += variation;
  if (article.quantite <= 0) panier.splice(panier.indexOf(article), 1);
  afficherPanier();
}
function echapperHTML(s) { return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function afficherPanier() {
  const zone = document.getElementById('cartItems');
  const totalZone = document.getElementById('cartTotal');
  const bouton = document.getElementById('checkoutButton');
  if (!zone || !totalZone || !bouton) return;
  if (!panier.length) { zone.innerHTML = '<p class="empty-cart">Votre panier est vide pour le moment.</p>'; totalZone.textContent = formaterPrix(0); bouton.disabled = true; return; }
  zone.innerHTML = panier.map(a => `<div class="cart-row"><span class="cart-row-name">${echapperHTML(a.nom)}</span><span class="cart-row-price">${formaterPrix(a.prix*a.quantite)}</span><div class="quantity-controls"><button type="button" aria-label="Retirer un ${echapperHTML(a.nom)}" onclick="modifierQuantite('${echapperHTML(a.nom)}',-1)">−</button><span>${a.quantite}</span><button type="button" aria-label="Ajouter un ${echapperHTML(a.nom)}" onclick="modifierQuantite('${echapperHTML(a.nom)}',1)">+</button></div></div>`).join('');
  totalZone.textContent = formaterPrix(panier.reduce((s,a)=>s+a.prix*a.quantite,0)); bouton.disabled = false;
}
function commanderPanier() {
  if (!panier.length) { alert('Votre panier est vide.'); return; }
  const total = panier.reduce((s,a)=>s+a.prix*a.quantite,0);
  const lignes = panier.map(a=>`- ${a.nom} x${a.quantite} : ${formaterPrix(a.prix*a.quantite)}`);
  const message = ['Bonjour Les Délices De Maman !','Je souhaite commander :',...lignes,`Total : ${formaterPrix(total)}`,'Merci de confirmer ma commande.'].join('\n');
  window.open('https://wa.me/'+numeroWhatsApp+'?text='+encodeURIComponent(message),'_blank');
}
document.addEventListener('DOMContentLoaded',()=>{
  const bouton = document.getElementById('menuToggle'); const liens = document.getElementById('navLinks');
  if (bouton && liens) {
    bouton.addEventListener('click',()=>{const ouvert=liens.classList.toggle('open');bouton.setAttribute('aria-expanded',String(ouvert));bouton.setAttribute('aria-label',ouvert?'Fermer le menu':'Ouvrir le menu');});
    liens.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{liens.classList.remove('open');bouton.setAttribute('aria-expanded','false');bouton.setAttribute('aria-label','Ouvrir le menu');}));
  }
  const annee=document.getElementById('year'); if(annee) annee.textContent=new Date().getFullYear(); afficherPanier();
});

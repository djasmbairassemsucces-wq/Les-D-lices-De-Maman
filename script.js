const numeroWhatsApp = "23564158045";


// FONCTION DE COMMANDE

function commander(produit) {

    const message =
        "Bonjour Les Délices De Maman ! " +
        "Je souhaite commander : " + produit +
        ". Merci de me renseigner.";

    const url =
        "https://wa.me/" +
        numeroWhatsApp +
        "?text=" +
        encodeURIComponent(message);

    window.open(url, "_blank");

}
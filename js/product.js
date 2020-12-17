// Fonction pour afficher le produit sélectionné
function createProductCard(dataList){
    const productCard = document.createElement('article');
    productCard.classList.add('item');

    // Créer la liste des choix d'objectifs
    let lensList = '';
    for(let lens in dataList.lenses) {
        lensList += '<option value=\"' + dataList.lenses[lens] + '\" >' + dataList.lenses[lens] + '</option>';
    }
    // Créer la fiche d'UN produit
    productCard.innerHTML =
    '<div class="item__img">' +
        '<img src=\"' + dataList.imageUrl + '\" alt=\"Photo d\'un appareil '+ dataList.name + '\"/>' +
    '</div>' +
    '<div class="item__infos">' +
        '<div class="item__text">' +
            '<div class="item-name-price">' +
                '<h2>' + dataList.name + '</h2>' +
                '<p class="item__price">' + (dataList.price/100) + '€</p>' +
            '</div>' +
            '<p class="item__description">' + dataList.description + '</p>' +
        '</div>' +
        '<div class="lens-choice">' +
            '<label for="lens-select"> Objectif : </label>' + 
            '<select name="lens" id="lens-select">' +
                lensList +
            '</select>' +
        '</div>' +
        '<div tabindex="0" id="add-cart"><i class="fas fa-cart-plus"></i><br />Ajouter au panier</div>' +
    '<div>';
    product.appendChild(productCard);
    Cart.addToCart();
}
// Fonction pour afficher le produit sélectionné
function createProductCard(dataList){
    // Récupère l'id dans l'URL
    let searchID = new URLSearchParams(document.location.search.substring(1)).get("id");
    for (let content in dataList){ 
        if (searchID === dataList[content]._id){
            // Créer la fiche d'UN produit
            const productCard = document.createElement('article');
            productCard.classList.add('item');

            // Créer la liste des choix d'objectifs
            let lensList = '';
            for(let lens in dataList[content].lenses) {
                lensList += '<option value=\"' + dataList[content].lenses[lens] + '\" >' + dataList[content].lenses[lens] + '</option>';
            }
            
            productCard.innerHTML =
            '<div class="item__img"><img src=\"' + dataList[content].imageUrl + '\" /></div>' +
            '<div class="item__infos">' +
                '<div class="item__text">' +
                    '<div class="item-name-price">' +
                        '<h2>' + dataList[content].name + '</h2>' +
                        '<p class="item__price">' + (dataList[content].price/100) + '€</p>' +
                    '</div>' +
                    '<p class="item__description">' + dataList[content].description + '</p>' +
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
        }
    }
    cartManagement();
};

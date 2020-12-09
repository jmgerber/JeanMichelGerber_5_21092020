// Fonction pour créer la liste des produits
function createProductsList(dataList){
    for (let content in dataList){ 
        // Ajoute l'id du produit dans l'URL
        let urlAddID = new URLSearchParams('id', dataList[content]._id);
        urlAddID.set('id', dataList[content]._id);

        // Créer chaque produit de la liste
        const newArticle = document.createElement('article');
        newArticle.classList.add('items');
        newArticle.innerHTML =
        '<a href="produit.html?' + urlAddID + '">' +
            '<div class="items__img"><img src=\"' + dataList[content].imageUrl + '\" alt=\"Photo d\'un appareil '+ dataList[content].name + '\"/></div>' +
            '<div class="items__text">' +
                '<div class="items-name-price">' +
                    '<h2>' + dataList[content].name + '</h2>' +
                    '<p class="items__price">' + (dataList[content].price/100) + '€</p>' +
                '</div>' +
                '<p class="items__description">' + dataList[content].description + '</p>'+
            '</div>' +
        '</a>';
        productsList.appendChild(newArticle);
    }
};
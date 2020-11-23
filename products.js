let products = document.getElementById('products');
let product = document.getElementById('product');

// Se connecte à l'API pour récupérer les données
const getProducts = async () => {
    try {
        let response = await fetch('http://localhost:3000/api/cameras');
        if (response.ok){
            let dataList = await response.json();
            createBloc(dataList);
        } else {
            console.log('Retour du serveur : ' + response.status);
        }
    } catch (e) {
        console.error(e);
    }
}
getProducts();

// Fonction pour créer la liste des produits
function createProductsList(dataList){
    for (let content in dataList){ 
        // Ajoute l'id du produit dans l'URL
        let urlAddID = new URLSearchParams('id', dataList[content]._id);
        urlAddID.set('id', dataList[content]._id);

        // Créer chaque produit de la lite
        const newArticle = document.createElement('article');
        newArticle.classList.add('items');
        newArticle.innerHTML =
        '<a href="produit.html?' + urlAddID + '">' +
            '<div class="items__img"><img src=\"' + dataList[content].imageUrl + '\" /></div>' +
            '<div class="items__text">' +
                '<div class="items-name-price">' +
                    '<h2>' + dataList[content].name + '</h2>' +
                    '<p class="items__price">' + (dataList[content].price/100) + '€</p>' +
                '</div>' +
                '<p class="items__description">' + dataList[content].description + '</p>'+
            '</div>' +
        '</a>';
        products.appendChild(newArticle);
    }
};

// Fonction pour afficher le produit sélectionné
function createProductCard(dataList){
    // Récupère l'id dans l'URL
    let searchID = new URLSearchParams(document.location.search.substring(1)).get("id");
    for (let content in dataList){ 
        if (searchID == dataList[content]._id){
            // Créer la fiche d'UN produit
            const productCard = document.createElement('article');
            productCard.classList.add('item');

            // Créer la liste des choix d'objectifs
            let lensList = '';
            for(let lens in dataList[content].lenses) {
                lensList += '<option value=\"' + dataList[content].lenses[lens] + '\" >' + dataList[content].lenses[lens] + '</option>';
            }

            // Créer la liste de quantité
            let quantityList = '';
            for (let i=1; i < 10; i++) {
                quantityList += '<option value=\"' + i + '\" >' + i + '</option>';
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
                '<label for="color-select"> Coloris : </label>' + 
                '<select name="colors" id="color-select">' +
                    lensList +
                '</select>' +
                '<div class="qty-cart">' +
                        '<select name="quantity" id="qty-select" aria-label="Quantité">' +
                            quantityList +
                        '</select>' +
                    '<div tabindex="0" class="add-cart"><i class="fas fa-cart-plus"></i><br /> Ajouter au panier</div>' +
                '</div>' +
            '<div>';
            product.appendChild(productCard);
        }
    }
};

const createBloc = (dataList) => {
    try {
        if (products){
            createProductsList(dataList);
        }
        else if (product){
            createProductCard(dataList);
        }
    } catch (e) {
        console.error(e);
    }
}
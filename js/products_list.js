let products = document.getElementById('products');
let product = document.getElementById('product');
let cart = document.getElementById("cart");

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
};
getProducts();

const createBloc = (dataList) => {
    try {
        if (products){
            createProductsList(dataList);
        }
        else if (product){
            createProductCard(dataList);
        }
        else if (cart){
            createCartList(dataList);
        }
    } catch (e) {
        console.error(e);
    }
};

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
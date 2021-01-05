let cartList = localStorage;
let productsList = document.getElementById('products');
let product = document.getElementById('product');
let cart = document.getElementById("cart");
let order = document.getElementById('order');
let orderResume = document.getElementById('order-products');
let orderContactResume = document.getElementById('order__address');

class Utils {
    // Se connecte à l'API pour récupérer les données
    static get = async (url) => {
        try {
            let response = await fetch(url);
            if (response.ok){
                let dataList = await response.json();
                return dataList
            } else {
                console.log('Retour du serveur : ' + response.status);
            }
        } catch (e) {
            console.error(e);
        }
    }

    // Se connecte à l'API pour envoyer des données
    static post = async (url, data) => {
        try {
            let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
            });
            if (response.ok){
                let responseData = response.json();
                return responseData
            } else {
                console.error('Problème du serveur : ' + response.status);
            }
        }
        catch (e){
            console.error(e);
        }
    }

    // Récupère l'ID dans l'URL
    static getUrlId(){
        let urlId = new URLSearchParams(document.location.search.substring(1)).get("id");
        return urlId
    }
}

// Créer l'affichage des produits en fonction de la page
const createBloc = () => {
    try {
        if (productsList){
            Utils.get('http://localhost:3000/api/cameras/').then((data) => {
                createProductsList(data);
            });
        }
        else if (product){
            // Récupère l'ID de l'URL et affiche le produit correspondant
            let urlID = Utils.getUrlId();
            Utils.get('http://localhost:3000/api/cameras/' + urlID).then((data) => {
                createProductCard(data);
            });
        }
        else if (cart){
            Utils.get('http://localhost:3000/api/cameras/').then((data) => {
                createCartList(data);
            });
        }
        else if (order){
            createOrderResume();
        }
    } catch (e) {
        console.error(e);
    }
}
createBloc();
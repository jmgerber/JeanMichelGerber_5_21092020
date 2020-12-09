let cartList = localStorage;
let productsList = document.getElementById('products');
let product = document.getElementById('product');
let cart = document.getElementById("cart");
let order = document.getElementById('order');
let orderResume = document.getElementById('order-products');
let orderContactResume = document.getElementById('order__address');

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

// Se connecte à l'API pour envoyer des données
const postProduct = async (data) => {
    try {
        let response = await fetch('http://localhost:3000/api/cameras/order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
        });
        if (response.ok){
            responseData = response.json();
            return responseData
        } else {
            console.error('Problème du serveur : ' + response.status);
        }
    }
    catch (e){
        console.error(e);
    }
};

// Créer la liste en fonction de la page
const createBloc = (dataList) => {
    try {
        if (productsList){
            createProductsList(dataList);
        }
        else if (product){
            createProductCard(dataList);
        }
        else if (cart){
            createCartList(dataList);
        }
        else if (order){
            createOrderResume();
        }
    } catch (e) {
        console.error(e);
    }
};
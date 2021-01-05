// Créé le résumé de la commande
function createOrderResume(){
    let orderIdSpan = document.getElementById('order-id-text');
    let orderProducts = JSON.parse(cartList.getItem('order')).products;
    let orderID = JSON.parse(cartList.getItem('order')).orderId;
    let finalPrice = 0;
    orderIdSpan.innerText = orderID;

    // Lis les données renvoyées par la méthode POST et créé la liste des produits
    for (let item in orderProducts) {
        const resume = document.createElement('div');
        resume.classList.add('product-row');
        let name = orderProducts[item].name;
        let price =  parseInt(orderProducts[item].price, 10) / 100;
        finalPrice += price;

        resume.innerHTML =
        '<div class="product-row__name">' + name + '</div>' +
        '<div class="product-row__price">' + price + '€</div>';
        orderResume.appendChild(resume);
    }

    // Affiche le prix total de la commande
    const totalPrice = document.createElement('div');
    totalPrice.classList.add('total-price');
    totalPrice.innerHTML = 
    '<div>Prix total</div>' +
    '<div>' + finalPrice + '€</div>';
    orderResume.appendChild(totalPrice);

    // Créé le bloc des coordonnées de livraison
    let orderContact = JSON.parse(cartList.getItem('order')).contact;
    const contactInfos = document.createElement('div');
    contactInfos.classList.add('deliver-address');

    contactInfos.innerHTML =
    orderContact.lastName + ' ' + orderContact.firstName + '<br />' +
    orderContact.address + '<br />' +
    orderContact.city;
    orderContactResume.appendChild(contactInfos);
}
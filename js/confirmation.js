let orderIdDiv = document.getElementById('order-id');
let orderResume = document.getElementById('order-products');
let orderContactResume = document.getElementById('order__address');

function createOrderResume(){
    if(orderResume){
        let orderProducts = JSON.parse(cartList.getItem('order')).products;
        let orderID = JSON.parse(cartList.getItem('order')).orderId;
        let finalPrice = 0;
        orderIdDiv.innerHTML = 'ID de la commande : <br/ >' + '<span class="order-id-text">' + orderID + '</span>';

        for (let nb in orderProducts) {
            const resume = document.createElement('div');
            resume.classList.add('product-row');
            let name = orderProducts[nb].name;
            let price =  parseInt(orderProducts[nb].price, 10) / 100;
            finalPrice += price;
            resume.innerHTML =
            '<div class="product-row__name">' + name + '</div>' +
            '<div class="product-row__price">' + price + '€</div>';
            orderResume.appendChild(resume);
        }
        const totalPrice = document.createElement('div');
        totalPrice.classList.add('total-price');
        totalPrice.innerHTML = 
        '<div>Prix total</div>' +
        '<div>' + finalPrice + '€</div>';
        orderResume.appendChild(totalPrice);
    }
}


function createOrderContact(){
    if(orderContactResume){
        let orderContact = JSON.parse(cartList.getItem('order')).contact;
        console.log(orderContact);
        const contactInfos = document.createElement('div');
        contactInfos.classList.add('deliver-address');
        contactInfos.innerHTML =
        orderContact.lastName + ' ' + orderContact.firstName + '<br />' +
        orderContact.address + '<br />' +
        orderContact.city;
        orderContactResume.appendChild(contactInfos);
    }
}
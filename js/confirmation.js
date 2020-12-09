function createOrderResume(){
    if(orderResume){
        let orderIdSpan = document.getElementById('order-id-text');
        let orderProducts = JSON.parse(cartList.getItem('order')).products;
        let orderID = JSON.parse(cartList.getItem('order')).orderId;
        let finalPrice = 0;
        orderIdSpan.innerText = orderID;

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

        createOrderContact();
    }
}


function createOrderContact(){
    let orderContact = JSON.parse(cartList.getItem('order')).contact;
    const contactInfos = document.createElement('div');
    contactInfos.classList.add('deliver-address');

    contactInfos.innerHTML =
    orderContact.lastName + ' ' + orderContact.firstName + '<br />' +
    orderContact.address + '<br />' +
    orderContact.city;
    
    orderContactResume.appendChild(contactInfos);
}
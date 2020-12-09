let finalPrice = document.getElementById('total-price');
let cartValidationForm = document.querySelector('.cart-form');
let cartContent = JSON.parse(cartList.getItem('cartContent'));

// Fonction pour afficher la liste du panier
function createCartList(dataList){

    let totalPrice = 0;
    if (cartContent === null || cartContent.length === 0){
        const newParagraph = document.createElement('p');
        newParagraph.innerHTML = '<em>Le panier est vide</em>';
        cart.prepend(newParagraph);
        cartValidationForm.classList.add('form-hide');
    } else if (cartContent.length > 0){
        for (let content in dataList){ 
            // Créer chaque produit de la liste du panier
            for (let i = 0; i < cartContent.length; i++){
                if (cartContent[i].id === dataList[content]._id) {
                    // Ajoute l'id du produit dans l'URL pour le lien vers le produit
                    let urlAddID = new URLSearchParams('id', dataList[content]._id);
                    urlAddID.set('id', dataList[content]._id);

                    let lens = cartContent[i].lens;
                    let price = parseInt((dataList[content].price/100), 10);
                    totalPrice += price;
                    const newArticle = document.createElement('article');
                    newArticle.classList.add('cart-items');
                    newArticle.setAttribute('data-id', dataList[content]._id);
                    newArticle.innerHTML =
                    '<div class="cart-items__product">' +
                        '<a href="produit.html?' + urlAddID + '">' +
                            '<img src=\"' + dataList[content].imageUrl + '\" />' +
                            '<h2 class="product-name">' + dataList[content].name + '</h2>' +
                        '</a>' +
                    '</div>' +
                    '<div class="cart-items__text">' +
                        '<p>Objectif : <span class="lens-test">' + lens + '</span></p>' +
                        '<p class="cart-items__price">' + price + '€</p>' +
                    '</div>' +
                    '<div tabindex="0"  class="delete-cart"><i class="fas fa-cart-arrow-down"></i><br />Retirer du panier</div>';
                    cart.prepend(newArticle);
                }
            }
        }
        cartValidationForm.classList.remove('form-hide');
    }
    finalPrice.innerText = totalPrice;
    cartManagement();
};


function cartManagement(){
    let addCartButton = document.getElementById('add-cart');
    let deleteCartButton = document.querySelectorAll('.delete-cart');
    
    if (addCartButton != undefined){
        addCartButton.addEventListener('click', addToCart);
    } else if (deleteCartButton != undefined){
        deleteCartButton.forEach(function(currentValue){
            currentValue.addEventListener('click', deleteFromCart);
        });
    }
};

function addToCart(){
    let cartContent = JSON.parse(cartList.getItem("cartContent"));
    if (cartContent === null){
        cartContent = [];
    }

    let lensChoice = document.getElementById('lens-select').value;
    let productID = new URLSearchParams(document.location.search.substring(1)).get("id");
    let newProduct = {
        id : productID,
        lens : lensChoice
    };
    cartContent.push(newProduct);
    cartList.setItem("cartContent", JSON.stringify(cartContent));

    // Redirige vers le panier
    window.location.assign(window.location.origin + '/panier.html');
};

function deleteFromCart(){
    id = this.parentElement.getAttribute('data-id');
    lens = this.parentElement.querySelector('.cart-items__text .lens-test').innerText;
    for (let i = 0; i < cartContent.length; i++){
        if (cartContent[i].id === id && cartContent[i].lens === lens){
            // On met à jour le tableau du panier
            let pos = i;
            cartContent.splice(pos, 1);
            cartList.setItem("cartContent", JSON.stringify(cartContent));
            break
        }
    }
    // Actualise les produits du panier
    while(cart.firstChild){
        cart.removeChild(cart.firstChild);
    }
    getProducts();
};


let submitButton = document.getElementById('cart-validation-btn');
if (submitButton){
    submitButton.addEventListener('click', function(){
        let lastName = document.getElementById('last-name').value;
        let firstName = document.getElementById('first-name').value;
        let address = document.getElementById('address').value;
        let city = document.getElementById('city').value;
        let email = document.getElementById('email').value;
        if (formControl(lastName, firstName, address, city, email)){
            let data = newContact(lastName, firstName, address, city, email);
            postProduct(data).then((value) => {
                cartList.setItem('order', JSON.stringify(value));
                cartList.removeItem('cartContent');
                window.location.assign(window.location.origin + '/confirmation.html');
            });
        }
    });
}

function newContact(lastName, firstName, address, city, email){
    let contact = {
        firstName: firstName,
        lastName: lastName,
        address: address,
        city: city,
        email: email
    }
    return stringifyPost(contact);
}

function stringifyPost(contact){
    let products = [];
    cartContent = JSON.parse(cartList.cartContent);
    for (let i = 0; i < cartContent.length; i++){
        products.push(cartContent[i].id);
    }
    return JSON.stringify({contact, products});
}
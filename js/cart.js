let finalPrice = document.getElementById('total-price');
let cartValidationForm = document.querySelector('.cart-form');
let cartContent = JSON.parse(cartList.getItem('cartContent'));
let totalPriceContainer = document.getElementById('total-price-container');

class Cart{

    static addToCart(){
        let addCartButton = document.getElementById('add-cart');
        let cartContent = JSON.parse(cartList.getItem("cartContent"));

        addCartButton.addEventListener('click', function(){
            if (cartContent === null){
                cartContent = [];
            }
            let lensChoice = document.getElementById('lens-select').value;
            let productID = Utils.getUrlId();
            let newProduct = {
                id : productID,
                lens : lensChoice
            };
            cartContent.push(newProduct);
            cartList.setItem("cartContent", JSON.stringify(cartContent));

            // Redirige vers le panier
            window.location.assign(window.location.origin + '/panier.html');
        });
    }

    static deleteFromCart(){
        let deleteCartButton = document.querySelectorAll('.delete-cart');
        deleteCartButton.forEach(function(currentValue){
            currentValue.addEventListener('click', function(){
                let id = this.parentElement.getAttribute('data-id');
                let lens = this.parentElement.querySelector('.cart-items__text .lens-test').innerText;
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
                createBloc();
            });
        });
    }

    static stringifyPost(lastName, firstName, address, city, email){
        // Créé un objet contact
        let contact = {
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            email: email
        }
    
        // Créé un tableau de produits
        let products = [];
        cartContent = JSON.parse(cartList.cartContent);
        for (let i = 0; i < cartContent.length; i++){
            products.push(cartContent[i].id);
        }
    
        return JSON.stringify({contact, products});
    }
}

// Fonction pour afficher la liste du panier
function createCartList(dataList){
    let totalPrice = 0;
    if (cartContent === null || cartContent.length === 0){
        totalPriceContainer.style.display = "none";
        const newParagraph = document.createElement('p');
        newParagraph.innerHTML = '<em>Le panier est vide</em>';
        cart.prepend(newParagraph);
        cartValidationForm.style.display = "none";
    } else if (cartContent.length > 0){
        for (let content in dataList){ 
            // Créer chaque produit de la liste du panier
            for (let i = 0; i < cartContent.length; i++){
                if (cartContent[i].id === dataList[content]._id) {
                    let lens = cartContent[i].lens;
                    let price = parseInt((dataList[content].price/100), 10);
                    totalPrice += price;
                    const newArticle = document.createElement('article');
                    newArticle.classList.add('cart-items');
                    newArticle.setAttribute('data-id', dataList[content]._id);
                    newArticle.innerHTML =
                    '<div class="cart-items__product">' +
                        '<a href="produit.html?id=' + dataList[content]._id + '">' +
                            '<img src=\"' + dataList[content].imageUrl + '\" alt=\" Photo d\'un appareil ' + dataList[content].name + '\"/>' +
                            '<h2 class="product-name">' + dataList[content].name + '</h2>' +
                        '</a>' +
                    '</div>' +
                    '<div class="cart-items__text">' +
                        '<p>Objectif : <span class="lens-test">' + lens + '</span></p>' +
                        '<p class="cart-items__price">' + price + '€</p>' +
                    '</div>' +
                    '<div tabindex="0" class="delete-cart"><i class="fas fa-cart-arrow-down"></i><br />Retirer du panier</div>';
                    cart.prepend(newArticle);
                }
            }
        }
    }
    finalPrice.innerText = totalPrice;
    Cart.deleteFromCart();
}


// Validation du panier
function submitOrder(event){ 
    let lastName = document.getElementById('last-name').value;
    let firstName = document.getElementById('first-name').value;
    let address = document.getElementById('address').value;
    let city = document.getElementById('city').value;
    let email = document.getElementById('email').value;

    if (formControl(lastName, firstName, address, city, email)){
        let data = Cart.stringifyPost(lastName, firstName, address, city, email);
        Utils.post('http://localhost:3000/api/cameras/order', data).then((value) => {
            cartList.setItem('order', JSON.stringify(value));
            cartList.removeItem('cartContent');
            window.location.assign(window.location.origin + '/confirmation.html');
        });
    }
    event.preventDefault();
}
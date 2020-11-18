let products = document.getElementById('products');

        const createBloc = (dataList) => {
            try {
                for (let content in dataList){ 
                    const newArticle = document.createElement('article');
                    newArticle.classList.add('item');
                    newArticle.innerHTML =
                    '<a href="">' +
                    '<div class="items__img"><img src=\"' + dataList[content].imageUrl + '\" /></div>' +
                    '<h2>Nom : ' + dataList[content].name + '</h2>' +
                    '<p class="items__price">Prix : ' + (dataList[content].price/100) + '€</p>' +
                    '<p class="items__description">' + dataList[content].description + '</p>'+
                    '</a>';

                    products.appendChild(newArticle);
                    } 
            } catch (e) {
                console.error(e);
            }
        }

        const getProducts = async () => {
            try {
                let response = await fetch('http://localhost:3000/api/teddies');
                if (response.ok){
                    let data = await response.json();
                    createBloc(data);
                } else {
                    console.log('Retour du serveur : ' + response.status);
                }
            } catch (e) {
                console.error(e);
            }
        }
        getProducts();
let products = document.getElementById('products');

        const createBloc = (dataList) => {
            try {
                for (let content in dataList){ 
                    const newArticle = document.createElement('article');
                    newArticle.classList.add('item');
                    newArticle.innerHTML =
                    '<a href="">' +
                        '<div class="item__img"><img src=\"' + dataList[content].imageUrl + '\" /></div>' +
                        '<div class="item__text">' +
                            '<div class="infos">' +
                                '<h2>' + dataList[content].name + '</h2>' +
                                '<p class="item__price">' + (dataList[content].price/100) + '€</p>' +
                            '</div>' +
                            '<p class="item__description">' + dataList[content].description + '</p>'+
                        '</div>' +
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
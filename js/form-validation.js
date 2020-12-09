// Expressions REGEX
function emailIsValid(value) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value.toLowerCase());
}
function textIsValid(value) {
    const re = /([a-z]){2,}$/i;
    return re.test(value);
}
function addressIsValid(value) {
    const re = /([0-9]{1,}).{1,}$/i;
    return re.test(value);
}

function formControl(lastName, firstName, address, city, email){
    let formChecked = true;
    lastNameInput = document.getElementById('last-name');
    firstNameInput = document.getElementById('first-name');
    addressInput = document.getElementById('address');
    cityInput = document.getElementById('city');
    emailInput = document.getElementById('email');

    if(!textIsValid(lastName)){
        lastNameInput.parentNode.lastElementChild.innerText = "Le nom est incorrect";
        formChecked = false;
    } else{
        lastNameInput.parentNode.lastElementChild.innerText = "";
    }
    if (!textIsValid(firstName)){
        firstNameInput.parentNode.lastElementChild.innerText = "Le prénom est incorrect";
        formChecked = false;
    } else{
        firstNameInput.parentNode.lastElementChild.innerText = "";
    }
    if(!addressIsValid(address)){
        addressInput.parentNode.lastElementChild.innerText = "L'adresse est incorrecte";
        formChecked = false;
    } else{
        addressInput.parentNode.lastElementChild.innerText = "";
    }
    if(!textIsValid(city)){
        cityInput.parentNode.lastElementChild.innerText = "La ville est incorrecte";
        formChecked = false;
    } else{
        cityInput.parentNode.lastElementChild.innerText = "";
    }
    if(!emailIsValid(email)){
        emailInput.parentNode.lastElementChild.innerText = "L'email est invalide";
        formChecked = false;
    } else{
        emailInput.parentNode.lastElementChild.innerText = "";
    }
    return formChecked
}
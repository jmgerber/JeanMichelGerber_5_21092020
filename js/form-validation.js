// Expressions REGEX

class Regex {
    
    // Vérification de l'email
    static emailIsValid(value) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(value.toLowerCase());
    }

    // Vérification d'un texte
    static textIsValid(value) {
        const re = /^[A-Za-z][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/;
        return re.test(value);
    }

    // Vérification d'une adresse
    static addressIsValid(value) {
        const re = /^([0-9]{1,})[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,}$/;
        return re.test(value);
    }
}

// Fonction qui vérifie chaque champ et affiche les messages d'erreur s'il y en a
function formControl(lastName, firstName, address, city, email){
    let formChecked = true;
    let lastNameInput = document.getElementById('last-name');
    let firstNameInput = document.getElementById('first-name');
    let addressInput = document.getElementById('address');
    let cityInput = document.getElementById('city');
    let emailInput = document.getElementById('email');

    if(!Regex.textIsValid(lastName)){
        lastNameInput.parentNode.lastElementChild.innerText = "Le nom est incorrect";
        formChecked = false;
    } else{
        lastNameInput.parentNode.lastElementChild.innerText = "";
    }
    if (!Regex.textIsValid(firstName)){
        firstNameInput.parentNode.lastElementChild.innerText = "Le prénom est incorrect";
        formChecked = false;
    } else{
        firstNameInput.parentNode.lastElementChild.innerText = "";
    }
    if(!Regex.addressIsValid(address)){
        addressInput.parentNode.lastElementChild.innerText = "L'adresse est incorrecte";
        formChecked = false;
    } else{
        addressInput.parentNode.lastElementChild.innerText = "";
    }
    if(!Regex.textIsValid(city)){
        cityInput.parentNode.lastElementChild.innerText = "La ville est incorrecte";
        formChecked = false;
    } else{
        cityInput.parentNode.lastElementChild.innerText = "";
    }
    if(!Regex.emailIsValid(email)){
        emailInput.parentNode.lastElementChild.innerText = "L'email est invalide";
        formChecked = false;
    } else{
        emailInput.parentNode.lastElementChild.innerText = "";
    }
    return formChecked
}
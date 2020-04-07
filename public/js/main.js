const formFields = document.getElementById('closed-won-deal-input');
const formFieldsLost = document.getElementById('closed-lost-deal-input');
const addDealButton = document.getElementById('add-closed-deal-button');


function showFormFieldsElements () {
    formFields.style.display = 'inline-flex';
    formFieldsLost.style.display = 'inline-flex';
    addDealButton.style.display = 'none';
}

addDealButton.addEventListener("click", showFormFieldsElements);
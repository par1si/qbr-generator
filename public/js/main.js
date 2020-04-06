const formFields = document.getElementById('closed-won-deal-input');
const formFieldsLost = document.getElementById('closed-lost-deal-input');
const addClosedDealButton = document.getElementById('add-closed-deal-button');
const addLostDealButton = document.getElementById('add-lost-deal-button');

function showFormFieldsElement () {
    formFields.style.display = 'inline-flex';
    addClosedDealButton.style.display = 'none';
}

function showFormFieldsLostElement () {
    formFieldsLost.style.display = 'inline-flex';
    addLostDealButton.style.display = 'none';
}


addClosedDealButton.addEventListener("click", showFormFieldsElement);
addLostDealButton.addEventListener("click", showFormFieldsLostElement);
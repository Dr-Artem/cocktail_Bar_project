const cocktailSection = document.querySelector('.cocktail__list');
const favouriteCocktailSection = document.querySelector('.favourite-cocktail__list');

let localKeys = [];
for (const key in localStorage) {
    localKeys.push(key);
}
function addRemove(event) {
    const cardItem = document.querySelectorAll('.cocktail__item');
    if (event.target.className === 'buttons__add-to') {
        let elementId = event.target.id;
        if (localKeys.includes(elementId)) {
            localStorage.removeItem(`${elementId}`);
            event.target.textContent = 'Add to';
            localIndex = localKeys.indexOf(`${event.target.id}`);
            localKeys.splice(localIndex, 1);
            if (favouriteCocktailSection) {
                document.location.reload();
            }
        } else {
            let parentLi;
            cardItem.forEach(item => {
                if (item.id === elementId) {
                    parentLi = item.innerHTML;
                }
            });

            localStorage.setItem(`${elementId}`, parentLi);
            localKeys.push(elementId);
            event.target.textContent = 'Remove';
        }
    }
}
if (favouriteCocktailSection) {
    favouriteCocktailSection.addEventListener('click', addRemove);
    for (let i = 0; i < localStorage.length; i++) {
        console.log(localStorage.key(i));
        const element = localStorage.key(i);
        if (element.startsWith('strDrink')) {
            const el = localStorage.getItem(element);
            favouriteCocktailSection.insertAdjacentHTML('beforeend', `<li class='cocktail__item'>${el}</li>`);
        }
    }
}

if (cocktailSection) {
    cocktailSection.addEventListener('click', addRemove);
}
console.log(window.location.href);

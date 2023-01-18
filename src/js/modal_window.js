import modalWindowAdd from '../templates/modal.hbs';
import modalWindowIngredient from '../templates/renderIngridientInfo.hbs';
import { fetchApi } from './fetchApi';
import { params } from '..';
import favIngredient from '../templates/favourite-ingredient.hbs';

const backdrop = document.querySelector('.backdrop');
const backdropIngridient = document.querySelector('.backdrop-ingridient');

const modalWindow = document.querySelector('[data-modal]');
const modalWindowIngridient = document.querySelector('[data-ingridient]');
const modal = document.querySelector('[data-modal]');

const favouriteIngredientSection = document.querySelector('.fav-list');
let favouriteCocktailSection = document.querySelector('.favourite-cocktail__list');

function openModalWindow(el) {
    let inputValue = el.target.id;
    let identificator = 'i=';
    let type = 'lookup';
    let localKeys = [];
    for (const key in localStorage) {
        localKeys.push(key);
    }
    if (el.target.className === 'buttons__learn-more') {
        fetchApi(type, identificator, inputValue)
            .then(response => {
                let cardItem = document.querySelectorAll('.cocktail__item');
                let itemId = `strDrink${response.drinks[0].idDrink}`;
                modalWindow.innerHTML = modalWindowAdd(response.drinks);
                let favouriteBtn = document.querySelector('.favorite-btn');
                if (localKeys.includes(favouriteBtn.id)) {
                    favouriteBtn.textContent = 'Remove from favourite';
                }

                favouriteBtn.onclick = function () {
                    if (localKeys.includes(itemId)) {
                        localStorage.removeItem(`${itemId}`);
                        favouriteBtn.textContent = 'Add to favourite';
                        let localIndex = localKeys.indexOf(`${itemId}`);
                        localKeys.splice(localIndex, 1);
                        document.location.reload();
                    } else {
                        let parentLi;
                        cardItem.forEach(item => {
                            if (item.id === itemId) {
                                parentLi = item.innerHTML;
                            }
                        });
                        localStorage.setItem(`${itemId}`, parentLi);
                        localKeys.push(itemId);
                        favouriteBtn.textContent = 'Remove from favourite';
                    }
                };

                const ingridientList = document.querySelector('.ingridients__list');

                for (let i = 1; i <= 15; i++) {
                    const ingridient = response.drinks[0][`strIngredient${i}`];
                    const strMeasure = response.drinks[0][`strMeasure${i}`];
                    if (ingridient) {
                        ingridientList.insertAdjacentHTML('beforeend', `<li> <a class="ingridients__link" name='${ingridient}'> ${strMeasure}${ingridient}</a></li>`);
                    }
                }
                backdrop.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            })
            .catch(error => {
                console.log(error);
            });
    }
}

function closeModalWindow(el) {
    if (el.target.className.animVal !== 'button__icon') {
        return;
    }
    document.body.style.overflow = '';
    modalWindow.innerHTML = '';
    backdrop.classList.add('hidden');
}

function openIngridientModalWindow(el) {
    let inputValue = el.target.name;
    let identificator = 'i=';
    let type = 'search';
    let localKeys = [];
    for (const key in localStorage) {
        localKeys.push(key);
    }

    fetchApi(type, identificator, inputValue).then(response => {
        if (el.target.nodeName !== 'A' && el.target.className !== 'item__btn1') {
            return;
        }
        if (!response.ingredients[0].strDescription) {
            return;
        }
        const ingredientId = response.ingredients[0].idIngredient;
        modalWindowIngridient.innerHTML = modalWindowIngredient(response.ingredients);
        let favouriteBtnIngredient = modalWindowIngridient.querySelector('.ingredient__btn');
        if (localKeys.includes(favouriteBtnIngredient.id)) {
            favouriteBtnIngredient.textContent = 'Remove from favourite';
        }

        // backdrop.classList.add('hidden');
        backdropIngridient.classList.remove('hidden');

        favouriteBtnIngredient.onclick = function () {
            if (localKeys.includes(ingredientId)) {
                localStorage.removeItem(`strIngredient${ingredientId}`);
                favouriteBtnIngredient.textContent = 'Add to favourite';
                let localIndex = localKeys.indexOf(`strIngredient${ingredientId}`);
                localKeys.splice(localIndex, 1);
                document.location.reload();
            } else {
                let param = JSON.stringify(response.ingredients[0]);
                localStorage.setItem(`strIngredient${ingredientId}`, param);
                localKeys.push(ingredientId);
                favouriteBtnIngredient.textContent = 'Remove from favourite';
            }
        };
        const closebtn = document.querySelector('.button-icon');
        closebtn.onclick = function () {
            modalWindowIngridient.innerHTML = '';
            backdropIngridient.classList.add('hidden');
        };
    });
}
if (favouriteIngredientSection) {
    for (let i = 0; i < localStorage.length; i++) {
        const element = localStorage.key(i);
        if (element.startsWith('strIngredient')) {
            const el = localStorage.getItem(element);
            let jsonEl = JSON.parse(el);
            favouriteIngredientSection.insertAdjacentHTML('beforeend', favIngredient(jsonEl));
        }
    }
    const lernMoreBtn = document.querySelectorAll('.item__btn1');
    function test(event) {
        if (event.target.className === 'item__btn1') {
            openIngridientModalWindow(event);
        }
        if (event.target.className === 'item__btn2') {
            localStorage.removeItem(`strIngredient${event.target.id}`);
            document.location.reload();
        }
    }

    favouriteIngredientSection.addEventListener('click', test);
}

function closeIngridientModalWindow(el) {
    if (el.target.className.animVal !== 'button__icon__ingredient' && el.target.className !== 'backdrop-ingridient') {
        return;
    }

    modalWindowIngridient.innerHTML = '';

    // backdrop.classList.remove('hidden');
    backdropIngridient.classList.add('hidden');
}

modal.addEventListener('click', closeModalWindow);
modal.addEventListener('click', openIngridientModalWindow);
if (favouriteCocktailSection) {
    favouriteCocktailSection.addEventListener('click', openModalWindow);
}

if (params.cocktailSection) {
    params.cocktailSection.addEventListener('click', openModalWindow);
}

backdropIngridient.addEventListener('click', closeIngridientModalWindow);

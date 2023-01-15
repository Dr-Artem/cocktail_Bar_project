import modalWindowAdd from '../templates/modal.hbs';
import modalWindowIngredient from '../templates/renderIngridientInfo.hbs';
import { fetchApi } from './fetchApi';
import { params } from '..';

const backdrop = document.querySelector('.backdrop');
const backdropIngridient = document.querySelector('.backdrop-ingridient');

const modalWindow = document.querySelector('[data-modal]');
const modalWindowIngridient = document.querySelector('[data-ingridient]');
const modal = document.querySelector('[data-modal]');

function openModalWindow(el) {
    let inputValue = el.target.id;
    let identificator = 'i=';
    let type = 'lookup';
    let localKeys = [];
    for (const key in localStorage) {
        localKeys.push(key);
    }
    if (el.target.className !== 'buttons__learn-more') {
        return;
    }

    fetchApi(type, identificator, inputValue)
        .then(response => {
            const cardItem = document.querySelectorAll('.cocktail__item');
            let itemId = `strDrink${response.drinks[0].idDrink}`;
            modalWindow.innerHTML = modalWindowAdd(response.drinks);
            let favouriteBtn = document.querySelector('.favorite-btn__text');

            favouriteBtn.onclick = function () {
                if (localKeys.includes(itemId)) {
                    localStorage.removeItem(`${itemId}`);
                    favouriteBtn.textContent = 'Add to favourite';
                    localIndex = localKeys.indexOf(`${itemId}`);
                    localKeys.splice(localIndex, 1);
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
                if (ingridient) {
                    ingridientList.innerHTML = `<li> <a class="ingridients__link" name='${ingridient}'>&#10038${ingridient}</a></li>`;
                }
            }
            backdrop.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        })
        .catch(error => {
            console.log(error);
        });
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
    fetchApi(type, identificator, inputValue).then(response => {
        if (el.target.nodeName !== 'A') {
            return;
        }
        if (!response.ingredients[0].strDescription) {
            return;
        }
        modalWindowIngridient.innerHTML = modalWindowIngredient(response.ingredients);

        backdrop.classList.add('hidden');
        backdropIngridient.classList.remove('hidden');

        let favouriteBtnIngredient = document.querySelector('.ingredient__btn');
        favouriteBtnIngredient.onclick = function (params) {};
    });
}

function closeIngridientModalWindow(el) {
    if (el.target.className.animVal !== 'button__icon__ingredient' && el.target.className !== 'backdrop-ingridient') {
        return;
    }
    modalWindowIngridient.innerHTML = '';

    backdrop.classList.remove('hidden');
    backdropIngridient.classList.add('hidden');
}

modal.addEventListener('click', closeModalWindow);
modal.addEventListener('click', openIngridientModalWindow);
params.cocktailSection.addEventListener('click', openModalWindow);
backdropIngridient.addEventListener('click', closeIngridientModalWindow);

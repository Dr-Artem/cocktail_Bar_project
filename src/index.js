import { fetchApi } from './js/fetchApi';
import Notiflix from 'notiflix';
import card from './templates/renderCocktailCards.hbs';
import { openModalWindow } from './js/modal_window';
import { closeModalWindow } from './js/modal_window';
import { openIngridientModalWindow } from './js/modal_window';
import { closeIngridientModalWindow } from './js/modal_window';

const mainSection = document.querySelector('.cocktail');
const modal = document.querySelector('[data-modal]');
const modalIngridient = document.querySelector('[data-ingridient]');
const backdropIngridient = document.querySelector('.backdrop-ingridient');

console.log(modal);

let inputValue = '';
let identificator = '';
let type = '';

async function getDrink() {
  const data = await fetchApi(type, identificator, inputValue);
  console.log(data);

  try {
    mainSection.insertAdjacentHTML('beforeend', card(data.drinks));
  } catch (err) {
    console.log(err);
  }
}

function getRandomDrink(n) {
  inputValue = '';
  identificator = '';
  type = 'random';
  for (let i = 1; i <= n; i++) {
    getDrink();
  }
}
getRandomDrink(9);

mainSection.addEventListener('click', openModalWindow);
modal.addEventListener('click', closeModalWindow);
modal.addEventListener('click', openIngridientModalWindow);

backdropIngridient.addEventListener('click', closeIngridientModalWindow);

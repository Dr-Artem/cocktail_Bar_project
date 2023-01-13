import { fetchApi } from './js/fetchApi';
import Notiflix from 'notiflix';
import card from './templates/renderCocktailCards.hbs';

// import * as creatAlphabet from './js/creat-alphabet';
// import * as abcSearch from './js/abc-search';
// import * as inputAbcSearch from './js/input-abc-search';

// const mainSection = document.querySelector('.cocktail');

// let inputValue = '';
// let identificator = '';
// let type = '';

// async function getDrink() {
//   const data = await fetchApi(type, identificator, inputValue);
//   console.log(data);

//   try {
//     mainSection.insertAdjacentHTML('beforeend', card(data.drinks));
//   } catch (err) {
//     console.log(err);
//   }
// }

// function getRandomDrink(n) {
//   inputValue = '';
//   identificator = '';
//   type = 'random';
//   for (let i = 1; i <= n; i++) {
//     getDrink();
//   }
// }
// getRandomDrink(9);

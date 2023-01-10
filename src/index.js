import { fetchApi } from './js/fetchApi';
import Notiflix from 'notiflix';
import { getRandomDrink } from './js/fetchRandomDrink';

let inputValue = '';
let identificator = '';
let type = '';

async function getDrink(el) {
  const data = await fetchApi(type, identificator, inputValue);
  console.log(data);
}

// getDrink();
const tablet = window.matchMedia('(min-width: 768px)');
const desctop = window.matchMedia('(min-width: 1280px)');
let num = 3;

if (window.matchMedia('(min-width: 1280px)').matches) {
  num = 9;
} else if (window.matchMedia('(min-width: 768px)').matches) {
  num = 6;
}

for (let index = 0; index < num; index++) {
  // el.matches && (num = 6);
  getRandomDrink('random');
  console.log(num);
}

// function handleDeviceChange(e) {
//   if (e.matches) outputElement.textContent = 'Bigger Than Mobile';
//   else outputElement.textContent = 'Mobile';
// }

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

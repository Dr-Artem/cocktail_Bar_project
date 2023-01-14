import { fetchApi } from './js/fetchApi';
import Notiflix from 'notiflix';
import card from './templates/renderCocktailCards.hbs';
const alphabet = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
];

let cardItems;
const mainSection = document.querySelector('.cocktail');
const list = document.querySelector('.favourite-cocktail_list');

let inputValue = '';
let identificator = '';
let type = '';

async function getDrink() {
  const data = await fetchApi(type, identificator, inputValue);

  try {
    if (mainSection) {
      mainSection.innerHTML = card(data.drinks);
    }

    cardItems = document.querySelectorAll('.cocktail__item');
  } catch (err) {
    console.log(err);
  }
}

function getRandomDrink() {
  inputValue = alphabet[Math.floor(Math.random() * alphabet.length)];
  identificator = 's=';
  type = 'search';
  getDrink();
}
getRandomDrink();

function test(event) {
  if (event.target.className === 'buttons__add-to') {
    cardItems.forEach(item => {
      if (event.target.id === item.id) {
        let test = item.innerHTML;
        console.log(test);
        localStorage.setItem(`strDrink${event.target.id}`, test);
      }
    });
  }
  console.log(localStorage);
}

mainSection.addEventListener('click', test);

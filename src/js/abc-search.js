import { fetchApi } from './fetchApi';
import Notiflix from 'notiflix';
import card from '../templates/renderCocktailCards.hbs';

export const refs = {
  btnAbc: document.querySelector('.ABC-search'),
  inputDropdown: document.querySelector('.ABC-input'),
  inputBtn: document.querySelector('.dropdown__btn'),
  btnDropdown: document.querySelector('.dropdown__content'),
  icon: document.querySelector('.dropdown__btn__icon'),
  mainSection: document.querySelector('.cocktail'),
  failureMessage: 'Unfortunately this cocktail is not-available',
};

let inputValue = '';
let identificator = '';
let type = '';

refs.btnAbc.addEventListener('click', onAlphabetClick);

async function onAlphabetClick(e) {
  e.preventDefault;
  refs.mainSection.innerHTML = '';

  const letter = e.target.textContent;

  identificator = 'f=';
  type = 'search';
  inputValue = letter;

  const data = await fetchApi(type, identificator, inputValue);
  console.log(data);

  try {
    refs.mainSection.insertAdjacentHTML('beforeend', card(data.drinks));

    if (!data.drinks) {
      return Notiflix.Notify.failure(refs.failureMessage);
    }

    Notiflix.Notify.success(
      'Hooray! We found' + ` ${data.drinks.length} ` + 'cocktails!'
    );
  } catch (err) {
    console.log(err);
  }
}

Notiflix.Notify.init({
  width: '350px',

  success: {
    background: '#FE7031',
    notiflixIconColor: '#32c682',
  },
  failure: {
    background: '#5F6775',
    notiflixIconColor: '#FE7031',
  },
});

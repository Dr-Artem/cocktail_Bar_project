import { fetchApi } from './fetchApi';
import card from '../templates/renderCocktailCards.hbs';
import { refs } from './abc-search';
import { scroll } from './abc-search';
import { hiddenTitle } from './abc-search';
import { addTitle } from './abc-search';
import Notiflix from 'notiflix';
import { preloader } from './abc-search';
import { scrollTobottom } from './abc-search';

let inputValue = '';
let identificator = '';
let type = '';
let timerId = '';

refs.inputBtn.addEventListener('click', onInputClick);
refs.btnDropdown.addEventListener('click', onbtnDropdownClick);

function onInputClick(e) {
  e.preventDefault();
  refs.btnDropdown.style.display = 'block';
}

function onbtnDropdownClick(e) {
  e.preventDefault;
  refs.mainSection.innerHTML = '';
  hiddenTitle();

  const element = e.target.textContent;
  identificator = 'f=';
  type = 'search';
  inputValue = element;

  inputChange(element);

  preloader();

  timerId = setTimeout(getCoctails, 2000);
}

clearTimeout(timerId);

async function getCoctails() {
  preloader();
  const data = await fetchApi(type, identificator, inputValue);
  console.log(data);

  try {
    refs.mainSection.insertAdjacentHTML('beforeend', card(data.drinks));

    if (!data.drinks) {
      addTitle();
      scrollTobottom();
      return Notiflix.Notify.failure(refs.failureMessage);
    }

    Notiflix.Notify.success(
      'We found' + ` ${data.drinks.length} ` + 'cocktails for you!'
    );
    scroll();
  } catch (err) {
    console.log(err);
  }
}

function inputChange(element) {
  inputValue = element;
  refs.inputDropdown.value = element;
  refs.inputDropdown.style.backgroundColor = 'var(--accent-text-color)';
  refs.inputDropdown.style.color = 'var(--main-white-color)';
  refs.icon.style.fill = 'var(--main-white-color)';

  refs.btnDropdown.style.display = 'none';
}

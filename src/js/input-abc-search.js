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

dropdownHidden();

refs.dropdown.addEventListener('click', onInputClick);
refs.btnDropdown.addEventListener('click', onbtnDropdownClick);

function onInputClick(e) {
  e.preventDefault();
  dropdownHidden();
}

function onbtnDropdownClick(e) {
  refs.dropdown.style.marginBottom = '0px';
  refs.mainSection.innerHTML = '';

  const element = e.target.textContent;
  identificator = 'f=';
  type = 'search';

  inputChange(element);

  preloader();
  refs.dropdown.style.marginBottom = '0px';

  timerId = setTimeout(getCoctails, 1000);
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
  refs.dropdown.style.marginBottom = '5px';
  dropdownHidden();
  inputValue = element;
  refs.inputDropdown.value = element;
  refs.inputDropdown.style.backgroundColor = 'var(--accent-text-color)';
  refs.inputDropdown.style.color = 'var(--main-white-color)';
  refs.icon.style.fill = 'var(--main-white-color)';
  dropdownHidden();
  refs.dropdown.style.marginBottom = '5px';
}

function dropdownHidden() {
  refs.btnDropdown.classList.toggle('is-hidden');
 
  if (refs.btnDropdown.classList.contains('is-hidden')){
    refs.dropdown.style.marginBottom = '0px';
  }else{
    refs.dropdown.style.marginBottom = '55px';
  }
  return;
}


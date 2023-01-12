import { fetchApi } from './fetchApi';
import card from '../templates/renderCocktailCards.hbs';
import { refs } from './abc-search';
import Notiflix from 'notiflix';

let inputValue = '';
let identificator = '';
let type = '';

refs.inputBtn.addEventListener('click', onInputClick);
refs.btnDropdown.addEventListener('click', onbtnDropdownClick);

function onInputClick(e) {
  e.preventDefault();
  refs.btnDropdown.style.display = 'block';
}

async function onbtnDropdownClick(e) {
  e.preventDefault;
  refs.mainSection.innerHTML = '';

  const element = e.target.textContent;
  identificator = 'f=';
  type = 'search';
  inputValue = element;

  test(element);

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

function test(element) {
  inputValue = element;
  refs.inputDropdown.value = element;
  refs.inputDropdown.style.backgroundColor = 'var(--accent-text-color)';
  refs.inputDropdown.style.color = 'var(--main-white-color)';
  refs.icon.style.fill = 'var(--main-white-color)';

  refs.btnDropdown.style.display = 'none';
}

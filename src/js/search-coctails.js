import { fetchApi } from './fetchApi';
import Notiflix from 'notiflix';
import card from '../templates/renderCocktailCards.hbs';

const mainSection = document.querySelector('.cocktail');
const formEl = document.querySelector(`.header__search-form`);
const divForBtnsEl = document.querySelector('.coctail-btn__wrapper');

let inputValue = '';
let identificator = '';
let type = '';

async function onFormSearchCoctails(evt) {
  evt.preventDefault();

  inputValue = document.querySelector('.header__search-form-input').value;
  identificator = 's=';
  type = 'search';

  const data = await fetchApi(type, identificator, inputValue);
  console.log(data);
  let start = 0;
  let end = 9;
  let btnContent = 0;

  let paginationData = data.drinks.slice(start, end);

  try {
    if (window.innerWidth >= 1280) {
      divForBtnsEl.innerHTML = '';

      mainSection.innerHTML = '';
      mainSection.insertAdjacentHTML('beforeend', card(paginationData));

      if (data.drinks.length <= 9) {
        return;
      }

      for (let i = 0; i < data.drinks.length; i += 9) {
        btnContent += 1;

        divForBtnsEl.insertAdjacentHTML(
          'beforeend',
          '<button>' + btnContent + '</button>'
        );
      }
    }

    if (window.innerWidth < 768) {
      end = 3;
      paginationData = data.drinks.slice(start, end);
      btnContent = 0;

      divForBtnsEl.innerHTML = '';
      mainSection.innerHTML = '';
      mainSection.insertAdjacentHTML('beforeend', card(paginationData));

      for (let i = 0; i < data.drinks.length; i += 3) {
        if (data.drinks.length <= 3) {
          return;
        }

        btnContent += 1;
        divForBtnsEl.insertAdjacentHTML(
          'beforeend',
          '<button>' + btnContent + '</button>'
        );
      }
    }

    if (window.innerWidth >= 768 && window.innerWidth < 1280) {
      end = 6;
      paginationData = data.drinks.slice(start, end);
      btnContent = 0;

      divForBtnsEl.innerHTML = '';
      mainSection.innerHTML = '';
      mainSection.insertAdjacentHTML('beforeend', card(paginationData));

      for (let i = 0; i < data.drinks.length; i += 6) {
        if (data.drinks.length <= 6) {
          return;
        }

        btnContent += 1;
        divForBtnsEl.insertAdjacentHTML(
          'beforeend',
          '<button>' + btnContent + '</button>'
        );
      }
    }
  } catch (err) {
    console.log(err);
  }
}

async function onBtnPaginationCoctails(evt) {
  inputValue = document.querySelector('input').value;
  identificator = 's=';
  type = 'search';

  let start = 0;
  let end = 0;
  let btnContent = Number(evt.target.textContent);
  let paginationData;

  const data = await fetchApi(type, identificator, inputValue);

  try {
    if (window.innerWidth < 768) {
      end = btnContent * 3;
      start = end - 3;
      paginationData = data.drinks.slice(start, end);

      mainSection.innerHTML = '';
      mainSection.insertAdjacentHTML('beforeend', card(paginationData));
    }

    if (window.innerWidth >= 768 && window.innerWidth < 1280) {
      end = btnContent * 6;
      start = end - 6;
      paginationData = data.drinks.slice(start, end);

      mainSection.innerHTML = '';
      mainSection.insertAdjacentHTML('beforeend', card(paginationData));
    }

    if (window.innerWidth >= 1280) {
      end = btnContent * 9;
      start = end - 9;
      paginationData = data.drinks.slice(start, end);

      mainSection.innerHTML = '';
      mainSection.insertAdjacentHTML('beforeend', card(paginationData));
    }
  } catch (err) {
    console.log(err);
  }
}

// console.log(`a`);

formEl.addEventListener('submit', onFormSearchCoctails);
divForBtnsEl.addEventListener('click', onBtnPaginationCoctails);

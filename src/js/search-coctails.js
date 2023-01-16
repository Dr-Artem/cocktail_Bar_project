// import { fetchApi } from './fetchApi';
// import Notiflix from 'notiflix';
// import renderCocktailCards from '../templates/renderCocktailCards.hbs';

// const mainSection = document.querySelector('.cocktail__list');
// const formCurrent = document.querySelector(`.form-current`);
// const formHide = document.querySelector(`.form-hide`);
// const formCurrentValue = document.querySelector('.form-current__input');
// const formHideValue = document.querySelector('.form-hide__input');

// const divForBtnsEl = document.querySelector('.coctail-btn__wrapper');
// const modalBackdrop = document.querySelector('.backdrop');
// const modalIngridientBackdrop = document.querySelector('.backdrop-ingridient');

// let inputValue = '';
// let identificator = '';
// let type = '';
// const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

// async function onFormSearchCoctails(evt) {
//     evt.preventDefault();
//     if (evt.target === formCurrent) {
//         inputValue = formCurrentValue.value;
//     }
//     if (evt.target === formHide) {
//         inputValue = formHideValue.value;
//     }

//     identificator = 's=';
//     type = 'search';

//     let start = 0;
//     let end = 9;
//     let btnContent = 0;

//     const data = await fetchApi(type, identificator, inputValue);

//     let paginationData = data.drinks.slice(start, end);
//     //   console.log(paginationData);

//     try {
//         if (window.innerWidth >= 1280) {
//             divForBtnsEl.innerHTML = '';

//             mainSection.innerHTML = '';
//             mainSection.insertAdjacentHTML('beforeend', renderCocktailCards(paginationData));

//             if (data.drinks.length <= 9) {
//                 return;
//             }

//             for (let i = 0; i < data.drinks.length; i += 9) {
//                 btnContent += 1;

//                 divForBtnsEl.insertAdjacentHTML('beforeend', '<button>' + btnContent + '</button>');
//             }
//         }

//         if (window.innerWidth < 768) {
//             end = 3;
//             paginationData = data.drinks.slice(start, end);
//             btnContent = 0;

//             divForBtnsEl.innerHTML = '';
//             mainSection.innerHTML = '';
//             mainSection.insertAdjacentHTML('beforeend', renderCocktailCards(paginationData));

//             for (let i = 0; i < data.drinks.length; i += 3) {
//                 if (data.drinks.length <= 3) {
//                     return;
//                 }

//                 btnContent += 1;
//                 divForBtnsEl.insertAdjacentHTML('beforeend', '<button>' + btnContent + '</button>');
//             }
//         }

//         if (window.innerWidth >= 768 && window.innerWidth < 1280) {
//             end = 6;
//             paginationData = data.drinks.slice(start, end);
//             btnContent = 0;

//             divForBtnsEl.innerHTML = '';
//             mainSection.innerHTML = '';
//             mainSection.insertAdjacentHTML('beforeend', renderCocktailCards(paginationData));

//             for (let i = 0; i < data.drinks.length; i += 6) {
//                 if (data.drinks.length <= 6) {
//                     return;
//                 }

//                 btnContent += 1;
//                 divForBtnsEl.insertAdjacentHTML('beforeend', '<button>' + btnContent + '</button>');
//             }
//         }
//     } catch (err) {
//         console.log(err);
//     }
// }

// async function randomSearch() {
//     inputValue = alphabet[Math.floor(Math.random() * alphabet.length)];
//     identificator = 's=';
//     type = 'search';

//     let start = 0;
//     let end = 9;
//     let btnContent = 0;

//     const data = await fetchApi(type, identificator, inputValue);

//     let paginationData = data.drinks.slice(start, end);
//     //   console.log(paginationData);

//     try {
//         if (window.innerWidth >= 1280) {
//             divForBtnsEl.innerHTML = '';

//             mainSection.innerHTML = '';
//             mainSection.insertAdjacentHTML('beforeend', renderCocktailCards(paginationData));

//             if (data.drinks.length <= 9) {
//                 return;
//             }

//             for (let i = 0; i < data.drinks.length; i += 9) {
//                 btnContent += 1;

//                 divForBtnsEl.insertAdjacentHTML('beforeend', '<button>' + btnContent + '</button>');
//             }
//         }

//         if (window.innerWidth < 768) {
//             end = 3;
//             paginationData = data.drinks.slice(start, end);
//             btnContent = 0;

//             divForBtnsEl.innerHTML = '';
//             mainSection.innerHTML = '';
//             mainSection.insertAdjacentHTML('beforeend', renderCocktailCards(paginationData));

//             for (let i = 0; i < data.drinks.length; i += 3) {
//                 if (data.drinks.length <= 3) {
//                     return;
//                 }

//                 btnContent += 1;
//                 divForBtnsEl.insertAdjacentHTML('beforeend', '<button>' + btnContent + '</button>');
//             }
//         }

//         if (window.innerWidth >= 768 && window.innerWidth < 1280) {
//             end = 6;
//             paginationData = data.drinks.slice(start, end);
//             btnContent = 0;

//             divForBtnsEl.innerHTML = '';
//             mainSection.innerHTML = '';
//             mainSection.insertAdjacentHTML('beforeend', renderCocktailCards(paginationData));

//             for (let i = 0; i < data.drinks.length; i += 6) {
//                 if (data.drinks.length <= 6) {
//                     return;
//                 }

//                 btnContent += 1;
//                 divForBtnsEl.insertAdjacentHTML('beforeend', '<button>' + btnContent + '</button>');
//             }
//         }
//     } catch (err) {
//         console.log(err);
//     }
// }

// formCurrent.addEventListener('submit', onFormSearchCoctails);
// formHide.addEventListener('submit', onFormSearchCoctails);
// randomSearch();

// const addToBtn = document.querySelector('.buttons__add-to');

// divForBtnsEl.addEventListener('click', onBtnPaginationCoctails);

// async function onBtnPaginationCoctails(evt) {
//     if (evt.target === formCurrent) {
//         inputValue = formCurrentValue.value;
//     }
//     if (evt.target === formHide) {
//         inputValue = formHideValue.value;
//     }
//     identificator = 's=';
//     type = 'search';

//     let start = 0;
//     let end = 0;
//     let btnContent = Number(evt.target.textContent);
//     let paginationData;

//     const data = await fetchApi(type, identificator, inputValue);

//     try {
//         if (window.innerWidth < 768) {
//             end = btnContent * 3;
//             start = end - 3;
//             paginationData = data.drinks.slice(start, end);

//             mainSection.innerHTML = '';
//             mainSection.insertAdjacentHTML('beforeend', renderCocktailCards(paginationData));
//         }

//         if (window.innerWidth >= 768 && window.innerWidth < 1280) {
//             end = btnContent * 6;
//             start = end - 6;
//             paginationData = data.drinks.slice(start, end);

//             mainSection.innerHTML = '';
//             mainSection.insertAdjacentHTML('beforeend', renderCocktailCards(paginationData));
//         }

//         if (window.innerWidth >= 1280) {
//             end = btnContent * 9;
//             start = end - 9;
//             paginationData = data.drinks.slice(start, end);

//             mainSection.innerHTML = '';
//             mainSection.insertAdjacentHTML('beforeend', renderCocktailCards(paginationData));
//         }
//     } catch (err) {
//         console.log(err);
//     }
// }

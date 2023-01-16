// import { fetchApi } from './fetchApi';
// import Notiflix from 'notiflix';
// import card from '../templates/renderCocktailCards.hbs';

// export const refs = {
//     btnAbc: document.querySelector('.ABC-search'),
//     inputDropdown: document.querySelector('.ABC-input'),
//     inputBtn: document.querySelector('.dropdown__btn'),
//     btnDropdown: document.querySelector('.dropdown__content'),
//     btnContent: document.querySelectorAll('.dropdown__content__btn'),
//     icon: document.querySelector('.dropdown__btn__icon'),
//     mainSection: document.querySelector('.cocktail'),
//     failureMessage: 'We can`t find this cocktail, please choose another one',
//     errorTitle: document.querySelector('.error-title'),
//     errorImg: document.querySelector('.error-wrapper__img'),
//     mainTitle: document.querySelector('.main-title'),
//     ldsHeart: document.querySelector('.preloader'),
// };

// let inputValue = '';
// let identificator = '';
// let type = '';
// let timerId = '';

// refs.btnAbc.addEventListener('click', onAlphabetClick);

// function onAlphabetClick(e) {
//     e.preventDefault();
//     refs.mainSection.innerHTML = '';
//     hiddenTitle();

//     const letter = e.target.textContent;

//     identificator = 'f=';
//     type = 'search';
//     inputValue = letter;

//     preloader();

//     timerId = setTimeout(getCoctails, 2000);
// }

// clearTimeout(timerId);

// async function getCoctails() {
//     const data = await fetchApi(type, identificator, inputValue);
//     console.log(data);

//     try {
//         preloader();
//         refs.mainSection.insertAdjacentHTML('beforeend', card(data.drinks));

//         if (!data.drinks) {
//             addTitle();
//             scrollTobottom();
//             return Notiflix.Notify.failure(refs.failureMessage);
//         }

//         Notiflix.Notify.success('We found' + ` ${data.drinks.length} ` + 'cocktails for you!');
//         scroll();
//     } catch (err) {
//         console.log(err);
//     }
// }

// export function hiddenTitle() {
//     refs.errorTitle.classList.add('hidden');
//     refs.errorImg.classList.add('hidden');
//     refs.mainTitle.classList.remove('hidden');
// }

// export function addTitle() {
//     refs.errorTitle.classList.remove('hidden');
//     refs.errorImg.classList.remove('hidden');
//     refs.mainTitle.classList.add('hidden');
// }

// export function scroll() {
//     const { height: cardHeight } = refs.mainSection.firstElementChild.getBoundingClientRect();

//     window.scrollBy({
//         top: cardHeight,
//         behavior: 'smooth',
//     });
// }

// export function scrollTobottom() {
//     const pageHeight = document.documentElement.clientHeight;
//     window.scrollBy({
//         top: pageHeight,
//         behavior: 'smooth',
//     });
// }

// export function preloader() {
//     refs.ldsHeart.classList.toggle('hidden');
// }

// Notiflix.Notify.init({
//     width: '350px',

//     success: {
//         background: '#FE7031',
//         notiflixIconColor: '#32c682',
//     },
//     failure: {
//         background: '#5F6775',
//         notiflixIconColor: '#FE7031',
//     },
// });

// refs.btnContent.forEach(btn => {
//     btn.style.color = 'inherit';
// });
// refs.btnDropdown.style.backgroundColor = 'inherit';

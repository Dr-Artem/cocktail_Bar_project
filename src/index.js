import { fetchApi } from './js/fetchApi';
import Notiflix from 'notiflix';
import renderCocktailCards from './templates/renderCocktailCards.hbs';

const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

export const params = {
    cocktailSection: document.querySelector('.cocktail__list'),
    formCurrent: document.querySelector(`.form-current`),
    formHide: document.querySelector(`.form-hide`),
    formCurrentValue: document.querySelector('.form-current__input'),
    formHideValue: document.querySelector('.form-hide__input'),
    paginationDiv: document.querySelector('.coctail-btn__wrapper'),
    hero: document.querySelector('.section-hero'),
    mainsec: document.querySelector('.cocktails'),
};
export const refs = {
    btnAbc: document.querySelector('.ABC-search'),
    inputDropdown: document.querySelector('.ABC-input'),
    inputBtn: document.querySelector('.dropdown__btn'),
    btnDropdown: document.querySelector('.dropdown__content'),
    btnContent: document.querySelectorAll('.dropdown__content__btn'),
    icon: document.querySelector('.dropdown__btn__icon'),
    failureMessage: 'We can`t find this cocktail, please choose another one',
    errorTitle: document.querySelector('.error-title'),
    errorImg: document.querySelector('.error-wrapper__img'),
    mainTitle: document.querySelector('.main-title'),
    ldsHeart: document.querySelector('.preloader'),
    dropdownWrapper: document.querySelector('.dropdown-wrapper'),
};

let inputValue = '';
let identificator = '';
let type = '';
let timerId = '';

async function getApi() {
    const data = await fetchApi(type, identificator, inputValue);

    let start = 0;
    let end = 9;
    let btnContent = 0;
    let paginationData;

    try {
        preloader();
        hiddenTitle();
        if (!data.drinks) {
            addTitle();
            scrollTobottom();
            return Notiflix.Notify.failure(refs.failureMessage);
        }
        paginationData = data.drinks.slice(start, end);
        if (type === 'search') {
            if (identificator === 's=' || identificator === 'f=') {
                if (window.innerWidth >= 1280) {
                    params.paginationDiv.innerHTML = '';

                    params.cocktailSection.innerHTML = '';
                    params.cocktailSection.innerHTML = renderCocktailCards(paginationData);

                    if (data.drinks.length <= 9) {
                        return;
                    }

                    for (let i = 0; i < data.drinks.length; i += 9) {
                        btnContent += 1;

                        params.paginationDiv.insertAdjacentHTML('beforeend', `<button class='btn-pagination'>${btnContent}</button>`);
                    }
                }

                if (window.innerWidth < 768) {
                    end = 3;
                    paginationData = data.drinks.slice(start, end);
                    btnContent = 0;

                    params.paginationDiv.innerHTML = '';
                    params.cocktailSection.innerHTML = '';
                    params.cocktailSection.innerHTML = renderCocktailCards(paginationData);

                    for (let i = 0; i < data.drinks.length; i += 3) {
                        if (data.drinks.length <= 3) {
                            return;
                        }

                        btnContent += 1;
                        params.paginationDiv.insertAdjacentHTML('beforeend', `<button class='btn-pagination'>${btnContent}</button>`);
                    }
                }

                if (window.innerWidth >= 768 && window.innerWidth < 1280) {
                    end = 6;
                    paginationData = data.drinks.slice(start, end);
                    btnContent = 0;

                    params.paginationDiv.innerHTML = '';
                    params.cocktailSection.innerHTML = '';
                    params.cocktailSection.innerHTML = renderCocktailCards(paginationData);

                    for (let i = 0; i < data.drinks.length; i += 6) {
                        if (data.drinks.length <= 6) {
                            return;
                        }

                        btnContent += 1;
                        params.paginationDiv.insertAdjacentHTML('beforeend', `<button class='btn-pagination'>${btnContent}</button>`);
                    }
                }
            }
        }
        const addBtns = document.querySelectorAll('.buttons__add-to');
        let localKeys = [];
        for (const key in localStorage) {
            localKeys.push(key);
        }
        addBtns.forEach(btn => {
            if (localKeys.includes(btn.id)) {
                btn.innerHTML =
                    "Remove <svg class='buttons__add-to__img' viewBox='0 0 36 32'><path fill='#fd5103'style='fill: var(--color1, #fd5103)' d='M17.882 32l-2.593-2.302c-9.209-8.144-15.289-13.515-15.289-20.107 0-5.371 4.328-9.591 9.835-9.591 3.112 0 6.098 1.413 8.047 3.645 1.949-2.232 4.936-3.645 8.047-3.645 5.508 0 9.835 4.22 9.835 9.591 0 6.592-6.080 11.963-15.289 20.124l-2.593 2.284z' ></path><path fill='#fd5103' style='fill: var(--color2, #fd5103)' d='M17.882 28.631l-2.099-1.817c-7.455-6.429-12.377-10.67-12.377-15.874 0-4.24 3.503-7.572 7.962-7.572 2.519 0 4.936 1.115 6.514 2.877 1.578-1.762 3.995-2.877 6.514-2.877 4.459 0 7.962 3.332 7.962 7.572 0 5.204-4.922 9.444-12.377 15.888l-2.099 1.803z'></path></svg>";
            }
        });

        Notiflix.Notify.success('We found' + ` ${data.drinks.length} ` + 'cocktails for you!');
        scroll();
    } catch (err) {
        console.log(err);
    }
}

function getRandomDrink() {
    preloader();
    inputValue = alphabet[Math.floor(Math.random() * alphabet.length)];
    identificator = 's=';
    type = 'search';
    timerId = setTimeout(getApi, 1000);

    // getApi();
}

function onSearchForm(event) {
    event.preventDefault();
    params.cocktailSection.innerHTML = '';
    preloader();
    if (event.target === params.formCurrent) {
        inputValue = params.formCurrentValue.value;
    }
    if (event.target === params.formHide) {
        inputValue = params.formHideValue.value;
    }

    identificator = 's=';
    type = 'search';
    timerId = setTimeout(getApi, 1000);
    // getApi();
}

async function onFetchPagiantion(evt) {
    identificator = 's=';
    type = 'search';

    let start = 0;
    let end = 0;
    let btnContent = Number(evt.target.textContent);

    let paginationData;

    const data = await fetchApi(type, identificator, inputValue);

    try {
        if (evt.target.className !== 'btn-pagination') {
            return;
        }
        if (window.innerWidth < 768) {
            end = btnContent * 3;
            start = end - 3;
            paginationData = data.drinks.slice(start, end);

            params.cocktailSection.innerHTML = '';
            params.cocktailSection.insertAdjacentHTML('beforeend', renderCocktailCards(paginationData));
        }

        if (window.innerWidth >= 768 && window.innerWidth < 1280) {
            end = btnContent * 6;
            start = end - 6;
            paginationData = data.drinks.slice(start, end);

            params.cocktailSection.innerHTML = '';
            params.cocktailSection.insertAdjacentHTML('beforeend', renderCocktailCards(paginationData));
        }

        if (window.innerWidth >= 1280) {
            end = btnContent * 9;
            start = end - 9;
            paginationData = data.drinks.slice(start, end);

            params.cocktailSection.innerHTML = '';
            params.cocktailSection.insertAdjacentHTML('beforeend', renderCocktailCards(paginationData));
        }
    } catch (err) {
        console.log(err);
    }
}

function onAlphabetClick(event) {
    event.preventDefault();
    params.cocktailSection.innerHTML = '';
    hiddenTitle();

    const letter = event.target.textContent;

    identificator = 'f=';
    type = 'search';
    inputValue = letter;

    refs.inputDropdown.value = letter;

    refs.inputDropdown.style.backgroundColor = 'var(--accent-text-color)';
    refs.inputDropdown.style.color = 'var(--main-white-color)';
    refs.icon.style.fill = 'var(--main-white-color)';

    refs.btnDropdown.style.display = 'none';
    refs.dropdownWrapper.style.marginBottom = '55px';

    preloader();

    timerId = setTimeout(getApi, 1000);
    // getApi();
}
clearTimeout(timerId);

window.onclick = function ({ target }) {
    if (target == params.hero || target == params.mainsec) {
        refs.btnDropdown.style.display = 'none';
        refs.dropdownWrapper.style.marginBottom = '55px';
    }
};

function onInputClick(e) {
    e.preventDefault();
    refs.btnDropdown.style.display = 'block';
    refs.dropdownWrapper.style.marginBottom = '100px';
}

export function hiddenTitle() {
    refs.errorTitle.classList.add('hidden');
    refs.errorImg.classList.add('hidden');
    refs.mainTitle.classList.remove('hidden');
}

export function addTitle() {
    refs.errorTitle.classList.remove('hidden');
    refs.errorImg.classList.remove('hidden');
    refs.mainTitle.classList.add('hidden');
}

export function scroll() {
    const { height: cardHeight } = params.cocktailSection.firstElementChild.getBoundingClientRect();

    window.scrollBy({
        top: cardHeight,
        behavior: 'smooth',
    });
}

export function scrollTobottom() {
    const pageHeight = document.documentElement.clientHeight;
    window.scrollBy({
        top: pageHeight,
        behavior: 'smooth',
    });
}
export function preloader() {
    refs.ldsHeart.classList.toggle('hidden');
}
let localKeys = [];
for (const key in localStorage) {
    localKeys.push(key);
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

refs.btnContent.forEach(btn => {
    btn.style.color = 'inherit';
});
refs.btnDropdown.style.backgroundColor = 'inherit';
refs.inputBtn.addEventListener('click', onInputClick);
refs.btnDropdown.addEventListener('click', onAlphabetClick);
refs.btnAbc.addEventListener('click', onAlphabetClick);

params.formCurrent.addEventListener('submit', onSearchForm);
params.formHide.addEventListener('submit', onSearchForm);
params.paginationDiv.addEventListener('click', onFetchPagiantion);

getRandomDrink();

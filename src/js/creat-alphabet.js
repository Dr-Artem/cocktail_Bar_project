const refs = {
  searchLetters: document.querySelector('.ABC-search__letters'),
  searchNumbers: document.querySelector('.ABC-search__numbers'),
  dropdownContent: document.querySelector('.dropdown__content'),
};

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
];
const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const abcArray = [...alphabet, ...numbers];

function creatBTN() {
  const markupAlphabet = alphabet
    .map(
      letter => `<li class="btn-search__letters">
    <button class="btn-ABC" type="button">${letter}</button></li>
    `
    )
    .join('');

  const markuNumbers = numbers
    .map(
      number => `<li class="btn-search__letters">
  <button class="btn-ABC" type="button">${number}</button></li>
  `
    )
    .join('');

  refs.searchLetters.insertAdjacentHTML('beforeend', markupAlphabet);
  refs.searchNumbers.insertAdjacentHTML('beforeend', markuNumbers);
}
creatBTN();

function creatDropdownEl() {
  const markupDropdownEl = abcArray
    .map(
      el =>
        `<button class="dropdown__content__btn" type="button">${el}</button>`
    )
    .join('');

  refs.dropdownContent.insertAdjacentHTML('beforeend', markupDropdownEl);
}
creatDropdownEl();

const list = document.querySelector('.favourite-cocktail_list');
// console.log(localStorage);

for (let i = 0; i < localStorage.length; i++) {
  const element = localStorage.key(i);
  if (element.startsWith('strDrink')) {
    // console.log(element);
  }

  const el = localStorage.getItem(element);
  list.insertAdjacentHTML('beforeend', `<li class='cocktail__item'>${el}</li>`);
}
const addRemove = document.querySelectorAll('.buttons__add-to');
addRemove.forEach(btn => {
  btn.textContent = 'Remove';
});
console.log(addRemove);

function removeFvourite(event) {
  if (event.target.className === 'buttons__add-to') {
    localStorage.removeItem(`strDrink${event.target.id}`);
    document.location.reload();
  }
  console.log(event.target);
}

document.body.addEventListener('click', removeFvourite);

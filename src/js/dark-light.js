let checkbox = document.getElementById('checkbox');
let ballEl = document.querySelector('.ball');
let modal = document.querySelector('.modal');
let modalIngredient = document.querySelector('.modal-ingridient');
let menu = document.querySelector('.header__menu');

let footerLinks = document.querySelectorAll('.sosial_links__icon');
let devLogo = document.querySelector('.dev__logo');
let footerTitle = document.querySelectorAll('.footer-title');
let btnDrop = document.querySelectorAll('.dropdown__content__btn');

if (localStorage.getItem('darkMode') === 'true') {
    checkbox.checked = true;
    ballEl.classList.add('dark');
    document.body.classList.add('dark');
    modal.classList.add('dark');
    modalIngredient.classList.add('dark');
    menu.classList.add('dark');
    footerAddChange();
}

function handleDarkMode() {
    if (checkbox.checked) {
        document.body.classList.add('dark');
        ballEl.classList.add('dark');
        modal.classList.add('dark');
        modalIngredient.classList.add('dark');
        menu.classList.add('dark');
        footerAddChange();
        localStorage.setItem('darkMode', 'true');
    } else {
        modal.classList.remove('dark');
        modalIngredient.classList.remove('dark');
        ballEl.classList.remove('dark');
        menu.classList.remove('dark');
        footerRemoveChange();
        document.body.classList.remove('dark');
        localStorage.setItem('darkMode', 'false');
    }
}

function footerAddChange() {
    footerLinks.forEach(link => {
      link.classList.add('sosial_links__icon--dark');
    });
    footerTitle.forEach(title => {
      title.classList.add('footer-title--dark')
    });
    btnDrop.forEach(btn => {
      btn.classList.add('dropdown__content__btn--dark')
    });
    devLogo.classList.add('dev__logo--dark');
  }
  
  function footerRemoveChange() {
    footerLinks.forEach(link => {
      link.classList.remove('sosial_links__icon--dark');
    });
    footerTitle.forEach(title => {
      title.classList.remove('footer-title--dark')
    });
    btnDrop.forEach(btn => {
      btn.classList.remove('dropdown__content__btn--dark')
    });
    devLogo.classList.remove('dev__logo--dark');
  }

checkbox.addEventListener('change', handleDarkMode);

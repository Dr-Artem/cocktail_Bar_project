const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

if (isMobile.any()) {
  document.body.classList.add('_touch');

  let subMenu = document.querySelector('.menu__navbar-link-favourite');
  subMenu.addEventListener('click', function (event) {
    subMenu.parentElement.classList.toggle('_active');
  });
} else {
  document.body.classList.add('_pc');
}

const burger = document.querySelector('.menu-icon');

if (burger) {
  const burgerMenu = document.querySelector('.header__menu');
  burger.addEventListener('click', () => {
    document.body.classList.toggle('_lock');
    burger.classList.toggle('_active');
    burgerMenu.classList.toggle('_active');
  });
}

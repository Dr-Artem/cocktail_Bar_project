let checkbox = document.getElementById('checkbox');
let ballEl = document.querySelector('.ball');

if (localStorage.getItem('darkMode') === 'true') {
  checkbox.checked = true;
  ballEl.classList.add('dark');
  document.body.classList.add('dark');
}

function handleDarkMode() {
  if (checkbox.checked) {
    document.body.classList.add('dark');
    ballEl.classList.add('dark');
    localStorage.setItem('darkMode', 'true');
  } else {
    ballEl.classList.remove('dark');
    document.body.classList.remove('dark');
    localStorage.setItem('darkMode', 'false');
  }
}

checkbox.addEventListener('change', handleDarkMode);

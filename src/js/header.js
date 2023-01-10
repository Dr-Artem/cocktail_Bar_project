const btnOpenModal = document.querySelector('.js-modal-open');
console.log(btnOpenModal);
const modalEl = document.querySelector('.js-modal');
console.log(modalEl);

function handleOpenModal() {
  modalEl.classList.toggle('hidden');
}

btnOpenModal.addEventListener('click', handleOpenModal);

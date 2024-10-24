//открытие попап
export const openModal = (modal) => {
  modal.classList.add('popup_is-opened')
  document.addEventListener('keydown', handleEscKeyUp)
};

//закрытие Esc
export const handleEscKeyUp = (e) => {
  if (e.key === "Escape") {
    const popupOpen = document.querySelector('.popup_is-opened')
    closeModal(popupOpen)
  }
};

//закрытие попап
export const closeModal= (modal) => {
  modal.classList.remove('popup_is-opened')
  document.removeEventListener('keydown', handleEscKeyUp)
};

//навешиваем слушатели
export const listenerAdd = (modal) => {
  const closeButton = document.querySelectorAll('.popup__close')

  closeButton.forEach((item) => {
    item.addEventListener('click', () => {
      closeModal(modal);
    });
  });
 
   modal.addEventListener("mousedown", (event) => {
     if (event.target.classList.contains('popup')) {
      closeModal(modal);
     }
   });
 }
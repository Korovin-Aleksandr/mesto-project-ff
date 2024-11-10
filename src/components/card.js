// @todo: Функция создания карточки
export const createCard = function (card, userId, deleteButton, openCardImagePopup, likeCard) {
  const cardTemplate = document.querySelector('#card-template').content
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true)
  const cardTitle = cardElement.querySelector('.card__title')
  const cardImage = cardElement.querySelector('.card__image')
  const likeButton = cardElement.querySelector('.card__like-button')
  const cardDeleteButton = cardElement.querySelector('.card__delete-button')

  cardElement.dataset.cardId = card._id;

  cardTitle.textContent = card.name
  cardImage.src = card.link
  cardImage.alt = card.name

  if (card.owner._id !== userId) {
    cardDeleteButton.classList.remove('card__delete-button'); // Добавляем класс, чтобы показать кнопку
  }

  if (card.likes.some((like) => like._id === userId)) {
    likeButton.classList.add('card__like-button_active'); // Добавляем класс активного лайка
  }

  cardDeleteButton.addEventListener('click', deleteButton)
  cardImage.addEventListener('click', () => openCardImagePopup(card.name, card.link))
  likeButton.addEventListener('click', () => likeCard(likeButton))

  return cardElement
};

// @todo: Функция удаления карточки
export function deleteButton(ev) {
  const listItem = ev.target.closest('.card');
  const cardId = listItem.dataset.cardId;
  
  fetch(`https://nomoreparties.co/v1/wff-cohort-26/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: 'f02a9f8c-f2e8-43ba-94fe-0e81485f7ed0',
    }
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      // Если удаление прошло успешно, удаляем карточку с UI
      listItem.remove();
    })
    .catch((error) => {
      console.error('Ошибка при удалении карточки:', error);
    });
};

//лайк
export function likeCard(like) {
  like.classList.toggle('card__like-button_is-active')
}
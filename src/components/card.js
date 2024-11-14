import {config} from '../api';
//Функция создания карточки
export const createCard = function (card, onDeleteCard, userId, openCardImagePopup, likeCard) {
  const cardTemplate = document.querySelector('#card-template').content
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true)
  const cardTitle = cardElement.querySelector('.card__title')
  const cardImage = cardElement.querySelector('.card__image')
  const likeButton = cardElement.querySelector('.card__like-button')
  const cardDeleteButton = cardElement.querySelector('.card__delete-button')
  const likeCounter = cardElement.querySelector('.card_like-counter');
  
  likeCounter.textContent = card.likes.length;

  cardElement.dataset.cardId = card._id;
  cardTitle.textContent = card.name
  cardImage.src = card.link
  cardImage.alt = card.name

  if (card.owner._id !== userId) {
    cardDeleteButton.classList.add('card__delete-button_visible');
  }

  if (card.likes.some((like) => like._id === userId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  cardDeleteButton.addEventListener("click", () => onDeleteCard(card._id, cardElement));
  
  cardImage.addEventListener('click', () => openCardImagePopup(card.name, card.link))
  likeButton.addEventListener('click', () => {
    const method = likeButton.classList.contains('card__like-button_is-active') ? 'DELETE' : 'PUT';
    likeCard(card._id, method).then((updatedCard) => {
      likeCounter.textContent = updatedCard.likes.length;
      if (updatedCard.likes.some((like) => like._id === userId)) {
        likeButton.classList.add('card__like-button_is-active');
      } else {
        likeButton.classList.remove('card__like-button_is-active');
      }
    }).catch((error) => console.error('Ошибка при обновлении лайка:', error));
  });
  return cardElement
};

//Функция удаления карточки
export function removeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then((res) => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  });
};

//функция лайка
export function likeCard(cardId, method) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: method, // Метод PUT для добавления и DELETE для удаления лайка
    headers: config.headers,
  }).then(response => response.json());
}
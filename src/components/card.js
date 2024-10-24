// @todo: Функция создания карточки
export const createCard = function (card, deleteButton, openCardImagePopup, likeCard) {
  const cardTemplate = document.querySelector('#card-template').content
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true)
  const cardTitle = cardElement.querySelector('.card__title')
  const cardImage = cardElement.querySelector('.card__image')
  const likeButton = cardElement.querySelector('.card__like-button')
  const cardDeleteButton = cardElement.querySelector('.card__delete-button')

  cardTitle.textContent = card.name
  cardImage.src = card.link
  cardImage.alt = card.name

  cardDeleteButton.addEventListener('click', deleteButton)
  cardImage.addEventListener('click', () => openCardImagePopup(card.name, card.link))
  likeButton.addEventListener('click', () => likeCard(likeButton))

  return cardElement
};

// @todo: Функция удаления карточки
export function deleteButton(ev) {
  const listItem = ev.target.closest('.card');
    listItem.remove();
};

//лайк
export function likeCard(like) {
  like.classList.toggle('card__like-button_is-active')
}
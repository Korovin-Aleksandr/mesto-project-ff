// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
const addCard = function (card, deleteButton) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title')
  cardTitle.textContent = card.name; 
  const cardImage = cardElement.querySelector('.card__image')
  cardImage.src = card.link; 
  cardImage.alt = card.name;
 
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  cardDeleteButton.addEventListener('click', deleteButton);

  return cardElement
};
// @todo: Функция удаления карточки
function deleteButton(ev) {
    const listItem = ev.target.closest('.card');
    listItem.remove();
  };

// @todo: Вывести карточки на страницу
initialCards.forEach((card) => {
  const cards = addCard(card, deleteButton);
  placesList.append(cards);
});
 
 



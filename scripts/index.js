// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
const addCard = initialCards.forEach((element) => {
  
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  
  cardElement.querySelector('.card__title').textContent = element.name;
  cardElement.querySelector('.card__image').src = element.link;
  cardElement.querySelector('.card__image').textContent = 'alt';
  const deleteButton = cardElement.querySelector('.card__delete-button');
 // @todo: Функция удаления карточки
  deleteButton.addEventListener('click', function () {
    const listItem = deleteButton.closest('.card');
    listItem.remove();
  });
// @todo: Вывести карточки на страницу
  placesList.append(cardElement);
});

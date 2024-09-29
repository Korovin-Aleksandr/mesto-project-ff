// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
const addCard = function (name, link) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__image')
  cardTitle.src = name; 
  const cardImage = cardElement.querySelector('.card__image')
  cardImage.src = link; 
  const cardAlt = cardElement.querySelector('.card__image')
  cardAlt.alt = name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteButtonFunction)

  return cardElement
};
// @todo: Функция удаления карточки
 const deleteButtonFunction = function (event) {
    const listItem = event.target.closest('.card');
    listItem.remove();
  };

// @todo: Вывести карточки на страницу
initialCards.forEach((element) => {
  const card = addCard(element.name, element.link);
  placesList.append(card);
});
 
 



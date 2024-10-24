import '/pages/index.css';
import {initialCards} from './cards.js';
import {addCard, likeCard, deleteButton} from './components/card.js';
import {openModal, closeModal, listenerAdd} from './components/modal.js';

const placesList = document.querySelector('.places__list');
//popup картинки
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
//popup редактирования профиля
const popupTypeEdit = document.querySelector('.popup_type_edit');
const profileEditButton = document.querySelector('.profile__edit-button');

const popup = document.querySelectorAll('.popup');
//popup добавления карточки
const popupTypeNewCard = document.querySelector('.popup_type_new-card');

//button
const profileAdd = document.querySelector('.profile__add-button');

//форма редактирования профиля
const formElement = document.forms['edit-profile'];
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
const inputTypeName = document.querySelector('.profile__title');
const inputTypeDescription = document.querySelector('.profile__description');
//форма добавления карточки
const formImage = document.forms['new-place'];

//открытие попапа с картинкой
export const cardImagePopup = (name, link) => {   
  popupImage.src = link
  popupImage.alt = name
  popupCaption.textContent = name
  openModal(popupTypeImage)
};

// @todo: Вывести карточки на страницу
initialCards.forEach((card) => {
  const cards = addCard(card, deleteButton, cardImagePopup, likeCard);
  placesList.append(cards);
});

//анимация при открытии popup
popup.forEach((modal) => {
  modal.classList.add('popup_is-animated')
});

//открытие popup редактирования профиля
profileEditButton.addEventListener('click', () => {
  nameInput.value = inputTypeName.textContent
  jobInput.value = inputTypeDescription.textContent
  openModal(popupTypeEdit)
});

//открытие popup добавления карточки
profileAdd.addEventListener('click', () => {
  openModal(popupTypeNewCard)
});

 listenerAdd(popupTypeEdit);
 listenerAdd(popupTypeNewCard);
 listenerAdd(popupTypeImage);

//функция редактирования профиля
function handleFormSubmit(evt) {
  evt.preventDefault()

  inputTypeName.textContent = nameInput.value;
  inputTypeDescription.textContent = jobInput.value;

  closeModal(popupTypeEdit)
};
formElement.addEventListener('submit', handleFormSubmit); 

//функция добавления новой карточки
function imageleFormSubmit(evt) {
  evt.preventDefault()
  const placeName = formImage.querySelector('.popup__input_type_card-name').value
  const linkImage = formImage.querySelector('.popup__input_type_url').value

  const newCard = {
    name: placeName,
    link: linkImage
  };

  const newCardsElement = addCard(newCard, deleteButton, cardImagePopup, likeCard)
  initialCards.unshift(newCardsElement)
  
  placesList.prepend(newCardsElement)

  formImage.reset()
  closeModal(popupTypeNewCard)
};
formImage.addEventListener('submit', imageleFormSubmit);


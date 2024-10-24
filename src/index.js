import '/pages/index.css';
import {initialCards} from './cards.js';
import {createCard, likeCard, deleteButton} from './components/card.js';
import {openModal, closeModal, addPopupClickListeners} from './components/modal.js';

const placesList = document.querySelector('.places__list');
//popup картинки
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
//popup редактирования профиля
const popupTypeEdit = document.querySelector('.popup_type_edit');
const profileEditButton = document.querySelector('.profile__edit-button');

const popups = document.querySelectorAll('.popup');
//popup добавления карточки
const popupTypeNewCard = document.querySelector('.popup_type_new-card');

//button
const profileAdd = document.querySelector('.profile__add-button');

//форма редактирования профиля
const editProfileForm = document.forms['edit-profile'];
const nameInput = editProfileForm.querySelector('.popup__input_type_name');
const jobInput = editProfileForm.querySelector('.popup__input_type_description');
const inputTypeName = document.querySelector('.profile__title');
const inputTypeDescription = document.querySelector('.profile__description');
//форма добавления карточки
const formImage = document.forms['new-place'];

//открытие попапа с картинкой
const openCardImagePopup = (name, link) => {   
  popupImage.src = link
  popupImage.alt = name
  popupCaption.textContent = name
  openModal(popupTypeImage)
};

// @todo: Вывести карточки на страницу
initialCards.forEach((card) => {
  const cards = createCard(card, deleteButton, openCardImagePopup, likeCard);
  placesList.append(cards);
});

//анимация при открытии popup
popups.forEach((modal) => {
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

addPopupClickListeners(popupTypeEdit);
addPopupClickListeners(popupTypeNewCard);
addPopupClickListeners(popupTypeImage);

//функция редактирования профиля
function submitEditProfile(evt) {
  evt.preventDefault()

  inputTypeName.textContent = nameInput.value;
  inputTypeDescription.textContent = jobInput.value;

  closeModal(popupTypeEdit)
};
editProfileForm.addEventListener('submit', submitEditProfile); 

//функция добавления новой карточки
function submitNewCard(evt) {
  evt.preventDefault()
  const placeName = formImage.querySelector('.popup__input_type_card-name').value
  const linkImage = formImage.querySelector('.popup__input_type_url').value

  const newCard = {
    name: placeName,
    link: linkImage
  };

  const newCardsElement = createCard(newCard,  deleteButton, openCardImagePopup, likeCard )
  
  placesList.prepend(newCardsElement)

  formImage.reset()
  closeModal(popupTypeNewCard)
};
formImage.addEventListener('submit', submitNewCard);


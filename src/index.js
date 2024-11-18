import '/pages/index.css';
import {createCard} from './components/card.js';
import {openModal, closeModal, addPopupClickListeners} from './components/modal.js';
import {clearValidation, enableValidation} from './validation.js';
import {editUserProfile, editNewCard, editUserAvatar, fetchUserData, fetchCards, removeCard, likeCard} from './api.js';

document.addEventListener('DOMContentLoaded', reloadUserDataAndCards);
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
//popup вопроса удаления
const popupQuestion = document.querySelector('.popup_question');
//popup редактирлвания аватара
const popapAvatarEdit = document.querySelector('.popup_avatar_edit')
//button
const profileAdd = document.querySelector('.profile__add-button');
const profileImageButton = document.querySelector('.profile__image')
//форма редактирования профиля
const editProfileForm = document.forms['edit-profile'];
const nameInput = editProfileForm.querySelector('.popup__input_type_name');
const jobInput = editProfileForm.querySelector('.popup__input_type_description');
const inputTypeName = document.querySelector('.profile__title');
const inputTypeDescription = document.querySelector('.profile__description');
//форма добавления карточки
const formImage = document.forms['new-place'];
//форма редактирования аватара
const formAvatar = document.forms['edit-avatar'];
//форма удаления
const formDeleteCard = document.forms['delete-card'];
//данные пользователя
let userName = '';
let userJob = '';
let userId = '';
let userAvatar = '';
//контейнер карточки
let cardForDelete = {};
let validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'};

//открытие попапа с картинкой
const openCardImagePopup = (name, link) => {   
  popupImage.src = link
  popupImage.alt = name
  popupCaption.textContent = name
  openModal(popupTypeImage)
};

//анимация при открытии popup
popups.forEach((modal) => {
  modal.classList.add('popup_is-animated')
});

//открытие popup редактирования профиля
profileEditButton.addEventListener('click', () => {
  nameInput.value = userName;
  jobInput.value = userJob;
  clearValidation(editProfileForm, validationConfig);
  openModal(popupTypeEdit)
});

//открытие popup добавления карточки
profileAdd.addEventListener('click', () => {
  clearValidation(formImage, validationConfig);
  openModal(popupTypeNewCard)
});

profileImageButton.addEventListener('click', () => {
  clearValidation(popapAvatarEdit, validationConfig);
  openModal(popapAvatarEdit)
})

addPopupClickListeners(popupTypeEdit);
addPopupClickListeners(popupTypeNewCard);
addPopupClickListeners(popupTypeImage);
addPopupClickListeners(popapAvatarEdit);
addPopupClickListeners(popupQuestion);

//функция редактирования профиля
function submitEditProfile(evt) {
  evt.preventDefault()
  const updatedName = nameInput.value;
  const updatedAbout = jobInput.value;
  const submitButton = editProfileForm.querySelector('.popup__button');
  submitButton.textContent = 'Сохранение...';
  submitButton.disabled = true;
  editUserProfile(updatedName, updatedAbout)
    .then(() => {
      reloadUserDataAndCards();
      closeModal(popupTypeEdit);
    })
    .catch((error) => {
      console.error('Ошибка при редактировании профиля:', error);
    })
    .finally(() => {
      submitButton.textContent = 'Сохранить';
      submitButton.disabled = false;
    });
};
editProfileForm.addEventListener('submit', submitEditProfile); 

//функция добавления новой карточки
function submitNewCard(evt) {
  evt.preventDefault()
  const placeName = formImage.querySelector('.popup__input_type_card-name').value;
  const linkImage = formImage.querySelector('.popup__input_type_url').value;
  const submitButton = popupTypeNewCard.querySelector('.popup__button');
  submitButton.textContent = 'Сохранение...';
  submitButton.disabled = true;
  editNewCard (placeName,linkImage)
    .then((result) => {
      reloadUserDataAndCards();
      closeModal(popupTypeNewCard);
      formImage.reset();
    })
    .catch((error) => {
      console.error('Ошибка при добавлении новой карточки:', error);
    })
    .finally(() => {
      submitButton.textContent = 'Сохранить';
      submitButton.disabled = false;
    });
};
formImage.addEventListener('submit', submitNewCard);

//фнкция редактирования аватара
function submitEditAvatar(evt) {
  evt.preventDefault()
  const linkAvatar = formAvatar.querySelector('.popup__input_type_url').value;
  const submitButton = popapAvatarEdit.querySelector('.popup__button');
  submitButton.textContent = 'Сохранение...';
  submitButton.disabled = true;
  editUserAvatar(linkAvatar)
    .then((data) => {
      document.querySelector('.profile__image').style.backgroundImage = `url(${data.avatar})`;
    })
    .then(() => {
      reloadUserDataAndCards();
      closeModal(popapAvatarEdit);
    })
    .catch((error) => {
      console.error('Ошибка при редактировании аватара:', error);
    })
    .finally(() => {
      submitButton.textContent = 'Сохранить';
      submitButton.disabled = false;
    });
};
formAvatar.addEventListener('submit', submitEditAvatar)

enableValidation(validationConfig);

//вывод всех данных с сервера (профиль, карточки)
function reloadUserDataAndCards() {
  Promise.all([fetchUserData(), fetchCards()])
    .then(([userData, cards]) => {
      userId = userData._id;
      userName = userData.name;
      userJob = userData.about;
      userAvatar = userData.avatar;

      inputTypeName.textContent = userName;
      inputTypeDescription.textContent = userJob;
      document.querySelector('.profile__image').style.backgroundImage = `url(${userAvatar})`;
  
      placesList.textContent = '';
      cards.forEach((card) => {
        const cardElement = createCard(card, handleDeleteCard, userId, openCardImagePopup, likeCard);
        placesList.append(cardElement);
      });
    })
    .catch((error) => console.error('Ошибка при получении данных:', error));
};

const handleDeleteCard = (cardId, cardElement) => {
  cardForDelete = {
    id: cardId,
    cardElement
  };
  openModal(popupQuestion);
};

const handleDeleteCardSubmit = (evt) => {
  evt.preventDefault();
  if (!cardForDelete.cardElement) return;
  removeCard(cardForDelete.id)
    .then(() => {
      cardForDelete.cardElement.remove();
      closeModal(popupQuestion);
      cardForDelete = {};
    })
    .catch((err) => console.error('Ошибка при удалении карточки:', err));
};

formDeleteCard.addEventListener('submit', handleDeleteCardSubmit);
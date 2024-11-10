import '/pages/index.css';
import {initialCards} from './cards.js';
import {createCard, likeCard, deleteButton} from './components/card.js';
import {openModal, closeModal, addPopupClickListeners} from './components/modal.js';
import {hideInputError, enableValidation} from './validation.js';

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
//данные пользователя
let userName = '';
let userJob = '';
let userId = '';
//данные карточки
let cardTitle = '';
let cardLink = '';
let cardId = '';




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
  clearValidation(editProfileForm, {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });
  openModal(popupTypeEdit)
});

//открытие popup добавления карточки
profileAdd.addEventListener('click', () => {
  clearValidation(formImage, {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });
  openModal(popupTypeNewCard)
});

addPopupClickListeners(popupTypeEdit);
addPopupClickListeners(popupTypeNewCard);
addPopupClickListeners(popupTypeImage);

//функция редактирования профиля
function submitEditProfile(evt) {
  evt.preventDefault()

  const updatedName = nameInput.value;
  const updatedAbout = jobInput.value;

  fetch('https://nomoreparties.co/v1/wff-cohort-26/users/me', {
    method: 'PATCH',
    headers: {
      authorization: 'f02a9f8c-f2e8-43ba-94fe-0e81485f7ed0',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: updatedName,
      about: updatedAbout
    })
  })
  .then((res) => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  })
  // .then(() => {
  //   // Запрашиваем обновлённые данные профиля с сервера
  //   return getUserProfile();
  // })
  .then(() => {
    // Закрываем popup после успешного обновления
    reloadUserDataAndCards();
    closeModal(popupTypeEdit);
  })
  .catch((error) => {
    console.error('Ошибка при редактировании профиля:', error);
  });
};
editProfileForm.addEventListener('submit', submitEditProfile); 

//функция добавления новой карточки
function submitNewCard(evt) {
  evt.preventDefault()
  const placeName = formImage.querySelector('.popup__input_type_card-name').value;
  const linkImage = formImage.querySelector('.popup__input_type_url').value;

  // Отправляем запрос на сервер для добавления новой карточки
  fetch('https://nomoreparties.co/v1/wff-cohort-26/cards', {
    method: 'POST',
    headers: {
      authorization: 'f02a9f8c-f2e8-43ba-94fe-0e81485f7ed0',
      'Content-Type': 'application/json' // Убираем второй 'Content-Type'
    },
    body: JSON.stringify({
      name: placeName,
      link: linkImage
    })
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    })
    .then((result) => {
      // Если запрос успешен, создаём и добавляем карточку на страницу
      // Закрываем popup и сбрасываем форму
      reloadUserDataAndCards();
      closeModal(popupTypeNewCard);
      formImage.reset();
    })
    .catch((error) => {
      console.error('Ошибка при добавлении новой карточки:', error);
    });
};

formImage.addEventListener('submit', submitNewCard);

// Функция очистки ошибок валидации и деактивации кнопки
const clearValidation = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const submitButton = formElement.querySelector(settings.submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, settings); // Убираем ошибки
    
  });

  // Деактивируем кнопку отправки
  submitButton.classList.add(settings.inactiveButtonClass);
  submitButton.disabled = true;
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});


//запросы к серверу
function reloadUserDataAndCards() {
  Promise.all([fetchUserData(), fetchCards()])
    .then(([userData, cards]) => {
      userId = userData._id;
      userName = userData.name;
      userJob = userData.about;
      // Обновляем данные профиля на странице
      inputTypeName.textContent = userName;
      inputTypeDescription.textContent = userJob;
      // Очищаем список карточек перед добавлением обновленных данных
      placesList.innerHTML = '';
      cards.forEach((card) => {
        const cardElement = createCard(card, userId, deleteButton, openCardImagePopup, likeCard);
        placesList.append(cardElement);
      });
    })
    .catch((error) => console.error('Ошибка при получении данных:', error));
};

function fetchUserData() {
  return fetch('https://nomoreparties.co/v1/wff-cohort-26/users/me', {
    headers: {
      authorization: 'f02a9f8c-f2e8-43ba-94fe-0e81485f7ed0'
    }
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    })
};

function fetchCards() {
  return fetch('https://nomoreparties.co/v1/wff-cohort-26/cards', {
    headers: {
      authorization: 'f02a9f8c-f2e8-43ba-94fe-0e81485f7ed0'
    }
  })
  .then((res) => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  })
};



  
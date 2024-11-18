export const config = {
  baseUrl:'https://nomoreparties.co/v1/wff-cohort-26', 
  headers: {
    authorization: 'f02a9f8c-f2e8-43ba-94fe-0e81485f7ed0',
      'Content-Type': 'application/json'
  }
};

export function checkResponse(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

//api редактирование профиля
export function editUserProfile(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
  .then(checkResponse);
}

//api добавленя новой карточки
export function editNewCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then(checkResponse);
};

//api добавленя редактирования аватара
export function editUserAvatar(avatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar,
    })
  }).then(checkResponse);
};

//запрос данных профиля с сервера
export function fetchUserData() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  }).then(checkResponse);
};

//запрос массива карточеек с сервера
export function fetchCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  }).then(checkResponse);
};

//Функция удаления карточки
export function removeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then(checkResponse);
};

//функция лайка
export function likeCard(cardId, method) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: method,
    headers: config.headers,
  }).then(checkResponse);
};
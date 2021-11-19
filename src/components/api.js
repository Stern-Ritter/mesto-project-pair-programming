const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-3",
  headers: {
    authorization: "02385e69-13e7-4a45-9c9c-ba6d7f7e0793",
    "Content-Type": "application/json",
  },
};

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

function getUser() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(checkResponse);
}

function editProfile(edit) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,

    body: JSON.stringify({
      name: edit.name,
      about: edit.about,
      avatar: edit.avatar,
    }),
  }).then(checkResponse);
}

function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(checkResponse);
}

function addNewCard(card) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,

    body: JSON.stringify({
      name: card.name,
      link: card.link,
    }),
  }).then(checkResponse);
}

function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
}

function putLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then(checkResponse);
}

function deleteLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
}

function changeAvatar(me) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,

    body: JSON.stringify({
      avatar: me.avatar,
    }),
  }).then(checkResponse);
}

export {
  getUser,
  editProfile,
  getCards,
  addNewCard,
  deleteCard,
  putLike,
  deleteLike,
  changeAvatar,
  config,
};

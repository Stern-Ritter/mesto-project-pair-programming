import {
  nameInput,
  jobInput,
  profileTitle,
  profileSubtitle,
  profile,
} from "./modal.js";

// const config = {
//   baseUrl: "https://nomoreparties.co/v1/plus-cohort-3",
//   headers: {
//     authorization: "02385e69-13e7-4a45-9c9c-ba6d7f7e0793",
//     "Content-Type": "application/json",
//   },
// };

function getUser() {
  return fetch("https://nomoreparties.co/v1/plus-cohort-3/users/me", {
    headers: {
      authorization: "02385e69-13e7-4a45-9c9c-ba6d7f7e0793",
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

function editProfile(edit) {
  fetch("https://nomoreparties.co/v1/plus-cohort-3/users/me", {
    method: "PATCH",
    headers: {
      authorization: "02385e69-13e7-4a45-9c9c-ba6d7f7e0793",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: edit.name,
      about: edit.about,
    }),
  });
}

function cards() {
  return fetch("https://nomoreparties.co/v1/plus-cohort-3/cards", {
    headers: {
      authorization: "02385e69-13e7-4a45-9c9c-ba6d7f7e0793",
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

function addNewCard(card) {
  fetch("https://nomoreparties.co/v1/plus-cohort-3/cards", {
    method: "POST",
    headers: {
      authorization: "02385e69-13e7-4a45-9c9c-ba6d7f7e0793",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: card.name,
      link: card.link,
      _id: card._id,
    }),
  });
}

function deleteCard(cardId) {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-3/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: "02385e69-13e7-4a45-9c9c-ba6d7f7e0793",
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

function like(cardId) {
  return fetch(
    `https://nomoreparties.co/v1/plus-cohort-3/cards/likes/${cardId}`,
    {
      method: "PUT",
      headers: {
        authorization: "02385e69-13e7-4a45-9c9c-ba6d7f7e0793",
        "Content-Type": "application/json",
      },
    }
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

function likeDelete(cardId) {
  return fetch(
    `https://nomoreparties.co/v1/plus-cohort-3/cards/likes/${cardId}`,
    {
      method: "DELETE",
      headers: {
        authorization: "02385e69-13e7-4a45-9c9c-ba6d7f7e0793",
        "Content-Type": "application/json",
      },
    }
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

function likeChange(cardId) {
  return fetch(
    `https://nomoreparties.co/v1/plus-cohort-3/cards/likes/${cardId}`,
    {
      method: "PUT",
      headers: {
        authorization: "02385e69-13e7-4a45-9c9c-ba6d7f7e0793",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: cardId._id,
        likes: cardId.likes,
      }),
    }
  );
}

export {
  getUser,
  editProfile,
  cards,
  addNewCard,
  deleteCard,
  like,
  likeDelete,
  likeChange,
};

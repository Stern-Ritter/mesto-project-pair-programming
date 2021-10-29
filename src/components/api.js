import {
  nameInput,
  jobInput,
  profileTitle,
  profileSubtitle,
  profile,
} from "./modal.js";

function getUser() {
  return fetch("https://nomoreparties.co/v1/plus-cohort-3/users/me", {
    headers: {
      authorization: "02385e69-13e7-4a45-9c9c-ba6d7f7e0793",
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
  });
}

getUser();

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
  });
}

export { getUser, editProfile, cards };

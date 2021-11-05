import "./index.css";

import { createCard, popupImage } from "../components/card.js";

import {
  isValid,
  showInputError,
  hideInputError,
  hasInvalidInput,
  toggleButtonState,
  setEventListeners,
  enableValidation,
} from "../components/validate.js";

import { openPopup, closePopup, closeByEscape } from "../components/utils.js";

import {
  submitFormProfile,
  submitFormPlace,
  submitFormAvatar,
  linkInput,
  locationInput,
  placeFormElement,
  elementContainer,
  popupPlace,
  profileTitle,
  profileSubtitle,
  profile,
  formElem,
  nameInput,
  jobInput,
  popupProfile,
  avatarFormElement,
  popupAvatar,
} from "../components/modal.js";

import {
  getUser,
  editProfile,
  cards,
  config,
  like,
  avatarChange,
  likeChange,
  deleteCard,
} from "../components/api.js";

const profileEditBbutton = profile.querySelector(".profile__edit-button");
const profileAddBbutton = profile.querySelector(".profile__add-button");
const avatarEditButton = document.querySelector(".profile__modify-button");
const popupButton = document.querySelector(".popup__button");
const profileButton = document.querySelector(".edit-profile__button");
const placeButton = document.querySelector(".place__button");
const avatarButton = document.querySelector(".avatar__button");
const popups = document.querySelectorAll(".popup");
const avatarUser = document.querySelector(".profile__avatar");

const cardTemplate = document.querySelector(".elements-template").content;
const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
const likeButton = cardElement.querySelector(".element__like");

window.onload = function () {
  if (localStorage.getItem("likes") === "likes") {
    likeButton.classList.add("element__like_active");
  }
};

likeOn();

// console.log(likeButton);
// console.log(document.querySelector(".profile__avatar"));

function showUser() {
  getUser()
    .then((data) => {
      profileTitle.textContent = data.name;
      profileSubtitle.textContent = data.about;
      avatarUser.src = data.avatar;
    })
    .catch((err) => {
      console.log(err);
    });
}
showUser();

profileEditBbutton.addEventListener("click", function () {
  openPopup(popupProfile);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  profileButton.textContent = "Сохранить";
  profileButton.classList.remove("popup__button_inactive");
  profileButton.removeAttribute("disabled");
});

profileAddBbutton.addEventListener("click", function () {
  openPopup(popupPlace);
  placeFormElement.reset();
  placeButton.textContent = "Создать";
  placeButton.classList.add("popup__button_inactive");
  placeButton.setAttribute("disabled", true);
});

avatarEditButton.addEventListener("click", function () {
  openPopup(popupAvatar);
  avatarFormElement.reset();
  avatarButton.textContent = "Сохранить";
  avatarButton.classList.add("popup__button_inactive");
  avatarButton.setAttribute("disabled", true);
});

popups.forEach(function (popup) {
  popup.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
  });
});

formElem.addEventListener("submit", submitFormProfile);

placeFormElement.addEventListener("submit", submitFormPlace);

avatarFormElement.addEventListener("submit", submitFormAvatar);

function addCard() {
  cards()
    .then((data) => {
      const cardTemplate = document.querySelector(".elements-template").content;
      const cardElement = cardTemplate
        .querySelector(".element")
        .cloneNode(true);
      const deleteButton = cardElement.querySelector(".element__delete");

      // console.log(data);
      data.forEach(function (element) {
        const card = createCard(element.link, element.name, element._id);

        elementContainer.append(card);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}
addCard();

// const numberLike = cardElement.querySelector(".element__number-like");

// function newAvatar() {
//   avatarChange().then((data) => {
//     console.log(data);
//   });
// }
// newAvatar();

// deleteButton.classList.remove("element__delete-none");
const deleteButton = cardElement.querySelector(".element__delete");
// deleteButton.classList.remove("element__delete-none");
// deleteButton.addEventListener("click", function () {
//   cardElement.remove();
//   deleteCard(itemid)
//     .then((data) => {
//       console.log(data);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

function likeActive() {
  if (localStorage.getItem("likes") === "likes") {
    likeButton.classList.add("element__like_active");
    // deleteButton.classList.remove("element__delete-none");
    // console.log(like);
  }
}

likeActive();

function likeOn() {
  if (localStorage.getItem("likes") !== "likes") {
    localStorage.setItem("likes", "likes");
  }
  likeActive();
}

likeOn();

enableValidation({
  formSelector: ".popup__container",
  inputSelector: ".popup__item",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
});

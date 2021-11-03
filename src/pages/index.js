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
} from "../components/api.js";

const profileEditBbutton = profile.querySelector(".profile__edit-button");
const profileAddBbutton = profile.querySelector(".profile__add-button");
const avatarEditButton = document.querySelector(".profile__modify-button");
const popupButton = document.querySelector(".popup__button");
const placeButton = document.querySelector(".place__button");
const avatarButton = document.querySelector(".avatar__button");
const popups = document.querySelectorAll(".popup");
const avatarUser = document.querySelector(".profile__avatar");

function showUser() {
  getUser()
    .then((data) => {
      console.log(data.avatar);
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
  popupButton.classList.remove("popup__button_inactive");
  popupButton.removeAttribute("disabled");
});

profileAddBbutton.addEventListener("click", function () {
  openPopup(popupPlace);
  placeFormElement.reset();
  placeButton.classList.add("popup__button_inactive");
  placeButton.setAttribute("disabled", true);
});

avatarEditButton.addEventListener("click", function () {
  openPopup(popupAvatar);
  avatarFormElement.reset();
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

// function newAvatar() {
//   avatarChange().then((data) => {
//     console.log(data);
//   });
// }
// newAvatar();

enableValidation({
  formSelector: ".popup__container",
  inputSelector: ".popup__item",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
});

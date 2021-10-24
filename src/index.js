import "../pages/index.css";

import { createCard, initialCards, popupImage } from "./components/card.js";

import {
  isValid,
  showInputError,
  hideInputError,
  hasInvalidInput,
  toggleButtonState,
  setEventListeners,
  enableValidation,
} from "./components/validate.js";

import { openPopup, closePopup } from "./components/utils.js";

import {
  submitFormProfile,
  submitFormPlace,
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
} from "./components/modal.js";

const profileEditBbutton = profile.querySelector(".profile__edit-button");
const popupCloseButton = popupProfile.querySelector(".popup__close");
const profileAddBbutton = profile.querySelector(".profile__add-button");
const placeCloseButton = popupPlace.querySelector(".place__close");

profileEditBbutton.addEventListener("click", function () {
  openPopup(popupProfile);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  document
    .querySelector(".popup__button")
    .classList.remove("popup__button_inactive");
  document.querySelector(".popup__button").removeAttribute("disabled");
});

profileAddBbutton.addEventListener("click", function () {
  openPopup(popupPlace);
  placeFormElement.reset();
  document
    .querySelector(".place__button")
    .classList.add("popup__button_inactive");
  document.querySelector(".place__button").setAttribute("disabled", true);
});

popupCloseButton.addEventListener("click", function () {
  closePopup(popupProfile);
});

popupProfile.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("edit-profile")) {
    closePopup(popupProfile);
  }
});

placeCloseButton.addEventListener("click", function () {
  closePopup(popupPlace);
});

popupPlace.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("place")) {
    closePopup(popupPlace);
  }
});

formElem.addEventListener("submit", submitFormProfile);

popupImage
  .querySelector(".image__close")
  .addEventListener("click", function () {
    closePopup(popupImage);
  });

popupImage.addEventListener("click", function (evt) {
  if (!evt.target.classList.contains("popup__image")) {
    closePopup(popupImage);
  }
});

document.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") {
    closePopup(popupProfile);
    closePopup(popupImage);
    closePopup(popupPlace);
  }
});

placeFormElement.addEventListener("submit", submitFormPlace);

initialCards.forEach(function (element) {
  const card = createCard(element.link, element.name);
  elementContainer.append(card);
});

enableValidation({
  formSelector: ".popup__container",
  inputSelector: ".popup__item",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
});

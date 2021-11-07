import "./index.css";

import { createCard } from "../components/card.js";

import { enableValidation } from "../components/validate.js";

import { openPopup, closePopup } from "../components/utils.js";

import {
  submitFormProfile,
  submitFormPlace,
  submitFormAvatar,
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

import { getUser, cards, deleteCard } from "../components/api.js";

const profileEditBbutton = profile.querySelector(".profile__edit-button");
const profileAddBbutton = profile.querySelector(".profile__add-button");
const avatarEditButton = document.querySelector(".profile__modify-button");
const profileButton = document.querySelector(".edit-profile__button");
const placeButton = document.querySelector(".place__button");
const avatarButton = document.querySelector(".avatar__button");
const popups = document.querySelectorAll(".popup");
const avatarUser = document.querySelector(".profile__avatar");

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

      data.forEach(function (element) {
        const card = createCard(element.link, element.name, element._id);

        if (element.owner._id == "e5fcdabd0c334fb91ee2be3d") {
          elementContainer.append(card);
          const elementCard = document.querySelector(".element");
          const del = document.createElement("button");
          const elem = document.querySelectorAll(".element");
          del.classList.add("element__delete");

          elem.forEach((el) => {
            el.prepend(del);
          });

          del.addEventListener("click", function () {
            elementCard.remove();

            deleteCard(element._id)
              .then((data) => {
                console.log(data);
              })
              .catch((err) => {
                console.log(err);
              });
          });
        } else {
          elementContainer.append(card);
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
}
addCard();

enableValidation({
  formSelector: ".popup__container",
  inputSelector: ".popup__item",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
});

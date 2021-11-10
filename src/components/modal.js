import { createCard } from "./card.js";
import { closePopup } from "./utils.js";
import {
  editProfile,
  addNewCard,
  avatarChange,
  deleteCard,
  cards,
} from "./api.js";

import { addCard } from "../pages/index.js";

const placeFormElement = document.querySelector(".popup__container-place");
const linkInput = placeFormElement.querySelector(".popup__item_type_link");
const locationInput = placeFormElement.querySelector(
  ".popup__item_type_location"
);
const elementContainer = document.querySelector(".elements");
const popupPlace = document.querySelector(".place");
const profile = document.querySelector(".profile");
const profileTitle = profile.querySelector(".profile__title");
const profileSubtitle = profile.querySelector(".profile__subtitle");
const formElem = document.querySelector(".edit-profile__container");
const nameInput = formElem.querySelector(".popup__item_type_name");
const jobInput = formElem.querySelector(".popup__item_type_job");
const popupProfile = document.querySelector(".edit-profile");
const avatarFormElement = document.querySelector(".avatar__container");
const avatarInput = document.querySelector(".popup__item_type_avatar");
const popupAvatar = document.querySelector(".avatar");
const profileButton = document.querySelector(".edit-profile__button");
const placeButton = document.querySelector(".place__button");
const avatarButton = document.querySelector(".avatar__button");

function submitFormProfile(evt) {
  evt.preventDefault();
  renderLoading(profileButton, true);
  profileTitle.textContent = `${nameInput.value}`;
  profileSubtitle.textContent = `${jobInput.value}`;
  editProfile({
    name: nameInput.value,
    about: jobInput.value,
  });

  closePopup(popupProfile);
}

function submitFormPlace(evt, itemid) {
  evt.preventDefault();

  const card = createCard(linkInput.value, locationInput.value);
  elementContainer.prepend(card);

  addNewCard({
    name: locationInput.value,
    link: linkInput.value,
  });

  const cardTemplate = document.querySelector(".elements-template").content;
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  const elementImage = cardElement.querySelector(".element__image");
  const likeButton = cardElement.querySelector(".element__like");
  const numberLike = cardElement.querySelector(".element__number-like");
  // elementImage.src = itemImage;
  // cardElement.querySelector(".element__text").textContent = itemLocation;
  // elementImage.alt = `Иллюстрация места ${itemLocation}`;

  likeButton.addEventListener("click", function (evt) {
    if (!evt.target.classList.contains("element__like_active")) {
      evt.target.classList.add("element__like_active");

      like(itemid)
        .then((data) => {
          numberLike.textContent = data.likes.length;
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      evt.target.classList.remove("element__like_active");
      likeDelete(itemid)
        .then((data) => {
          numberLike.textContent = data.likes.length;
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  });

  cards()
    .then(() => {
      const del = document.createElement("button");
      const elem = document.querySelector(".element");
      del.classList.add("element__delete");
      elem.prepend(del);

      console.log(del);
      console.log(elem);

      del.addEventListener("click", function () {
        // console.log(elementCard);
        elem.remove();
        deleteCard()
          .then((data) => {
            console.log(data);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log(err.message);
    })
    .finally(() => {
      renderLoading(placeButton, true);
      closePopup(popupPlace);
    });
}

function submitFormAvatar(evt) {
  evt.preventDefault();
  renderLoading(avatarButton, true);
  avatarChange({
    avatar: avatarInput.value,
  });

  closePopup(popupAvatar);
}

function renderLoading(button, isLoading) {
  if (isLoading) {
    button.textContent = "Сохранение...";
  }
}

export {
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
};

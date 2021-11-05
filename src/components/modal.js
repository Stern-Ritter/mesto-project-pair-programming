import { createCard } from "./card.js";
import { closePopup } from "./utils.js";
import {
  editProfile,
  addNewCard,
  avatarChange,
  cards,
  deleteCard,
} from "./api.js";

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
const popupButton = document.querySelector(".popup__button");

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

function submitFormPlace(evt, cardId) {
  evt.preventDefault();
  renderLoading(placeButton, true);
  const card = createCard(linkInput.value, locationInput.value);
  elementContainer.prepend(card);
  // const deleteButton = document.querySelector(".element__delete");
  // deleteButton.classList.remove("element__delete-none");
  addNewCard({
    name: locationInput.value,
    link: linkInput.value,
  });
  cards().then((res) => {
    console.log(res);
    res.forEach((element) => {
      if (element.owner._id == "e5fcdabd0c334fb91ee2be3d") {
        // console.log(element.owner._id == "e5fcdabd0c334fb91ee2be3d");
        // console.log(typeof "e5fcdabd0c334fb91ee2be3d");
        // console.log(element.owner._id);
        deleteButton.classList.remove("element__delete-none");
      }
    });
  });
  const cardTemplate = document.querySelector(".elements-template").content;
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  const deleteButton = document.querySelector(".element__delete");
  deleteButton.classList.remove("element__delete-none");
  deleteButton.addEventListener("click", function () {
    cardElement.remove();
    deleteCard()
      .then((data) => {
        console.log(data.id);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  closePopup(popupPlace);
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
    console.log(popupButton);
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

import { createCard } from "./card.js";
import { closePopup } from "./utils.js";
import { editProfile, addNewCard, changeAvatar } from "./api.js";
import { userId } from "../pages/index.js";

const placeFormElement = document.querySelector(".place__container");
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
const profileAvatar = document.querySelector(".profile__avatar");

function submitFormProfile(evt) {
  evt.preventDefault();
  renderLoading(profileButton, true);
  editProfile({
    name: nameInput.value,
    about: jobInput.value,
  })
    .then(() => {
      profileTitle.textContent = `${nameInput.value}`;
      profileSubtitle.textContent = `${jobInput.value}`;
      closePopup(popupProfile);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      profileButton.textContent = "Сохранить";
    });
}

function submitFormPlace(evt) {
  evt.preventDefault();
  renderLoading(placeButton, true);
  addNewCard({
    name: locationInput.value,
    link: linkInput.value,
  })
    .then((data) => {
      const card = createCard(
        {
          link: linkInput.value,
          name: locationInput.value,
          id: data.owner._id,
          _id: data._id,
          likes: data.likes.length,
          like: data.likes,
        },
        userId
      );
      elementContainer.prepend(card);
      closePopup(popupPlace);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      placeButton.textContent = "Создать";
    });
}

function submitFormAvatar(evt) {
  evt.preventDefault();
  renderLoading(avatarButton, true);
  changeAvatar({
    avatar: avatarInput.value,
  })
    .then(() => {
      profileAvatar.src = avatarInput.value;
      closePopup(popupAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarButton.textContent = "Сохранить";
    });
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

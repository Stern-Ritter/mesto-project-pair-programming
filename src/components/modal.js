import { createCard } from "./card.js";
import { closePopup } from "./utils.js";
import { editProfile, addNewCard, avatarChange } from "./api.js";

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

function submitFormProfile(evt) {
  evt.preventDefault();
  profileTitle.textContent = `${nameInput.value}`;
  profileSubtitle.textContent = `${jobInput.value}`;
  editProfile({
    name: nameInput.value,
    about: jobInput.value,
  });
  closePopup(popupProfile);
}

function submitFormPlace(evt) {
  evt.preventDefault();
  const card = createCard(linkInput.value, locationInput.value);
  elementContainer.prepend(card);
  addNewCard({
    name: locationInput.value,
    link: linkInput.value,
  });

  closePopup(popupPlace);
}

function submitFormAvatar(evt) {
  evt.preventDefault();
  avatarChange({
    avatar: avatarInput.value,
  });
  closePopup(popupAvatar);
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

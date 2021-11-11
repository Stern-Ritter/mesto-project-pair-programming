import { createCard } from "./card.js";
import { closePopup } from "./utils.js";
import {
  editProfile,
  addNewCard,
  avatarChange,
  deleteCard,
  cards,
  getUser,
  like,
  likeDelete,
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
const profileAvatar = document.querySelector(".profile__avatar");

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

function submitFormPlace(evt) {
  evt.preventDefault();

  addNewCard({
    name: locationInput.value,
    link: linkInput.value,
  }).then((data) => {
    console.log(data);

    const card = createCard(
      {
        link: linkInput.value,
        name: locationInput.value,
      },
      data._id
    );
    elementContainer.prepend(card);

    const deleteButton = document.querySelector(".element__delete");
    const element = document.querySelector(".element");
    console.log(element);
    deleteButton.classList.add("element__delete_visible");

    // deleteButton.addEventListener("click", function () {
    //   deleteCard(data._id)
    //     .then((data) => {
    //       console.log(data);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    //   element.remove();
    // });
  });

  closePopup(popupPlace);
}

function submitFormAvatar(evt) {
  evt.preventDefault();

  renderLoading(avatarButton, true);
  avatarChange({
    avatar: avatarInput.value,
  });
  profileAvatar.src = avatarInput.value;
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

// .then((data) => {
//   const del = document.createElement("button");
//   const elem = document.querySelector(".element");
//   const element = document.querySelectorAll(".element");
//   del.classList.add("element__delete");
//   elem.prepend(del);
//   console.log(del);
//   // console.log(del);
//   // console.log(elem);
//   data.forEach((el) => {
//     const likeButton = document.querySelectorAll(".element__like");
//     const numberLike = document.querySelectorAll(".element__number-like");

//     // del.addEventListener("click", function () {
//     //   element.forEach(() => {
//     //     deleteCard(card._id)
//     //       .then((data) => {
//     //         console.log(data);
//     //       })
//     //       .catch((err) => {
//     //         console.log(err);
//     //       });
//     //     const item = del.closest(".element");
//     //     console.log(item);
//     //     // item.remove(item);
//     //   });
//     // });

//     // console.log(likeButton);
//     // likeButton.forEach((element) => {
//     //   element.addEventListener("click", function (evt) {
//     //     if (!evt.target.classList.contains("element__like_active")) {
//     //       evt.target.classList.add("element__like_active");
//     //       // console.log(el._id);
//     //       like(el._id)
//     //         .then((data) => {
//     //           // console.log(data);
//     //           numberLike.textContent = data.likes.length;
//     //           // console.log(data._id);
//     //         })
//     //         .catch((err) => {
//     //           console.log(err.message);
//     //         });
//     //     } else {
//     //       evt.target.classList.remove("element__like_active");
//     //       likeDelete(el._id)
//     //         .then((data) => {
//     //           numberLike.textContent = data.likes.length;
//     //         })
//     //         .catch((err) => {
//     //           console.log(err.message);
//     //         });
//     //     }
//     //   });
//     // });
//   });
// })
// .catch((err) => {
//   console.log(err.message);
// })
// .finally(() => {
//   renderLoading(placeButton, true);
// });

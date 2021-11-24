import "./index.css";
import Api from "../components/Api.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";

// const profileEditBbutton = profile.querySelector(".profile__edit-button");
// const profileAddBbutton = profile.querySelector(".profile__add-button");
// const avatarEditButton = document.querySelector(".profile__modify-button");
// const profileButton = document.querySelector(".edit-profile__button");
// const placeButton = document.querySelector(".place__button");
// const avatarButton = document.querySelector(".avatar__button");
// const popups = document.querySelectorAll(".popup");
// const avatarUser = document.querySelector(".profile__avatar");

const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-3",
  headers: {
    authorization: "02385e69-13e7-4a45-9c9c-ba6d7f7e0793",
    "Content-Type": "application/json",
  },
});

const cardSection = new Section((item) => {
  const card = new Card(item, ".elements-template", {
    handleCardClick: function () {
      //openPopup(popupImage);
      // imagePic.src = element.link;
      // imagePic.alt = `Иллюстрация места ${element.name}`;
      // imageText.textContent = element.name;
    },
    handleDeleteBtnClick: function () {
      api
        .deleteCard(this._id)
        .then(() => this._element.remove())
        .catch((err) => console.log(err));
    },
    handleLikeBtnClick: function (evt) {
      const numberLike = this._element.querySelector(".element__number-like");

      if (!evt.target.classList.contains("element__like_active")) {
        api
          .putLike(this._id)
          .then((data) => {
            console.log(this._id);
            numberLike.textContent = data.likes.length;
            evt.target.classList.add("element__like_active");
          })
          .catch((err) => console.log(err.message));
      } else {
        api
          .deleteLike(this._id)
          .then((data) => {
            evt.target.classList.remove("element__like_active");
            numberLike.textContent = data.likes.length;
          })
          .catch((err) => console.log(err.message));
      }
    },
  });
  const cardElement = card.generate();
  cardSection.addItem(cardElement);
}, ".elements");

api.getCards().then((items) => cardSection.renderItems(items));

// Исходный код
// Promise.all([getUser(), getCards()])
//   .then(([user, cards]) => {
//     profileTitle.textContent = user.name;
//     profileSubtitle.textContent = user.about;
//     avatarUser.src = user.avatar;
//     userId = user._id;

//     cards.forEach(function (element) {
//       const card = createCard(
//         {
//           link: element.link,
//           name: element.name,
//           _id: element._id,
//           likes: element.likes.length,
//           id: element.owner._id,
//           like: element.likes,
//         },
//         userId
//       );
//       elementContainer.append(card);
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// profileEditBbutton.addEventListener("click", function () {
//   openPopup(popupProfile);
//   nameInput.value = profileTitle.textContent;
//   jobInput.value = profileSubtitle.textContent;
//   profileButton.classList.remove("popup__button_inactive");
//   profileButton.removeAttribute("disabled");
// });

// profileAddBbutton.addEventListener("click", function () {
//   openPopup(popupPlace);
//   placeFormElement.reset();
//   placeButton.classList.add("popup__button_inactive");
//   placeButton.setAttribute("disabled", true);
// });

// avatarEditButton.addEventListener("click", function () {
//   openPopup(popupAvatar);
//   avatarFormElement.reset();
//   avatarButton.classList.add("popup__button_inactive");
//   avatarButton.setAttribute("disabled", true);
// });

// popups.forEach(function (popup) {
//   popup.addEventListener("click", function (evt) {
//     if (evt.target.classList.contains("popup_opened")) {
//       closePopup(popup);
//     }
//     if (evt.target.classList.contains("popup__close")) {
//       closePopup(popup);
//     }
//   });
// });

// formElem.addEventListener("submit", submitFormProfile);

// placeFormElement.addEventListener("submit", submitFormPlace);

// avatarFormElement.addEventListener("submit", submitFormAvatar);

// enableValidation({
//   formSelector: ".popup__container",
//   inputSelector: ".popup__item",
//   submitButtonSelector: ".popup__button",
//   inactiveButtonClass: "popup__button_inactive",
//   inputErrorClass: "popup__input_type_error",
//   errorClass: "popup__input-error_active",
// });

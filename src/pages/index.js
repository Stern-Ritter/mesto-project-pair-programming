import "./index.css";
import Api from "../components/Api";
import Section from "../components/Section";
import Card from "../components/Card";
import UserInfo from "../components/UserInfo";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import FormValidator from "../components/FormValidator";
import { config } from "../components/constants";

// DOM-элементы
const profile = document.querySelector(".profile");
const profileEditBbutton = profile.querySelector(".profile__edit-button");
const avatarEditButton = profile.querySelector(".profile__modify-button");
const avatarUser = profile.querySelector(".profile__avatar");
const profileAddBbutton = profile.querySelector(".profile__add-button");

// Создание объектов классов
const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-3",
  headers: {
    authorization: "02385e69-13e7-4a45-9c9c-ba6d7f7e0793",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo(
  {
    nameSelector: ".profile__title",
    aboutSelector: ".profile__subtitle",
    avatarSelector: ".profile__avatar",
  },
  {
    setUserHandler: function (name, about) {
      return api.editUser(name, about).then((user) => {
        this.showUserInfo(user);
        return new Promise((resolve) => resolve());
      });
    },
  }
);

const cardSection = new Section((item) => {
  const card = new Card(item, ".elements-template", {
    handleCardClick: function () {
      popupImage.open({ name: this._name, link: this._link });
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

const popupImage = new PopupWithImage(".image");

const popupEditProfile = new PopupWithForm(".edit-profile", function () {
  const oldText = popupEditProfile.switchSubmitButtonText("Сохранение...");
  const { name, about } = this._getInputValues();
  userInfo
    .setUserInfo(name, about)
    .then(() => {
      popupEditProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditProfile.switchSubmitButtonText(oldText);
    });
});

const popupEditAvatar = new PopupWithForm(".avatar", function () {
  const oldText = popupEditAvatar.switchSubmitButtonText("Сохранение...");
  const { avatar } = this._getInputValues();
  api
    .changeAvatar(avatar)
    .then((res) => {
      avatarUser.src = res.avatar;
      popupEditAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditAvatar.switchSubmitButtonText(oldText);
    });
});

const popupAddPlace = new PopupWithForm(".place", function () {
  const oldText = popupAddPlace.switchSubmitButtonText("Сохранение...");
  const { name, link } = this._getInputValues();
  api
    .addNewCard(name, link)
    .then((card) => {
      console.log(card);
      cardSection.renderer(card);
      popupAddPlace.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAddPlace.switchSubmitButtonText(oldText);
    });
});

const editProfileForm = new FormValidator(config, ".edit-profile__container");
const editAvatarForm = new FormValidator(config, ".avatar__container");
const addPlaceForm = new FormValidator(config, ".place__container");

// Установка обработчиков событий
popupImage.setEventListeners();
popupAddPlace.setEventListeners();
popupEditAvatar.setEventListeners();
popupEditProfile.setEventListeners();

profileEditBbutton.addEventListener("click", () => {
  const user = userInfo.getUserInfo();
  popupEditProfile._setInputValues(user);
  editProfileForm.clearForm();
  popupEditProfile.open();
});
avatarEditButton.addEventListener("click", () => {
  popupEditAvatar.open();
  editAvatarForm.clearForm();
});
profileAddBbutton.addEventListener("click", () => {
  popupAddPlace.open();
  addPlaceForm.clearForm();
});

// Начальная инициализация
Promise.all([api.getUser(), api.getCards()]).then(([user, items]) => {
  localStorage.setItem("userId", user._id);
  userInfo.showUserInfo(user);
  cardSection.renderItems(items);
});

editProfileForm.enableValidation();
editAvatarForm.enableValidation();
addPlaceForm.enableValidation();

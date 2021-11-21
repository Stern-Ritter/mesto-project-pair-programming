import { putLike, deleteLike, deleteCard } from "./Api.js";
import { openPopup } from "./utils.js";

export default class Card {
  constructor(
    { _id, name, link, likes, owner },
    selector,
    { handleCardClick, handleDeleteBtnClick, handleLikeBtnClick }
  ) {
    this._id = _id;
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._owner = owner;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteBtnClick = handleDeleteBtnClick;
    this._handleLikeBtnClick = handleLikeBtnClick;
  }

  _getElement() {
    const cardElement = document
      .querySelector(this._selector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    const deleteButton = this._element.querySelector(".element__delete");
    const likeButton = this._element.querySelector(".element__like");
    const elementImage = this._element.querySelector(".element__image");

    deleteButton.addEventListener("click", this._handleDeleteBtnClick);
    likeButton.addEventListener("click", this._handleLikeBtnClick);
    elementImage.addEventListener("click", this._handleCardClick);
  }

  generate() {
    this._element = this._getElement();

    const elementImage = this._element.querySelector(".element__image");
    const elementText = this._element.querySelector(".element__text");
    const numberLike = this._element.querySelector(".element__number-like");
    const likeButton = this._element.querySelector(".element__like");
    const deleteButton = this._element.querySelector(".element__delete");
    const userId = sessionStorage.getItem("userId");

    elementText.textContent = this._name;
    elementImage.src = this._link;
    elementImage.alt = `Иллюстрация места ${this._name}`;
    numberLike.textContent = this._likes;

    if (userId === this._owner) {
      deleteButton.classList.add("element__delete_visible");
    } else {
      deleteButton.classList.remove("element__delete_visible");
    }

    if (likes.map((like) => like._id).includes(userId)) {
      likeButton.classList.add("element__like_active");
    }

    this._setEventListeners();
    return this._element;
  }
}

const popupImage = document.querySelector(".image");
const imagePic = popupImage.querySelector(".image__src");
const imageText = popupImage.querySelector(".image__place");

function createCard(element, user) {
  // const elementImage = cardElement.querySelector(".element__image");
  // const likeButton = cardElement.querySelector(".element__like");
  // const numberLike = cardElement.querySelector(".element__number-like");
  // elementImage.src = element.link;
  // cardElement.querySelector(".element__text").textContent = element.name;
  // elementImage.alt = `Иллюстрация места ${element.name}`;
  // numberLike.textContent = element.likes;

  // const deleteButton = cardElement.querySelector(".element__delete");

  // if (element.id === user) {
  //   deleteButton.classList.add("element__delete_visible");
  // } else {
  //   deleteButton.classList.remove("element__delete_visible");
  // }

  deleteButton.addEventListener("click", function () {
    deleteCard(element._id)
      .then((data) => {
        cardElement.remove();
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // const activeLike = element.like.find((el) => {
  //   return el._id === user;
  // });

  // if (activeLike) {
  //   likeButton.classList.add("element__like_active");
  // }

  likeButton.addEventListener("click", function (evt) {
    if (!evt.target.classList.contains("element__like_active")) {
      putLike(element._id)
        .then((data) => {
          numberLike.textContent = data.likes.length;
          evt.target.classList.add("element__like_active");
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      deleteLike(element._id)
        .then((data) => {
          evt.target.classList.remove("element__like_active");
          numberLike.textContent = data.likes.length;
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  });

  elementImage.addEventListener("click", function () {
    openPopup(popupImage);
    imagePic.src = element.link;
    imagePic.alt = `Иллюстрация места ${element.name}`;
    imageText.textContent = element.name;
  });

  // return cardElement;
}

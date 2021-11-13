import { putLike, deleteLike, deleteCard } from "./api.js";
import { openPopup } from "./utils.js";

const popupImage = document.querySelector(".image");
const imagePic = popupImage.querySelector(".image__src");
const imageText = popupImage.querySelector(".image__place");

function createCard(element, user) {
  const cardTemplate = document.querySelector(".elements-template").content;
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  const elementImage = cardElement.querySelector(".element__image");
  const likeButton = cardElement.querySelector(".element__like");
  const numberLike = cardElement.querySelector(".element__number-like");
  elementImage.src = element.link;
  cardElement.querySelector(".element__text").textContent = element.name;
  elementImage.alt = `Иллюстрация места ${element.name}`;
  numberLike.textContent = element.likes;

  const deleteButton = cardElement.querySelector(".element__delete");

  if (element.id === user) {
    deleteButton.classList.add("element__delete_visible");
  } else {
    deleteButton.classList.remove("element__delete_visible");
  }

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

  const activeLike = element.like.find((el) => {
    return el._id === user;
  });

  if (activeLike) {
    likeButton.classList.add("element__like_active");
  }

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

  return cardElement;
}

export { createCard, popupImage };

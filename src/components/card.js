import { deleteCard, cards, like, likeDelete } from "./api.js";
import { openPopup } from "./utils.js";

const popupImage = document.querySelector(".image");

function createCard(itemImage, itemLocation, itemid) {
  const cardTemplate = document.querySelector(".elements-template").content;
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  const elementImage = cardElement.querySelector(".element__image");
  const likeButton = cardElement.querySelector(".element__like");
  const numberLike = cardElement.querySelector(".element__number-like");
  elementImage.src = itemImage;
  cardElement.querySelector(".element__text").textContent = itemLocation;
  elementImage.alt = `Иллюстрация места ${itemLocation}`;

  likeButton.addEventListener("click", function (evt) {
    if (!evt.target.classList.contains("element__like_active")) {
      evt.target.classList.add("element__like_active");
      // likeOn();

      like(itemid)
        .then((data) => {
          numberLike.textContent = data.likes.length;
          console.log(data.likes);
        })
        .catch((err) => {
          console.log(err.message);
        });

      likeOn();
    } else {
      evt.target.classList.remove("element__like_active");
      likeDelete(itemid)
        .then((data) => {
          numberLike.textContent = data.likes.length;
          console.log(data.likes);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  });

  const deleteButton = cardElement.querySelector(".element__delete");
  deleteButton.addEventListener("click", function () {
    cardElement.remove();

    deleteCard(itemid)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  elementImage.addEventListener("click", function () {
    openPopup(popupImage);
    const imageContainer = document.querySelector(".image__container");

    imageContainer.querySelector(".image__src").src = itemImage;
    imageContainer.querySelector(".image__place").textContent = itemLocation;
  });
  return cardElement;
}

function likeActive() {
  const like = document.querySelector(".element__like");
  try {
    if (localStorage.getItem("likeon") === "likeActive") {
      like.target.classList.add("element__like_active");
      console.log(like);
    }
  } catch (err) {}
}

likeActive();

function likeOn() {
  if (localStorage.getItem("likeon") !== "likeActive") {
    localStorage.setItem("likeon", "likeActive");
  }
  likeActive();
}

export { createCard, popupImage };

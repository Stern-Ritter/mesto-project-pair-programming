import { like } from "./api.js";
import { openPopup } from "./utils.js";

const popupImage = document.querySelector(".image");

function createCard(itemImage, itemLocation, itemLike) {
  const cardTemplate = document.querySelector(".elements-template").content;
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  const elementImage = cardElement.querySelector(".element__image");
  elementImage.src = itemImage;
  cardElement.querySelector(".element__text").textContent = itemLocation;
  elementImage.alt = `Иллюстрация места ${itemLocation}`;
  cardElement
    .querySelector(".element__like")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("element__like_active");
    });
  like();

  const deleteButton = cardElement.querySelector(".element__delete");
  deleteButton.addEventListener("click", function () {
    cardElement.remove();
  });
  elementImage.addEventListener("click", function () {
    openPopup(popupImage);
    const imageContainer = document.querySelector(".image__container");

    imageContainer.querySelector(".image__src").src = itemImage;
    imageContainer.querySelector(".image__place").textContent = itemLocation;
  });
  return cardElement;
}

export { createCard, popupImage };

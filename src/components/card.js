import { openPopup } from "./utils.js";

const popupImage = document.querySelector(".image");

function createCard(itemImage, itemLocation) {
  const cardTemplate = document.querySelector(".elements-template").content;
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  const elementImage = cardElement.querySelector(".element__image");
  elementImage.src = itemImage;
  cardElement.querySelector(".element__text").textContent = itemLocation;
  elementImage.alt = "Иллюстрация места.";
  cardElement
    .querySelector(".element__like")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("element__like_active");
    });
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

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Мариуполь",
    link: "https://club.foto.ru/gallery/images/photo/2018/10/22/2567941.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export { createCard, initialCards, popupImage };

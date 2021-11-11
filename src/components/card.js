import { like, likeDelete, cards, deleteCard } from "./api.js";
import { openPopup } from "./utils.js";

const popupImage = document.querySelector(".image");

function createCard(element, itemid) {
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
  const myId = "e5fcdabd0c334fb91ee2be3d";
  if (element.id == myId) {
    deleteButton.classList.add("element__delete_visible");
  } else {
    deleteButton.classList.remove("element__delete_visible");
  }

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

  likeButton.addEventListener("click", function (evt) {
    if (!evt.target.classList.contains("element__like_active")) {
      evt.target.classList.add("element__like_active");

      like(itemid)
        .then((data) => {
          numberLike.textContent = data.likes.length;
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      evt.target.classList.remove("element__like_active");
      likeDelete(itemid)
        .then((data) => {
          numberLike.textContent = data.likes.length;
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  });

  elementImage.addEventListener("click", function () {
    openPopup(popupImage);
    const imageContainer = document.querySelector(".image__container");
    imageContainer.querySelector(".image__src").src = element.image;
    imageContainer.querySelector(".image__place").textContent = element.name;
  });

  return cardElement;
}

// cards().then((data) => {
//   data.forEach((element) => {
//     const card = createCard(element, itemid);
//     const cardTemplate = document.querySelector(".elements-template").content;
//     const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
//     const elementImage = cardElement.querySelector(".element__image");
//     const likeButton = cardElement.querySelector(".element__like");
//     const numberLike = cardElement.querySelector(".element__number-like");
//     elementImage.src = element.image;
//     cardElement.querySelector(".element__text").textContent = element.name;
//     elementImage.alt = `Иллюстрация места ${element.name}`;

//     numberLike.textContent = element.likes.length;

//     likeButton.addEventListener("click", function (evt) {
//       if (!evt.target.classList.contains("element__like_active")) {
//         evt.target.classList.add("element__like_active");

//         like(itemid)
//           .then((data) => {
//             numberLike.textContent = data.likes.length;
//           })
//           .catch((err) => {
//             console.log(err.message);
//           });
//       } else {
//         evt.target.classList.remove("element__like_active");
//         likeDelete(itemid)
//           .then((data) => {
//             numberLike.textContent = data.likes.length;
//           })
//           .catch((err) => {
//             console.log(err.message);
//           });
//       }
//     });

//     elementImage.addEventListener("click", function () {
//       openPopup(popupImage);
//       const imageContainer = document.querySelector(".image__container");
//       imageContainer.querySelector(".image__src").src = itemImage;
//       imageContainer.querySelector(".image__place").textContent = itemLocation;
//     });

//     return cardElement;
//   });
// });

export { createCard, popupImage };

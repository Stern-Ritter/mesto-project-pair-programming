import { deleteCard, cards, like, likeDelete, getUser } from "./api.js";
import { openPopup } from "./utils.js";

const popupImage = document.querySelector(".image");

likenew();

function createCard(itemImage, itemLocation, itemid, userId) {
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

      // console.log(evt.target);

      like(itemid)
        .then((data) => {
          numberLike.textContent = data.likes.length;

          // console.log(data.owner._id);
        })
        .catch((err) => {
          console.log(err.message.length);
        });
      likenew();
    } else {
      evt.target.classList.remove("element__like_active");
      likeDelete(itemid)
        .then((data) => {
          numberLike.textContent = data.likes.length;
          // console.log(data.likes.length);
        })
        .catch((err) => {
          console.log(err.message);
        });
      likenew();
    }
  });

  const deleteButton = cardElement.querySelector(".element__delete");
  // deleteButton.classList.add("element__delete-none");

  // cards().then((res) => {
  //   console.log(res);
  //   res.forEach((element) => {
  //     if (element.owner._id == "e5fcdabd0c334fb91ee2be3d") {
  //       console.log(element.owner._id == "e5fcdabd0c334fb91ee2be3d");
  //       console.log(typeof "e5fcdabd0c334fb91ee2be3d");
  //       console.log(element.owner._id);
  //       deleteButton.classList.remove("element__delete-none");
  //     }
  //   });
  // });
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

const cardTemplate = document.querySelector(".elements-template").content;
const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
const numberLike = cardElement.querySelector(".element__number-like");

function likenew() {
  cards()
    .then((data) => {
      // console.log(data);
      data.forEach((element) => {
        // console.log(element.likes.length);
        // console.log(numberLike);

        numberLike.textContent = element.likes.length;
      });
      // console.log(data);
    })
    .catch((err) => {
      console.log(err.message);
    });
}

// const cardTemplate = document.querySelector(".elements-template").content;
// const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
// const deleteButton = cardElement.querySelector(".element__delete");
// deleteButton.classList.remove("element__delete-none");
// deleteButton.addEventListener("click", function () {
//   cardElement.remove();
//   deleteCard(itemid)
//     .then((data) => {
//       console.log(data);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

likenew();

export { createCard, popupImage };

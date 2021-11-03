import { deleteCard, cards, like, likeDelete } from "./api.js";
import { openPopup } from "./utils.js";

const popupImage = document.querySelector(".image");

// window.onload = function () {
//   const like = document.querySelector(".element__like");
//   if (localStorage.getItem("likes") !== null) {
//     // likes.target.classList.add("element__like_active");
//     console.log(like);
//   }
// };

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

      console.log(evt.target);

      like(itemid)
        .then((data) => {
          numberLike.textContent = data.likes.length;
          console.log(data.likes);
        })
        .catch((err) => {
          console.log(err.message);
        });
      likenew();
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
      likenew();
    }
  });

  // likeChange()
  //   .then((data) => {
  //     console.log(data);
  //     data.forEach((element) => {
  //       console.log(element.likes.length);
  //       // console.log(numberLike);
  //       numberLike.textContent = element.likes.length;
  //     });
  //     // console.log(data);
  //     // numberLike.textContent = data.likes.length;
  //   })

  // .catch((err) => {
  //   console.log(err.message);
  // });

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

const cardTemplate = document.querySelector(".elements-template").content;
const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
const numberLike = cardElement.querySelector(".element__number-like");

function likenew() {
  cards()
    .then((data) => {
      console.log(data);
      data.forEach((element) => {
        console.log(element.likes.length);
        console.log(numberLike);

        numberLike.textContent = element.likes.length;
      });
      // console.log(data);
    })
    .catch((err) => {
      console.log(err.message);
    });
}

likenew();

// function likeActive(like) {
//   if (localStorage.getItem("likes") === "likes") {
//     const like = document.querySelector(".element__like");
//     // like.target.classList.add("element__like_active");
//     console.log(like);
//   }
// }

// likeActive();

// function likeOn() {
//   if (localStorage.getItem("likes") !== "likes") {
//     localStorage.setItem("likes", "likes");
//   }
//   likeActive();
// }

// window.onload = function () {
//   if (localStorage.getItem("likes") === "likes") {
//     evt.target.classList.add("element__like_active");
//     console.log(evt.target);
//   }
// };

export { createCard, popupImage };

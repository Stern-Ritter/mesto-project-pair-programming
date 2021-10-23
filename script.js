const profile = document.querySelector(".profile");
const profileEditBbutton = profile.querySelector(".profile__edit-button");
const popupProfile = document.querySelector(".edit-profile");
const popupPlace = document.querySelector(".place");
const popupCloseButton = popupProfile.querySelector(".popup__close");
const profileAddBbutton = profile.querySelector(".profile__add-button");
const placeCloseButton = popupPlace.querySelector(".place__close");
const profileTitle = profile.querySelector(".profile__title");
const profileSubtitle = profile.querySelector(".profile__subtitle");
const formElem = document.querySelector(".edit-profile__container");
const nameInput = formElem.querySelector(".popup__item_type_name");
const jobInput = formElem.querySelector(".popup__item_type_job");
const elementContainer = document.querySelector(".elements");
const formPlaceElement = document.querySelector(".popup__container-place");
const addPlaceButton = document.querySelector(".place__button");
const placeFormElement = document.querySelector(".popup__container-place");
const linkInput = placeFormElement.querySelector(".popup__item_type_link");
const locationInput = placeFormElement.querySelector(
  ".popup__item_type_location"
);
const popupImage = document.querySelector(".image");

function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
}

function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
}

function submitFormProfile(evt) {
  evt.preventDefault();
  profileTitle.textContent = `${nameInput.value}`;
  profileSubtitle.textContent = `${jobInput.value}`;
  closePopup(popupProfile);
}

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

function submitFormPlace(evt) {
  evt.preventDefault();
  const card = createCard(linkInput.value, locationInput.value);
  elementContainer.prepend(card);
  closePopup(popupPlace);
}

profileEditBbutton.addEventListener("click", function () {
  openPopup(popupProfile);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  document
    .querySelector(".popup__button")
    .classList.remove("popup__button_inactive");
  document.querySelector(".popup__button").removeAttribute("disabled");
});

profileAddBbutton.addEventListener("click", function () {
  openPopup(popupPlace);
  formPlaceElement.reset();
  document
    .querySelector(".place__button")
    .classList.add("popup__button_inactive");
  document.querySelector(".place__button").setAttribute("disabled", true);
});

popupCloseButton.addEventListener("click", function () {
  closePopup(popupProfile);
});

popupProfile.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("edit-profile")) {
    closePopup(popupProfile);
  }
});

placeCloseButton.addEventListener("click", function () {
  closePopup(popupPlace);
});

popupPlace.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("place")) {
    closePopup(popupPlace);
  }
});

formElem.addEventListener("submit", submitFormProfile);

popupImage
  .querySelector(".image__close")
  .addEventListener("click", function () {
    closePopup(popupImage);
  });

popupImage.addEventListener("click", function (evt) {
  if (!evt.target.classList.contains("popup__image")) {
    closePopup(popupImage);
  }
});

document.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") {
    closePopup(popupProfile);
    closePopup(popupImage);
    closePopup(popupPlace);
  }
});

placeFormElement.addEventListener("submit", submitFormPlace);

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
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
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

initialCards.forEach(function (element) {
  const card = createCard(element.link, element.name);
  elementContainer.append(card);
});

function isValid(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__input-error_active");
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove("popup__input_type_error");
  errorElement.classList.remove("popup__input-error_active");
  errorElement.textContent = "";
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(".popup__item"));
  const buttonElement = formElement.querySelector(".popup__button");

  inputList.forEach(function (inputElement) {
    inputElement.addEventListener("input", function () {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
    toggleButtonState(inputList, buttonElement);
  });
}

function enableValidation() {
  const formList = Array.from(document.querySelectorAll(".popup__container"));

  formList.forEach(function (formElement) {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    setEventListeners(formElement);
  });
}

enableValidation();

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("popup__button_inactive");
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove("popup__button_inactive");
    buttonElement.removeAttribute("disabled");
  }
}

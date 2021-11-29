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

    deleteButton.addEventListener("click", () => this._handleDeleteBtnClick());
    likeButton.addEventListener("click", (evt) =>
      this._handleLikeBtnClick(evt)
    );
    elementImage.addEventListener("click", () => this._handleCardClick());
  }

  generate() {
    this._element = this._getElement();

    const elementImage = this._element.querySelector(".element__image");
    const elementText = this._element.querySelector(".element__text");
    const numberLike = this._element.querySelector(".element__number-like");
    const likeButton = this._element.querySelector(".element__like");
    const deleteButton = this._element.querySelector(".element__delete");
    const userId = localStorage.getItem("userId");

    elementText.textContent = this._name;
    elementImage.src = this._link;
    elementImage.alt = `Иллюстрация места ${this._name}`;
    numberLike.textContent = this._likes.length;

    if (userId === this._owner._id) {
      deleteButton.classList.add("element__delete_visible");
    } else {
      deleteButton.classList.remove("element__delete_visible");
    }

    if (this._likes.map((like) => like._id).includes(userId)) {
      likeButton.classList.add("element__like_active");
    }

    this._setEventListeners();
    return this._element;
  }
}

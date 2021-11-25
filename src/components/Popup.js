export default class Popup {
  constructor(selector) {
    this._selector = selector;
    this._element = document.querySelector(this._selector);
  }

  open() {
    document.addEventListener("keydown", _handleEscClose);
    this._element.classList.add("popup_opened");
  }

  close() {
    document.removeEventListener("keydown", _handleEscClose);
    this._element.classList.remove("popup_opened");
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._element.addEventListener("click", function (evt) {
      if (
        evt.target.classList.contains("popup_opened") ||
        evt.target.classList.contains("popup__close")
      ) {
        closePopup(this._element);
      }
    });
  }
}

import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(selector, formSubmitHandler) {
    super(selector);
    this._formSubmitHandler = formSubmitHandler;
  }

  _getInputValues() {
    this._inputList = this._element.querySelectorAll(".popup__item");
    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );
    return this._formValues;
  }

  _setInputValues(data) {
    Object.entries(data).forEach(([inputName, inputValue]) => {
      const input = this._element.querySelector(
        `.popup__item[name="${inputName}"]`
      );
      input.value = inputValue;
    });
  }

  switchSubmitButtonText(text) {
    const submitButton = this._element.querySelector('.popup__button');
    const oldText = submitButton.textContent;
    submitButton.textContent = text;
    return oldText;
  }

  close() {
    this._element.querySelector(".popup__container").reset();
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._element.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._formSubmitHandler();
    });
  }
}

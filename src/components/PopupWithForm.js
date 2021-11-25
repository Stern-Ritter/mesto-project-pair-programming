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

  close() {
    this._element.reset();
    super.close();
  }

  setEventListeners() {
    super._setEventListeners();
    this._element.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._formSubmitHandler();
    });
  }
}

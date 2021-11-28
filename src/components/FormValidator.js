export default class FormValidator {
  constructor(config, selector) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._element = document.querySelector(selector);
  }

  _showInputError(input, errorMessage) {
    const error = this._element.querySelector(`.${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    error.textContent = errorMessage;
    error.classList.add(this._errorClass);
  }

  _hideInputError(input) {
    const error = this._element.querySelector(`.${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    error.classList.remove(this._errorClass);
    error.textContent = "";
  }

  _isValid(input) {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  }

  _hasInvalidInput(inputs) {
    return inputs.some((input) => !input.validity.valid);
  }

  _toggleButtonState(inputs, button) {
    if (this._hasInvalidInput(inputs)) {
      button.classList.add(this._inactiveButtonClass);
      button.disabled = true;
    } else {
      button.classList.remove(this._inactiveButtonClass);
      button.disabled = false;
    }
  }

  _setEventListeners() {
    const inputs = Array.from(
      this._element.querySelectorAll(this._inputSelector)
    );
    const button = this._element.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputs, button);
    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._isValid(input);
        this._toggleButtonState(inputs, button);
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}

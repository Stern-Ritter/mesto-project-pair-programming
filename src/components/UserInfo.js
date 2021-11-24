export default class UseInfo {
  constructor(
    { nameSelector, aboutSelector },
    { getUserHandler, setUserHandler }
  ) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._getUserHandler = getUserHandler;
    this._setUserHandler = setUserHandler;
  }

  getUserInfo() {
    const user = this._getUserHandler();
    this._nameElement.textContent = user.name;
    this._aboutElement.textContent = user.about;

    return user;
  }

  setUserInfo() {
    const user = this._setUserHandler();
    this._nameElement.textContent = user.name;
    this._aboutElement.textContent = user.about;
  }
}

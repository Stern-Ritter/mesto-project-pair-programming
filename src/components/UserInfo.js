export default class UserInfo {
  constructor(
    { nameSelector, aboutSelector, avatarSelector },
    { getUserHandler, setUserHandler }
  ) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarElement = document.querySelector(avatarSelector);
    this._getUserHandler = getUserHandler;
    this._setUserHandler = setUserHandler;
  }

  _showUserInfo(user) {
    this._nameElement.textContent = user.name;
    this._aboutElement.textContent = user.about;
    this._avatarElement.src = user.avatar;
  }

  getUserInfo() {
    return this._getUserHandler();
  }

  setUserInfo() {
    this._setUserHandler();
  }
}

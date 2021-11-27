export default class UserInfo {
  constructor(
    { nameSelector, aboutSelector, avatarSelector },
    { setUserHandler }
  ) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarElement = document.querySelector(avatarSelector);
    this._setUserHandler = setUserHandler;
  }

  showUserInfo(user) {
    this._nameElement.textContent = user.name;
    this._aboutElement.textContent = user.about;
    this._avatarElement.src = user.avatar;
  }

  getUserInfo() {
    const name = this._nameElement.textContent;
    const about = this._aboutElement.textContent;
    return { name, about };
  }

  setUserInfo(name, about) {
    return this._setUserHandler(name, about);
  }
}

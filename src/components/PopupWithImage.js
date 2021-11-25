import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  open(item) {
    const imagePic = this._element.querySelector(".image__src");
    const imageText = this._element.querySelector(".image__place");
    imagePic.src = item.link;
    imagePic.alt = `Иллюстрация места ${item.name}`;
    imageText.textContent = item.name;
    super.open();
  }
}

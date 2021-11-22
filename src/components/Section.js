export default class Section {
  constructor( renderer, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  _clear() {
    this._container.innerHTML = '';
  }

  renderItems(items) {
    this._clear();

    items.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(item) {
    this._container.prepend(item);
  }
}

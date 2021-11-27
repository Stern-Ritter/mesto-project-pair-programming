export default class Section {
  constructor( renderer, selector) {
    this.renderer = renderer;
    this._container = document.querySelector(selector);
  }

  _clear() {
    this._container.innerHTML = '';
  }

  renderItems(items) {
    this._clear();

    items.reverse().forEach(item => {
      this.renderer(item);
    });
  }

  addItem(item) {
    this._container.prepend(item);
  }
}

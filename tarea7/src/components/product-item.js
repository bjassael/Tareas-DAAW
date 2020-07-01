const template = document.createElement('template');

template.innerHTML = `
  <style>
    h2 {
      background-color: blue;
    }
    div {
      padding: 16px;
      width: 256px;
      border-radius: 4px;
      // border: 1px solid #d2d2d2;
    }

    img {
      width: 100%;
    }

  </style>

  <div>
    <img id="img"/>
    <h3 id="title"> </h3>
    <p id="price"> </p>
    <p id="description"> </p>

  </div>
`;

class ProductItem extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$title = this._shadowRoot.getElementById('title');
    this.$price = this._shadowRoot.getElementById('price');
    this.$description = this._shadowRoot.getElementById('description');
    this.$img = this._shadowRoot.getElementById('img');

  }

  static get observedAttributes() {
    return ['data'];
  }

  get data() {
    return JSON.parse(this.getAttribute('data'));
  }
 
  set data(value) {
    this.setAttribute('data', JSON.stringify(value));
  }

  attributeChangedCallback(name, oldVal, newVal) {
    this.render();
  }

  render() {
    this.$title.innerHTML = this.data.title || '';
    this.$price.innerHTML = this.data.price || '';
    this.$description.innerHTML = this.data.description || '';
    this.$img.src = this.data.img || '';
  }

}

window.customElements.define('product-item', ProductItem);

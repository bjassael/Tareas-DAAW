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
      border: 1px solid #d2d2d2;
    }

    img {
      width: 100%;
    }

  </style>

  <div>
    <img src="//cdn.shopify.com/s/files/1/0012/1661/0359/products/38008_WSTO_grande_crop_center.jpg?v=1580996575"/>
    <h3> Jockey Fitz Roy Trout Trucker Hat </h3>
    <p> Price: 20.000 </p>
    <p>
       Nuestro clásico jockey de camionero con una corona de media altura, frente de algodón orgánico, malla trasera de poliéster, cierre de broche ajustable y logo de trucha bordado.
    </p>

  </div>
`;

class ProductItem extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$headline = this._shadowRoot.querySelector('h2');
    this.$span = this._shadowRoot.querySelector('span');
  }

  connectedCallback() {
    if(!this.hasAttribute('color')) {
      this.setAttribute('color', 'orange');
    }

    if(!this.hasAttribute('text')) {
      this.setAttribute('text', '');
    }

    this._render();
  }

  static get observedAttributes() {
    return ['color', 'text'];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    switch(name) {
      case 'color':
        this._color = newVal;
        break;
      case 'text':
        this._text = newVal;
        break;
    };

    this._render();
  }

  _render() {
    this.$headline.style.color = this._color;
    this.$span.innerHTML = this._text;
  }
}

window.customElements.define('product-item', ProductItem);

import "./components/say-something.js";
import "./components/products-wrapper.js";

const itemsData = [
  {
    title: "Jockey Fitz Roy Trout Trucker Hat 1",
    price: 20000,
    stock: 1,
    offer: 60,
    img:
      "//cdn.shopify.com/s/files/1/0012/1661/0359/products/38008_WSTO_grande_crop_center.jpg?v=1580996575",
    description:
      "Nuestro clásico jockey de camionero con una corona de media altura, frente de algodón orgánico, malla trasera de poliéster, cierre de broche ajustable y logo de trucha bordado para otoño.",
    rating: 1.3,
    numVotes: 1,
  },
  {
    title: "Jockey Fitz Roy Trout Trucker Hat 2",
    price: 40000,
    stock: undefined,
    img:
      "//cdn.shopify.com/s/files/1/0012/1661/0359/products/38008_MACH_grande_crop_center.jpg?v=1580996575",
    description:
      "Nuestro clásico jockey de camionero con una corona de media altura, frente de algodón orgánico, malla trasera de poliéster, cierre de broche ajustable y logo de trucha bordado para primavera.",
    rating: 2.5,
    numVotes: 10,
  },
  {
    title: "Jockey Fitz Roy Trout Trucker Hat 3",
    price: 60000,
    stock: 1,
    img:
      "//cdn.shopify.com/s/files/1/0012/1661/0359/products/38008_WHFG_grande_crop_center.jpg?v=1580996575",
    description:
      "Nuestro clásico jockey de camionero con una corona de media altura, frente de algodón orgánico, malla trasera de poliéster, cierre de broche ajustable y logo de trucha bordado para invierno.",
    rating: 4,
    numVotes: 10,
  },
  {
    title: "Jockey Fitz Roy Trout Trucker Hat 2",
    price: 40000,
    stock: undefined,
    img:
      "//cdn.shopify.com/s/files/1/0012/1661/0359/products/38008_MACH_grande_crop_center.jpg?v=1580996575",
    description:
      "Nuestro clásico jockey de camionero con una corona de media altura, frente de algodón orgánico, malla trasera de poliéster, cierre de broche ajustable y logo de trucha bordado para primavera.",
    rating: 5,
    numVotes: 10,
  },
  {
    title: "Jockey Fitz Roy Trout Trucker Hat 3",
    price: 60000,
    stock: 1,
    img:
      "//cdn.shopify.com/s/files/1/0012/1661/0359/products/38008_WHFG_grande_crop_center.jpg?v=1580996575",
    description:
      "Nuestro clásico jockey de camionero con una corona de media altura, frente de algodón orgánico, malla trasera de poliéster, cierre de broche ajustable y logo de trucha bordado para invierno.",
    rating: 3.6,
    numVotes: 10,
  },
];

const template = document.createElement("template");

template.innerHTML = `
  <style>
    :host {
      font-family: sans-serif;
    }

    input {
      border: 1px solid #a8a8a8;
      border-radius: 4px;
      padding: 4px;
      font-size: 16px;
    }

    select {
      border: 1px solid #a8a8a8;
      border-radius: 4px;
      padding: 4px;
      background-color: #fff;
      font-size: 16px;
    }

    #filterInputs {
      margin: 16px 0px;
    }

    h4 {
      margin: 0px;
      margin-bottom: 4px;
    }

  </style>

  <div>
    <h1>Shopping Components</h1>

      <div id="filterInputs">
        <h4> Filter by: </h4>
        Name: <input id="name-input" type="text" />
        Price: <select id="price-input">
          <option value="">All</option>
          <option>20000</option>
          <option>40000</option>
          <option>60000</option>
          <option>80000</option>
        </select>
      </div>

    <products-wrapper></products-wrapper>
  </div>
`;

class App extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$nameInput = this._shadowRoot.getElementById("name-input");
    this.$nameInput.addEventListener(
      "input",
      this._handleNameChange.bind(this)
    );

    this.$priceInput = this._shadowRoot.getElementById("price-input");
    this.$priceInput.addEventListener(
      "input",
      this._handlePriceChange.bind(this)
    );

    this.$productsWrapper = this._shadowRoot.querySelector("products-wrapper");
    this.$productsWrapper.data = itemsData;
  }

  _handleNameChange() {
    this.$productsWrapper.setAttribute("filter", this.$nameInput.value);
  }

  _handlePriceChange() {
    this.$productsWrapper.setAttribute("pricefilter", this.$priceInput.value);
  }
}

window.customElements.define("my-app", App);

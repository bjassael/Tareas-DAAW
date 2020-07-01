import "./product-item.js";

const template = document.createElement("template");

template.innerHTML = `
  <style>
    h2 {
      background-color: blue;
    }

  .grid-wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px , 1fr));
    grid-column-gap:3em;
    grid-row-gap: 3em;
    margin: 3em;
    justify-items: center;
  }

  .grid-number {
    display: grid;
    max-width: 350px;
  }
  img {
    width: 100%;
  }

  </style>
    <div id="wrapper" class="grid-wrapper"></div>
`;

class ProductsWrapper extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$headline = this._shadowRoot.querySelector("h2");
    this.$span = this._shadowRoot.querySelector("span");
    this.$wrapper = this._shadowRoot.getElementById("wrapper");
  }

  static get observedAttributes() {
    return ["data", "filter", "pricefilter", "orderfilter"];
  }

  get filter() {
    return this.getAttribute("filter");
  }

  set filter(value) {
    this.setAttribute("filter", value);
  }

  get pricefilter() {
    return this.getAttribute("pricefilter");
  }

  set pricefilter(value) {
    this.setAttribute("pricefilter", value);
  }

  get orderfilter() {
    return this.getAttribute("orderfilter");
  }

  set orderfilter(value) {
    this.setAttribute("orderfilter", value);
  }

  get data() {
    return JSON.parse(this.getAttribute("data"));
  }

  set data(value) {
    this.setAttribute("data", JSON.stringify(value));
  }

  attributeChangedCallback(name, oldVal, newVal) {
    this.render();
  }

  render() {
    this.$wrapper.innerHTML = "";
    this.data
      .sort((a, b) => {
        return sortProductsBy(a, b, this.orderfilter);
      })
      .forEach((product) => {
        let $product = document.createElement("product-item");
        $product.data = product;
        if (
          (!this.filter || product.title.includes(this.filter)) &&
          (!this.pricefilter ||
            product.price * (product.offer || 1) === +this.pricefilter)
        ) {
          $product.classList.add("grid-number");
          this.$wrapper.appendChild($product);
        }
      });
  }
}

window.customElements.define("products-wrapper", ProductsWrapper);

function sortProductsBy(a, b, order) {
  switch (order) {
    case "price-lth":
      return (
        (a.price * (a.offer || 100)) / 100 - (b.price * (b.offer || 100)) / 100
      );
    case "price-htl":
      return (
        (b.price * (b.offer || 100)) / 100 - (a.price * (a.offer || 100)) / 100
      );
    case "c-review":
      return b.rating - a.rating;
    default:
      return;
  }
}

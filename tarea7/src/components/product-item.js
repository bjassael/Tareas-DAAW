import "./rating.js";

const template = document.createElement("template");

template.innerHTML = `
  <style>
    h2 {
      background-color: blue;
    }
    #card {
      padding: 16px;
      width: auto;
      border-radius: 10px;
      box-shadow:0 10px 16px 0 rgba(0,0,0,0.05),0 6px 20px 0 rgba(0,0,0,0.059);
      // overflow: hidden;
    }
    #card:hover {
      box-shadow:0 10px 16px 0 rgba(0,0,0,0.15),0 6px 20px 0 rgba(0,0,0,0.159);
    }

    img {
      width: 100%;
    }

    .sold-out{
      position: relative;
    }
    .sold-out::before {
      content: "Sold out!";
      background-color:  rgba(255,0,0,0.5);
      width: 100%;
      text-align: center;
      padding: 10px 0;
      font-weight: bold;
      color:white;
      border-radius: 10px 10px 0 0;
      left: 0;
      top:0;
      position: absolute;

    }
    .offer{
      position: relative;
    }
    .offer::before{
      content: attr(data-before);;
      background-color: rgba(100,100,255,1);
      box-shadow:0 5px 8px 0 rgba(100,100,255,0.3),0 3px 10px 0 rgba(100,100,255,0.39);
      width: 60px;
      height: 60px;
      color: white;
      font-weight: bold;
      line-height: 60px;
      z-index:920;
      text-align: center;
      border-radius:  50%;
      right: -10px;
      top: -10px;
      position: absolute;
    }
    .offer-price{
      background-color: rgba(100,100,255,1);
      padding: 10px;
      font-weight: bold;
      font-size: 17px;
      color: white;
      border-radius:  4px;
      

    }
    .old-price{
      margin: 0 10px;
      position: relative;
      font-size: 15px;
    }
    .old-price::after{
      text-decoration:line-through;
      margin:0 10px;
      font-size: 15px;
      background: white;
      content: "";
      height: 0.2em;
      left: 0;
      margin: calc(0.2em / 2 * -1);
      position: absolute;
      right: 0;
      top: 50%;
    }

    .rating-container {
      width: 100%;
    }

    .num-votes {
      color: grey;
      font-style: italic;
      font-size: 12px;
    }
  </style>

  <div id="card">
    <div id="offer"></div>
    <img id="img"/>
    <h3 id="title"></h3>
    <p id="price"></p>
    <p id="stock"></p>
    <p id="description"></p>
    <p id="rating"></p>
    <div class="rating-container">
      <custom-rating id="rating-stars" src="/assets/star1.png"></custom-rating>
    </div>
  </div>
`;

class ProductItem extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.$offer = this._shadowRoot.getElementById("offer");
    this.$title = this._shadowRoot.getElementById("title");
    this.$price = this._shadowRoot.getElementById("price");
    this.$description = this._shadowRoot.getElementById("description");
    this.$img = this._shadowRoot.getElementById("img");
    this.$stock = this._shadowRoot.getElementById("stock");
    this.$rating = this._shadowRoot.getElementById("rating");
    this.$ratingStars = this._shadowRoot.getElementById("rating-stars");
    this.self = this._shadowRoot.getElementById("card");
  }

  static get observedAttributes() {
    return ["data"];
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
    this.$title.innerHTML = this.data.title || "";
    this.$price.innerHTML = "Price: " + formatMoney(this.data.price || "-");
    this.$description.innerHTML = this.data.description || "";
    this.$img.src = this.data.img || "";
    if (this.data.stock) {
      this.$stock.innerHTML = "Stock: " + this.data.stock;
      if (this.data.offer) {
        this.self.classList.add("offer");
        this.self.setAttribute("data-before", this.data.offer + "%");
        this.$price.innerHTML =
          "Price: " +
          `<span class="old-price">${formatMoney(this.data.price)}</span>` +
          formatMoney((this.data.price * this.data.offer) / 100 || "-");
        this.$price.classList.add("offer-price");
      }
    } else {
      this.self.classList.add("sold-out");
    }
    this.$rating.innerHTML = `${this.data.rating.toFixed(
      1
    )}/5.0 <span class="num-votes">${this.data.numVotes} votes</span>`;
    this.$ratingStars.setAttribute(
      "currentRating",
      this.data.rating.toFixed(1)
    );

    this.$ratingStars.addEventListener("onClick", (value) => {
      const newRating = (
        (this.data.rating * this.data.numVotes + value.detail) /
        (this.data.numVotes + 1)
      ).toFixed(1);
      this.$ratingStars.setAttribute("currentRating", newRating);
      this.$rating.innerHTML = `${newRating}/5.0 <span class="num-votes">${
        this.data.numVotes + 1
      } votes</span>`;
    });
  }
}

window.customElements.define("product-item", ProductItem);

function formatMoney(amount, decimalCount = 0, decimal = ",", thousands = ".") {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(
      (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
    ).toString();
    let j = i.length > 3 ? i.length % 3 : 0;

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : "")
    );
  } catch (e) {
    return amount;
  }
}

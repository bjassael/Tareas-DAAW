const template = document.createElement("template");

template.innerHTML = `
  <style>
    .container {
      width: 100%;
    }
    .container:hover{
      cursor:pointer;
    }
    .icon {
      width: 18%;
    }

    .unselected {
      opacity: 0.2;
    }

    .selected {
      opacity: 1;
    }

    .half {
      -webkit-mask-image: linear-gradient(90deg, rgba(0,0,0,1) 50%, rgba(0,0,0,0.2) 50%);
    }

    .unselected:hover {
      opacity: 0.5;
    }

  </style>

  <div class="container">
    <img class="icon"></img>
    <img class="icon"></img>
    <img class="icon"></img>
    <img class="icon"></img>
    <img class="icon"></img>
  </div>
`;

class Rating extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$currentRating = this.getAttribute("currentrating");

    this.$container = this._shadowRoot.querySelector("div");
    this.$imgs = Array.from(this.$container.childNodes);
    this.$imgs = this.$imgs.filter((img) => img.tagName === "IMG");

    this.$imgs.forEach((img, i) => {
      img.addEventListener("click", () => {
        this.dispatchEvent(
          new CustomEvent("onClick", {
            detail: i + 1
          })
        );
      });
    });

    this.handleChangeRating(this.$currentRating);
  }

  handleChangeRating() {
    console.log("hola", this.$imgs);
    this.$imgs.forEach((img) => {
      img.setAttribute(
        "style",
        `-webkit-mask-image: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.2) 0%);`
      );
    });
    let j = 0;
    console.log("print", `${Math.floor(+this.$currentRating)}`);
    while (j < Math.floor(+this.$currentRating)) {
      this.$imgs[j].setAttribute(
        "style",
        `-webkit-mask-image: linear-gradient(90deg, rgba(0,0,0,1) 100%, rgba(0,0,0,0.2) 100%);`
      );
      j++;
    }
    const remainder = this.$currentRating - Math.floor(this.$currentRating);

    if (remainder > 0) {
      this.$imgs[j].setAttribute(
        "style",
        `-webkit-mask-image: linear-gradient(90deg, rgba(0,0,0,1) ${(
          remainder * 100
        ).toFixed(0)}%, rgba(0,0,0,0.2) ${(remainder * 100).toFixed(0)}%);`
      );
    }
  }

  connectedCallback() {
    if (!this.hasAttribute("src")) {
      this.setAttribute("src", "/assets/star.png");
    }

    if (!this.hasAttribute("currentrating")) {
      this.setAttribute("currentrating", 0);
    }

    this._render();
  }

  static get observedAttributes() {
    return ["src", "currentrating"];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    switch (name) {
      case "src":
        this._src = newVal;
        break;
      case "currentrating":
        console.log("changed val", newVal);
        this.$currentRating = newVal;
        this.handleChangeRating();
        break;
    }

    this._render();
  }

  _render() {
    this.$imgs.forEach((img) => {
      img.src = this._src;
    });
  }
}

window.customElements.define("custom-rating", Rating);

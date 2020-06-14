<script>
  import { books } from "../store.js";

  function fetchBooksStore(searchString) {
    console.log(searchString);
    const searchParams = { name: searchString };
    $books = [
      { name: "A", authors: "B", genres: "C" },
      { name: "A", authors: "B", genres: "C" }
    ];
  }

  const initialSearch = fetchBooksStore("");

  export let searchString = "";

  function handleSearch() {
    fetchBooksStore(searchString);
  }
</script>

<style>
  .form {
    text-align: start;
  }
  .form-field {
    width: 80%;
    margin-left: 10%;
  }
  .form-label {
    font-size: 2vh;
    top: 20%;
  }
  .submit {
    margin-left: 10%;
    background-color: #d22c21;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
      0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    border-radius: 2px;
  }
</style>

<div class="form">
  <label class="mdc-text-field mdc-text-field--filled form-field">
    <span class="mdc-text-field__ripple" />
    <input
      class="mdc-text-field__input"
      type="text"
      aria-labelledby="my-label-id"
      bind:value={searchString}
      placeholder="Search.."
      style="caret-color: grey;" />
    <span class="mdc-floating-label form-label" id="my-label-id">
      Book Name
    </span>
    <span class="mdc-line-ripple" />
  </label>
  <br />
  <div class="mdc-touch-target-wrapper">
    <button
      class="mdc-button mdc-button--raised mdc-button--touch submit"
      on:click={handleSearch}
      style="margin-left: 10%">
      <div class="mdc-button__ripple" />
      <span class="mdc-button__label">Search</span>
      <div class="mdc-button__touch" />
    </button>
  </div>
</div>

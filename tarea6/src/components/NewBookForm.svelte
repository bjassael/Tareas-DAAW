<script>
  import page from "page.js";
  import { token } from "../store.js";
  import { setContext } from "svelte";

  function postBook() {
    console.log($token);
    console.log(name, authorFirstName, authorLastName, genre);

    const nextPath = "/books";
    page.redirect(nextPath);
    setContext("current_path", nextPath);
  }

  export let name = "";
  export let authorFirstName = "";
  export let authorLastName = "";
  export let genre = "";
</script>

<style>
  .form {
    text-align: start;
  }
  .form-field {
    width: 60%;
    margin-left: 20%;
    margin-bottom: 30px;
  }
  .form-label {
    font-size: 2vh;
    top: 20%;
  }
  .submit {
    margin-left: 20%;
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
      bind:value={name}
      style="caret-color: grey;" />
    <span class="mdc-floating-label form-label" id="my-label-id">
      Book Name
    </span>
    <span class="mdc-line-ripple" />
  </label>
  <label class="mdc-text-field mdc-text-field--filled form-field">
    <span class="mdc-text-field__ripple" />
    <input
      class="mdc-text-field__input"
      type="text"
      aria-labelledby="my-label-id"
      bind:value={authorFirstName}
      style="caret-color: grey;" />
    <span class="mdc-floating-label form-label" id="my-label-id">
      Author's First Name
    </span>
    <span class="mdc-line-ripple" />
  </label>
  <label class="mdc-text-field mdc-text-field--filled form-field">
    <span class="mdc-text-field__ripple" />
    <input
      class="mdc-text-field__input"
      type="text"
      aria-labelledby="my-label-id"
      bind:value={authorLastName}
      style="caret-color: grey;" />
    <span class="mdc-floating-label form-label" id="my-label-id">
      Author's Last Name
    </span>
    <span class="mdc-line-ripple" />
  </label>
  <label class="mdc-text-field mdc-text-field--filled form-field">
    <span class="mdc-text-field__ripple" />
    <input
      class="mdc-text-field__input"
      type="text"
      aria-labelledby="my-label-id"
      bind:value={genre}
      style="caret-color: grey;" />
    <span class="mdc-floating-label form-label" id="my-label-id">Genre</span>
    <span class="mdc-line-ripple" />
  </label>
  <br />
  <div class="mdc-touch-target-wrapper">
    <button
      class="mdc-button mdc-button--raised mdc-button--touch submit"
      on:click={postBook}>
      <div class="mdc-button__ripple" />
      <span class="mdc-button__label">Add Book</span>
      <div class="mdc-button__touch" />
    </button>
  </div>
</div>

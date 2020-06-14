<script>
  import page from "page.js";
  import { token } from "../store.js";
  import { setContext } from "svelte";
  import { getOrCreateUserToken } from "../api";

  function login() {
    console.log(username, password);
    const newToken = "asdfg";
    localStorage.setItem("token", newToken);
    token.update(() => newToken);
    const nextPath = "/books";
    page.redirect(nextPath);
    setContext("current_path", nextPath);
    window.setTimeout(() => {
      const links = document.getElementsByClassName("linkNav");
      Array.from(links).forEach(link => {
        const linkPath = "/" + link.href.split("/")[3];
        if (linkPath === nextPath) {
          if (!link.className.includes("active")) {
            link.className += " active";
          }
        } else {
          if (link.className.includes("active")) {
            link.className = link.className.replace(" active", "");
          }
        }
      });
    }, 10);
  }

  export let username = "";
  export let password = "";

  async function handleLogin() {
    console.log("token", $token);
    console.log("username", username);
    console.log("password", password);
    try {
      const response = await getOrCreateUserToken({ username, password });
      const { newToken } = response.data;
      localStorage.setItem("token", newToken);
      token.update(token => newToken);
      console.log("response", response);
    } catch (e) {
      console.log("Login Error:", e);
    }
  }
</script>

<style>
  .form {
    text-align: start;
  }
  .form-field {
    width: 80%;
    margin-left: 10%;
    margin-bottom: 5%;
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
      bind:value={username}
      placeholder="Search.."
      style="caret-color: grey;" />
    <span class="mdc-floating-label form-label" id="my-label-id">Username</span>
    <span class="mdc-line-ripple" />
  </label>
  <label class="mdc-text-field mdc-text-field--filled form-field">
    <span class="mdc-text-field__ripple" />
    <input
      class="mdc-text-field__input"
      type="text"
      aria-labelledby="my-label-id"
      bind:value={password}
      placeholder="Search.."
      style="caret-color: grey;" />
    <span class="mdc-floating-label form-label" id="my-label-id">Password</span>
    <span class="mdc-line-ripple" />
  </label>
  <br />
  <div class="mdc-touch-target-wrapper">
    <button
      class="mdc-button mdc-button--raised mdc-button--touch submit"
      on:click={handleLogin}
      style="margin-left: 10%">
      <div class="mdc-button__ripple" />
      <span class="mdc-button__label">Sign In</span>
      <div class="mdc-button__touch" />
    </button>
  </div>
</div>

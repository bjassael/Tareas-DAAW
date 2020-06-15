<script>
  import page from "page.js";
  import { token, bookTitle, results } from "../store.js";
  import { setContext } from "svelte";
  import Book from "./Book.svelte";
  import { newBook } from "../api";
  import AbortController from "abort-controller";

  let controller = new AbortController();
  let showingInfo = false;
  let focus = false;
  let signal;

  $: {
    signal = controller.signal;
  }

  async function postBook() {
    const bookData = {
      name: $bookTitle,
      authorsFirstname: authorFirstName,
      authorsLastname: authorLastName,
      genres: genre
    };
    const response = await newBook(bookData);

    const nextPath = "/books";
    page.redirect(nextPath);
    setContext("current_path", nextPath);
  }

  export let authorFirstName = "";
  export let authorLastName = "";
  export let genre = "";

  let countTime = 0;
  let timer;
  bookTitle.subscribe(value => {
    clearTimerAndResetCount();
    if (value.length > 0 && focus) {
      if (signal.aborted) {
        signal.aborted = false;
      }
      timer = setInterval(() => {
        countTime++;
        if (countTime >= 1) {
          console.log("Now fetching");
          clearTimerAndResetCount();

          var urlToFetch = `http://openlibrary.org/search.json?title=${$bookTitle}`;
          console.log("urlToFetch", urlToFetch);
          fetch(urlToFetch, {
            method: "get",
            signal: signal
          })
            .then(async function(response) {
              const responseJSON = await response.json();
              results.update(results => responseJSON.docs);
              showingInfo = true;
              clearTimerAndResetCount();
              console.log("fetch received");
              console.log(responseJSON);
            })
            .catch(function(err) {
              console.log("abort fetching", err);
              clearTimerAndResetCount();
            });
        }
      }, 100);
    }
  });

  function clearTimerAndResetCount() {
    clearInterval(timer);
    countTime = 0;
  }

  function clearTimerAndAbortFetch() {
    setTimeout(() => {
      console.log("select out stop fetching");
      controller.abort();
      controller = new AbortController();
      clearTimerAndResetCount();
      focus = false;
      showingInfo = false;
    }, 200);
  }
  function selectBook(e) {
    console.log("select book!!");

    let splitAuthor = e.detail.author.split(" ");
    authorFirstName = splitAuthor.slice(0, -1).join(" ");
    console.log("select book!!", splitAuthor);
    authorLastName = splitAuthor[splitAuthor.length - 1];
    genre = e.detail.genre;
    bookTitle.update(title => e.detail.title);
    console.log("e.detail.title", e.detail.title);
    showingInfo = false;
  }
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

  .infoBooks {
    position: absolute;
    width: calc(100% - 400px);
    margin-left: 200px;
    background-color: rgb(233, 233, 233);
    padding: 20px;
    border-radius: 10px;
    z-index: 1000;
    max-height: calc(100% - 400px);
    overflow: auto;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
      0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    border-radius: 2px;
  }
  .infoBooks::-webkit-scrollbar {
    display: none;
  }
</style>

<div class="form">
  <label class="mdc-text-field mdc-text-field--filled form-field">
    <span class="mdc-text-field__ripple" />
    <input
      class="mdc-text-field__input"
      type="text"
      aria-labelledby="my-label-id"
      bind:value={$bookTitle}
      on:focusout={clearTimerAndAbortFetch}
      on:focusin={() => {
        focus = true;
      }}
      style="caret-color: grey;" />
    <span class="mdc-floating-label form-label" id="my-label-id">
      Book Name
    </span>
    <span class="mdc-line-ripple" />
  </label>
  {#if showingInfo && $results.length > 0}
    <div class="infoBooks">
      {#each $results as book}
        <Book on:selectbook={selectBook} bookinfo={book} />
      {/each}
    </div>
  {/if}
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

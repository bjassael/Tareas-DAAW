<script>
  import { booksFiltered, books } from "../store.js";
  import { onMount } from "svelte";
  import { getAllBooksByUser } from "../api";

  async function fetchBooksStore() {

    try {
      const response = await getAllBooksByUser('');
      $books = response.data.map(book => {
            return {
              name: book.name,
              authors: book.authors
                .map(author => `${author.firstName} ${author.lastName}`)
                .join(),
              genres: book.genres.map(genre => `${genre.genre}`).join()
            }
          })

      $booksFiltered = [...$books];
    } catch(error) {
      console.log(error)
    }
  }

  $: {
    if (searchString) {
      handleSearch();
    } else {
      handleSearch();
    }
  }

  export let searchString = "";

  function handleSearch() {
    $booksFiltered = $books.filter(
      book =>
        book.name.toLocaleLowerCase().includes(searchString) ||
        book.authors.toLocaleLowerCase().includes(searchString) ||
        book.genres.toLocaleLowerCase().includes(searchString)
    );
  }

  onMount(() => {
    fetchBooksStore();
  });
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
      Book name
    </span>
    <span class="mdc-line-ripple" />
  </label>
  <br />
</div>

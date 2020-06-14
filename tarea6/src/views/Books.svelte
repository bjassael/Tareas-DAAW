<script>
  import SearchForm from "../components/SearchForm.svelte";
  import { books } from "../store.js";
</script>

<style>
  .table-container {
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.05),
      0 1px 1px 0 rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    width: 80%;
    margin-left: 10%;
    margin-top: 5%;
    text-align: center;
  }
  .table {
    width: 100%;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    text-align: left;
    table-layout: fixed;
    display: table;
    border-collapse: collapse;
    border-spacing: 2px;
    border-color: rgba(0, 0, 0, 0.12);
  }
  tr {
    width: 100%;
    height: 48px;
    color: rgba(0, 0, 0, 0.87);
    vertical-align: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    border-color: inherit;
    text-align: left;
  }
  th {
    font-weight: 400;
    font-size: 12px;
    padding-left: 24px;
    padding-right: 24px;
    height: 56px;
    color: rgba(0, 0, 0, 0.54);
    white-space: nowrap;
    border-color: inherit;
  }
  td {
    border-color: inherit;
    margin-left: 10%;
    padding-left: 24px;
    padding-right: 24px;
    font-size: 14px;
  }
  tbody tr:hover {
    background-color: #eee;
  }
</style>

<div class="home">
  <h1>Books!</h1>
  <SearchForm />
  <div class="table-container">
    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Author</th>
          <th>Genre</th>
        </tr>
      </thead>
      <tbody>
        {#each $books as { name, authors, genres }, i}
          <tr>
            <td>{name}</td>
            <td>{authors}</td>
            <td>{genres}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

</div>

<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let bookinfo;
</script>

<style>
  .book {
    padding: 10px;
    background-color: rgba(62, 120, 153, 0.5);
    color: white;
    margin: 20px 0;
    border-radius: 10px;
    font-size: 20px;
  }
  .book:hover {
    cursor: pointer;
    background-color: rgba(62, 120, 153, 1);
  }
</style>

<div
  class="book"
  on:click={() => dispatch('selectbook', {
      title: bookinfo.title_suggest,
      author: bookinfo.author_name ? bookinfo.author_name[0] : 'no-author'
    })}>
  {bookinfo.title_suggest} - {bookinfo.author_name ? bookinfo.author_name[0] : 'no-author'}
</div>

<script>
  import { onMount } from "svelte";
  import NavBar from "./components/NavBar.svelte";
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    width: 100%;
    padding: 0;
  }
</style>

<div id="app">
  <NavBar />
</div>

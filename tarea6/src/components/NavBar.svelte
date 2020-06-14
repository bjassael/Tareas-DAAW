<script>
  import Router from "./Router.svelte";
  import Route from "./Route.svelte";
  import Home from "../views/Home.svelte";
  import Books from "../views/Books.svelte";
  import NotFound from "../views/NotFound.svelte";
  import { getContext, onMount } from "svelte";

  onMount(() => {
    const currentPath = getContext("current_path");
    const links = document.getElementsByClassName("linkNav");
    Array.from(links).forEach(link => {
      const linkPath = "/" + link.href.split("/")[3];
      if (linkPath === currentPath) {
        if (!link.className.includes("active")) {
          link.className += " active";
        }
      } else {
        if (link.className.includes("active")) {
          link.className = link.className.replace(" active", "");
        }
      }
    });
  });

  let current = Home;

  function handleClick(e) {
    const current = document.getElementsByClassName("active")[0];
    current.className = current.className.replace(" active", "");
    e.target.className += " active";
  }
</script>

<style>
  #nav {
    padding: 0;
    width: 100%;
  }

  .linkNav {
    font-weight: bold;
    color: white;
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: rgb(9, 94, 122);
    width: 100%;
  }

  li {
    float: left;
  }

  li .linkNav {
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }

  li .linkNavRight {
    float: right !important;
  }

  li .linkNav:hover:not(.active) {
    background-color: rgb(5, 65, 88);
  }

  .active {
    background-color: #d22c21;
  }
</style>

<div id="nav" class="nav">
  <ul>
    <li>
      <a on:click={handleClick} class="linkNav active" href="/">Bookies!</a>
    </li>
    <li>
      <a on:click={handleClick} class="linkNav linkNavRight" href="/books">
        Books
      </a>
    </li>
  </ul>
  <Router>
    <Route path="/" component={Home} />
    <Route path="/books" component={Books} />
    <Route path="*" component={NotFound} />
  </Router>
</div>

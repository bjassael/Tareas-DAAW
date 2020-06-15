<script>
  import page from "page.js";
  import Router from "./Router.svelte";
  import Route from "./Route.svelte";
  import AuthorizedRoute from "./AuthorizedRoute.svelte";
  import Home from "../views/Home.svelte";
  import Books from "../views/Books.svelte";
  import Login from "../views/Login.svelte";
  import NotFound from "../views/NotFound.svelte";
  import Unauthorized from "../views/Unauthorized.svelte";
  import { setContext, getContext, onMount } from "svelte";
  import { token } from "../store.js";

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
    const targetPath = "/" + e.target.href.split("/")[3];
    const links = document.getElementsByClassName("linkNav");
    Array.from(links).forEach(link => {
      const linkPath = "/" + link.href.split("/")[3];
      if (linkPath === targetPath) {
        if (!link.className.includes("active")) {
          link.className += " active";
        }
      } else {
        if (link.className.includes("active")) {
          link.className = link.className.replace(" active", "");
        }
      }
    });
  }

  function handleLogout() {
    const newToken = "";
    localStorage.removeItem("token");
    token.update(() => "");
    const nextPath = "/";
    page.redirect(nextPath);
    setContext("current_path", nextPath);
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

  li .linkNav {
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }

  li .linkNavLeft {
    float: left;
  }

  li .linkNavRight {
    float: right;
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
      <a on:click={handleClick} class="linkNav linkNavLeft active" href="/">
        Bookies!
      </a>
    </li>
    {#if !$token}
      <li>
        <a on:click={handleClick} class="linkNav linkNavRight" href="/login">
          Sign In
        </a>
      </li>
    {:else}
      <li>
        <a on:click={handleLogout} class="linkNav linkNavRight" href="/logout">
          Logout
        </a>
      </li>
      <li>
        <a on:click={handleClick} class="linkNav linkNavRight" href="/books">
          Books
        </a>
      </li>
    {/if}
  </ul>
  <Router>
    <Route path="/" component={Home} />
    <Route path="/login" component={Login} />
    <AuthorizedRoute path="/books" component={Books} />
    <Route path="*" component={NotFound} />
  </Router>
</div>

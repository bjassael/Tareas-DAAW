<script>
  import page from "page.js";
  import { getContext } from "svelte";
  import Unauthorized from "../views/Unauthorized.svelte";
  import { token } from "../store.js";

  export let path = "/";
  export let component = null;

  const currentPath = getContext("current_path");
  page(path, () => ($currentPath = path));
</script>

<div id="component">
  {#if path === $currentPath}
    {#if $token}
      <slot />
      <svelte:component this={component} />
    {:else}
      <Unauthorized />
    {/if}
  {/if}
</div>

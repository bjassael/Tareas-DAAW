<script>
  import page from "page.js";
  import { getContext } from "svelte";

  export let path = "/";
  export let component = null;

  const currentPath = getContext("current_path");
  page(path, () => ($currentPath = path));
</script>

<div id="component">
  {#if path === $currentPath}
    <slot />
    <svelte:component this={component} />
  {/if}
</div>

<script>
  import page from "page.js";
  import { setContext, afterUpdate, onMount, onDestroy } from "svelte";
  import { writable } from "svelte/store";

  const currentPath = writable("/");
  setContext("current_path", currentPath);

  let started = false;
  afterUpdate(() => {
    if (!started) {
      started = true;
      page.start({ hashbang: false });
    }
  });

  onMount(() => {
    const startingPath = "/" + window.location.href.split("/")[3];
    setContext("current_path", startingPath);
  });

  onDestroy(page.stop());
</script>

<slot />

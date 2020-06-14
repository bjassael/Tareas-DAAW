<script>
  import page from "page.js";
  import {
    getContext,
    setContext,
    afterUpdate,
    onMount,
    onDestroy
  } from "svelte";
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
    let startingPath = "/";
    const neestedPathList = window.location.href.split("/");
    for (let i = 3; i < neestedPathList.length; i++) {
      startingPath += neestedPathList[i];
      startingPath += "/";
    }
    startingPath = startingPath.slice(0, startingPath.length - 1);
    setContext("current_path", startingPath);

    const links = document.getElementsByClassName("linkNav");
    Array.from(links).forEach(link => {
      const linkPath = "/" + link.href.split("/")[3];
      if (linkPath === startingPath) {
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

  onDestroy(page.stop());
</script>

<slot />

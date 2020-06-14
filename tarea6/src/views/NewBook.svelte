<script>
  import NewBookForm from "../components/NewBookForm.svelte";
  import { onMount, setContext } from "svelte";

  onMount(() => {
    let startingPath = "/";
    const neestedPathList = window.location.href.split("/");
    for (let i = 3; i < neestedPathList.length; i++) {
      startingPath += neestedPathList[i];
      startingPath += "/";
    }
    startingPath = startingPath.slice(0, startingPath.length - 1);
    setContext("current_path", startingPath);
  });
</script>

<div class="new-book">
  <h1>New Book!</h1>
  <NewBookForm />
</div>

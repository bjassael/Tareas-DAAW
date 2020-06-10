<script>
  import { onMount } from "svelte";
  import Palette from "./Palette.svelte";
  import Canvas from "./Canvas.svelte";

  let currentColor = "#000000";
  let ctx;
  function onPickColor(color) {
    currentColor = color;
  }
</script>

<style>
  .gameContainer {
    margin-top: 100px;
    width: 100%;
  }
</style>

<div class="gameContainer">
  <Canvas {currentColor} />
  <Palette {currentColor} onClick={onPickColor} />

</div>

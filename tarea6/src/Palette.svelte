<script>
  export let currentColor;
  export let onClick;
  const colors = [
    "#FFFFFF",
    "#C1C1C1",
    "#F60000",
    "#FF6A00",
    "#F7F700",
    "#00E404",
    "#30A1FF",
    "#5200D6",
    "#B100BB",
    "#DA64A8",
    "#92471C",
    "#000000",
    "#4C4C4C",
    "#770000",
    "#C61F00",
    "#E7AB00",
    "#006011",
    "#273CA1",
    "#240067",
    "#AC4071",
    "#5E006A",
    "#642F00"
  ];
</script>

<style>
  .colorsContainer {
    display: flex;
  }
  .currentColor {
    height: 100px;
    width: 100px;
    border-radius: 5px;
    margin-right: 5px;
    margin-top: 5px;
  }
  .color {
    width: 45px;
    height: 45px;
    margin: 5px;
    border-radius: 5px;
  }
  .color,
  .currentColor {
    -moz-box-shadow: 3px 3px 10px #999;
    -webkit-box-shadow: 3px 3px 10px #999;
    box-shadow: 3px 3px 10px #999;
  }
  .color:hover,
  .currentColor:hover {
    cursor: pointer;
    -moz-box-shadow: 3px 3px 10px #000;
    -webkit-box-shadow: 3px 3px 10px #000;
    box-shadow: 3px 3px 10px #000;
  }
  .palette {
    display: flex;
    flex-wrap: wrap;
  }
  .selected {
    border-width: 5px;
    border-style: solid;
    border-color: rgb(127, 170, 58);
    margin: 0;
    width: 55px;
    height: 55px;
  }
</style>

<div class="colorsContainer">
  <div class="currentColor" style="background-color: {currentColor}" />
  <div
    class="palette"
    style={'width: calc(55px + 50px * ' + colors.length / 2 + ')'}>
    <!-- <div class="palette" style={'width: calc(50px * 13)'}> -->
    {#each colors as color, i}
      <div
        on:click={() => onClick(color)}
        class={color === currentColor ? 'color selected' : 'color'}
        style="background-color: {color}" />
    {/each}
  </div>
</div>

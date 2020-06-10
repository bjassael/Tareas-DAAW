<script>
  import { onMount } from "svelte";

  export let currentColor;
  let ctx;
  let canvasElement;
  let canvasWidth = 500;
  let canvasHeight = 500;
  let mouseDown = false;
  let currentPencilSize = 5;
  const allLines = [];
  let lastLine = [];

  const mousePos = {
    x: 0,
    y: 0
  };

  const prevMousePos = {
    x: 0,
    y: 0
  };

  function trackMouse(event) {
    const rect = canvasElement.getBoundingClientRect();
    if (event.type === "mousedown") {
      mouseDown = true;
    } else if (event.type === "mouseup") {
      mouseDown = false;
      allLines.push([...lastLine]);
      lastLine = [];
    }
    if (mouseDown) {
      prevMousePos.x = mousePos.x;
      prevMousePos.y = mousePos.y;
      mousePos.x = (event.clientX - rect.left).toFixed(0);
      mousePos.y = (event.clientY - rect.top).toFixed(0);
      lastLine.push({
        x: mousePos.x,
        y: mousePos.y,
        c: currentColor,
        s: currentPencilSize,
        prevX: prevMousePos.x,
        prevY: prevMousePos.y,
        m: event.type === "mousemove"
      });
      drawImage(
        mousePos.x,
        mousePos.y,
        prevMousePos.x,
        prevMousePos.y,
        currentColor,
        currentPencilSize,
        event.type === "mousemove"
      );
    }
  }

  function onPickColor(color) {
    currentColor = color;
  }

  function drawImage(x, y, prevX, prevY, color, pencilSize, mouseDown) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.arc(x, y, pencilSize, 0, 2 * Math.PI);
    ctx.fill();
    // this is for making the line smoth
    drawLine(x, y, prevX, prevY, color, pencilSize, mouseDown);
  }

  function resizePencil(event) {
    if (event.wheelDelta > 0) {
      currentPencilSize = Math.max(currentPencilSize - 2, 2);
    } else {
      currentPencilSize = Math.min(currentPencilSize + 2, 45);
    }
  }

  function drawLine(x, y, prevX, prevY, color, pencilSize, mouseDown) {
    ctx.beginPath();
    if (mouseDown) {
      ctx.moveTo(prevX, prevY);
      ctx.lineWidth = pencilSize * 2;
    }
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineTo(x, y);
    ctx.fill();
    ctx.stroke();
  }

  onMount(() => {
    ctx = canvasElement.getContext("2d");
  });

  function redrawAll(event) {
    allLines.pop();
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    if (allLines.length == 0) {
      return;
    }
    allLines.forEach(line => {
      if (line.event === "reset") {
        ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      } else {
        line.forEach(point => {
          drawImage(
            point.x,
            point.y,
            point.prevX,
            point.prevY,
            point.c,
            point.s,
            point.m
          );
        });
      }
    });
  }

  function resetDrawing() {
    allLines.push({
      event: "reset"
    });
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  }
</script>

<style>
  .canvasContainer {
    position: relative;
  }
  .canvas {
    background-color: rgb(190, 190, 190);
  }
  .pencil {
    border-radius: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
  .pencilContainer {
    position: absolute;
    height: 100px;
    top: 0%;
  }
  .buttonContainer {
    position: absolute;
    bottom: 0;
    -ms-transform: translate(380px, -8px);
    transform: translate(380px, -8px);
  }
</style>

<div class="canvasContainer">
  <div
    class="pencilContainer"
    style="left: calc({canvasWidth}px + {100 / 2}px)">
    <div
      class="pencil"
      style="height:{currentPencilSize * 2}px;width: {currentPencilSize * 2}px;background-color:{currentColor}" />
  </div>
  <div class="buttonContainer">
    <button on:click={redrawAll}>undo</button>
    <button on:click={resetDrawing}>reset</button>
  </div>
  <canvas
    class="canvas"
    on:mousemove={trackMouse}
    on:mouseup={trackMouse}
    on:mousedown={trackMouse}
    on:mouseout={() => {
      mouseDown = false;
    }}
    bind:this={canvasElement}
    on:wheel|preventDefault={resizePencil}
    width={canvasWidth}
    height={canvasHeight} />
</div>

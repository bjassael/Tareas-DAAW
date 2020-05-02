const calculateSet = () => {
  const MAX_LEN = document.getElementById("number").value;
  console.log(MAX_LEN);

  try {
    if (MAX_LEN > 47 || MAX_LEN <= 2) {
      throw Error;
    } else {
      document.getElementById("error").innerText = "";
      document.getElementById("duration").innerText = "";
      document.getElementById("result").innerText = "";
    }
  } catch (Error) {
    document.getElementById("error").innerText =
      "Por favor ingrese un número entre 3 y 47 (ambos incluidos).";
    return;
  }

  const start = new Date().getTime();

  const end = new Date().getTime();
  const time = end - start;
  let result = new Set([1, 2, 3]);
  let text = "{";
  result.forEach((x) => {
    text += x + ", ";
  });
  text = text.substring(0, text.length - 2);
  text += "}";
  document.getElementById("duration").innerText = `${time / 1000} segundos`;
  document.getElementById("result").innerText = `${text}`;
};

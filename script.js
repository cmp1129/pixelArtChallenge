import { words } from "./words.js";

document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("canvas");
  const clickCountElement = document.getElementById("clickCount");
  const wordElement = document.getElementById("word");
  const randomButton = document.getElementById("randomButton");
  const resetButton = document.getElementById("resetButton");
  const downloadButton = document.getElementById("downloadButton");

  let clickCount = 0;

  // Crear cuadrícula
  function createGrid() {
    for (let i = 0; i < 256; i++) {
      const pixel = document.createElement("div");
      pixel.className = "pixel";

      pixel.addEventListener("click", function () {
        if (pixel.style.backgroundColor === "black") {
          pixel.style.backgroundColor = "#ffffff"; // Borrar (volver a blanco)
          clickCount--;
        } else {
          pixel.style.backgroundColor = "black"; // Pintar
          clickCount++;
        }
        clickCountElement.textContent = clickCount;
        saveCanvasState();
      });
      canvas.appendChild(pixel);
    }
    // Cargar el estado desde el almacenamiento local
    loadCanvasState();
  }

  // Seleccionar palabra aleatoria
  function setRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    wordElement.textContent = words[randomIndex];
  }

  // Mostrar una palabra aleatoria por defecto
  setRandomWord();

  // Botón Random
  randomButton.addEventListener("click", function () {
    const randomIndex = Math.floor(Math.random() * words.length);
    wordElement.textContent = words[randomIndex];
  });

  // Resetear cuadrícula
  resetButton.addEventListener("click", function () {
    resetCanvas();
  });

  function resetCanvas() {
    const pixels = document.querySelectorAll(".pixel");
    pixels.forEach((pixel) => (pixel.style.backgroundColor = "#ffffff"));
    clickCount = 0;
    clickCountElement.textContent = clickCount;
    saveCanvasState();
  }

  // Descargar como imagen
  downloadButton.addEventListener("click", function () {
    html2canvas(canvas).then((canvas) => {
      const link = document.createElement("a");
      link.download = "pixelart.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  });

  function saveCanvasState() {
    const pixels = Array.from(canvas.children).map(
      (pixel) => pixel.style.backgroundColor
    );
    localStorage.setItem("pixelArtState", JSON.stringify(pixels));
  }

  function loadCanvasState(canvas) {
    const savedState = JSON.parse(localStorage.getItem("pixelArtState"));
    if (savedState) {
      savedState.forEach((color, index) => {
        canvas.children[index].style.backgroundColor = color;
      });
    }
  }

  // Crear cuadrícula al cargar
  createGrid();
});

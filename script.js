let victoriasX = 0;
let victoriasO = 0;

const contadorX = document.getElementById("contador-x");
const contadorO = document.getElementById("contador-o");

// Sonidos
const sonidoClick = new Audio ;("./sonidos/Click.ogg")
const sonidoWin = new Audio("./sonidos/Win.ogg");
const sonidoEmpate = new Audio("./sonidos/draw.ogg");

const casillas = document.querySelectorAll(".casilla");
const estado = document.getElementById("estado");
const reiniciarBtn = document.getElementById("reiniciar");
let turno = "X";
let juegoActivo = true;
let tablero = ["", "", "", "", "", "", "", "", ""];

const combinacionesGanadoras = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

casillas.forEach(casilla => {
	casilla.addEventListener("click", () => {
		const index = casilla.getAttribute("data-index");

		if (tablero[index] === "" && juegoActivo) {
			tablero[index] = turno;
			casilla.textContent = turno;
			casilla.classList.add("marcada");
			sonidoClick.play();

      if (verificarGanador()) {
        estado.textContent = `¡Ganó ${turno}! 🎉`;
        sonidoWin.play();
        lanzarConfeti();
        if (verificarGanador()) {
          estado.textContent = `¡Ganó ${turno}! 🎉`;
          sonidoWin.play();
          juegoActivo = false;

          // Actualizar contador
          if (turno === "X") {
            victoriasX++;
            contadorX.textContent = victoriasX;
          } else {
            victoriasO++;
            contadorO.textContent = victoriasO;
          }
        }


        juegoActivo = false;
      } else if (!tablero.includes("")) {
        estado.textContent = "¡Empate! 😐";
        sonidoEmpate.play();


				juegoActivo = false;
			} else {
					turno = turno === "X" ? "O" : "X";
				estado.textContent = `Turno de: ${turno}`;
			}
		}
	});
});

function verificarGanador() {
	return combinacionesGanadoras.some(combinacion => {
		return combinacion.every(index => tablero[index] === turno);
	});
}

reiniciarBtn.addEventListener("click", () => {
	tablero = ["", "", "", "", "", "", "", "", ""];
	juegoActivo = true;
	turno = "X";
	estado.textContent = `Turno de: ${turno}`;
	casillas.forEach(casilla => {
		casilla.textContent = "";
		casilla.classList.remove("marcada");
	});
});

const toggleBtn = document.getElementById("modo-toggle");
toggleBtn.addEventListener("change", () => {
	document.body.classList.toggle("dark");
});

function lanzarConfeti() {
	confetti({
		particleCount: 100,
		spread: 70,
		origin: { y: 0.6 },
		colors: ["#ffc0cb", "#fff9f4", "#000"],
	});
}

// BOTÓN para reiniciar contadores
const btnReiniciarContadores = document.getElementById('reiniciar-contadores');

btnReiniciarContadores.addEventListener('click', () => {
  victoriasX = 0;
  victoriasO = 0;
  contadorX.textContent = "0";
  contadorO.textContent = "0";

  // Actualizar el mensaje de turno
  estado.textContent = `Turno de: ${turno}`;

});

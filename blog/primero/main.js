document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("slider");
  const status = document.getElementById("status");
  const timestamp = document.getElementById("timestamp");
  const startBtn = document.getElementById("startBtn");
  const startStatus = document.getElementById("startStatus");
  startStatus.textContent = "Esto es una prueba de mensaje";
  
  async function cargarDatos() {
    status.textContent = "";
    timestamp.textContent = "...";

    try {
      const res = await fetch("http://localhost:3000/health");
      const data = await res.json();
      status.textContent = data.status;
      timestamp.textContent = data.timestamp;
    } catch (err) {
      status.textContent = "Error";
      timestamp.textContent = "-";
      console.error(err);
    }
  }

  async function iniciarSimulacion() {
    startStatus.textContent = "Encendiendo la simulación...";
    try {
      const res = await fetch("http://localhost:3000/start");
      const data = await res.json();

      if (data.status === "ok") {
        startStatus.textContent = "Simulación iniciada correctamente.";
      } else {
        startStatus.textContent = "Fallo al iniciar la simulación.";
      }
    } catch (err) {
      startStatus.textContent = "Error al conectar con el servidor.";
      console.error(err);
    }
  }

  slider?.addEventListener("input", cargarDatos);
  startBtn?.addEventListener("click", iniciarSimulacion);

  cargarDatos();
});
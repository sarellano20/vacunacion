document.getElementById("fecha_actual").value = new Date().toLocaleDateString("es-ES");

function agregarCampo(tipo) {
  const contenedor = document.getElementById(`${tipo}-seccion`);
  const fila = document.createElement("div");
  fila.classList.add("fila");

  if (tipo === "vacunacion") {
    fila.innerHTML = '<input type="date" /><input type="text" placeholder="Vacuna" /><input type="date" /><input type="text" placeholder="Firma M.V" />';
  } else {
    fila.innerHTML = '<input type="date" /><input type="text" placeholder="Peso" /><input type="text" placeholder="Producto" /><input type="date" /><input type="text" placeholder="Firma M.V" />';
  }

  contenedor.appendChild(fila);
}

function generarPDF() {
  const cont = document.getElementById("carnet");
  const opt = {
    margin: 0,
    filename: "Carnet_Veterinario.pdf",
    image: { type: 'jpeg', quality: 1.0 },
    html2canvas: { scrollY: 0, scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };
  html2pdf().set(opt).from(cont).save();
}

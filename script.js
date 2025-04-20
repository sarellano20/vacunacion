document.getElementById("fecha_actual").value = new Date().toLocaleDateString("es-ES");

function agregarFila(tipo) {
  const tabla = document.querySelector(`#tabla-${tipo} tbody`);
  const fila = document.createElement("tr");

  if (tipo === "vacunas") {
    fila.innerHTML = '<td><input type="date"/></td><td><input type="text"/></td><td><input type="date"/></td><td><input type="text"/></td>';
  } else {
    fila.innerHTML = '<td><input type="date"/></td><td><input type="text"/></td><td><input type="text"/></td><td><input type="date"/></td><td><input type="text"/></td>';
  }

  tabla.appendChild(fila);
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
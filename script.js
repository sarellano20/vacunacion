// Coloca la fecha actual automáticamente
document.getElementById("fecha_actual").value = new Date().toLocaleDateString("es-ES");

function mostrarFormulario() {
  const tipo = document.getElementById("tipo").value;
  document.getElementById("tabla-vacunacion").classList.toggle("hidden", tipo !== "vacunacion");
  document.getElementById("tabla-desparasitacion").classList.toggle("hidden", tipo !== "desparasitacion");
}

function generarPDF() {
  const tipo = document.getElementById("tipo").value;
  const carnet = document.getElementById("carnet");

  const opt = {
    margin: 0.5,
    filename: `carnet_${tipo}_${document.getElementById("nombre").value || 'paciente'}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(carnet).save();
}

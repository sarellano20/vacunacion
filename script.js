document.getElementById("fecha_actual").value = "Fecha: " + new Date().toLocaleDateString("es-ES");

function mostrarFormulario() {
  const tipo = document.getElementById("tipo").value;
  document.getElementById("form-vacunacion").classList.toggle("hidden", tipo !== "vacunacion");
  document.getElementById("form-desparasitacion").classList.toggle("hidden", tipo !== "desparasitacion");
}

function generarPDF() {
  const tipo = document.getElementById("tipo").value;
  const nombre = document.getElementById("nombre").value || 'paciente';

  // Crear contenido personalizado
  let contenido = document.createElement("div");
  contenido.style.padding = "20px";
  contenido.innerHTML = `
    <div style="text-align:center">
      <img src="logo.png" style="height:100px;" />
      <h2 style="margin:10px 0">Carnet de ${tipo === 'vacunacion' ? 'Vacunación' : 'Desparasitación'}</h2>
    </div>
    <p><strong>Especie:</strong> ${document.getElementById("especie").value}</p>
    <p><strong>Nombre:</strong> ${document.getElementById("nombre").value}</p>
    <p><strong>Sexo:</strong> ${document.getElementById("sexo").value}</p>
    <p><strong>Edad:</strong> ${document.getElementById("edad").value}</p>
    <p><strong>Propietario:</strong> ${document.getElementById("propietario").value}</p>
    <p><strong>Teléfono:</strong> ${document.getElementById("telefono").value}</p>
    <p><strong>Dirección:</strong> ${document.getElementById("direccion").value}</p>
    <p><strong>Fecha de emisión:</strong> ${document.getElementById("fecha_actual").value}</p>
    <hr>
  `;

  if (tipo === "vacunacion") {
    contenido.innerHTML += `
      <p><strong>Fecha:</strong> ${document.getElementById("vac_fecha").value}</p>
      <p><strong>Vacunas:</strong> ${document.getElementById("vac_vacuna").value}</p>
      <p><strong>Próxima cita:</strong> ${document.getElementById("vac_proxima").value}</p>
      <p><strong>Firma M.V:</strong> ${document.getElementById("vac_firma").value}</p>
    `;
  } else {
    contenido.innerHTML += `
      <p><strong>Fecha:</strong> ${document.getElementById("desp_fecha").value}</p>
      <p><strong>Peso:</strong> ${document.getElementById("desp_peso").value}</p>
      <p><strong>Producto:</strong> ${document.getElementById("desp_producto").value}</p>
      <p><strong>Próxima desparasitación:</strong> ${document.getElementById("desp_proxima").value}</p>
      <p><strong>Firma M.V:</strong> ${document.getElementById("desp_firma").value}</p>
    `;
  }

  const opt = {
    margin: 0.5,
    filename: `Carnet_${tipo}_${nombre}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(contenido).save();
}
document.getElementById("fecha_actual").value = new Date().toLocaleDateString("es-ES");

function mostrarFormulario() {
  const tipo = document.getElementById("tipo").value;
  document.getElementById("form-vacunacion").classList.add("hidden");
  document.getElementById("form-desparasitacion").classList.add("hidden");

  if (tipo === "vacunacion") {
    document.getElementById("form-vacunacion").classList.remove("hidden");
  } else if (tipo === "desparasitacion") {
    document.getElementById("form-desparasitacion").classList.remove("hidden");
  }
}

function generarPDF() {
  const tipo = document.getElementById("tipo").value;
  const nombre = document.getElementById("nombre").value || "Paciente";

  const contenido = document.createElement("div");
  contenido.style.padding = "30px";
  contenido.style.fontFamily = "Arial, sans-serif";
  contenido.innerHTML = `
    <div style="text-align:center;">
      <img src="logo.png" style="height:100px;" />
      <h2 style="margin:10px 0;">Carnet de ${tipo === 'vacunacion' ? 'Vacunación' : 'Desparasitación'}</h2>
    </div>
    <table border="1" cellspacing="0" cellpadding="6" width="100%" style="margin-top:20px;">
      <tr><th colspan="2">Datos del Paciente</th></tr>
      <tr><td><strong>Especie:</strong></td><td>${document.getElementById("especie").value}</td></tr>
      <tr><td><strong>Nombre:</strong></td><td>${nombre}</td></tr>
      <tr><td><strong>Sexo:</strong></td><td>${document.getElementById("sexo").value}</td></tr>
      <tr><td><strong>Edad:</strong></td><td>${document.getElementById("edad_valor").value} ${document.getElementById("edad_tipo").value}</td></tr>
      <tr><td><strong>Propietario:</strong></td><td>${document.getElementById("propietario").value}</td></tr>
      <tr><td><strong>Teléfono:</strong></td><td>${document.getElementById("telefono").value}</td></tr>
      <tr><td><strong>Dirección:</strong></td><td>${document.getElementById("direccion").value}</td></tr>
      <tr><td><strong>Fecha de emisión:</strong></td><td>${document.getElementById("fecha_actual").value}</td></tr>
    </table>
  `;

  if (tipo === "vacunacion") {
    contenido.innerHTML += `
      <h3 style="margin-top:30px;">Vacunación</h3>
      <table border="1" cellspacing="0" cellpadding="6" width="100%">
        <tr><th>Fecha</th><th>Vacuna</th><th>Próxima Cita</th></tr>
        <tr>
          <td>${document.getElementById("vac_fecha").value}</td>
          <td>${document.getElementById("vac_vacuna").value}</td>
          <td>${document.getElementById("vac_proxima").value}</td>
        </tr>
      </table>
    `;
  } else if (tipo === "desparasitacion") {
    contenido.innerHTML += `
      <h3 style="margin-top:30px;">Desparasitación</h3>
      <table border="1" cellspacing="0" cellpadding="6" width="100%">
        <tr><th>Fecha</th><th>Peso</th><th>Producto</th><th>Próxima Cita</th></tr>
        <tr>
          <td>${document.getElementById("desp_fecha").value}</td>
          <td>${document.getElementById("desp_peso").value}</td>
          <td>${document.getElementById("desp_producto").value}</td>
          <td>${document.getElementById("desp_proxima").value}</td>
        </tr>
      </table>
    `;
  }

  contenido.innerHTML += `
    <div style="text-align:center; margin-top:40px;">
      <img src="firma.png" style="height:80px;" />
      <p><strong>Melanie Nicola Tomalá</strong><br/>Médico Veterinario</p>
    </div>
  `;

  html2pdf().set({
    margin: 0,
    filename: `Carnet_${tipo}_${nombre}.pdf`,
    image: { type: 'jpeg', quality: 1.0 },
    html2canvas: { scale: 2, scrollY: 0 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  }).from(contenido).save();
}

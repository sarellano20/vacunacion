document.getElementById("fecha_actual").value = "Fecha: " + new Date().toLocaleDateString("es-ES");

function mostrarFormulario() {
  const tipo = document.getElementById("tipo").value;
  document.getElementById("form-vacunacion").classList.toggle("hidden", tipo !== "vacunacion");
  document.getElementById("form-desparasitacion").classList.toggle("hidden", tipo !== "desparasitacion");
}

function generarPDF() {
  const tipo = document.getElementById("tipo").value;
  const nombre = document.getElementById("nombre").value || 'paciente';

  let contenido = document.createElement("div");
  contenido.style.padding = "10px";
  contenido.style.fontFamily = "Arial, sans-serif";
  contenido.innerHTML = `
    <div style="text-align:center">
      <img src="logo.png" style="height:100px;" />
      <h2 style="margin:10px 0">Carnet de ${tipo === 'vacunacion' ? 'Vacunación' : 'Desparasitación'}</h2>
    </div>
    <p><strong>Especie:</strong> ${document.getElementById("especie").value}</p>
    <p><strong>Nombre:</strong> ${nombre}</p>
    <p><strong>Sexo:</strong> ${document.getElementById("sexo").value}</p>
    <p><strong>Edad:</strong> ${document.getElementById("edad_valor").value} ${document.getElementById("edad_tipo").value}</p>
    <p><strong>Propietario:</strong> ${document.getElementById("propietario").value}</p>
    <p><strong>Teléfono:</strong> ${document.getElementById("telefono").value}</p>
    <p><strong>Dirección:</strong> ${document.getElementById("direccion").value}</p>
    <p><strong>Fecha de emisión:</strong> ${document.getElementById("fecha_actual").value}</p>
    <hr>
  `;

  if (tipo === "vacunacion") {
    contenido.innerHTML += `
      <h3 style="text-align:center">Vacunación</h3>
      <p><strong>Fecha:</strong> ${document.getElementById("vac_fecha").value}</p>
      <p><strong>Vacunas:</strong> ${document.getElementById("vac_vacuna").value}</p>
      <p><strong>Próxima cita:</strong> ${document.getElementById("vac_proxima").value}</p>
    `;
  } else {
    contenido.innerHTML += `
      <h3 style="text-align:center">Desparasitación</h3>
      <p><strong>Fecha:</strong> ${document.getElementById("desp_fecha").value}</p>
      <p><strong>Peso:</strong> ${document.getElementById("desp_peso").value} ${document.getElementById("desp_peso_tipo").value}</p>
      <p><strong>Producto:</strong> ${document.getElementById("desp_producto").value}</p>
      <p><strong>Próxima desparasitación:</strong> ${document.getElementById("desp_proxima").value}</p>
    `;
  }

  contenido.innerHTML += `
    <div style="text-align:center; margin-top:30px;">
      <img src="firma.png" style="height:80px;" />
      <p style="margin:0;"><strong>Melanie Nicola Tomalá</strong></p>
      <p style="margin:0;">Médico Veterinario</p>
    </div>
  `;

  const opt = {
    margin: 0,
    filename: `Carnet_${tipo}_${nombre}.pdf`,
    image: { type: 'jpeg', quality: 1.0 },
    html2canvas: { scrollY: 0, scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(contenido).save().then(() => {
    const numero = document.getElementById("telefono").value.replace(/^0/, '');
    const mensaje = encodeURIComponent(`Hola, adjunto el carnet de ${tipo} de ${nombre}.`);
    const urlWhatsapp = `https://wa.me/593${numero}?text=${mensaje}`;
    window.open(urlWhatsapp, "_blank");
  });
}
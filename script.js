window.onload = () => {
  const hoy = new Date().toISOString().split('T')[0];
  ['fecha_vacuna', 'prox_vacuna', 'fecha_desp', 'prox_desp'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = hoy;
  });
};

function mostrarFormulario() {
  const tipo = document.getElementById("tipoReporte").value;
  const form = document.getElementById("formulario");
  const datosGenerales = document.getElementById("datosGenerales");
  const vac = document.getElementById("seccionVacunacion");
  const des = document.getElementById("seccionDesparasitacion");
  const btn = form.querySelector("button");

  if (tipo) {
    form.style.display = "block";
    datosGenerales.style.display = "block";

    vac.style.display = (tipo === "vacunacion" || tipo === "ambos") ? "block" : "none";
    des.style.display = (tipo === "desparasitacion" || tipo === "ambos") ? "block" : "none";

    if (tipo === "vacunacion") btn.textContent = "📄 Generar reporte de vacunación";
    else if (tipo === "desparasitacion") btn.textContent = "📄 Generar reporte de desparasitación";
    else btn.textContent = "📄 Generar reporte completo";
  } else {
    form.style.display = "none";
  }
}

function generarPDF() {
  const tipo = document.getElementById("tipoReporte").value;
  const getEdadTexto = () => {
    const anios = parseInt(document.getElementById("edad_anios").value) || 0;
    const meses = parseInt(document.getElementById("edad_meses").value) || 0;
    return `${anios} año(s) y ${meses} mes(es)`;
  };

  const peso = document.getElementById("peso").value;
  const unidad = document.getElementById("unidad_peso").value;
  const pesoFinal = peso ? `${peso} ${unidad}` : "";

  const campos = {
    nombre: "out_nombre",
    especie: "out_especie",
    sexo: "out_sexo",
    propietario: "out_propietario",
    telefono: "out_telefono",
    direccion: "out_direccion",
    fecha_vacuna: "out_fecha_vacuna",
    vacuna: "out_vacuna",
    prox_vacuna: "out_prox_vacuna",
    fecha_desp: "out_fecha_desp",
    producto: "out_producto",
    prox_desp: "out_prox_desp"
  };

  for (let key in campos) {
    const el = document.getElementById(key);
    if (el) document.getElementById(campos[key]).textContent = el.value;
  }

  document.getElementById("out_peso").textContent = pesoFinal;
  document.getElementById("out_edad").textContent = getEdadTexto();

  document.getElementById("tablaVacunacion").style.display = (tipo === "vacunacion" || tipo === "ambos") ? "block" : "none";
  document.getElementById("tablaDesparasitacion").style.display = (tipo === "desparasitacion" || tipo === "ambos") ? "block" : "none";

  const pdf = document.getElementById("pdf");
  pdf.style.display = "block";

  html2pdf().set({
    margin: 0,
    filename: `Carnet-${tipo}.pdf`,
    image: { type: 'jpeg', quality: 1 },
    html2canvas: { scale: 3, useCORS: true },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  }).from(pdf).save().then(() => {
    pdf.style.display = "none";
  });
}
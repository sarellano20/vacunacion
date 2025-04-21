window.addEventListener("DOMContentLoaded", cargarPacientesSelect);

function mostrarFormulario() {
  const tipo = document.getElementById('tipoReporte').value;
  document.getElementById('formularioGeneral').classList.remove('hidden');
  ['formVacunacion', 'formDesparasitacion'].forEach(id => document.getElementById(id).classList.add('hidden'));
  if (tipo === 'vacunacion') document.getElementById('formVacunacion').classList.remove('hidden');
  if (tipo === 'desparasitacion') document.getElementById('formDesparasitacion').classList.remove('hidden');
  document.getElementById('selectorInicial').classList.add('hidden');
}

function volverSeleccion() {
  document.getElementById('formularioGeneral').classList.add('hidden');
  document.getElementById('selectorInicial').classList.remove('hidden');
}

function guardarPaciente() {
  const nombre = document.getElementById('nombre').value.trim();
  if (!nombre) return alert("Ingrese el nombre del animal.");
  const paciente = {
    especie: document.getElementById('especie').value,
    nombre,
    sexo: document.getElementById('sexo').value,
    edad: document.getElementById('edad').value,
    unidadEdad: document.getElementById('unidadEdad').value,
    propietario: document.getElementById('propietario').value,
    telefono: document.getElementById('telefono').value,
    direccion: document.getElementById('direccion').value
  };
  const pacientes = JSON.parse(localStorage.getItem("pacientes") || "{}");
  pacientes[nombre.toLowerCase()] = paciente;
  localStorage.setItem("pacientes", JSON.stringify(pacientes));
  cargarPacientesSelect();
  alert("Paciente guardado correctamente.");
}

function cargarPacientesSelect() {
  const select = document.getElementById("pacientesGuardados");
  const pacientes = JSON.parse(localStorage.getItem("pacientes") || "{}");
  select.innerHTML = '<option value="">-- Seleccionar paciente --</option>';
  for (const key in pacientes) {
    const option = document.createElement("option");
    option.value = key;
    option.text = pacientes[key].nombre;
    select.appendChild(option);
  }
}

function cargarPaciente() {
  const id = document.getElementById("pacientesGuardados").value;
  const pacientes = JSON.parse(localStorage.getItem("pacientes") || "{}");
  const p = pacientes[id];
  if (p) {
    document.getElementById('especie').value = p.especie;
    document.getElementById('nombre').value = p.nombre;
    document.getElementById('sexo').value = p.sexo;
    document.getElementById('edad').value = p.edad;
    document.getElementById('unidadEdad').value = p.unidadEdad;
    document.getElementById('propietario').value = p.propietario;
    document.getElementById('telefono').value = p.telefono;
    document.getElementById('direccion').value = p.direccion;
  }
}

function borrarPaciente() {
  const id = document.getElementById("pacientesGuardados").value;
  const pacientes = JSON.parse(localStorage.getItem("pacientes") || "{}");
  if (!id || !pacientes[id]) return alert("Seleccione un paciente válido.");
  delete pacientes[id];
  localStorage.setItem("pacientes", JSON.stringify(pacientes));
  localStorage.removeItem(`registros_${id}`);
  cargarPacientesSelect();
  alert("Paciente eliminado.");
}

function agregarRegistro(tipo) {
  const nombre = document.getElementById("nombre").value.trim().toLowerCase();
  if (!nombre) return alert("Ingrese el nombre del paciente antes.");
  const registrosKey = `registros_${nombre}`;
  let registros = JSON.parse(localStorage.getItem(registrosKey) || "[]");

  if (tipo === "vacunacion") {
    const fecha = document.getElementById("fechaVac").value;
    const vacuna = document.getElementById("vacunas").value;
    const proxima = document.getElementById("proxVac").value;
    registros.push({ tipo, fecha, vacuna, proxima });
  } else if (tipo === "desparasitacion") {
    const fecha = document.getElementById("fechaDesp").value;
    const peso = document.getElementById("peso").value + " " + document.getElementById("unidadPeso").value;
    const producto = document.getElementById("producto").value;
    const proxima = document.getElementById("proxDesp").value;
    registros.push({ tipo, fecha, peso, producto, proxima });
  }

  localStorage.setItem(registrosKey, JSON.stringify(registros));
  alert("Registro añadido correctamente.");
}

async function generarPDF(tipo) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const nombre = document.getElementById("nombre").value.trim().toLowerCase();
  const paciente = JSON.parse(localStorage.getItem("pacientes"))[nombre];
  const registros = JSON.parse(localStorage.getItem(`registros_${nombre}`) || "[]").filter(r => r.tipo === tipo);
  const logo = await loadImage("logo.png");

  if (!paciente || registros.length === 0) {
    alert("No hay registros para este paciente.");
    return;
  }

  document.getElementById("loading-text").innerText = `Generando reporte de ${tipo} de ${paciente.nombre}`;
  document.getElementById("loading").style.display = "flex";

  setTimeout(() => {
    doc.addImage(logo, "PNG", 85, 10, 40, 40);
    doc.setFontSize(16);
    doc.text(`REGISTRO DE ${tipo.toUpperCase()}`, 105, 60, { align: 'center' });
    doc.setFontSize(10);
    doc.text(`Paciente: ${paciente.nombre} | Edad: ${paciente.edad} ${paciente.unidadEdad} | Teléfono: ${paciente.telefono} | Dirección: ${paciente.direccion}`, 105, 70, { align: 'center' });

    if (tipo === "vacunacion") {
      const body = registros.map(r => [r.fecha, r.vacuna, r.proxima]);
      doc.autoTable({ startY: 85, head: [["FECHA", "VACUNAS", "PRÓX. VAC."]], body, styles: { halign: 'center', fontSize: 10 } });
    } else {
      const body = registros.map(r => [r.fecha, r.peso, r.producto, r.proxima]);
      doc.autoTable({ startY: 85, head: [["FECHA", "PESO", "PRODUCTO", "PRÓX. DESP."]], body, styles: { halign: 'center', fontSize: 10 } });
    }

    const yFirma = doc.lastAutoTable.finalY + 10;
    doc.addImage("firma_2.png", "PNG", 85, yFirma, 40, 15);
    doc.text("Melanie Nicola Tomala", 105, yFirma + 20, { align: 'center' });
    doc.text("Médico Veterinario", 105, yFirma + 26, { align: 'center' });

    doc.save(`${tipo}_${paciente.nombre}.pdf`);
    document.getElementById("loading").style.display = "none";
  }, 6000);
}

function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = reject;
    img.src = url;
  });
}

function mostrarFormulario() {
  const tipo = document.getElementById('tipo').value;
  document.querySelectorAll('.formulario-tipo').forEach(f => f.style.display = 'none');
  if (tipo === 'vacunacion') {
    document.getElementById('formulario-vacunacion').style.display = 'block';
  } else if (tipo === 'desparasitacion') {
    document.getElementById('formulario-desparasitacion').style.display = 'block';
  }
}

function generarPDF() {
  const tipo = document.getElementById('tipo').value;
  if (!tipo) return alert("Selecciona el tipo de reporte.");

  const nombre = document.getElementById('nombreAnimal').value;
  const loadingModal = document.getElementById('loading-modal');
  const loadingText = document.getElementById('loading-text');

  loadingText.textContent = `Generando PDF del paciente ${nombre}...`;
  loadingModal.style.display = 'flex';

  // Insertar datos en la plantilla oculta
  document.getElementById('pdf-titulo').textContent = tipo === 'vacunacion' ? 'Carnet de Vacunación' : 'Carnet de Desparasitación';
  document.getElementById('out-especie').textContent = document.getElementById('especie').value;
  document.getElementById('out-nombre').textContent = nombre;
  document.getElementById('out-sexo').textContent = document.getElementById('sexo').value;
  document.getElementById('out-edad').textContent = document.getElementById('edad').value + ' ' + document.getElementById('unidadEdad').value;
  document.getElementById('out-propietario').textContent = document.getElementById('propietario').value;
  document.getElementById('out-telefono').textContent = document.getElementById('telefono').value;
  document.getElementById('out-direccion').textContent = document.getElementById('direccion').value;

  // Mostrar/ocultar secciones
  document.getElementById('out-vacunacion').style.display = tipo === 'vacunacion' ? 'block' : 'none';
  document.getElementById('out-desparasitacion').style.display = tipo === 'desparasitacion' ? 'block' : 'none';

  // Vacunación
  if (tipo === 'vacunacion') {
    document.getElementById('out-fechaVac').textContent = document.getElementById('fechaVac').value;
    document.getElementById('out-vacunas').textContent = document.getElementById('vacunas').value;
    document.getElementById('out-proxVac').textContent = document.getElementById('proxVac').value;
  }
  // Desparasitación
  else {
    document.getElementById('out-fechaDesp').textContent = document.getElementById('fechaDesp').value;
    document.getElementById('out-peso').textContent = document.getElementById('peso').value + ' ' + document.getElementById('unidadPeso').value;
    document.getElementById('out-producto').textContent = document.getElementById('producto').value;
    document.getElementById('out-proxDesp').textContent = document.getElementById('proxDesp').value;
  }

  // 🔁 Forzar render (reflow)
  const plantilla = document.getElementById('plantilla-pdf');
  plantilla.offsetHeight; // fuerza el navegador a procesar el DOM antes del timeout

  // 🕓 Esperar 5 segundos antes de generar el PDF
  setTimeout(() => {
    html2pdf().from(plantilla).set({
      margin: 0.3,
      filename: tipo + '_carnet_veterinario.pdf',
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    }).save().then(() => {
      loadingModal.style.display = 'none';
    }).catch((error) => {
      loadingModal.style.display = 'none';
      alert("Ocurrió un error al generar el PDF. Intenta nuevamente.");
      console.error(error);
    });
  }, 5000); // Espera total para asegurar render completo
}

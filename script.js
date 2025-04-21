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
  document.getElementById('loading-text').textContent = `Generando PDF del paciente ${nombre}...`;
  document.getElementById('loading-modal').style.display = 'flex';

  // Insertar datos en la plantilla
  document.getElementById('out-especie').textContent = document.getElementById('especie').value;
  document.getElementById('out-nombre').textContent = nombre;
  document.getElementById('out-sexo').textContent = document.getElementById('sexo').value;
  document.getElementById('out-edad').textContent = document.getElementById('edad').value + ' ' + document.getElementById('unidadEdad').value;
  document.getElementById('out-propietario').textContent = document.getElementById('propietario').value;
  document.getElementById('out-telefono').textContent = document.getElementById('telefono').value;
  document.getElementById('out-direccion').textContent = document.getElementById('direccion').value;

  document.getElementById('out-fechaVac').textContent = document.getElementById('fechaVac').value;
  document.getElementById('out-vacunas').textContent = document.getElementById('vacunas').value;
  document.getElementById('out-proxVac').textContent = document.getElementById('proxVac').value;

  document.getElementById('out-fechaDesp').textContent = document.getElementById('fechaDesp').value;
  document.getElementById('out-peso').textContent = document.getElementById('peso').value + ' ' + document.getElementById('unidadPeso').value;
  document.getElementById('out-producto').textContent = document.getElementById('producto').value;
  document.getElementById('out-proxDesp').textContent = document.getElementById('proxDesp').value;

  // Forzar reflow antes del timeout
  document.getElementById('plantilla-pdf').offsetHeight;

  // Esperar 10 segundos para asegurar render completo
  setTimeout(() => {
    html2pdf().from(document.getElementById('plantilla-pdf')).set({
      margin: 0.5,
      filename: tipo + '_carnet_veterinario.pdf',
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    }).save().then(() => {
      document.getElementById('loading-modal').style.display = 'none';
    });
  }, 10000);
}

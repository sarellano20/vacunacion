function generarPDF() {
  const tipo = document.getElementById('tipo').value;
  if (!tipo) {
    alert("Por favor selecciona el tipo de reporte.");
    return;
  }

  // Datos generales
  document.getElementById('pdf-titulo').textContent = tipo === 'vacunacion' ? 'Carnet de Vacunación' : 'Carnet de Desparasitación';
  document.getElementById('out-especie').textContent = document.getElementById('especie').value;
  document.getElementById('out-nombre').textContent = document.getElementById('nombreAnimal').value;
  document.getElementById('out-sexo').textContent = document.getElementById('sexo').value;
  document.getElementById('out-edad').textContent = document.getElementById('edad').value + ' ' + document.getElementById('unidadEdad').value;
  document.getElementById('out-propietario').textContent = document.getElementById('propietario').value;
  document.getElementById('out-telefono').textContent = document.getElementById('telefono').value;
  document.getElementById('out-direccion').textContent = document.getElementById('direccion').value;

  // Mostrar u ocultar la sección según el tipo
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

  // Esperar brevemente para asegurar que los datos rendericen
  setTimeout(() => {
    const plantilla = document.getElementById('plantilla-pdf');
    html2pdf().from(plantilla).set({
      margin: 0.3,
      filename: tipo + '_carnet_veterinario.pdf',
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    }).save();
  }, 100); // Espera 100ms para asegurar render completo
}

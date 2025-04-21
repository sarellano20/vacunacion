function generarPDF() {
  const get = id => document.getElementById(id).value;
  document.getElementById('out-especie').textContent = get('especie');
  document.getElementById('out-nombre').textContent = get('nombreAnimal');
  document.getElementById('out-sexo').textContent = get('sexo');
  document.getElementById('out-edad').textContent = get('edad');
  document.getElementById('out-propietario').textContent = get('propietario');
  document.getElementById('out-telefono').textContent = get('telefono');
  document.getElementById('out-direccion').textContent = get('direccion');

  document.getElementById('out-fechaVac').textContent = get('fechaVac');
  document.getElementById('out-vacunas').textContent = get('vacunas');
  document.getElementById('out-proxVac').textContent = get('proxVac');

  document.getElementById('out-fechaDesp').textContent = get('fechaDesp');
  document.getElementById('out-peso').textContent = get('peso');
  document.getElementById('out-producto').textContent = get('producto');
  document.getElementById('out-proxDesp').textContent = get('proxDesp');

  document.getElementById('plantilla-pdf').offsetHeight;

  setTimeout(() => {
    html2pdf().from(document.getElementById('plantilla-pdf')).set({
      margin: 0.5,
      filename: 'carnet_veterinario.pdf',
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    }).save();
  }, 6000);
}

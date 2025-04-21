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
  const pdf = document.getElementById('pdf');
  pdf.innerHTML = '';

  const container = document.createElement('div');
  container.style.fontFamily = 'Arial, sans-serif';
  container.style.border = '1px solid #ccc';
  container.style.padding = '20px';
  container.style.width = '100%';
  container.style.textAlign = 'left';

  const logo = document.createElement('img');
  logo.src = 'logo.png';
  logo.style.width = '100px';
  logo.style.marginBottom = '10px';
  container.appendChild(logo);

  const title = document.createElement('h2');
  title.innerText = tipo === 'vacunacion' ? 'Carnet de Vacunación' : 'Carnet de Desparasitación';
  container.appendChild(title);

  const table = document.createElement('table');
  table.style.width = '100%';
  table.style.borderCollapse = 'collapse';
  table.innerHTML = tipo === 'vacunacion'
    ? `
    <tr><td><strong>Fecha:</strong></td><td>${document.getElementById('fechaVac').value}</td></tr>
    <tr><td><strong>Vacunas:</strong></td><td>${document.getElementById('vacunas').value}</td></tr>
    <tr><td><strong>Próxima vacunación:</strong></td><td>${document.getElementById('proxVac').value}</td></tr>
    `
    : `
    <tr><td><strong>Fecha:</strong></td><td>${document.getElementById('fechaDesp').value}</td></tr>
    <tr><td><strong>Peso:</strong></td><td>${document.getElementById('peso').value} ${document.getElementById('unidadPeso').value}</td></tr>
    <tr><td><strong>Producto:</strong></td><td>${document.getElementById('producto').value}</td></tr>
    <tr><td><strong>Próxima desparasitación:</strong></td><td>${document.getElementById('proxDesp').value}</td></tr>
    `;
  container.appendChild(table);

  const firma = document.createElement('div');
  firma.style.marginTop = '30px';
  firma.style.textAlign = 'center';

  const firmaImg = document.createElement('img');
  firmaImg.src = 'firma.png';
  firmaImg.style.width = '150px';
  firma.appendChild(firmaImg);

  const nombre = document.createElement('p');
  nombre.innerText = 'Melanie Nicola Tomala – Médico Veterinario';
  firma.appendChild(nombre);

  container.appendChild(firma);
  pdf.appendChild(container);

  html2pdf().from(pdf).set({
    margin: 0.5,
    filename: tipo + '_registro.pdf',
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  }).save();
}

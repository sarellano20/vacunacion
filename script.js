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

  const card = document.createElement('div');
  card.style.fontFamily = 'Arial, sans-serif';
  card.style.padding = '20px';
  card.style.borderRadius = '10px';
  card.style.border = '2px solid #a5d6a7';
  card.style.width = '100%';
  card.style.background = '#f1f8e9';

  const logo = document.createElement('img');
  logo.src = 'logo.png';
  logo.style.width = '80px';
  logo.style.display = 'block';
  logo.style.margin = '0 auto 10px';
  card.appendChild(logo);

  const title = document.createElement('h2');
  title.style.textAlign = 'center';
  title.style.color = '#388e3c';
  title.innerText = tipo === 'vacunacion' ? 'Carnet de Vacunación' : 'Carnet de Desparasitación';
  card.appendChild(title);

  const tabla = document.createElement('table');
  tabla.style.width = '100%';
  tabla.style.borderCollapse = 'collapse';
  tabla.innerHTML = tipo === 'vacunacion' ? `
    <tr><td><strong>Fecha:</strong></td><td>${document.getElementById('fechaVac').value}</td></tr>
    <tr><td><strong>Vacunas:</strong></td><td>${document.getElementById('vacunas').value}</td></tr>
    <tr><td><strong>Próxima vacunación:</strong></td><td>${document.getElementById('proxVac').value}</td></tr>
  ` : `
    <tr><td><strong>Fecha:</strong></td><td>${document.getElementById('fechaDesp').value}</td></tr>
    <tr><td><strong>Peso:</strong></td><td>${document.getElementById('peso').value} ${document.getElementById('unidadPeso').value}</td></tr>
    <tr><td><strong>Producto desparasitante:</strong></td><td>${document.getElementById('producto').value}</td></tr>
    <tr><td><strong>Próxima desparasitación:</strong></td><td>${document.getElementById('proxDesp').value}</td></tr>
  `;
  tabla.style.border = '1px solid #ccc';
  tabla.querySelectorAll('td').forEach(td => {
    td.style.border = '1px solid #ccc';
    td.style.padding = '8px';
  });
  card.appendChild(tabla);

  const firma = document.createElement('div');
  firma.style.marginTop = '30px';
  firma.style.textAlign = 'center';

  const firmaImg = document.createElement('img');
  firmaImg.src = 'firma.png';
  firmaImg.style.width = '120px';
  firma.appendChild(firmaImg);

  const nombre = document.createElement('p');
  nombre.innerText = 'Melanie Nicola Tomala – Médico Veterinario';
  nombre.style.fontWeight = 'bold';
  firma.appendChild(nombre);

  card.appendChild(firma);
  pdf.appendChild(card);

  html2pdf().from(pdf).set({
    margin: 0.3,
    filename: tipo + '_veterinario.pdf',
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  }).save();
}

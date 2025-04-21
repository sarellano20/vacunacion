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

  const datos = `
    <p><strong>Especie:</strong> ${document.getElementById('especie').value}</p>
    <p><strong>Nombre:</strong> ${document.getElementById('nombreAnimal').value}</p>
    <p><strong>Sexo:</strong> ${document.getElementById('sexo').value}</p>
    <p><strong>Edad:</strong> ${document.getElementById('edad').value} ${document.getElementById('unidadEdad').value}</p>
    <p><strong>Propietario:</strong> ${document.getElementById('propietario').value}</p>
    <p><strong>Teléfono:</strong> ${document.getElementById('telefono').value}</p>
    <p><strong>Dirección:</strong> ${document.getElementById('direccion').value}</p>
  `;

  const datosClinicos = tipo === 'vacunacion'
    ? `
      <p><strong>Fecha:</strong> ${document.getElementById('fechaVac').value}</p>
      <p><strong>Vacunas:</strong> ${document.getElementById('vacunas').value}</p>
      <p><strong>Próxima vacunación:</strong> ${document.getElementById('proxVac').value}</p>
    `
    : `
      <p><strong>Fecha:</strong> ${document.getElementById('fechaDesp').value}</p>
      <p><strong>Peso:</strong> ${document.getElementById('peso').value} ${document.getElementById('unidadPeso').value}</p>
      <p><strong>Producto desparasitante:</strong> ${document.getElementById('producto').value}</p>
      <p><strong>Próxima desparasitación:</strong> ${document.getElementById('proxDesp').value}</p>
    `;

  card.innerHTML += datos + datosClinicos;

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
    filename: tipo + '_carnet_veterinario.pdf',
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  }).save();
}

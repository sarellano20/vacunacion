async function generarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const logo = await loadImage("logo.png");
  const firma = await loadImage("firma_2.png");

  doc.addImage(logo, "PNG", 15, 10, 25, 25);
  doc.setFontSize(14);
  doc.text("REGISTRO DE VACUNAS/DESPARASITACIÓN", 45, 20);

  doc.setFontSize(10);
  doc.text(`ESPECIE: ${get('especie')}     SEXO: ${get('sexo')}     PROPIETARIO: ${get('propietario')}`, 15, 40);
  doc.text(`NOMBRE: ${get('nombre')}     EDAD: ${get('edad')}     TELÉFONO: ${get('telefono')}`, 15, 47);
  doc.text(`DIRECCIÓN: ${get('direccion')}`, 15, 54);

  doc.setFontSize(11);
  doc.text("VACUNACIÓN", 15, 65);
  doc.autoTable({
    startY: 68,
    theme: 'grid',
    styles: { fontSize: 10, halign: 'center' },
    head: [['FECHA', 'VACUNAS', 'PRÓX. VAC.', 'FIRMA M.V']],
    body: [[
      get('fechaVac'),
      get('vacunas'),
      get('proxVac'),
      { image: firma, width: 30, height: 10 }
    ]]
  });

  doc.text("DESPARASITACIÓN", 15, doc.lastAutoTable.finalY + 10);
  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 13,
    theme: 'grid',
    styles: { fontSize: 10, halign: 'center' },
    head: [['FECHA', 'PESO', 'PRODUCTO', 'PRÓX. DESP.', 'FIRMA M.V']],
    body: [[
      get('fechaDesp'),
      get('peso'),
      get('producto'),
      get('proxDesp'),
      { image: firma, width: 30, height: 10 }
    ]]
  });

  doc.save(`carnet_${get('nombre')}.pdf`);
}

function get(id) {
  return document.getElementById(id).value || '';
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

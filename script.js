window.onload = () => {
    const hoy = new Date().toISOString().split('T')[0];
    document.getElementById("fecha_vacuna").value = hoy;
    document.getElementById("fecha_desp").value = hoy;
    document.getElementById("prox_vacuna").value = hoy;
    document.getElementById("prox_desp").value = hoy;
  };
  
  function generarPDF() {
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
      firma_vacuna: "out_firma_vacuna",
      fecha_desp: "out_fecha_desp",
      producto: "out_producto",
      prox_desp: "out_prox_desp",
      firma_desp: "out_firma_desp"
    };
  
    for (let key in campos) {
      document.getElementById(campos[key]).textContent = document.getElementById(key).value;
    }
  
    document.getElementById("out_peso").textContent = pesoFinal;
    document.getElementById("out_edad").textContent = getEdadTexto();
  
    const pdf = document.getElementById("pdf");
    pdf.style.display = "block";
  
    html2pdf().set({
      margin: 0.2,
      filename: 'Carnet-Vacunacion.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    }).from(pdf).save().then(() => {
      pdf.style.display = "none";
    });
  }
  
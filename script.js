function mostrarFormulario() {
  const selector = document.getElementById("tipoReporte");
  const container = document.getElementById("selectorContainer");
  const formContainer = document.getElementById("formContainer");

  if (selector.value !== "") {
    container.classList.add("move-up");
    formContainer.classList.remove("hidden");
    formContainer.classList.add("visible");
  }
}

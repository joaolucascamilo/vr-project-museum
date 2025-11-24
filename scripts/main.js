document.querySelectorAll('.interativo').forEach((quadro, i) => {

  // Cria o texto dinamicamente
  const info = document.createElement('a-entity');
  info.setAttribute("visible", "false");
  info.setAttribute("position", `${quadro.object3D.position.x} ${quadro.object3D.position.y - 1.2} ${quadro.object3D.position.z + 0.3}`);

  const texto = document.createElement('a-text');
  texto.setAttribute("value", `Informações do quadro ${i+1}`);
  texto.setAttribute("color", "#111");
  texto.setAttribute("align", "center");

  info.appendChild(texto);
  quadro.sceneEl.appendChild(info);

  // eventos
  quadro.addEventListener("mouseenter", () => info.setAttribute("visible", true));
  quadro.addEventListener("mouseleave", () => info.setAttribute("visible", false));
});

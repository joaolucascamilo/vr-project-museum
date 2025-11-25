document.addEventListener('DOMContentLoaded', () => {
  let userCode = window.location;
  userCode = userCode.search.replace("?", "");
  console.log(userCode);

  // Salva no localStorage
  if (userCode) {
    localStorage.setItem("userCode", userCode);
    console.log("Código do usuário salvo:", userCode);
  }

  setTimeout(()=>{saveScores}, 3000)

  const items = document.querySelectorAll('.interativo');

  items.forEach(item => {
    const modal = item.querySelector('.info-modal');
    if (!modal) return;

    // Variável para controlar o timer e evitar bugs se olhar rápido
    let hideTimeout;

    item.addEventListener('mouseenter', () => {
      // Se tiver um fechamento agendado, cancela ele (o usuário voltou a olhar)
      clearTimeout(hideTimeout);

      modal.setAttribute('visible', 'true');
      modal.setAttribute('animation', 'property: scale; to: 1 1 1; dur: 200; easing: easeOutQuad');
    });

    item.addEventListener('mouseleave', () => {
      // AQUI ESTÁ O SEGREDO: 3000ms = 3 segundos de espera
      hideTimeout = setTimeout(() => {
        modal.setAttribute('animation', 'property: scale; to: 0.1 0.1 0.1; dur: 200; easing: easeInQuad');

        // Espera a animação de encolher acabar para ficar invisível
        setTimeout(() => {
          modal.setAttribute('visible', 'false');
        }, 200);
      }, 3000);
    });
  });

  const porta = document.querySelector('.porta-interativa');
  const loadingBar = document.querySelector('#loading-bar');
  let portaTimer;

  if (porta && loadingBar) {
    // 1. Quando o usuário olha para a porta
    porta.addEventListener('mouseenter', () => {
      // Inicia animação da barra de progresso (cresce em 4000ms)
      loadingBar.setAttribute('animation', 'property: scale; to: 1 1 1; dur: 4000; easing: linear');
      // Inicia a contagem para abrir
      portaTimer = setTimeout(() => {
        abrirPortaENavegar(porta);
      }, 4000); // 4 segundos
    });

    // 2. Se o usuário desviar o olhar antes dos 4s
    porta.addEventListener('mouseleave', () => {
      // Cancela o timer
      clearTimeout(portaTimer);
      // Reseta a barra de progresso (remove animação e volta escala a 0)
      loadingBar.removeAttribute('animation');
      loadingBar.setAttribute('scale', '0 1 1');
    });
  }

  // Seleciona todas as imagens com a classe 'zoomable'
  const quadrosZoom = document.querySelectorAll('.zoomable');

  quadrosZoom.forEach(quadro => {
    
    // Pega a posição inicial definida no HTML
    const posOriginal = quadro.getAttribute('position');
    const escalaOriginal = "1 1 1"; 
    
    // Cálculo inteligente da posição de destino:
    // Se X < -1 (Parede Esquerda), o quadro tem que vir pra direita (+2 no X)
    // Se X > 1 (Parede Direita), o quadro tem que vir pra esquerda (-2 no X)
    let xDestino = posOriginal.x;
    if (posOriginal.x < -1) xDestino += 2; 
    if (posOriginal.x > 1) xDestino -= 2;

    // Evento: Olhar para a imagem
    quadro.addEventListener('mouseenter', () => {
      
      // 1. Zoom (Aumenta escala)
      quadro.setAttribute('animation__scale', `property: scale; to: 1.5 1.5 1.5; dur: 400; easing: easeOutQuad`);
      
      // 2. Pop-out (Traz para frente da parede)
      quadro.setAttribute('animation__pos', `property: position; to: ${xDestino} ${posOriginal.y} ${posOriginal.z}; dur: 400; easing: easeOutQuad`);
      
      // 3. Opacidade total (Brilho)
      quadro.setAttribute('animation__opac', `property: opacity; to: 1; dur: 300`);
      
      // 4. Emissão de luz (Efeito Neon)
      quadro.setAttribute('material', 'emissive: #333; emissiveIntensity: 0.5');
    });

    // Evento: Parar de olhar
    quadro.addEventListener('mouseleave', () => {
      // Volta ao normal
      quadro.setAttribute('animation__scale', `property: scale; to: ${escalaOriginal}; dur: 400; easing: easeInQuad`);
      quadro.setAttribute('animation__pos', `property: position; to: ${posOriginal.x} ${posOriginal.y} ${posOriginal.z}; dur: 400; easing: easeInQuad`);
      quadro.setAttribute('animation__opac', `property: opacity; to: 0.8; dur: 300`);
      
      // Remove a luz extra
      quadro.setAttribute('material', 'emissive: #000; emissiveIntensity: 0');
    });
  });
});

function abrirPortaENavegar(portaEl) {
  // 1. Toca animação de abrir a porta (Gira 90 graus)
  portaEl.setAttribute('animation', 'property: rotation; to: 0 -90 0; dur: 1000; easing: easeOutQuad');

  // 2. Aguarda a porta abrir (1s) e muda de página
  setTimeout(() => {
    // AQUI VOCÊ COLOCA O LINK DO NOVO AMBIENTE
    window.location.href = "internet.html"; // Exemplo: Substitua pelo seu link
  }, 1000);
}

function saveScores() {
  console.log("pontos", pontos);

  let user = localStorage.getItem("userCode");

  fetch(
    `https://solid-palm-tree-6q6qqgw9grxcrv7x-3000.app.github.dev/users?code=${user}`
  )
    .then(async (res) => {
      return await res.json();
    })
    .then((user) => {

      console.log("user", user)

      let scoreData = {
        userId: user[0].id,
        experienceId: 1,
        score: pontos
      };

      console.log('score', scoreData)

      fetch(
        `https://upgraded-happiness-9rvrr9w9ppj3v64-3000.app.github.dev/experienceScores`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(scoreData),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("Dados enviados com sucesso:", data);
        })
        .catch((error) => {
          console.error("Erro ao salvar os dados:", error);
        });
    });


  setTimeout(() => {
    window.location.href =
      "https://upgraded-happiness-9rvrr9w9ppj3v64-3000.app.github.dev/pages/auth";
  }, 10000)

}
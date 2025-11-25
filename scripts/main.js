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
});

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
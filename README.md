# 🕶️ VR Experience: Museu de Pedras & Arquivo da Web

Uma experiência de Realidade Virtual para a Web (WebVR) desenvolvida com **A-Frame**. Este projeto apresenta dois ambientes imersivos distintos conectados por portais interativos, totalmente navegáveis sem a necessidade de controles manuais (hands-free).

## 🔗 Acesso Online

**Acesse a experiência em nuvem aqui:**
> [ **[CLIQUE AQUI](https://vr-project-museum.vercel.app/)** ]

---

## 🏛️ Ambientes

O projeto consiste em dois cenários principais:

### 1. Museu de Pedras Preciosas (`index.html`)
Um ambiente clássico e iluminado, simulando uma galeria de arte e geologia.
* **Acervo:** Exibição de pedras raras (Basalto, Rocha Lunar, Ouro, Cristal Namaqualand) e obras de arte clássicas (Vermeer, Isabel de Valois).
* **Interatividade:** Modais informativos surgem ao focar o olhar nas caixas de vidro das exposições.
* **Estética:** Paredes verdes suaves, piso de madeira e teto creme com iluminação ambiente.

### 2. Arquivo Morto da Web (`internet.html`)
Um hangar futurista e escuro ("Setor 7G"), visualizando a evolução da internet.
* **Linha do Tempo:** Uma galeria visual cobrindo a história da web de 1991 a 2010.
* **Artefatos 3D:** Objetos nostálgicos como fitas VHS, rádios antigos, PlayStation e computadores retrô.
* **Estética:** Estilo Cyber/Tron, com paredes pretas, luzes de neon verde e teto industrial.

---

## ✨ Funcionalidades Técnicas

* **Navegação "Hands-Free" (Fuse Cursor):**
    * O sistema utiliza um cursor visual que interage automaticamente após **1.5 a 2 segundos** de foco.
    * Não é necessário clicar com mouse ou controle; basta olhar fixamente para ativar botões e objetos.
* **Sistema de Teleporte:**
    * Cilindros no chão permitem movimentação rápida pelo cenário sem causar enjoo de movimento (motion sickness).
* **Portas Interativas:**
    * Portas com animação de abertura (rotação) e carregamento visual (barra de loading) que transportam o usuário entre os arquivos HTML.
* **Modais 3D:**
    * Placas de informação que aparecem suavemente ao interagir com as obras, utilizando lógica de "Pai/Filho" para manter a organização espacial.

---

## 🛠️ Tecnologias Utilizadas

* **HTML5** - Estrutura semântica.
* **A-Frame (v1.4.0)** - Framework para VR na web.
* **A-Frame Environment Component** - Criação de atmosferas e iluminação.
* **JavaScript (Vanilla)** - Lógica de interação, eventos de `mouseenter/mouseleave` e animações.

---

## 🚀 Como Rodar Localmente

Devido às políticas de segurança do navegador (CORS) para carregar modelos 3D e texturas, este projeto precisa de um servidor local. Não basta apenas abrir o arquivo HTML.

### Opção 1: VS Code (Recomendado)
1. Instale a extensão **Live Server**.
2. Abra a pasta do projeto no VS Code.
3. Clique com o botão direito em `index.html` e selecione **"Open with Live Server"**.

### Opção 2: Python
Se tiver Python instalado, abra o terminal na pasta do projeto e rode:
```bash
# Python 3.x
python -m http.server

Acesse localhost:8000 no navegador.
```

### Opção 3: Node.js
npx http-server .

## 🎮 Controles e Interação

Este projeto utiliza um sistema de **Raycaster com Fuse**, o que significa que a interação ocorre através do foco do olhar, sem necessidade de cliques físicos ou controles manuais complexos.

| Plataforma | 🕹️ Movimentação (Câmera) | 🎯 Ação / Clique |
| :--- | :--- | :--- |
| **Desktop (PC)** | Mouse (olhar) + Teclas `W, A, S, D` (andar) | **Olhar Fixo:** Mantenha o cursor verde sobre o objeto por **1.5s** para ativar. |
| **Mobile (Celular)** | Giroscópio (gire o corpo/celular) | **Olhar Fixo:** Aponte o centro da tela para o objeto e aguarde a animação do cursor. |
| **VR (Cardboard)** | Movimento da Cabeça | **Olhar Fixo:** Encare o botão ou objeto interativo até a barra carregar. |

> **Nota:** O sistema de teleporte (cilindros no chão) foi implementado para garantir conforto e evitar *motion sickness* ao se deslocar por grandes distâncias no cenário.

---

## 📂 Estrutura de Pastas

A organização do projeto segue o padrão para carregamento correto de texturas e modelos 3D (GLTF), evitando erros de caminho relativo.

```text
/ (vr-project-museum)
│
├── index.html              # Cena 01: Museu de Pedras Preciosas (Ponto de Partida)
├── internet.html           # Cena 02: Hangar Arquivo Morto da Web
│
├── scripts/
│   └── main.js             # Lógica de interação, fuse, portas e animações
│
└── assets/                 # Todos os recursos visuais
    │
    ├── imagens/            # Texturas 2D (Quadros, Paredes)
    │   ├── internet/       # Imagens específicas da linha do tempo web
    │   ├── Elizabeth.jpg
    │   └── ...
    │
    ├── cyber_dragon.gltf   # Modelos 3D soltos na raiz de assets
    ├── playstation.gltf
    ├── pedra1.gltf
    └── ...

Desenvolvido com Javascript e A-Frame.

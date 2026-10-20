/* ============================================================
   LIBRAS AMAZÔNICA
   VÍDEOS: coloque os arquivos na pasta  videos/  com o nome do
   sinal em minúsculas, sem acento e com hífen no lugar de espaço.
   Ex.: "Vitória-régia" -> videos/vitoria-regia.mp4
   Para usar outro arquivo/URL num sinal específico, preencha o
   campo  video:"caminho/ou/url.mp4"  no item de SINAIS.
   ============================================================ */

const PASTA_VIDEOS = 'videos/';
const EXTENSAO_VIDEO = '.mp4';

const SINAIS = [
  { id:1, nome:"Boto", emoji:"🐬", cat:"fauna", desc:"Golfinho de água doce, símbolo do folclore amazônico.", frase:"Ontem vi um <strong>boto</strong> no rio perto da comunidade." },
  { id:2, nome:"Onça", emoji:"🐆", cat:"fauna", desc:"Maior felino das Américas, presente na floresta amazônica.", frase:"A <strong>onça</strong> pintada é o maior predador da Amazônia." },
  { id:3, nome:"Capivara", emoji:"🦫", cat:"fauna", desc:"Maior roedor do mundo, muito comum às margens dos rios.", frase:"As <strong>capivaras</strong> descansavam à beira do igarapé." },
  { id:4, nome:"Arara", emoji:"🦜", cat:"fauna", desc:"Ave colorida, símbolo da Amazônia.", frase:"Uma <strong>arara</strong> azul pousou na mangueira." },
  { id:5, nome:"Jacaré", emoji:"🐊", cat:"fauna", desc:"Réptil aquático abundante na região amazônica.", frase:"Cuidado com o <strong>jacaré</strong> no lago!" },
  { id:6, nome:"Açaí", emoji:"🫐", cat:"flora", desc:"Fruto do açaizeiro, alimento essencial da cultura paraense.", frase:"Todo dia tomo <strong>açaí</strong> no café da manhã." },
  { id:7, nome:"Cupuaçu", emoji:"🍈", cat:"flora", desc:"Fruto amazônico usado em doces, cremes e sucos.", frase:"O sorvete de <strong>cupuaçu</strong> é o meu favorito." },
  { id:8, nome:"Vitória-régia", emoji:"🌸", cat:"flora", desc:"Planta aquática gigante, símbolo da Amazônia.", frase:"A <strong>vitória-régia</strong> floresce no lago tranquilo." },
  { id:9, nome:"Seringueira", emoji:"🌳", cat:"flora", desc:"Árvore da qual se extrai o látex natural.", frase:"Meu avô trabalhava na coleta de látex da <strong>seringueira</strong>." },
  { id:10, nome:"Curupira", emoji:"🧚", cat:"folclore", desc:"Ser mitológico protetor da floresta, com pés virados.", frase:"Dizem que o <strong>Curupira</strong> protege as matas da Amazônia." },
  { id:11, nome:"Boto cor-de-rosa", emoji:"🐬", cat:"folclore", desc:"Lenda do boto que se transforma em homem nas festas.", frase:"A avó contou a lenda do <strong>Boto cor-de-rosa</strong>." },
  { id:12, nome:"Matinta Pereira", emoji:"👻", cat:"folclore", desc:"Figura do folclore amazônico que assombra as noites.", frase:"Ouvi o assovio da <strong>Matinta Pereira</strong> na madrugada." },
  { id:13, nome:"Tacacá", emoji:"🍲", cat:"alimentos", desc:"Caldo quente com tucupi, jambu, camarão e goma de tapioca.", frase:"A barraca de <strong>tacacá</strong> fica cheia à tarde." },
  { id:14, nome:"Pato no tucupi", emoji:"🦆", cat:"alimentos", desc:"Prato típico paraense com pato cozido em tucupi.", frase:"No Círio, a família sempre come <strong>pato no tucupi</strong>." },
  { id:15, nome:"Maniçoba", emoji:"🥘", cat:"alimentos", desc:"Prato feito com folhas de maniva, carne de porco e defumados.", frase:"A <strong>maniçoba</strong> fica na panela por uma semana." },
  { id:16, nome:"Igarapé", emoji:"🌊", cat:"cotidiano", desc:"Pequeno curso d'água, braço de rio, muito comum na Amazônia.", frase:"As crianças tomam banho no <strong>igarapé</strong> depois da escola." },
  { id:17, nome:"Rabeta", emoji:"🚣", cat:"cotidiano", desc:"Canoa motorizada com motor de popa, meio de transporte ribeirinho.", frase:"Fui de <strong>rabeta</strong> até a comunidade vizinha." },
  { id:18, nome:"Canoa", emoji:"🛶", cat:"cotidiano", desc:"Embarcação simples, principal meio de locomoção nos rios.", frase:"Papai remou a <strong>canoa</strong> até a outra margem." },
];

/* ---------- Utilidades ---------- */

function slug(texto) {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function semAcento(t) {
  return t.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

// Usa o campo "video" do sinal se existir; senão monta pelo nome.
function videoDe(nome) {
  const s = SINAIS.find(x => x.nome === nome);
  return (s && s.video) || PASTA_VIDEOS + slug(nome) + EXTENSAO_VIDEO;
}

function embaralhar(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function salvar(chave, valor) {
  try { localStorage.setItem(chave, JSON.stringify(valor)); } catch (e) {}
}
function carregar(chave, padrao) {
  try {
    const v = localStorage.getItem(chave);
    return v ? JSON.parse(v) : padrao;
  } catch (e) { return padrao; }
}

/* ---------- Dicionário ---------- */

let categoriaAtiva = 'todos';

function renderSinais() {
  const busca = semAcento(document.getElementById('buscaInput').value);
  const grid = document.getElementById('dicioGrid');
  const lista = SINAIS.filter(s => {
    const matchCat = categoriaAtiva === 'todos' || s.cat === categoriaAtiva;
    const matchBusca = semAcento(s.nome).includes(busca) || semAcento(s.desc).includes(busca);
    return matchCat && matchBusca;
  });

  if (!lista.length) {
    grid.innerHTML = '<p class="dicio-vazio">Nenhum sinal encontrado. Que tal sugerir um? 😉</p>';
    return;
  }

  grid.innerHTML = lista.map(s => `
    <div class="sinal-card" role="button" tabindex="0" data-id="${s.id}" aria-label="Sinal ${s.nome}">
      <div class="sinal-video-area">
        <div class="sinal-video-placeholder">
          <span class="sinal-emoji-grande">${s.emoji}</span>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 10 4.553-2.069A1 1 0 0 1 21 8.845v6.31a1 1 0 0 1-1.447.914L15 14M3 8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
          <p>Espaço para vídeo<br>do sinal em Libras</p>
        </div>
        <video src="${videoDe(s.nome)}#t=0.1" muted loop playsinline preload="metadata"
               aria-label="Vídeo do sinal ${s.nome} em Libras"></video>
        <span class="sinal-categoria-tag cat-${s.cat}">${nomeCat(s.cat)}</span>
      </div>
      <div class="sinal-info">
        <div class="sinal-nome">${s.nome}</div>
        <div class="sinal-desc">${s.desc}</div>
        <div class="sinal-frase">${s.frase}</div>
      </div>
    </div>
  `).join('');

  // Vídeo: se o arquivo não existir, remove o <video> e o placeholder reaparece.
  grid.querySelectorAll('.sinal-card').forEach(card => {
    const v = card.querySelector('video');
    v.addEventListener('error', () => v.remove());
    card.addEventListener('mouseenter', () => { if (card.contains(v)) v.play().catch(() => {}); });
    card.addEventListener('mouseleave', () => { if (card.contains(v)) v.pause(); });
  });
}

function nomeCat(c) {
  const m = { fauna:'🐬 Fauna', flora:'🌿 Flora', folclore:'✨ Folclore', alimentos:'🍲 Alimentos', cotidiano:'🚣 Cotidiano' };
  return m[c] || c;
}

function setCategoria(cat, btn) {
  categoriaAtiva = cat;
  document.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('ativo'));
  btn.classList.add('ativo');
  renderSinais();
}

function filtrarSinais() { renderSinais(); }

function abrirSinalDetalhe(id) {
  const card = document.querySelector(`.sinal-card[data-id="${id}"]`);
  const v = card && card.querySelector('video');
  if (v) {               // tem vídeo: toca/pausa
    v.paused ? v.play().catch(() => {}) : v.pause();
    return;
  }
  const s = SINAIS.find(x => x.id === id);
  if (s) mostrarToast(`📖 ${s.nome} — ${s.desc}`);
}

(function ligarCards() {
  const grid = document.getElementById('dicioGrid');
  grid.addEventListener('click', e => {
    const card = e.target.closest('.sinal-card');
    if (card) abrirSinalDetalhe(Number(card.dataset.id));
  });
  grid.addEventListener('keydown', e => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const card = e.target.closest('.sinal-card');
    if (card) { e.preventDefault(); abrirSinalDetalhe(Number(card.dataset.id)); }
  });
})();

/* ---------- Trilha ---------- */

// status inicial: só a primeira lição de cada trilha liberada
const TRILHAS = {
  basico: [
    { nome:"Saudações", desc:"Olá, tchau, obrigado, por favor, desculpa", icone:"👋", exercicios:["Olá","Tchau","Obrigado","Por favor","Desculpa"] },
    { nome:"Números 1 a 10", desc:"Aprenda a contar em Libras", icone:"🔢", exercicios:["Um","Dois","Três","Quatro","Cinco"] },
    { nome:"Cores básicas", desc:"Vermelho, verde, azul, amarelo, branco, preto", icone:"🎨", exercicios:["Vermelho","Verde","Azul","Amarelo","Branco"] },
    { nome:"Família", desc:"Mãe, pai, irmão, filho, avó, avô", icone:"👨‍👩‍👧", exercicios:["Mãe","Pai","Irmão","Filho","Avó"] },
  ],
  intermediario: [
    { nome:"Verbos do dia a dia", desc:"Comer, beber, dormir, trabalhar, estudar", icone:"⚡", exercicios:["Comer","Beber","Dormir","Trabalhar","Estudar"] },
    { nome:"Lugares", desc:"Casa, escola, hospital, mercado, rio", icone:"🏠", exercicios:["Casa","Escola","Hospital","Mercado","Rio"] },
    { nome:"Sentimentos", desc:"Feliz, triste, com raiva, com medo, surpreso", icone:"😊", exercicios:["Feliz","Triste","Raiva","Medo","Surpresa"] },
  ],
  avancado: [
    { nome:"Frases complexas", desc:"Construção de frases completas em Libras", icone:"💬", exercicios:["Frase 1","Frase 2","Frase 3","Frase 4","Frase 5"] },
    { nome:"Gramática visual", desc:"Expressões faciais e corporais gramaticais", icone:"🧠", exercicios:["Exp. 1","Exp. 2","Exp. 3","Exp. 4","Exp. 5"] },
  ],
  amazonia: [
    { nome:"Fauna amazônica", desc:"Boto, onça, capivara, arara, jacaré", icone:"🐬", exercicios:["Boto","Onça","Capivara","Arara","Jacaré"] },
    { nome:"Flora e alimentos", desc:"Açaí, cupuaçu, tacacá, maniçoba", icone:"🌿", exercicios:["Açaí","Cupuaçu","Tacacá","Maniçoba","Tucupi"] },
    { nome:"Cotidiano ribeirinho", desc:"Igarapé, canoa, rabeta, comunidade, rio", icone:"🚣", exercicios:["Igarapé","Canoa","Rabeta","Rio","Comunidade"] },
    { nome:"Folclore paraense", desc:"Curupira, Boto, Matinta, Boto rosa", icone:"✨", exercicios:["Curupira","Boto rosa","Matinta","Uiara","Mapinguari"] },
  ]
};

// progresso salvo: { trilha: { indiceDaLicao: melhorPorcentagem } }
// uma lição está "concluída" quando chegou a 100
let progresso = carregar('libras-progresso', {});

function pct(trilha, i) { return (progresso[trilha] && progresso[trilha][i]) || 0; }

function statusDe(trilha, i) {
  if (pct(trilha, i) >= 100) return 'concluido';
  if (i === 0 || pct(trilha, i - 1) >= 100) return 'em-progresso';
  return 'bloqueado';
}

let trilhaAtiva = 'basico';

function renderTrilha() {
  const niveis = TRILHAS[trilhaAtiva];
  const cont = document.getElementById('trilhaNiveis');
  cont.innerHTML = niveis.map((n, i) => {
    const st = statusDe(trilhaAtiva, i);
    const livre = st !== 'bloqueado';
    return `
    <div class="nivel-item ${livre ? 'desbloqueado' : 'bloqueado'} ${st === 'em-progresso' ? 'ativo' : ''}"
         data-idx="${i}" role="button" tabindex="${livre ? 0 : -1}" aria-disabled="${!livre}">
      <div class="nivel-num ${st === 'concluido' ? 'concluido' : st === 'em-progresso' ? 'em-progresso' : 'bloqueado-ico'}">
        ${st === 'concluido' ? '✓' : st === 'bloqueado' ? '🔒' : (i + 1)}
      </div>
      <div class="nivel-conteudo">
        <div class="nivel-nome">${n.icone} ${n.nome}</div>
        <div class="nivel-desc-small">${n.desc}</div>
        ${livre ? `
          <div class="nivel-progress-bar">
            <div class="nivel-progress-fill" style="width:${pct(trilhaAtiva, i)}%"></div>
          </div>` : ''}
      </div>
      <div class="nivel-badge">${st === 'concluido' ? '🏆' : st === 'em-progresso' ? '▶️' : ''}</div>
    </div>`;
  }).join('');
}

function setTrilha(t, btn) {
  trilhaAtiva = t;
  document.querySelectorAll('.trilha-tab').forEach(b => b.classList.remove('ativo'));
  btn.classList.add('ativo');
  renderTrilha();
}

(function ligarTrilha() {
  const cont = document.getElementById('trilhaNiveis');
  const abrir = el => {
    const item = el.closest('.nivel-item');
    if (item && !item.classList.contains('bloqueado')) abrirLicao(Number(item.dataset.idx));
  };
  cont.addEventListener('click', e => abrir(e.target));
  cont.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); abrir(e.target); }
  });
})();

/* ---------- Lição / exercícios ---------- */

let exercicioAtual = 0;
let licaoAtual = [];
let licaoIdx = 0;
let vidas = 3;
let acertos = 0;
let respondido = false;
let focoAnterior = null;

function abrirLicao(idx) {
  const nivel = TRILHAS[trilhaAtiva][idx];
  licaoIdx = idx;
  licaoAtual = nivel.exercicios;
  exercicioAtual = 0;
  vidas = 3;
  acertos = 0;
  focoAnterior = document.activeElement;
  document.getElementById('exTitulo').textContent = nivel.icone + ' ' + nivel.nome;
  document.getElementById('modalExercicio').classList.add('aberto');
  carregarExercicio();
  document.getElementById('modalFechar').focus();
}

function desenharVidas() {
  document.getElementById('vidasDisplay').innerHTML =
    [1, 2, 3].map(i => `<span class="vida ${i > vidas ? 'perdida' : ''}">❤️</span>`).join('');
}

function carregarExercicio() {
  respondido = false;
  const total = licaoAtual.length;
  const palavra = licaoAtual[exercicioAtual];

  document.getElementById('exNumero').textContent = (exercicioAtual + 1) + ' / ' + total;
  document.getElementById('exBarra').style.width = ((exercicioAtual + 1) / total * 100) + '%';
  document.getElementById('exPergunta').textContent = 'Qual é o sinal em Libras para: "' + palavra + '"?';
  document.getElementById('btnProximo').style.display = 'none';
  document.getElementById('feedbackMsg').className = 'feedback-msg';

  const erradas = embaralhar(licaoAtual.filter(p => p !== palavra)).slice(0, 3);
  const opcoes = embaralhar([...erradas, palavra]);

  const caixa = document.getElementById('exOpcoes');
  caixa.innerHTML = '';
  opcoes.forEach(op => {
    const b = document.createElement('button');
    b.className = 'opcao-btn';
    b.textContent = op;
    b.addEventListener('click', () => responder(op, palavra, b));
    caixa.appendChild(b);
  });

  desenharVidas();

  // Área do vídeo: toca o vídeo do sinal se o arquivo existir
  const area = document.getElementById('exVideoArea');
  area.querySelector('video')?.remove();
  const emoji = SINAIS.find(s => s.nome === palavra)?.emoji || '🤟';
  document.getElementById('exVideoLabel').innerHTML =
    `${emoji} Vídeo: sinal de "<strong>${palavra}</strong>"<br><small style="opacity:0.7">Será inserido aqui</small>`;

  const v = document.createElement('video');
  v.src = videoDe(palavra);
  v.autoplay = v.muted = v.loop = v.playsInline = true;
  v.setAttribute('aria-label', 'Vídeo do sinal em Libras');
  v.onerror = () => v.remove();
  v.onloadeddata = () => {
    // com vídeo, a pergunta não entrega a resposta
    document.getElementById('exPergunta').textContent = 'Qual palavra este sinal representa?';
  };
  area.appendChild(v);
}

function responder(escolha, correta, btn) {
  if (respondido) return;
  respondido = true;
  const opcoes = document.querySelectorAll('.opcao-btn');
  opcoes.forEach(b => b.style.pointerEvents = 'none');
  const fb = document.getElementById('feedbackMsg');

  if (escolha === correta) {
    acertos++;
    btn.classList.add('correta');
    fb.textContent = '✅ Correto! Muito bem!';
    fb.className = 'feedback-msg ok';
  } else {
    btn.classList.add('errada');
    vidas--;
    opcoes.forEach(b => { if (b.textContent === correta) b.classList.add('correta'); });
    fb.textContent = '❌ Ops! A resposta correta era: ' + correta;
    fb.className = 'feedback-msg erro';
    desenharVidas();
  }

  const btnProx = document.getElementById('btnProximo');
  btnProx.style.display = 'block';
  if (vidas <= 0) btnProx.textContent = 'Tentar de novo';
  else if (exercicioAtual + 1 >= licaoAtual.length) btnProx.textContent = 'Concluir lição 🏆';
  else btnProx.textContent = 'Próximo →';
  btnProx.focus();
}

function proximoExercicio() {
  if (vidas <= 0) {
    fecharModal();
    mostrarToast('Sem vidas! Tente a lição novamente.');
    return;
  }
  exercicioAtual++;
  if (exercicioAtual >= licaoAtual.length) {
    concluirLicao();
  } else {
    carregarExercicio();
  }
}

function concluirLicao() {
  const porcentagem = Math.round(acertos / licaoAtual.length * 100);
  progresso[trilhaAtiva] = progresso[trilhaAtiva] || {};
  // chegar ao fim com vidas conclui a lição e libera a próxima
  progresso[trilhaAtiva][licaoIdx] = 100;
  salvar('libras-progresso', progresso);
  fecharModal();
  renderTrilha();
  mostrarToast(`🏆 Lição concluída! Você acertou ${acertos} de ${licaoAtual.length} (${porcentagem}%).`);
}

function fecharModal() {
  document.getElementById('modalExercicio').classList.remove('aberto');
  document.getElementById('exVideoArea').querySelector('video')?.remove();
  if (focoAnterior && focoAnterior.focus) focoAnterior.focus();
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (document.getElementById('modalExercicio').classList.contains('aberto')) fecharModal();
    document.getElementById('navLinks').classList.remove('aberto');
  }
});

document.getElementById('modalExercicio').addEventListener('click', e => {
  if (e.target.id === 'modalExercicio') fecharModal(); // clique no fundo escuro
});

/* ---------- Sugestão ---------- */

function enviarSugestao() {
  const nome = document.getElementById('f-nome').value.trim();
  const cat = document.getElementById('f-cat').value;
  if (!nome || !cat) { mostrarToast('⚠️ Preencha o nome e a categoria.'); return; }
  // TODO: enviar para um backend (ex.: Supabase) quando estiver pronto.
  mostrarToast('✅ Sugestão enviada! Obrigado pela contribuição.');
  document.getElementById('f-nome').value = '';
  document.getElementById('f-cat').value = '';
  document.getElementById('f-desc').value = '';
  document.getElementById('f-autor').value = '';
}

/* ---------- Interface ---------- */

let toastTimer;
function mostrarToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('visivel');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('visivel'), 3500);
}

function toggleMenu() {
  const links = document.getElementById('navLinks');
  const aberto = links.classList.toggle('aberto');
  document.querySelector('.nav-hamburger').setAttribute('aria-expanded', aberto);
}

// fecha o menu mobile ao escolher um link
document.querySelectorAll('#navLinks a').forEach(a =>
  a.addEventListener('click', () => document.getElementById('navLinks').classList.remove('aberto')));

// init
renderSinais();
renderTrilha();
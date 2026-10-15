const SINAIS = [
  { id:1, nome:"Boto", emoji:"🐬", cat:"fauna", desc:"Golfinho de água doce, símbolo do folclore amazônico.", frase:"Ontem vi um <strong>boto</strong> no rio perto da comunidade.", video:false },
  { id:2, nome:"Onça", emoji:"🐆", cat:"fauna", desc:"Maior felino das Américas, presente na floresta amazônica.", frase:"A <strong>onça</strong> pintada é o maior predador da Amazônia.", video:false },
  { id:3, nome:"Capivara", emoji:"🦫", cat:"fauna", desc:"Maior roedor do mundo, muito comum às margens dos rios.", frase:"As <strong>capivaras</strong> descansavam à beira do igarapé.", video:false },
  { id:4, nome:"Arara", emoji:"🦜", cat:"fauna", desc:"Ave colorida, símbolo da Amazônia.", frase:"Uma <strong>arara</strong> azul pousou na mangueira.", video:false },
  { id:5, nome:"Jacaré", emoji:"🐊", cat:"fauna", desc:"Réptil aquático abundante na região amazônica.", frase:"Cuidado com o <strong>jacaré</strong> no lago!", video:false },
  { id:6, nome:"Açaí", emoji:"🫐", cat:"flora", desc:"Fruto do açaizeiro, alimento essencial da cultura paraense.", frase:"Todo dia tomo <strong>açaí</strong> no café da manhã.", video:false },
  { id:7, nome:"Cupuaçu", emoji:"🍈", cat:"flora", desc:"Fruto amazônico usado em doces, cremes e sucos.", frase:"O sorvete de <strong>cupuaçu</strong> é o meu favorito.", video:false },
  { id:8, nome:"Vitória-régia", emoji:"🌸", cat:"flora", desc:"Planta aquática gigante, símbolo da Amazônia.", frase:"A <strong>vitória-régia</strong> floresce no lago tranquilo.", video:false },
  { id:9, nome:"Seringueira", emoji:"🌳", cat:"flora", desc:"Árvore da qual se extrai o látex natural.", frase:"Meu avô trabalhava na coleta de látex da <strong>seringueira</strong>.", video:false },
  { id:10, nome:"Curupira", emoji:"🧚", cat:"folclore", desc:"Ser mitológico protetor da floresta, com pés virados.", frase:"Dizem que o <strong>Curupira</strong> protege as matas da Amazônia.", video:false },
  { id:11, nome:"Boto cor-de-rosa", emoji:"🐬", cat:"folclore", desc:"Lenda do boto que se transforma em homem nas festas.", frase:"A avó contou a lenda do <strong>Boto cor-de-rosa</strong>.", video:false },
  { id:12, nome:"Matinta Pereira", emoji:"👻", cat:"folclore", desc:"Figura do folclore amazônico que assombra as noites.", frase:"Ouvi o assovio da <strong>Matinta Pereira</strong> na madrugada.", video:false },
  { id:13, nome:"Tacacá", emoji:"🍲", cat:"alimentos", desc:"Caldo quente com tucupi, jambu, camarão e goma de tapioca.", frase:"A barraca de <strong>tacacá</strong> fica cheia à tarde.", video:false },
  { id:14, nome:"Pato no tucupi", emoji:"🦆", cat:"alimentos", desc:"Prato típico paraense com pato cozido em tucupi.", frase:"No Círio, a família sempre come <strong>pato no tucupi</strong>.", video:false },
  { id:15, nome:"Maniçoba", emoji:"🥘", cat:"alimentos", desc:"Prato feito com folhas de maniva, carne de porco e defumados.", frase:"A <strong>maniçoba</strong> fica na panela por uma semana.", video:false },
  { id:16, nome:"Igarapé", emoji:"🌊", cat:"cotidiano", desc:"Pequeno curso d'água, braço de rio, muito comum na Amazônia.", frase:"As crianças tomam banho no <strong>igarapé</strong> depois da escola.", video:false },
  { id:17, nome:"Rabeta", emoji:"🚣", cat:"cotidiano", desc:"Canoa motorizada com motor de popa, meio de transporte ribeirinho.", frase:"Fui de <strong>rabeta</strong> até a comunidade vizinha.", video:false },
  { id:18, nome:"Canoa", emoji:"🛶", cat:"cotidiano", desc:"Embarcação simples, principal meio de locomoção nos rios.", frase:"Papai remou a <strong>canoa</strong> até a outra margem.", video:false },
];

let categoriaAtiva = 'todos';
let exercicioAtual = 0;
let licaoAtual = [];
let vidas = 3;
let respondido = false;

function renderSinais() {
  const busca = document.getElementById('buscaInput').value.toLowerCase();
  const grid = document.getElementById('dicioGrid');
  let lista = SINAIS.filter(s => {
    const matchCat = categoriaAtiva === 'todos' || s.cat === categoriaAtiva;
    const matchBusca = s.nome.toLowerCase().includes(busca) || s.desc.toLowerCase().includes(busca);
    return matchCat && matchBusca;
  });
  grid.innerHTML = lista.map(s => `
    <div class="sinal-card" onclick="abrirSinalDetalhe(${s.id})">
      <div class="sinal-video-area">
        <div class="sinal-video-placeholder">
          <span class="sinal-emoji-grande">${s.emoji}</span>
          <svg viewBox="0 0 24 24"><path d="m15 10 4.553-2.069A1 1 0 0 1 21 8.845v6.31a1 1 0 0 1-1.447.914L15 14M3 8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
          <p>Espaço para vídeo<br>do sinal em Libras</p>
        </div>
        <span class="sinal-categoria-tag cat-${s.cat}">${nomeCat(s.cat)}</span>
      </div>
      <div class="sinal-info">
        <div class="sinal-nome">${s.nome}</div>
        <div class="sinal-desc">${s.desc}</div>
        <div class="sinal-frase">${s.frase}</div>
      </div>
    </div>
  `).join('');
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
  const s = SINAIS.find(x => x.id === id);
  if (!s) return;
  mostrarToast(`📖 ${s.nome} — ${s.desc}`);
}

// TRILHA
const TRILHAS = {
  basico: [
    { nome:"Saudações", desc:"Olá, tchau, obrigado, por favor, desculpa", icone:"👋", progresso:100, status:"concluido", exercicios:["Olá","Tchau","Obrigado","Por favor","Desculpa"] },
    { nome:"Números 1 a 10", desc:"Aprenda a contar em Libras", icone:"🔢", progresso:60, status:"em-progresso", exercicios:["Um","Dois","Três","Quatro","Cinco"] },
    { nome:"Cores básicas", desc:"Vermelho, verde, azul, amarelo, branco, preto", icone:"🎨", progresso:0, status:"bloqueado", exercicios:["Vermelho","Verde","Azul","Amarelo","Branco"] },
    { nome:"Família", desc:"Mãe, pai, irmão, filho, avó, avô", icone:"👨‍👩‍👧", progresso:0, status:"bloqueado", exercicios:["Mãe","Pai","Irmão","Filho","Avó"] },
  ],
  intermediario: [
    { nome:"Verbos do dia a dia", desc:"Comer, beber, dormir, trabalhar, estudar", icone:"⚡", progresso:0, status:"bloqueado", exercicios:["Comer","Beber","Dormir","Trabalhar","Estudar"] },
    { nome:"Lugares", desc:"Casa, escola, hospital, mercado, rio", icone:"🏠", progresso:0, status:"bloqueado", exercicios:["Casa","Escola","Hospital","Mercado","Rio"] },
    { nome:"Sentimentos", desc:"Feliz, triste, com raiva, com medo, surpreso", icone:"😊", progresso:0, status:"bloqueado", exercicios:["Feliz","Triste","Raiva","Medo","Surpresa"] },
  ],
  avancado: [
    { nome:"Frases complexas", desc:"Construção de frases completas em Libras", icone:"💬", progresso:0, status:"bloqueado", exercicios:["Frase 1","Frase 2","Frase 3","Frase 4","Frase 5"] },
    { nome:"Gramática visual", desc:"Expressões faciais e corporais gramaticais", icone:"🧠", progresso:0, status:"bloqueado", exercicios:["Exp. 1","Exp. 2","Exp. 3","Exp. 4","Exp. 5"] },
  ],
  amazonia: [
    { nome:"Fauna amazônica", desc:"Boto, onça, capivara, arara, jacaré", icone:"🐬", progresso:45, status:"em-progresso", exercicios:["Boto","Onça","Capivara","Arara","Jacaré"] },
    { nome:"Flora e alimentos", desc:"Açaí, cupuaçu, tacacá, maniçoba", icone:"🌿", progresso:0, status:"bloqueado", exercicios:["Açaí","Cupuaçu","Tacacá","Maniçoba","Tucupi"] },
    { nome:"Cotidiano ribeirinho", desc:"Igarapé, canoa, rabeta, comunidade, rio", icone:"🚣", progresso:0, status:"bloqueado", exercicios:["Igarapé","Canoa","Rabeta","Rio","Comunidade"] },
    { nome:"Folclore paraense", desc:"Curupira, Boto, Matinta, Boto rosa", icone:"✨", progresso:0, status:"bloqueado", exercicios:["Curupira","Boto rosa","Matinta","Uiara","Mapinguari"] },
  ]
};

let trilhaAtiva = 'basico';

function renderTrilha() {
  const niveis = TRILHAS[trilhaAtiva];
  const cont = document.getElementById('trilhaNiveis');
  cont.innerHTML = niveis.map((n, i) => `
    <div class="nivel-item ${n.status === 'bloqueado' ? 'bloqueado' : 'desbloqueado'} ${n.status === 'em-progresso' ? 'ativo' : ''}"
         onclick="${n.status !== 'bloqueado' ? 'abrirLicao('+i+')' : ''}">
      <div class="nivel-num ${n.status === 'concluido' ? 'concluido' : n.status === 'em-progresso' ? 'em-progresso' : 'bloqueado-ico'}">
        ${n.status === 'concluido' ? '✓' : n.status === 'bloqueado' ? '🔒' : (i+1)}
      </div>
      <div class="nivel-conteudo">
        <div class="nivel-nome">${n.icone} ${n.nome}</div>
        <div class="nivel-desc-small">${n.desc}</div>
        ${n.status !== 'bloqueado' ? `
          <div class="nivel-progress-bar">
            <div class="nivel-progress-fill" style="width:${n.progresso}%"></div>
          </div>
        ` : ''}
      </div>
      <div class="nivel-badge">${n.status === 'concluido' ? '🏆' : n.status === 'em-progresso' ? '▶️' : ''}</div>
    </div>
  `).join('');
}

function setTrilha(t, btn) {
  trilhaAtiva = t;
  document.querySelectorAll('.trilha-tab').forEach(b => b.classList.remove('ativo'));
  btn.classList.add('ativo');
  renderTrilha();
}

function abrirLicao(idx) {
  const nivel = TRILHAS[trilhaAtiva][idx];
  licaoAtual = nivel.exercicios;
  exercicioAtual = 0;
  vidas = 3;
  document.getElementById('exTitulo').textContent = nivel.icone + ' ' + nivel.nome;
  document.getElementById('modalExercicio').classList.add('aberto');
  carregarExercicio();
}

function carregarExercicio() {
  respondido = false;
  const total = licaoAtual.length;
  const atual = exercicioAtual;
  const palavra = licaoAtual[atual];

  document.getElementById('exNumero').textContent = (atual+1) + ' / ' + total;
  document.getElementById('exBarra').style.width = ((atual+1)/total*100) + '%';
  document.getElementById('exPergunta').textContent = 'Qual é o sinal em Libras para: "' + palavra + '"?';
  document.getElementById('btnProximo').style.display = 'none';
  document.getElementById('feedbackMsg').className = 'feedback-msg';

  const todasOpcoes = [...licaoAtual];
  const erradas = todasOpcoes.filter(p => p !== palavra);
  const selecionadas = erradas.sort(() => Math.random()-0.5).slice(0,3);
  const opcoes = [...selecionadas, palavra].sort(() => Math.random()-0.5);

  document.getElementById('exOpcoes').innerHTML = opcoes.map(op => `
    <button class="opcao-btn" onclick="responder('${op}','${palavra}',this)">${op}</button>
  `).join('');

  // atualiza vidas
  const vidasEl = document.getElementById('vidasDisplay');
  vidasEl.innerHTML = [1,2,3].map(i => `<span class="vida ${i > vidas ? 'perdida' : ''}">❤️</span>`).join('');

  // área do vídeo
  const emoji = SINAIS.find(s => s.nome === palavra)?.emoji || '🤟';
  document.getElementById('exVideoLabel').innerHTML = `${emoji} Vídeo: sinal de "<strong>${palavra}</strong>"<br><small style="opacity:0.7">Será inserido aqui</small>`;
}

function responder(escolha, correta, btn) {
  if (respondido) return;
  respondido = true;
  const opcoes = document.querySelectorAll('.opcao-btn');
  opcoes.forEach(b => b.style.pointerEvents = 'none');

  if (escolha === correta) {
    btn.classList.add('correta');
    document.getElementById('feedbackMsg').textContent = '✅ Correto! Muito bem!';
    document.getElementById('feedbackMsg').className = 'feedback-msg ok';
  } else {
    btn.classList.add('errada');
    vidas--;
    opcoes.forEach(b => { if (b.textContent === correta) b.classList.add('correta'); });
    document.getElementById('feedbackMsg').textContent = '❌ Ops! A resposta correta era: ' + correta;
    document.getElementById('feedbackMsg').className = 'feedback-msg erro';
    const vidasEl = document.getElementById('vidasDisplay');
    vidasEl.innerHTML = [1,2,3].map(i => `<span class="vida ${i > vidas ? 'perdida' : ''}">❤️</span>`).join('');
  }

  document.getElementById('btnProximo').style.display = 'block';
  if (exercicioAtual + 1 >= licaoAtual.length) {
    document.getElementById('btnProximo').textContent = 'Concluir lição 🏆';
  } else {
    document.getElementById('btnProximo').textContent = 'Próximo →';
  }
}

function proximoExercicio() {
  if (vidas <= 0) { fecharModal(); mostrarToast('Sem vidas! Tente novamente.'); return; }
  exercicioAtual++;
  if (exercicioAtual >= licaoAtual.length) {
    fecharModal();
    mostrarToast('🏆 Lição concluída! Parabéns!');
  } else {
    carregarExercicio();
  }
}

function fecharModal() {
  document.getElementById('modalExercicio').classList.remove('aberto');
}

// SUGESTÃO
function enviarSugestao() {
  const nome = document.getElementById('f-nome').value.trim();
  const cat = document.getElementById('f-cat').value;
  if (!nome || !cat) { mostrarToast('⚠️ Preencha o nome e a categoria.'); return; }
  mostrarToast('✅ Sugestão enviada! Obrigado pela contribuição.');
  document.getElementById('f-nome').value = '';
  document.getElementById('f-cat').value = '';
  document.getElementById('f-desc').value = '';
  document.getElementById('f-autor').value = '';
}

function mostrarToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('visivel');
  setTimeout(() => t.classList.remove('visivel'), 3500);
}

function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('aberto');
}

// init
renderSinais();
renderTrilha();
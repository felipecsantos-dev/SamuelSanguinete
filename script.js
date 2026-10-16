// ─── BARRA DE NAVEGAÇÃO: FUNDO SÓLIDO DEPOIS DO TOPO DO HERO ───
const cabecalho = document.querySelector('.cabecalho');
const sentinela = document.createElement('div');
sentinela.style.cssText = 'position:absolute;top:0;height:40px;width:1px;';
document.body.prepend(sentinela);

new IntersectionObserver(([entrada]) => {
  cabecalho.classList.toggle('rolado', !entrada.isIntersecting);
}).observe(sentinela);

// ─── MENU MOBILE ───
const hamburguer = document.querySelector('.btn-menu');
const textoMenu = hamburguer.querySelector('.btn-menu-texto');
const menuMobile = document.querySelector('#menu-mobile');

function abrirMenu() {
  menuMobile.hidden = false;
  requestAnimationFrame(() => menuMobile.classList.add('aberto'));
  hamburguer.setAttribute('aria-expanded', 'true');
  textoMenu.textContent = 'Fechar';
  document.body.style.overflow = 'hidden';
}

function fecharMenu() {
  menuMobile.classList.remove('aberto');
  hamburguer.setAttribute('aria-expanded', 'false');
  textoMenu.textContent = 'Menu';
  document.body.style.overflow = '';
  setTimeout(() => {
    if (!menuMobile.classList.contains('aberto')) menuMobile.hidden = true;
  }, 400);
}

hamburguer.addEventListener('click', () => {
  hamburguer.getAttribute('aria-expanded') === 'true' ? fecharMenu() : abrirMenu();
});

menuMobile.querySelectorAll('a').forEach((link) => link.addEventListener('click', fecharMenu));

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !menuMobile.hidden) {
    fecharMenu();
    hamburguer.focus();
  }
});

// ─── ENTRADAS AO ROLAR ───
// Mesmo comportamento do portfólio: entra uma vez quando 20% do elemento aparece.
// A direção vem de data-revelar (baixo, esquerda, direita) e o atraso de data-atraso.
const observadorRevelar = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visivel');
        observadorRevelar.unobserve(entrada.target);
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll('.revelar').forEach((el) => {
  if (el.dataset.atraso) el.style.transitionDelay = `${el.dataset.atraso}s`;
  observadorRevelar.observe(el);
});

// No desktop as tatuagens sobem em cascata, coluna por coluna (no celular é uma por linha)
if (window.matchMedia('(min-width: 769px)').matches) {
  document.querySelectorAll('.bento-item').forEach((item, indice) => {
    item.style.transitionDelay = `${(indice % 3) * 0.12}s`;
  });
}

// ─── LINK ATIVO NA NAVEGAÇÃO ───
const linksNav = document.querySelectorAll('.lista-nav a');

const observadorSecao = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;
      linksNav.forEach((link) => {
        if (link.getAttribute('href') === `#${entrada.target.id}`) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
    });
  },
  { rootMargin: '-45% 0px -50% 0px' }
);

document.querySelectorAll('main section[id]').forEach((secao) => observadorSecao.observe(secao));

// ─── LIGHTBOX DO PORTFÓLIO ───
const lightbox = document.querySelector('.lightbox');
const lightboxImg = lightbox.querySelector('img');
const lightboxLegenda = lightbox.querySelector('figcaption');
const botoesPortfolio = [...document.querySelectorAll('.bento-botao')];
let atual = 0;

function mostrar(indice) {
  atual = (indice + botoesPortfolio.length) % botoesPortfolio.length;
  const botao = botoesPortfolio[atual];
  const img = botao.querySelector('img');
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightboxLegenda.textContent = botao.dataset.legenda;
}

botoesPortfolio.forEach((botao, indice) => {
  botao.addEventListener('click', () => {
    mostrar(indice);
    lightbox.showModal();
  });
});

lightbox.querySelector('.lightbox-anterior').addEventListener('click', () => mostrar(atual - 1));
lightbox.querySelector('.lightbox-proximo').addEventListener('click', () => mostrar(atual + 1));
lightbox.querySelector('.lightbox-fechar').addEventListener('click', () => lightbox.close());

lightbox.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') mostrar(atual - 1);
  if (e.key === 'ArrowRight') mostrar(atual + 1);
});

// Clicar fora da imagem fecha
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) lightbox.close();
});

lightbox.addEventListener('close', () => botoesPortfolio[atual].focus());

// ─── ANEXO: MOSTRA O NOME DOS ARQUIVOS ───
const inputAnexo = document.querySelector('#ag-imagem');
const tituloAnexo = document.querySelector('.anexo-titulo');

inputAnexo.addEventListener('change', () => {
  const arquivos = [...inputAnexo.files].map((arquivo) => arquivo.name);
  tituloAnexo.textContent = arquivos.length
    ? arquivos.join(', ')
    : 'Anexar imagens de referência';
});

// ─── FORMULÁRIO: VALIDAÇÃO + ENVIO PELO WHATSAPP ───
const form = document.querySelector('.ag-form');
const WHATSAPP = '5538999999999';

const mensagensErro = {
  valueMissing: 'Preencha este campo.',
  patternMismatch: 'Digite um número com DDD.',
};

function validarCampo(campo) {
  const caixa = campo.closest('.campo');
  const erro = caixa.querySelector('.erro');
  if (!erro) return true;

  const valido = campo.checkValidity();
  caixa.classList.toggle('invalido', !valido);
  campo.setAttribute('aria-invalid', String(!valido));
  if (valido) erro.textContent = '';
  else if (campo.validity.valueMissing) erro.textContent = mensagensErro.valueMissing;
  else erro.textContent = mensagensErro.patternMismatch;
  return valido;
}

form.querySelectorAll('[required]').forEach((campo) => {
  campo.addEventListener('blur', () => validarCampo(campo));
  campo.addEventListener('input', () => {
    if (campo.closest('.campo').classList.contains('invalido')) validarCampo(campo);
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const obrigatorios = [...form.querySelectorAll('[required]')];
  const invalidos = obrigatorios.filter((campo) => !validarCampo(campo));

  if (invalidos.length) {
    invalidos[0].focus();
    return;
  }

  const dados = new FormData(form);
  const linhas = [
    'Olá! Quero um orçamento de tatuagem.',
    '',
    `Nome: ${dados.get('nome')}`,
    `Local do corpo: ${dados.get('local')}`,
    `Tamanho: ${dados.get('tamanho')}`,
    `Estilo: ${dados.get('estilo')}`,
    `Ideia: ${dados.get('ideia')}`,
  ];

  if (dados.get('cidade')) linhas.push(`Cidade: ${dados.get('cidade')}`);
  if (inputAnexo.files.length) linhas.push('', 'Tenho imagens de referência para enviar aqui na conversa.');

  const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(linhas.join('\n'))}`;
  window.open(url, '_blank', 'noopener');
});

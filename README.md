# Landing Page – Estúdio de Tatuagem

Landing page para um estúdio de tatuagem, desenvolvida com **HTML e CSS puros**. O objetivo da página é apresentar o trabalho do tatuador, mostrar um portfólio, tirar as dúvidas mais comuns e levar o visitante a preencher um formulário de orçamento.

> **Projeto de estudo.** Foi criado para praticar front-end, sem fins comerciais e sem vínculo com o profissional ou o estúdio mencionados. Textos, imagens e contatos aparecem apenas para demonstração, e os direitos das imagens pertencem aos respectivos autores.

🔗 **Ver o projeto online:** https://felipecsantos-dev.github.io/SamuelSanguinete/

![Prévia da página](imagens/preview.png)

## Seções da página

- **Hero:** título de impacto e apresentação do estúdio
- **Sobre:** especialidade e forma de atendimento
- **Destaque do mês:** peça em evidência, com duração, sessões e região
- **Portfólio:** galeria com 6 trabalhos selecionados
- **Como funciona:** etapas do processo, da consulta ao acabamento
- **Dúvidas frequentes:** perguntas e respostas em formato de acordeão
- **Agendamento:** formulário de orçamento
- **Rodapé:** navegação e contato

## Tecnologias e recursos

- **HTML5 semântico:** `header`, `main`, `section`, `figure`, `footer` e listas ordenadas
- **CSS3:** layout com **Grid** e **Flexbox**
- **Variáveis CSS (`:root`):** paleta de cores, tipografia e transições centralizadas
- **Design responsivo:** adaptação para celular com `@media`
- **Acordeão sem JavaScript:** perguntas frequentes com `<details>` e `<summary>`
- **Tipografia:** Cormorant Garamond (títulos) e Inter (texto), via Google Fonts
- **Interações:** transições suaves em links, botões e imagens
- **SEO e compartilhamento:** meta tags, Open Graph e dados estruturados (JSON-LD, `schema.org`)
- **Acessibilidade:** textos alternativos descritivos nas imagens e `label` associado a cada campo do formulário
- **Versionamento e publicação:** Git, GitHub e GitHub Pages

## Estrutura do projeto

```
├── index.html
├── style.css
├── imagens/               # hero, destaque, favicon e imagens de compartilhamento
├── imagens-portfolio/     # fotos da galeria
├── LICENSE
└── README.md
```

## Como rodar localmente

```bash
git clone https://github.com/felipecsantos-dev/SamuelSanguinete.git
cd SamuelSanguinete
```

Depois, abra o arquivo `index.html` no navegador. Não precisa instalar nada.

## Próximos passos

- [ ] Usar **JavaScript** para montar a mensagem do formulário e enviá-la ao WhatsApp
- [ ] Validar os campos do formulário e ajustar os campos opcionais
- [ ] Adicionar um menu para telas pequenas
- [ ] Melhorar o desempenho (otimizar o tamanho das imagens)

## Autor

**Felipe Santos**, estudante de Análise e Desenvolvimento de Sistemas e desenvolvedor front-end em formação.

GitHub: [@felipecsantos-dev](https://github.com/felipecsantos-dev)

## Licença

Código distribuído sob a licença MIT. Veja o arquivo [LICENSE](LICENSE). A licença cobre apenas o código: as imagens e os nomes usados na página não fazem parte dela.

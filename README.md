# Couple Rewind 💜

Slideshow estilo Spotify Wrapped para casais — HTML, CSS e JS puros.

## Como usar
1. Abra `index.html` em qualquer navegador (basta dar duplo-clique).
2. Para personalizar, edite o objeto `DATA` no topo de `script.js`:
   - `nome1`, `nome2` — nomes do casal
   - `dataInicio` — formato `YYYY-MM-DD`
   - `cidade`, `primeiroEncontro`, `apelidos`, `musicas`, `momentos`, `mensagemFinal`
   - `fotos` — URLs de imagens (ou deixe vazio para usar emoji)
3. Música de fundo: edite a tag `<source src="...">` em `index.html`.

## Controles
- **Clique / Tap / →** — próximo
- **←** — voltar
- **Swipe** no celular — navegar
- **♪** no canto — ligar/desligar música

## Estrutura
- `index.html` — marcação base
- `style.css` — design (cores, animações, tipografia)
- `script.js` — dados do casal + slides + engine

## Hospedar online
Suba os 3 arquivos em qualquer hospedagem estática (Netlify, Vercel, GitHub Pages, etc.).

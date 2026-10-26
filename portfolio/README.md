# Lucas Nascimento — Portfólio

Site de apresentação Full Stack, responsivo e preparado para cases reais.

## Publicação na Vercel

1. Abra https://vercel.com/new e conecte seu GitHub.
2. Importe LucasNascimento2810/Lucas_Nascimento.
3. Nome sugerido: lucas-nascimento-portfolio.
4. Em Root Directory, selecione portfolio.
5. Em Framework Preset, escolha Other (site HTML/CSS/JS estático).
6. Deixe Build Command e Output Directory vazios e publique.
7. Commits na branch main serão publicados automaticamente com a integração Git.

Não requer npm, banco de dados, tokens ou variáveis de ambiente.

## Projetos reais: fotos e vídeos

1. Coloque as capas .webp e vídeos .mp4 em portfolio/projects/.
2. Edite portfolio/showcase-data.js e substitua o array vazio por objetos no formato:

```js
window.PORTFOLIO_PROJECTS = [
  {
    id: 'meu-projeto',
    title: 'Nome do projeto',
    category: 'SISTEMA WEB / 2026',
    description: 'O problema e a solução desenvolvida.',
    cover: './projects/capa.webp',
    video: './projects/demo.mp4', // opcional
    technologies: ['React', 'Next.js', 'Supabase'],
    url: 'https://link-publico.com', // opcional
    featured: true
  }
];
```

Quando a lista tiver projetos, o site troca os três mockups por uma galeria de cases reais, com detalhes, modal de imagem/vídeo e link para conhecer o projeto. Com lista vazia, os exemplos continuam identificados como conceituais. Não precisa reescrever o index.html.

### Mídia e privacidade

- Use capas otimizadas e vídeos compactados para não prejudicar o carregamento.
- Remova dados sensíveis de telas, cadastros e gravações antes de publicar.
- Peça autorização para divulgar marcas, prints e vídeos de clientes.

## Organização

- index.html: página principal
- showcase-data.js: cadastro de projetos
- showcase.js: galeria e modal de mídia
- showcase.css: visual da galeria
- ambient-gl.js: efeitos WebGL2, com fallback em CSS
- favicon.svg: marca LN

## Contato

O CTA abre o LinkedIn até que o proprietário confirme WhatsApp ou e-mail de contato comercial. Não armazene segredos no GitHub.

## Compatibilidade

Efeitos WebGL são opcionais, desabilitados para celulares e para usuários que preferem movimento reduzido. Layout, navegação e CTA continuam funcionando sem WebGL.
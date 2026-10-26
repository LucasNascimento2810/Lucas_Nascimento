# Portfólio — Lucas Nascimento

Site de apresentação profissional de Lucas Nascimento, com animações leves, objeto 3D em WebGL (fallback CSS) e três cases reais.

**Site público:** https://lucasnascimento.vercel.app/

## Cases apresentados

1. **AMMI CRM** — sistema comercial: funil, tarefas, cadências, agenda e relatórios. Imagem ilustrativa, sem dados operacionais. Link: https://ammicrm.vercel.app/ (algumas telas exigem login).
2. **Dra. Mariana Hassan** — site institucional entregue, com apresentação de serviços médicos e navegação responsiva. Fotografia usada é imagem pública da aplicação. Link: https://dramarianahassan.com.br/.
3. **MenuZap** — produto próprio, SaaS em fase piloto para cardápio, pedidos, cozinha, despacho e fidelização. Capa ilustrativa, sem dados de clientes. Link: https://menuzap.vercel.app/.

O conteúdo foi redigido sem métricas de resultados não verificadas e sem exibir dados pessoais de clientes.

## Como atualizar os projetos

Os cards são gerados a partir de `showcase-data.js`. Cada case inclui título, descrição, status, desafio, solução, funcionalidades, tecnologias, URL e imagem de capa. Os cards também têm detalhes expansíveis e links para o projeto.

Capas editáveis: `projects/ammi-crm.svg` e `projects/menuzap.svg`. Para incluir novas fotos e vídeos, crie arquivos `.webp` e `.mp4` dentro de `projects/` e atualize o caminho no registro do projeto.

**Privacidade:** sempre obtenha autorização para divulgar trabalhos de terceiros e oculte dados pessoais, números comerciais internos e credenciais antes de disponibilizar capturas de tela. As capas de sistemas não contêm dados operacionais reais.

## Arquivos

- `index.html` — estrutura, conteúdo institucional, animações e SEO.
- `showcase-data.js` — conteúdo dos três cases.
- `showcase.js` — galeria interativa, modais e navegação.
- `showcase.css` — layout responsivo e estilos dos cases.
- `ambient-gl.js` — efeito 3D WebGL para desktop, respeitando movimento reduzido.
- `projects/` — capas dos cases.
- `favicon.svg` — identidade do site.

## Publicação

Na Vercel, a raiz do projeto Git está configurada em `portfolio`, com Framework **Other** (HTML, CSS e JavaScript estáticos). Não requer banco, tokens ou dependências npm.

O projeto deve apontar para `LucasNascimento2810/Lucas_Nascimento` na branch `main`. Atualizações nessa pasta disparam novos deploys de produção.

## Contato

O botão atual direciona para o LinkedIn público de Lucas. O WhatsApp profissional pode ser incluído quando houver um número confirmado.

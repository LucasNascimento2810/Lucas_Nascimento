/* Cases selecionados do portfólio. URLs fornecidas anteriormente pelo autor.
 * As capas de CRM e MenuZap são reconstruções ilustrativas de interface,
 * baseadas em telas compartilhadas, SEM números comerciais, contatos ou dados pessoais.
 * A foto da Dra. Mariana é uma imagem pública do repositório do próprio projeto.
 * Não há vídeos divulgados até sua aprovação.
 */
window.PORTFOLIO_PROJECTS = [
  {
    id: "ammi-crm",
    title: "AMMI CRM",
    category: "SISTEMA COMERCIAL / CRM",
    status: "EM USO",
    role: "Desenvolvimento e evolução de produto",
    description: "Um ambiente de gestão comercial para organizar oportunidades, contatos, empresas e atividades em um só lugar. O projeto reúne funis de vendas, agenda, cadências de acompanhamento e indicadores para apoiar a rotina das equipes.",
    challenge: "Reunir a operação comercial em uma experiência clara, com histórico, responsáveis e próximas ações visíveis.",
    solution: "Estruturação de fluxos de CRM, telas gerenciais, visualizações de funil e ferramentas para acompanhar tarefas, contatos e oportunidades.",
    highlights: ["Funil e gestão de oportunidades", "Agenda, tarefas e cadências", "Painéis e relatórios comerciais", "Estrutura para operação multiempresa"],
    technologies: ["React", "TypeScript", "PostgreSQL", "APIs", "Vercel"],
    cover: "./projects/ammi-crm.svg",
    mediaNote: "Capa ilustrativa baseada na interface. Dados reais da operação foram omitidos.",
    url: "https://ammicrm.vercel.app/",
    linkLabel: "ABRIR SISTEMA",
    requiresLogin: true,
    featured: true
  },
  {
    id: "mariana-hassan",
    title: "Dra. Mariana Hassan",
    category: "SITE INSTITUCIONAL / SAÚDE",
    status: "PROJETO ENTREGUE",
    role: "Desenvolvimento do site institucional",
    description: "Site profissional desenvolvido para apresentar a atuação médica, explicar procedimentos com clareza e facilitar o contato de novos pacientes. Uma experiência responsiva que valoriza a identidade visual e a navegação intuitiva.",
    challenge: "Apresentar serviços especializados de forma acessível, confiável e organizada em diferentes telas.",
    solution: "Criação de uma experiência institucional com seções informativas, chamadas para agendamento e atenção à apresentação da marca.",
    highlights: ["Experiência responsiva", "Apresentação de serviços e procedimentos", "Identidade visual consistente", "Jornada de contato simplificada"],
    technologies: ["React", "TypeScript", "Vite", "UI responsiva"],
    cover: "https://raw.githubusercontent.com/LucasNascimento2810/Website_Mariana-ivan/main/src/assets/mariana-hero.webp",
    mediaNote: "Fotografia utilizada no site original.",
    url: "https://dramarianahassan.com.br/",
    linkLabel: "ACESSAR SITE"
  },
  {
    id: "menuzap",
    title: "MenuZap",
    category: "SAAS / FOOD SERVICE",
    status: "EM FASE PILOTO",
    role: "Produto próprio — concepção e desenvolvimento",
    description: "Plataforma para ajudar restaurantes a receber e acompanhar pedidos pelo próprio canal. Conecta cardápio digital, QR Code, operação de cozinha, entregas, clientes e programas de fidelidade em uma experiência única.",
    challenge: "Organizar o caminho do pedido — da escolha do cliente ao preparo e à entrega — sem fragmentar a operação.",
    solution: "Construção de uma aplicação com cardápio compartilhável, painel de pedidos, etapas operacionais e módulos de gestão.",
    highlights: ["Cardápio digital e QR Code", "Pedidos e cozinha em tempo real", "Fluxo de entrega e despacho", "Clientes, cupons e fidelidade"],
    technologies: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL"],
    cover: "./projects/menuzap.svg",
    mediaNote: "Capa ilustrativa baseada na interface do produto, com dados demonstrativos.",
    url: "https://menuzap.vercel.app/",
    linkLabel: "CONHECER MENUZAP"
  }
];

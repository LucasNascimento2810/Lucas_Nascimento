/* Galeria de cases com acessibilidade: conteúdo editável em showcase-data.js */
(() => {
  "use strict";
  const data = Array.isArray(window.PORTFOLIO_PROJECTS) ? window.PORTFOLIO_PROJECTS : [];
  const projects = data.filter(p => p && p.title && p.description);
  const grid = document.querySelector(".project-grid");
  if (!grid || !projects.length) return;
  const safeMedia = value => typeof value === "string" && (/^(\.\/|\/)[a-zA-Z0-9/_\-.]+$/.test(value) || /^https:\/\//i.test(value));
  const make = (tag, className, content) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (content !== undefined) element.textContent = String(content);
    return element;
  };
  function externalLink(url, label, className = "case-external") {
    if (typeof url !== "string" || !/^https:\/\//.test(url)) return null;
    const anchor = make("a", className, label);
    anchor.href = url;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    return anchor;
  }
  grid.classList.add("real-project-grid");
  grid.replaceChildren();

  const modal = make("dialog", "portfolio-modal");
  modal.setAttribute("aria-label", "Detalhes do projeto selecionado");
  const shell = make("div", "portfolio-modal-shell");
  const close = make("button", "portfolio-modal-close", "FECHAR ×");
  close.type = "button";
  close.setAttribute("aria-label", "Fechar detalhes");
  const modalMedia = make("div", "portfolio-modal-media");
  const modalInfo = make("div", "portfolio-modal-info");
  shell.append(close, modalMedia, modalInfo);
  modal.append(shell);
  document.body.append(modal);
  let lastFocus = null;
  function closeModal() {if (modal.open) modal.close();}
  close.addEventListener("click", closeModal);
  modal.addEventListener("click", evt => {if (evt.target === modal) closeModal();});
  modal.addEventListener("close", () => {
    modalMedia.querySelectorAll("video").forEach(video => video.pause());
    modalMedia.replaceChildren();
    if (lastFocus && lastFocus.isConnected) lastFocus.focus();
  });
  function detail(label, content) {
    if (!content) return null;
    const section = make("section", "case-detail");
    section.append(make("h4", "", label), make("p", "", content));
    return section;
  }
  function show(project, focusEl) {
    lastFocus = focusEl;
    modalMedia.replaceChildren();
    modalInfo.replaceChildren();
    if (safeMedia(project.video)) {
      const video = make("video");
      video.src = project.video;
      video.controls = true;
      video.playsInline = true;
      video.preload = "metadata";
      if (safeMedia(project.cover)) video.poster = project.cover;
      modalMedia.append(video);
    } else if (safeMedia(project.cover)) {
      const img = make("img");
      img.src = project.cover;
      img.alt = "Imagem de apresentação de " + project.title;
      modalMedia.append(img);
    }
    const eyebrow = make("div", "modal-eyebrow", (project.category || "DESENVOLVIMENTO") + (project.status ? "  ·  " + project.status : ""));
    modalInfo.append(eyebrow, make("h3", "", project.title), make("p", "case-intro", project.description));
    const row = make("div", "case-details");
    const challenge = detail("O DESAFIO",project.challenge);
    const solution = detail("A SOLUÇÃO",project.solution);
    if (challenge) row.append(challenge);
    if (solution) row.append(solution);
    modalInfo.append(row);
    if (project.role) modalInfo.append(make("p", "case-role", "ATUAÇÃO NO PROJETO  /  " + project.role));
    if (Array.isArray(project.highlights) && project.highlights.length) {
      modalInfo.append(make("h4", "case-subtitle", "O QUE FOI DESENVOLVIDO"));
      const highlights = make("ul", "case-highlights");
      project.highlights.forEach(t => highlights.append(make("li", "", t)));
      modalInfo.append(highlights);
    }
    if (Array.isArray(project.technologies) && project.technologies.length) {
      const tech = make("div", "modal-technologies");
      project.technologies.forEach(label => tech.append(make("span", "", label)));
      modalInfo.append(tech);
    }
    if (project.mediaNote) modalInfo.append(make("p","case-media-note",project.mediaNote));
    const link = externalLink(project.url, project.linkLabel || "VISITAR PROJETO ↗", "modal-link");
    if (link) modalInfo.append(link);
    if (project.requiresLogin) modalInfo.append(make("span","case-login-note","O acesso a algumas telas exige autenticação."));
    if (typeof modal.showModal === "function") modal.showModal();
    else modal.setAttribute("open","");
    close.focus();
  }
  projects.forEach((project,index) => {
    const article = make("article","real-case"+(project.featured?" featured":""));
    const visual = make("button","real-case-visual");
    visual.type = "button";
    visual.setAttribute("aria-label","Ver detalhes do projeto "+project.title);
    if (safeMedia(project.cover)) {
      const img = make("img");
      img.src = project.cover;
      img.alt = "Capa do projeto "+project.title;
      img.loading = index < 2 ? "eager" : "lazy";
      img.decoding = "async";
      img.onerror = () => {img.remove();visual.prepend(make("span","real-case-placeholder",project.title));};
      visual.append(img);
    } else {
      visual.append(make("span","real-case-placeholder",project.title));
    }
    visual.append(make("span","real-case-index",String(index+1).padStart(2,"0") + " / " + String(projects.length).padStart(2,"0")));
    visual.append(make("span","real-case-view","VER CASE  ↗"));
    const footer = make("div","real-case-foot");
    const body = make("div","real-case-body");
    body.append(make("small","",project.category || "PROJETO DIGITAL"),make("h3","",project.title),make("p","",project.description));
    const status = make("span","real-case-status",project.status || "");
    body.append(status);
    const actions=make("div","real-case-actions");
    const more=make("button","real-case-button","↗");
    more.type="button";
    more.setAttribute("aria-label","Ver detalhes de "+project.title);
    actions.append(more);
    const outbound=externalLink(project.url,"VISITAR PROJETO ↗");
    if (outbound) actions.append(outbound);
    footer.append(body,actions);
    article.append(visual,footer);
    visual.addEventListener("click",()=>show(project,visual));
    more.addEventListener("click",()=>show(project,more));
    grid.append(article);
  });
  const note = document.querySelector(".case-note");
  if (note) {
    note.replaceChildren();
    note.append(make("span","case-mark","✳"));
    const line=make("span");
    line.append(make("strong","","PROJETOS REAIS, CONTEXTOS DIFERENTES."));
    line.append(document.createTextNode(" Conheça as entregas, o raciocínio técnico e os produtos em diferentes estágios de evolução."));
    note.append(line);
  }
})();

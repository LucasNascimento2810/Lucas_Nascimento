/* Renderização de cases reais e visualizador de imagens/vídeos.
   Não altera os mockups enquanto PORTFOLIO_PROJECTS estiver vazio. */
(() => {
  'use strict';
  const entries = Array.isArray(window.PORTFOLIO_PROJECTS)
    ? window.PORTFOLIO_PROJECTS.filter(p => p && p.title && p.description)
    : [];
  if (!entries.length) return;
  const grid = document.querySelector('.project-grid');
  if (!grid) return;
  grid.classList.add('real-project-grid');
  grid.replaceChildren();
  const note = document.querySelector('.case-note');
  if (note) {
    note.replaceChildren();
    const mark = document.createElement('span');
    mark.className = 'case-mark';
    mark.setAttribute('aria-hidden', 'true');
    mark.textContent = '✳';
    const content = document.createElement('span');
    const heading = document.createElement('strong');
    heading.textContent = 'CASES & PROJETOS';
    content.append(heading, document.createTextNode(' — Projetos selecionados com imagens e demonstrações. Cada trabalho tem escopo e contexto próprios.'));
    note.append(mark, content);
  }
  const make = (tag, cls, txt) => {
    const el = document.createElement(tag);
    if (cls) el.className = cls;
    if (txt !== undefined) el.textContent = String(txt);
    return el;
  };
  const modal = make('dialog', 'portfolio-modal');
  modal.setAttribute('aria-label', 'Detalhes do projeto');
  const modalShell = make('div', 'portfolio-modal-shell');
  const close = make('button', 'portfolio-modal-close', 'FECHAR ×');
  close.type = 'button';
  close.setAttribute('aria-label', 'Fechar detalhes do projeto');
  const mediaBox = make('div', 'portfolio-modal-media');
  const infoBox = make('div', 'portfolio-modal-info');
  modalShell.append(close, mediaBox, infoBox);
  modal.append(modalShell);
  document.body.append(modal);
  let restoreFocus = null;
  const end = () => {
    if (modal.open) modal.close();
    mediaBox.replaceChildren();
    if (restoreFocus) restoreFocus.focus();
  };
  close.addEventListener('click', end);
  modal.addEventListener('click', event => { if (event.target === modal) end(); });
  modal.addEventListener('close', () => { mediaBox.replaceChildren(); if (restoreFocus) restoreFocus.focus(); });
  const validMedia = value => typeof value === 'string' && (/^(\.\/|\/)[a-zA-Z0-9/_\-.]+$/.test(value) || /^https:\/\//i.test(value));
  function openProject(project, trigger) {
    restoreFocus = trigger;
    mediaBox.replaceChildren(); infoBox.replaceChildren();
    if (validMedia(project.video)) {
      const video = make('video');
      video.src = project.video;
      video.controls = true;
      video.autoplay = true;
      video.playsInline = true;
      if (validMedia(project.cover)) video.poster = project.cover;
      mediaBox.append(video);
    } else if (validMedia(project.cover)) {
      const img = make('img');
      img.src = project.cover;
      img.alt = 'Imagem do projeto ' + project.title;
      mediaBox.append(img);
    } else {
      mediaBox.append(make('div', 'media-empty', 'PRÉVIA DO PROJETO'));
    }
    infoBox.append(
      make('span', 'modal-eyebrow', project.category || 'DESENVOLVIMENTO'),
      make('h3', '', project.title),
      make('p', '', project.description)
    );
    const tech = Array.isArray(project.technologies) ? project.technologies : [];
    if (tech.length) {
      const row = make('div', 'modal-technologies');
      tech.slice(0,12).forEach(value => row.append(make('span', '', value)));
      infoBox.append(row);
    }
    if (typeof project.url === 'string' && /^https:\/\//i.test(project.url)) {
      const link = make('a', 'modal-link', 'VISITAR PROJETO ↗');
      link.href = project.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      infoBox.append(link);
    }
    if (typeof modal.showModal === 'function') modal.showModal();
    else modal.setAttribute('open','');
    close.focus();
  }
  entries.forEach((project, index) => {
    const article = make('article', 'real-case' + (project.featured ? ' featured' : ''));
    const media = make('div', 'real-case-visual');
    if (validMedia(project.cover)) {
      const picture = make('img');
      picture.src = project.cover;
      picture.alt = 'Prévia de ' + project.title;
      picture.loading = index < 2 ? 'eager' : 'lazy';
      picture.decoding = 'async';
      media.append(picture);
    } else {
      media.append(make('div', 'real-case-placeholder', 'LN. / ' + String(index + 1).padStart(2,'0')));
    }
    media.append(make('span','real-case-index',String(index + 1).padStart(2,'0') + ' / ' + String(entries.length).padStart(2,'0')));
    const foot = make('div','real-case-foot');
    const body = make('div', 'real-case-body');
    body.append(
      make('small','',project.category || 'PROJETO DIGITAL'),
      make('h3','',project.title),
      make('p','',project.description)
    );
    const action = make('button', 'real-case-button', '↗');
    action.type = 'button';
    action.setAttribute('aria-label','Ver projeto '+ project.title);
    foot.append(body, action);
    article.append(media, foot);
    const go = () => openProject(project, action);
    action.addEventListener('click', go);
    media.addEventListener('click', go);
    media.setAttribute('role','button');
    media.tabIndex = 0;
    media.setAttribute('aria-label','Ver detalhes de ' + project.title);
    media.addEventListener('keydown', ev => { if(ev.key === 'Enter' || ev.key === ' '){ev.preventDefault();go();} });
    grid.append(article);
  });
})();
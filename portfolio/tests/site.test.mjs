import test from "node:test";import assert from "node:assert/strict";import{readFileSync,existsSync}from"node:fs";import vm from"node:vm";import{resolve,dirname}from"node:path";import{fileURLToPath}from"node:url";
const root=resolve(dirname(fileURLToPath(import.meta.url)),".."),read=n=>readFileSync(resolve(root,n),"utf8"),html=read("index.html");
const scope={window:{}};vm.runInNewContext(read("showcase-data.js"),scope);const p=scope.window.PORTFOLIO_PROJECTS;
test("SEO, acessibilidade e compartilhamento",()=>{for(const s of ['lang="pt-BR"','rel="canonical"','property="og:image"','aria-controls="nav"'])assert.ok(html.includes(s),s)});
test("Três projetos em HTML com links",()=>{assert.equal(p.length,3);assert.equal((html.match(/class="fallback-card"/g)||[]).length,3);for(const a of p){assert.ok(html.includes(a.title));assert.match(a.url,/^https:\/\//)}});
test("Links internos",()=>{const ids=new Set([...html.matchAll(/\\bid="([^"]+)"/g)].map(x=>x[1]));for(const m of html.matchAll(/\\bhref="#([^"]+)"/g))assert.ok(ids.has(m[1]),m[1])});
test("Scripts e arquivos essenciais",()=>{for(const n of["showcase.js","showcase.css","showcase-data.js","ambient-gl.js","favicon.svg","robots.txt","sitemap.xml","social-preview.svg"])assert.ok(existsSync(resolve(root,n)),n);for(const n of["showcase.js","showcase-data.js","ambient-gl.js"])new Function(read(n))});

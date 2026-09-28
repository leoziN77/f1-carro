import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {PARTS,LAYERS,CATEGORIES,OVERVIEW} from '../src/data/parts.js';
const en=JSON.parse(fs.readFileSync(new URL('./original-manifest.json',import.meta.url),'utf8'));
test('Todos os cartões mantêm identidade, classificação, liberdade, regras e medidas',()=>{
 assert.deepEqual(Object.keys(PARTS),Object.keys(en.PARTS));
 for(const [id,p] of Object.entries(PARTS)){
  const o=en.PARTS[id];
  assert.equal(p.cat,o.cat,id);assert.equal(p.freedom,o.freedom,id);
  assert.equal(p.rules.length,o.rules.length,id);assert.equal(p.numbers.length,o.numbers.length,id);
  assert.equal(!!p.isNew,!!o.isNew,id);
  const values=(obj)=>JSON.stringify([obj.rules,obj.numbers,obj.summary,obj.isNew]).replace(/(\d),(\d)/g,'$1.$2').match(/\d+(?:\.\d+)?/g)?.sort();
  assert.deepEqual(values(p),values(o),`Valores numéricos: ${id}`);
 }
 assert.deepEqual(LAYERS.map(l=>l.id),en.LAYERS.map(l=>l.id));
 assert.deepEqual(Object.keys(CATEGORIES),Object.keys(en.CATEGORIES));
 assert.equal(OVERVIEW.length,en.OVERVIEW.length);
});
test('Geometria, registro, pivôs, estúdio e dimensões físicas preservados byte a byte',()=>{
 for(const [path,hash] of Object.entries(en.files)){
  assert.equal(createHash('sha256').update(fs.readFileSync(path,'utf8').replace(/\r/g,'')).digest('hex'),hash,path);
 }
});
test('Toda a interface tem idioma e rótulos em português',()=>{
 const html=fs.readFileSync('index.html','utf8');
 assert.match(html,/<html lang="pt-BR">/);
 assert.doesNotMatch(html,/Search parts|Assembling car|Who designs it|Paint colour|X-ray/);
 assert.doesNotMatch(JSON.stringify(Object.values(PARTS)),/\b(must|supplier|wheel|rear|front)\b/i);
 assert.ok(LAYERS.every(l=>l.label));
});

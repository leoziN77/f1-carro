# Validação da entrega

Origem: `bddicken/formula1`, revisão `4c21f009cde1e69b553ab1fd8a9d47f5921f9a30`.
Referências analisadas antes da tradução: site em funcionamento, código completo dos
controles/geometria e vídeo fornecido (73,445 s; amostras do início ao fim).

## Resultados

- `npm ci`: instalação concluída; auditoria sem vulnerabilidades reportadas.
- `npm test`: 3/3 testes aprovados. Compara todos os valores numéricos, número de
  regras, classificações, identificadores e liberdade de projeto dos 43 cartões;
  confirma os hashes da geometria, pivôs, registro e estúdio originais.
- Suíte no navegador: **29/29 aprovados**, relatório em `artifacts/browser-tests.json`.
  Inclui 74 grupos, 43 cartões, 8 camadas, slider intermediário e total, retorno às
  posições montadas, presets, restauração de camada pela seleção, seis vistas,
  raio X, categorias, dimensões, cinco pneus, cinco pinturas, giro, asas ativas,
  zoom, arrasto, toque/pinça sintetizados e seleção por raycasting.
- `npm run build`: concluído. Vite avisa que o bloco principal excede 500 kB;
  o build contém Three.js e o pós-processamento original (cerca de 244 kB gzip).
- Verificação visual do site original e da versão pt-BR, com mesma geometria,
  materiais, iluminação e enquadramento. Comparação em `artifacts/comparacao.jpg`.
- Layout em 390 × 844 e 844 × 390, usando o aplicativo real em iframes de dimensões
  fixas: nenhum controle fora da tela. Pesquisa sem acento e seleção do cartão
  Suspensão verificadas na interface de retrato. Captura em `artifacts/mobile-card.png`.
- Órbita e zoom também acionados com os controles de mouse do navegador.
- Blender MCP: 74 grupos, 392 geometrias compartilhadas e 521 objetos na cena de
  inspeção. Conferidos em vistas montada e explodida. Sem substituição de peças.

## Limites da verificação

Os gestos de toque foram testados por eventos sintetizados nos listeners reais do
aplicativo, não em um celular físico. A inspeção responsiva usa quadros de tamanho
fixo porque o navegador desta sessão não aplicou a substituição de viewport às abas
existentes. Isso verifica layout e interação, mas não mede desempenho de GPU móvel.

Uma aba de testes deixou de responder durante a validação; a suíte foi reaberta em
uma aba limpa, com pausas entre cenários, e terminou com os 29 testes aprovados.
Os avisos de precisão de shader e de depreciação do THREE.Clock também aparecem na
referência original; não houve mudança de versão do Three.js para mascará-los.

Não foi feita auditoria independente do regulamento FIA: a tradução preserva os
valores e o sentido explicativo da revisão original. A geometria é educacional.

## Reproduzir

1. `npm ci`, `npm test` e `npm run build`.
2. `npm run dev -- --host 127.0.0.1`.
3. Abra `http://127.0.0.1:5173/?test=1` e aguarde o relatório.
4. Abra `http://127.0.0.1:5173/tests/responsive.html` para os quadros responsivos.
5. Explore `http://127.0.0.1:5173/` normalmente, sem o parâmetro de teste.

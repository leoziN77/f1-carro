# F1 — Explore as peças

Adaptação fiel do projeto `bddicken/formula1`, em português brasileiro.
Leia [ATTRIBUTION.md](ATTRIBUTION.md) para origem, licença declarada e recursos.
Resultados e limites dos testes estão em [VALIDACAO.md](VALIDACAO.md).

## Executar

Requer Node.js compatível com Vite 8 (validado com Node 24.13.0) e npm.

```sh
npm ci
npm run dev -- --host 127.0.0.1
```

Abra http://127.0.0.1:5173/.

```sh
npm test
npm run build
npm run preview -- --host 127.0.0.1
```

O build fica em `dist/`; a prévia de produção usa http://127.0.0.1:4173/.
Internet é usada apenas para as fontes do Google; há fontes alternativas do sistema.
O carro é gerado no navegador, sem download de modelo 3D.

## Controles

- Arrastar com o botão esquerdo: orbitar. Roda do mouse: zoom.
- Toque: arrastar para orbitar; pinça com dois dedos para zoom; toque na peça para selecionar.
- Presets Montado, Sem carroceria e Explodido; slider de 0 a 100%; oito camadas independentes.
- Passe o cursor para destacar e ler; clique para fixar o cartão. Escape fecha cartões e menus.
- Menu Peças: 43 cartões, pesquisa que aceita termos sem acentos e números de 2026.
- Seis vistas: 3/4, Lateral, Superior, Frente, Traseira e Inferior.
- Cores das regras, raio X, dimensões, giro automático, cinco compostos e cinco pinturas.
- Aero: Curva / Reta aciona os flaps móveis originais das asas dianteira e traseira.

## Organização

- `src/car/`: geometria, registro, materiais e montagem originais.
- `src/data/parts.js`: categorias, camadas, 43 cartões e números em pt-BR.
- `src/ui/`: menus e cartões.
- `src/main.js`: cena, seleção, câmera, explosão e animações.
- `src/dimensions.js`: cotas e rótulos.
- `tests/source.test.mjs`: integridade em relação à revisão original e tradução.
- `tests/browser.js`: testes de integração no aplicativo real; apenas em desenvolvimento.

Para executar a suíte de integração, abra http://127.0.0.1:5173/?test=1 e aguarde
o relatório. Ela movimenta o carro e aciona controles, cartões, camadas e gestos
sintéticos. Abra a URL sem `?test=1` para explorar normalmente. A suíte não entra
no build de produção.

## Blender

Abra `artifacts/f1-inspecao.blend`. Frame 1: montado; 60: explodido; 120: montado.
Os 74 grupos mantêm os nomes originais, matrizes, hierarquia, espelhamentos,
identificadores de cartões, camadas, deslocamentos e metadados dos pivôs móveis.
A raiz converte Y vertical do Three.js para Z vertical do Blender.

Para recriar a cópia:

```sh
npm run export:blender
```

Execute `scripts/import-blender.py` no Blender com `__file__` apontando para o
script. A importação cria uma coleção, preservando outras cenas existentes.
As cores no Blender são simplificadas para inspeção; shaders, texturas e iluminação
procedurais completos continuam no site. A interpolação da linha do tempo do Blender
é ilustrativa; a animação gradual e os atrasos originais permanecem no Three.js.
Nenhuma peça do site foi substituída ou remodelada no Blender.

## Diferenças intencionais

- Tradução integral e ajustes de largura/quebra de linha nos controles e cartões.
- Busca sem acentos, mensagem sem resultados e estados acessíveis dos botões.
- Botão de aerodinâmica ativa: o original já tinha geometria, pivôs e animação, mas
  a revisão analisada não expunha um controle para mudar `aeroTarget`.
- Imagem de compartilhamento e metadados locais em português.
- Ferramentas de exportação/inspeção e testes locais.

O README original menciona presets adicionais, mas a versão efetivamente implementada
no código/site contém três presets. Esta adaptação preserva esses três e as oito camadas.

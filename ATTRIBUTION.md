# Origem e atribuição

Esta é uma adaptação para português brasileiro de **F1 Rules Explorer**, de
**bddicken**, obtida de https://github.com/bddicken/formula1.

- Revisão de origem: `4c21f009cde1e69b553ab1fd8a9d47f5921f9a30`.
- Referência visual: https://formula1parts.vercel.app/ e vídeo fornecido pelo usuário.
- O `package.json` original declara `ISC`. O repositório dessa revisão não contém
  arquivo LICENSE nem aviso completo de copyright/licença. Essa declaração foi
  preservada, sem inventar um titular, ano ou texto de licença para o autor.
  Para redistribuição pública/comercial, é recomendável obter do mantenedor o aviso
  completo correspondente. A implementação e validação desta entrega são locais.
- O histórico Git e os comentários de origem foram preservados.

## Recursos e dependências

- Geometria, iluminação e texturas do carro: construídas proceduralmente pelo
  código original. Nenhum modelo de terceiros, logotipo de equipe ou asset de
  Sketchfab foi adicionado. A cena Blender é uma cópia de inspeção dessa geometria.
- Three.js: MIT, copyright dos autores do Three.js. Texto em
  `node_modules/three/LICENSE` após `npm ci`.
- Vite: MIT; avisos próprios e das dependências em
  `node_modules/vite/LICENSE.md`.
- `@napi-rs/canvas`: MIT; usado somente na ferramenta de exportação para Blender.
  Não é incluído no código do site enviado ao navegador.
- Fontes Inter Tight e JetBrains Mono: fontes abertas sob SIL Open Font License,
  carregadas pelo Google Fonts como na referência. Projetos:
  https://github.com/google/fonts/blob/main/ofl/intertight/OFL.txt e
  https://github.com/JetBrains/JetBrainsMono/blob/master/OFL.txt.
- A imagem `public/og.jpg` veio do repositório original e foi preservada como recurso
  de origem. Os metadados desta adaptação usam `public/og.svg`, com texto em pt-BR.
- O vídeo fornecido serve apenas para análise local; não é distribuído no site.

## Conteúdo técnico

Tradução do conteúdo explicativo da revisão de origem: Regulamento FIA 2026,
Seção C [Técnico], edição 20 de 5 de agosto de 2026; Seção B [Esportivo], edição 07
de 25 de junho de 2026. Classes de componentes: artigo C17 e apêndice C6.
Informações de contexto atribuídas no original à FIA, formula1.com e Pirelli.
Não se trata de publicação oficial da FIA nem de verificação independente da
atualidade de cada regra. Unidades, referências e valores do original foram mantidos.

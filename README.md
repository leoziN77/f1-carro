# Explorador das Regras da F1

Um carro de Fórmula 1 3D interativo e desmontável (three.js) que explica, peça por peça, o Regulamento Técnico da FIA para a Fórmula 1 de 2026. O carro é modelado proceduralmente e propositalmente genérico: sem equipe e sem logotipos.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # build estático em dist/
```

## O que você pode fazer

- **Passe o mouse** sobre qualquer peça para destacá-la e visualizar uma explicação das regras relacionadas. **Clique** para fixar a explicação.
- **Desmontar**: utilize configurações predefinidas (remover carroceria, remover rodas, apenas o chassi, unidade de potência ou vista explodida) ou use o controle deslizante de explosão.
- **Camadas**: ative ou desative carroceria, asas e assoalho, rodas, freios e suspensão, chassi, unidade de potência, cockpit e eletrônica da FIA.
- **Cores das regras**: colore cada peça de acordo com quem é responsável pelo seu projeto (fornecedor único da FIA, especificação definida, unidade de potência, componente transferível, código aberto ou desenvolvido pela equipe).
- **Raio-X**: deixe a carroceria e a célula de sobrevivência transparentes para visualizar o tanque de combustível, a bateria e o motor em suas posições.
- **Dimensões**: exiba as principais medidas regulamentadas do carro.
- **Aerodinâmica ativa**: alterne entre o Modo Curva e o Modo Reta para visualizar a animação das asas móveis de 2026.
- Altere o **composto dos pneus**.

## Mapa do código

| Caminho | Função |
| --- | --- |
| `src/car/geometry.js` | Funções de loft, aerofólio, estruturas, torno e outros recursos utilizados para construir superfícies suaves |
| `src/car/materials.js` | Texturas procedurais de fibra de carbono, coloração térmica, materiais metálicos e prancha, além do shader de pintura baseado em posição |
| `src/car/body.js`, `aero.js`, `corners.js`, `internals.js`, `cockpit.js` | Subconjuntos do carro |
| `src/car/registry.js` | Registro das peças (deslocamentos da vista explodida, camadas e espelhamento) |
| `src/data/parts.js` | Conteúdo das regras, categorias dos componentes e camadas |
| `src/main.js` | Cena, pós-processamento, seleção de peças e animações |
| `src/ui/` | Cartão de informações com linha indicadora e barras de ferramentas superior e inferior |
| `src/dimensions.js` | Sobreposição das dimensões |

## Fontes

Regulamentos da FIA para a Fórmula 1 de 2026: Seção C [Técnico] (Edição 20, 5 de agosto de 2026) e Seção B [Esportivo] (Edição 07, 25 de junho de 2026).

As classificações dos componentes são baseadas no Artigo C17 / Apêndice C6.

Informações complementares provenientes da FIA, Formula1.com e Pirelli.

Este projeto é uma explicação simplificada. **Os regulamentos oficiais são sempre o texto de referência e têm caráter vinculante.**

// Rules content for every hoverable part.
//
// Source: FIA 2026 Formula 1 Regulations — Section C [Technical] (Issue 20,
// 5 Aug 2026) and Section B [Sporting] (Issue 07, 25 Jun 2026), with context
// from FIA / formula1.com / Pirelli communications. Component classes follow
// Technical Article C17 and Appendix C6. Anything not listed there defaults to
// a Listed Team Component (LTC). This is a simplified explainer — consult the
// regulations for the binding wording.

// Category colours: muted, broadcast-style hues, validated as a set on the dark
// UI surface (all-pairs ΔE ≥ 17 normal vision, ≥ 8 under protan/deutan
// simulation, ≥ 3:1 contrast). Categories are always labelled in text too.
export const CATEGORIES = {
  "SSC": {
    "label": "Fornecedor único FIA",
    "short": "SSC",
    "color": "#25d0c6",
    "who": "Um fornecedor escolhido pela FIA produz a peça para todas as equipes."
  },
  "DSC": {
    "label": "Especificação FIA",
    "short": "DSC",
    "color": "#d6ab3a",
    "who": "Fabricado conforme especificação da FIA por fornecedores aprovados."
  },
  "PU": {
    "label": "Unidade de potência",
    "short": "PU",
    "color": "#ac4f1c",
    "who": "Fornecido pelo fabricante da unidade de potência da equipe."
  },
  "TRC": {
    "label": "Transferível",
    "short": "TRC",
    "color": "#bf81d5",
    "who": "Projetado pela equipe ou comprado de outra equipe."
  },
  "OSC": {
    "label": "Projeto aberto",
    "short": "OSC",
    "color": "#5e9a45",
    "who": "Um projeto aberto compartilhado entre as equipes."
  },
  "LTC": {
    "label": "Projeto da equipe (LTC)",
    "short": "LTC",
    "color": "#436db9",
    "who": "Cada equipe desenvolve seu próprio projeto."
  }
};

export const LAYERS = [
  {
    "id": "body",
    "label": "Carroceria"
  },
  {
    "id": "aero",
    "label": "Asas e assoalho"
  },
  {
    "id": "wheels",
    "label": "Rodas e pneus"
  },
  {
    "id": "corners",
    "label": "Freios e suspensão"
  },
  {
    "id": "chassis",
    "label": "Chassi e segurança"
  },
  {
    "id": "pu",
    "label": "Motor e transmissão"
  },
  {
    "id": "cockpit",
    "label": "Piloto e cockpit"
  },
  {
    "id": "electronics",
    "label": "Eletrônica FIA"
  }
];

export const PARTS = {
  "front-wing": {
    "name": "Asa dianteira",
    "cat": "LTC",
    "group": "Aerodinâmica",
    "freedom": 3,
    "summary": "Gera carga aerodinâmica na dianteira e direciona o fluxo de ar para o restante do carro.",
    "rules": [
      "Até três elementos. Os dois flaps traseiros são móveis.",
      "100 mm mais estreita que em 2025.",
      "Deve passar por testes de carga para impedir flexão que gere vantagem aerodinâmica.",
      "Placas laterais mais simples, sem dispositivos para desviar o ar para fora."
    ],
    "numbers": [
      [
        "Elementos",
        "≤ 3"
      ],
      [
        "Variação da largura",
        "−100 mm"
      ]
    ],
    "isNew": "Aerodinâmica ativa: os flaps agora se movem."
  },
  "front-wing-flaps": {
    "name": "Flaps da asa dianteira (ativos)",
    "cat": "LTC",
    "group": "Aerodinâmica",
    "freedom": 3,
    "summary": "Os dois flaps traseiros da asa dianteira ficam mais planos no modo Reta para reduzir o arrasto.",
    "rules": [
      "Todos os pilotos podem abri-los nas zonas de ativação da FIA, independentemente da distância para o carro à frente.",
      "Controlados pela ECU padrão da FIA, com atuadores de projeto aberto.",
      "Com baixa aderência, a FIA pode liberar apenas a asa dianteira.",
      "Em caso de falha, retornam ao modo Curva."
    ],
    "numbers": [
      [
        "Modos",
        "Curva / Reta"
      ],
      [
        "DRS",
        "Removido"
      ]
    ],
    "isNew": "Substitui o DRS. Inicialmente chamados de “modo Z / modo X”."
  },
  "rear-wing": {
    "name": "Asa traseira",
    "cat": "LTC",
    "group": "Aerodinâmica",
    "freedom": 3,
    "summary": "A principal fonte de carga aerodinâmica na traseira, agora sem a asa inferior (beam wing).",
    "rules": [
      "Até três elementos. Todos, exceto o dianteiro, giram.",
      "Sem asa inferior (beam wing).",
      "Cada placa lateral leva uma luz de chuva da FIA.",
      "Deve passar pelos testes de deflexão da FIA."
    ],
    "numbers": [
      [
        "Elementos",
        "≤ 3"
      ],
      [
        "Luzes nas placas laterais",
        "2 (obrigatórias)"
      ]
    ],
    "isNew": "Remoção da asa inferior e inclusão de luzes na asa traseira."
  },
  "rear-wing-flaps": {
    "name": "Flaps da asa traseira (ativos)",
    "cat": "LTC",
    "group": "Aerodinâmica",
    "freedom": 3,
    "summary": "Os elementos superiores da asa traseira giram e se abrem no modo Reta para reduzir o arrasto nas retas.",
    "rules": [
      "A mudança de modo deve ocorrer em até 400 ms.",
      "Controlados pela ECU padrão da FIA; em caso de falha, retornam ao modo Curva.",
      "Usados por todos os pilotos nas zonas de ativação, sem exigência de distância para o carro à frente.",
      "O auxílio à ultrapassagem passa a vir do modo Ultrapassagem da unidade de potência."
    ],
    "numbers": [
      [
        "Tempo de mudança",
        "≤ 400 ms"
      ],
      [
        "Padrão",
        "Modo Curva"
      ]
    ],
    "isNew": "Substitui o DRS."
  },
  "rear-wing-pylons": {
    "name": "Suportes da asa traseira",
    "cat": "LTC",
    "group": "Aerodinâmica",
    "freedom": 4,
    "summary": "Os suportes em “pescoço de cisne” fixam a asa traseira à estrutura de impacto traseira.",
    "rules": [
      "Devem caber nos volumes de referência da asa traseira.",
      "Devem sustentar a asa nos testes de carga da FIA.",
      "São considerados carroceria para fins de medição."
    ],
    "numbers": []
  },
  "floor": {
    "name": "Assoalho",
    "cat": "LTC",
    "group": "Aerodinâmica",
    "freedom": 3,
    "summary": "Junto com o difusor, é a superfície aerodinâmica mais importante do carro, agora apenas parcialmente plana.",
    "rules": [
      "150 mm mais estreito que em 2025.",
      "Túneis mais rasos reduzem o efeito solo e as oscilações verticais (porpoising).",
      "Deve caber nos volumes de referência da FIA.",
      "Deve passar pelos testes de carga e deflexão da FIA."
    ],
    "numbers": [
      [
        "Variação da largura",
        "−150 mm"
      ],
      [
        "Carga aerodinâmica (carro)",
        "≈ −30 %"
      ]
    ],
    "isNew": "Assoalho parcialmente plano."
  },
  "diffuser": {
    "name": "Difusor",
    "cat": "LTC",
    "group": "Aerodinâmica",
    "freedom": 3,
    "summary": "A seção traseira ascendente do assoalho reduz a pressão sob o carro para gerar carga aerodinâmica.",
    "rules": [
      "Mais baixo e menos potente que em 2025.",
      "Aletas e paredes devem caber nos volumes de referência.",
      "Testado como parte do assoalho."
    ],
    "numbers": []
  },
  "plank": {
    "name": "Prancha de desgaste (plank)",
    "cat": "LTC",
    "group": "Aerodinâmica",
    "freedom": 1,
    "summary": "Uma faixa de desgaste sob o assoalho impede que as equipes rodem com o carro perigosamente baixo.",
    "rules": [
      "10 mm de espessura quando nova, em até três peças.",
      "Deve manter 8 mm de espessura após a corrida.",
      "Qualquer material com densidade relativa de 1,3–1,45.",
      "Patim dianteiro de titânio ou aço."
    ],
    "numbers": [
      [
        "Espessura nova",
        "10 mm"
      ],
      [
        "Mín. após desgaste",
        "8 mm"
      ],
      [
        "Furos de inspeção",
        "3 × Ø34 mm"
      ]
    ]
  },
  "sidepods": {
    "name": "Sidepods (laterais)",
    "cat": "LTC",
    "group": "Carroceria",
    "freedom": 4,
    "summary": "Abrigam os radiadores e a eletrônica e são a área de maior liberdade visual de projeto das equipes.",
    "rules": [
      "Devem caber nos volumes de referência da carroceria definidos pela FIA.",
      "Entrada de ar, recorte inferior e formato ficam a critério da equipe.",
      "Devem envolver as estruturas de impacto lateral e os radiadores."
    ],
    "numbers": []
  },
  "wake-boards": {
    "name": "Defletores da esteira das rodas",
    "cat": "LTC",
    "group": "Carroceria",
    "freedom": 3,
    "summary": "Placas verticais à frente dos sidepods desviam a esteira dos pneus dianteiros para longe do assoalho.",
    "rules": [
      "Tamanho e posição limitados pelos volumes de referência.",
      "Substituem os arcos sobre as rodas dianteiras de 2022–25, agora proibidos."
    ],
    "numbers": [],
    "isNew": "Novo dispositivo para 2026."
  },
  "engine-cover": {
    "name": "Carenagem do motor",
    "cat": "LTC",
    "group": "Carroceria",
    "freedom": 4,
    "summary": "Envolve a unidade de potência e direciona o ar para a asa traseira e o difusor.",
    "rules": [
      "Deve caber nos volumes de referência da carroceria definidos pela FIA.",
      "Sem bordas cortantes: aplicam-se regras de raio mínimo.",
      "Aberturas de refrigeração permitidas em áreas determinadas."
    ],
    "numbers": []
  },
  "mirrors": {
    "name": "Retrovisores",
    "cat": "LTC",
    "group": "Carroceria",
    "freedom": 2,
    "summary": "As carcaças dos retrovisores agora também levam uma luz de segurança que indica o estado do sistema de energia.",
    "rules": [
      "Área refletiva de 200 × 50 mm.",
      "A lente é uma peça de projeto aberto.",
      "Cada carcaça leva uma luz de segurança da FIA."
    ],
    "numbers": [
      [
        "Espelho",
        "200 × 50 mm"
      ]
    ],
    "isNew": "Luzes laterais de estado do sistema."
  },
  "survival-cell": {
    "name": "Célula de sobrevivência (monocoque)",
    "cat": "LTC",
    "group": "Chassi e segurança",
    "freedom": 3,
    "summary": "A estrutura de carbono, submetida a testes de impacto, abriga o piloto, o tanque e a bateria.",
    "rules": [
      "Deve passar pelos testes de carga e impacto da FIA antes de competir.",
      "Painéis laterais contra intrusão. Zylon é permitido.",
      "O cockpit deve atender aos gabaritos da FIA.",
      "Cargas de teste maiores que em 2025."
    ],
    "numbers": [
      [
        "Material",
        "Compósito de carbono + Zylon"
      ]
    ],
    "isNew": "Exigências mais rigorosas de resistência a impacto e intrusão."
  },
  "nose": {
    "name": "Bico / estrutura de impacto frontal",
    "cat": "LTC",
    "group": "Chassi e segurança",
    "freedom": 3,
    "summary": "Uma estrutura deformável absorve energia em impactos frontais.",
    "rules": [
      "Deve passar pelos testes de impacto frontal da FIA.",
      "Projeto em dois estágios capaz de absorver um segundo impacto.",
      "Carga de teste elevada de 141 kN para 167 kN."
    ],
    "numbers": [
      [
        "Projeto",
        "Dois estágios"
      ]
    ],
    "isNew": "Estrutura de impacto em dois estágios."
  },
  "roll-structure": {
    "name": "Santo-antônio e entrada de ar",
    "cat": "LTC",
    "group": "Chassi e segurança",
    "freedom": 2,
    "summary": "A estrutura acima da cabeça do piloto o protege em capotamentos e abriga a entrada de ar.",
    "rules": [
      "Deve resistir a um impacto vertical de 20 g (antes, 16 g).",
      "Deve suportar uma carga estática de 172 kN.",
      "Deve alcançar 968 mm acima do plano de referência."
    ],
    "numbers": [
      [
        "Impacto",
        "20 g"
      ],
      [
        "Carga estática",
        "172 kN"
      ],
      [
        "Altura de referência",
        "968 mm"
      ]
    ],
    "isNew": "Carga de impacto do santo-antônio elevada de 16 g para 20 g."
  },
  "halo": {
    "name": "Halo",
    "cat": "DSC",
    "group": "Chassi e segurança",
    "freedom": 1,
    "summary": "Uma barra de titânio ao redor do cockpit, igual para todas as equipes, protege a cabeça do piloto.",
    "rules": [
      "Fabricado conforme a norma FIA 8869-2018.",
      "Titânio grau 5, cerca de 7 kg.",
      "Fixações testadas a 140 kN.",
      "Pequenas carenagens aerodinâmicas são permitidas. A estrutura em si é padronizada."
    ],
    "numbers": [
      [
        "Massa",
        "≈ 7 kg"
      ],
      [
        "Teste de fixação",
        "140 kN"
      ],
      [
        "Material",
        "Ti6Al4V"
      ]
    ]
  },
  "side-impact": {
    "name": "Estruturas de impacto lateral",
    "cat": "DSC",
    "group": "Chassi e segurança",
    "freedom": 1,
    "summary": "Tubos deformáveis em cada lado da célula de sobrevivência absorvem energia em impactos laterais.",
    "rules": [
      "Estruturas superior e inferior em cada lado.",
      "Devem passar pelos testes de impacto lateral da FIA."
    ],
    "numbers": [
      [
        "Por lado",
        "2"
      ]
    ]
  },
  "rear-impact-structure": {
    "name": "Estrutura de impacto traseira",
    "cat": "TRC",
    "group": "Chassi e segurança",
    "freedom": 3,
    "summary": "Uma estrutura atrás do câmbio absorve energia em impactos traseiros.",
    "rules": [
      "Deve passar pelos testes de impacto traseiro da FIA.",
      "Frequentemente comprada junto com o câmbio."
    ],
    "numbers": []
  },
  "fuel-cell": {
    "name": "Tanque de combustível",
    "cat": "LTC",
    "group": "Chassi e segurança",
    "freedom": 2,
    "summary": "Uma bolsa flexível de borracha entre o piloto e o motor armazena o combustível.",
    "rules": [
      "Uma bolsa conforme especificação FIA dentro da célula de sobrevivência.",
      "Medidor de fluxo de combustível e bombas fornecidos pela FIA.",
      "Sem limite de combustível, mas com fluxo de energia limitado a 3000 MJ/h.",
      "Reabastecimento proibido durante a corrida."
    ],
    "numbers": [
      [
        "Combustível",
        "100 % sustentável"
      ],
      [
        "Fluxo de energia",
        "≤ 3000 MJ/h"
      ]
    ],
    "isNew": "Combustível avançado 100 % sustentável."
  },
  "tyres": {
    "name": "Pneus",
    "cat": "SSC",
    "group": "Rodas e pneus",
    "freedom": 0,
    "summary": "Pneus Pirelli iguais para todas as equipes, com o composto identificado pela cor na lateral.",
    "rules": [
      "Mais estreitos que em 2025: −25 mm na dianteira e −30 mm na traseira.",
      "Cinco compostos de pista seca; três por fim de semana de corrida.",
      "Mantas térmicas permitidas, exceto nos pneus de chuva extrema."
    ],
    "numbers": [
      [
        "Aro",
        "18\""
      ],
      [
        "Largura dianteira",
        "−25 mm"
      ],
      [
        "Largura traseira",
        "−30 mm"
      ],
      [
        "Compostos de pista seca",
        "C1–C5"
      ]
    ],
    "isNew": "Pneus mais estreitos e com diâmetros menores."
  },
  "rims": {
    "name": "Aros das rodas",
    "cat": "OSC",
    "group": "Rodas e pneus",
    "freedom": 2,
    "summary": "Rodas de magnésio de 18 polegadas, cada uma fixada por uma única porca central.",
    "rules": [
      "Liga de magnésio AZ70 ou AZ80.",
      "Uma porca por roda, com retenção em dois estágios.",
      "Três cabos por roda a mantêm presa em caso de acidente."
    ],
    "numbers": [
      [
        "Diâmetro",
        "18\""
      ],
      [
        "Cabos de retenção",
        "3 por roda"
      ],
      [
        "Material",
        "Magnésio"
      ]
    ],
    "isNew": "Deixam de ser fornecidas por um único fornecedor padrão."
  },
  "wheel-covers": {
    "name": "Calotas das rodas",
    "cat": "LTC",
    "group": "Rodas e pneus",
    "freedom": 1,
    "summary": "Coberturas obrigatórias impedem que as equipes usem os raios das rodas como dispositivos aerodinâmicos.",
    "rules": [
      "Um disco anular na face externa da roda.",
      "Compósito ou polímero.",
      "Centro aberto para acesso à porca da roda."
    ],
    "numbers": []
  },
  "brake-discs": {
    "name": "Discos de freio",
    "cat": "OSC",
    "group": "Freios e suspensão",
    "freedom": 2,
    "summary": "Discos de carbono-carbono que operam acima de 1000 °C.",
    "rules": [
      "Até 34 mm de espessura.",
      "Diâmetro: 325–345 mm na dianteira e 260–280 mm na traseira.",
      "Material carbono-carbono.",
      "As pastilhas também são de projeto aberto."
    ],
    "numbers": [
      [
        "Ø dianteiro",
        "325–345 mm"
      ],
      [
        "Ø traseiro",
        "260–280 mm"
      ],
      [
        "Espessura",
        "≤ 34 mm"
      ]
    ]
  },
  "brake-calipers": {
    "name": "Pinças de freio",
    "cat": "OSC",
    "group": "Freios e suspensão",
    "freedom": 2,
    "summary": "Pinças de alumínio pressionam as pastilhas contra os discos de freio.",
    "rules": [
      "Alumínio, com 1–4 pares de pistões.",
      "O controle eletrônico dos freios traseiros pode aplicar até 1,2× a pressão do piloto.",
      "Cilindros-mestres e controle eletrônico dos freios também são de projeto aberto."
    ],
    "numbers": [
      [
        "Material",
        "Alumínio"
      ],
      [
        "Pistões",
        "1–4 pares"
      ]
    ]
  },
  "brake-ducts": {
    "name": "Dutos de freio",
    "cat": "LTC",
    "group": "Freios e suspensão",
    "freedom": 3,
    "summary": "Entradas de ar e tambores conduzem ar de refrigeração aos freios.",
    "rules": [
      "Devem caber nos volumes de referência da região das rodas.",
      "Dispositivos aerodinâmicos nessas peças são bastante restritos."
    ],
    "numbers": []
  },
  "uprights": {
    "name": "Mangas de eixo e cubos",
    "cat": "TRC",
    "group": "Freios e suspensão",
    "freedom": 3,
    "summary": "Sustentam os rolamentos das rodas e os freios e conectam os braços da suspensão a cada roda.",
    "rules": [
      "O esterçamento pode alterar a altura do carro em no máximo 2 mm."
    ],
    "numbers": [
      [
        "Efeito na altura",
        "≤ 2 mm"
      ]
    ]
  },
  "suspension": {
    "name": "Suspensão",
    "cat": "TRC",
    "group": "Freios e suspensão",
    "freedom": 3,
    "summary": "Braços triangulares de carbono, hastes de acionamento por compressão ou tração e barras de direção; o conjunto deve ser totalmente passivo.",
    "rules": [
      "Totalmente passiva: sem sistemas ativos ou ajustes em movimento.",
      "Sem interconexão entre dianteira e traseira.",
      "Sem inerters ou amortecedores de massa sintonizada."
    ],
    "numbers": [
      [
        "Tipo",
        "Apenas passiva"
      ]
    ]
  },
  "driveshafts": {
    "name": "Semieixos",
    "cat": "OSC",
    "group": "Freios e suspensão",
    "freedom": 2,
    "summary": "Transmitem o torque do diferencial às rodas traseiras.",
    "rules": [
      "Tração apenas nas rodas traseiras."
    ],
    "numbers": []
  },
  "ice": {
    "name": "Motor a combustão interna",
    "cat": "PU",
    "group": "Unidade de potência",
    "freedom": 1,
    "summary": "Um V6 turbo de 1,6 litro produz cerca de metade da potência do carro com combustível sustentável.",
    "rules": [
      "V6 de 1,6 litro a 90°, diâmetro dos cilindros de 80 mm e taxa de compressão ≤ 16.",
      "Fluxo de energia do combustível limitado a 3000 MJ/h.",
      "3 por piloto por temporada (4 em 2026); exceder implica punições no grid.",
      "Fabricado por Mercedes, Ferrari, Honda, Red Bull Ford e Audi."
    ],
    "numbers": [
      [
        "Configuração",
        "V6 turbo de 1,6 L"
      ],
      [
        "Potência a combustão",
        "≈ 400 kW"
      ],
      [
        "Massa mín. da unidade",
        "185 kg"
      ]
    ],
    "isNew": "Novo regulamento de unidades de potência."
  },
  "turbo": {
    "name": "Turbocompressor",
    "cat": "PU",
    "group": "Unidade de potência",
    "freedom": 1,
    "summary": "Um único turbocompressor comprime o ar de admissão, agora sem MGU-H.",
    "rules": [
      "Sem MGU-H a partir de 2026, reduzindo custo e complexidade.",
      "3 por piloto por temporada."
    ],
    "numbers": [
      [
        "MGU-H",
        "Removido"
      ],
      [
        "Cota",
        "3 / temporada"
      ]
    ],
    "isNew": "Remoção do MGU-H."
  },
  "mgu-k": {
    "name": "MGU-K (motor-gerador)",
    "cat": "PU",
    "group": "Unidade de potência",
    "freedom": 1,
    "summary": "Recupera energia nas frenagens e fornece até 350 kW, cerca de metade da potência do carro.",
    "rules": [
      "Até 350 kW e 500 Nm.",
      "Recupera até 8,5 MJ por volta.",
      "A potência máxima é reduzida progressivamente por volta de 290 km/h.",
      "O modo Ultrapassagem, a cerca de 1 s do carro à frente, mantém a potência máxima até aproximadamente 337 km/h."
    ],
    "numbers": [
      [
        "Potência",
        "350 kW"
      ],
      [
        "Torque",
        "500 Nm"
      ],
      [
        "Recarga",
        "8,5 MJ/volta"
      ],
      [
        "Cota",
        "2 / temporada"
      ]
    ],
    "isNew": "Potência quase triplicada. O modo Ultrapassagem substitui o DRS como auxílio para ultrapassar."
  },
  "energy-store": {
    "name": "Armazenamento de energia (bateria)",
    "cat": "PU",
    "group": "Unidade de potência",
    "freedom": 1,
    "summary": "A bateria de íons de lítio armazena a energia recuperada e fica sob o tanque de combustível.",
    "rules": [
      "Pelo menos 35 kg.",
      "A variação do estado de carga não pode exceder 4 MJ.",
      "2 por piloto por temporada."
    ],
    "numbers": [
      [
        "Massa mín.",
        "35 kg"
      ],
      [
        "Janela de carga",
        "4 MJ"
      ]
    ]
  },
  "control-electronics": {
    "name": "Eletrônica de controle",
    "cat": "PU",
    "group": "Unidade de potência",
    "freedom": 1,
    "summary": "A eletrônica de potência gerencia o fluxo de energia entre o MGU-K e a bateria.",
    "rules": [
      "2 por piloto por temporada.",
      "Deve atender às regras de segurança de alta tensão da FIA."
    ],
    "numbers": [
      [
        "Cota",
        "2 / temporada"
      ]
    ]
  },
  "exhaust": {
    "name": "Escapamento",
    "cat": "PU",
    "group": "Unidade de potência",
    "freedom": 2,
    "summary": "Reúne os gases dos cilindros, alimenta a turbina e os libera por uma única saída central.",
    "rules": [
      "Uma saída central atrás do eixo traseiro.",
      "Diâmetro interno de 90–130 mm, levemente inclinada para cima.",
      "As peças após a turbina podem ser compradas de outra equipe.",
      "3 conjuntos por piloto por temporada."
    ],
    "numbers": [
      [
        "Saída",
        "390–400 mm atrás do eixo"
      ],
      [
        "Diâmetro interno",
        "Ø90–130 mm"
      ]
    ]
  },
  "gearbox": {
    "name": "Câmbio",
    "cat": "TRC",
    "group": "Unidade de potência",
    "freedom": 3,
    "summary": "Um câmbio sequencial de oito marchas também sustenta a suspensão traseira e a estrutura de impacto.",
    "rules": [
      "8 marchas mais a ré. Sem CVT ou trocas automáticas.",
      "Relações definidas antes da temporada, com uma alteração permitida em 2026.",
      "Equipes clientes devem usar as relações do fornecedor.",
      "Sensor de torque fornecido pela FIA."
    ],
    "numbers": [
      [
        "Marchas",
        "8 + R"
      ],
      [
        "Troca ascendente",
        "≤ 200 ms"
      ]
    ]
  },
  "radiators": {
    "name": "Radiadores",
    "cat": "LTC",
    "group": "Unidade de potência",
    "freedom": 4,
    "summary": "Trocadores de calor nos sidepods resfriam o motor, o óleo, o ar de admissão e os sistemas elétricos.",
    "rules": [
      "Radiadores principais são projetados pela equipe. Os secundários podem ser comprados.",
      "Seu tamanho e inclinação determinam o formato dos sidepods."
    ],
    "numbers": []
  },
  "driver": {
    "name": "Equipamentos de segurança do piloto",
    "cat": "DSC",
    "group": "Piloto e cockpit",
    "freedom": 0,
    "summary": "Piloto, banco e lastro devem pesar pelo menos 82 kg, com todos os equipamentos de segurança homologados pela FIA.",
    "rules": [
      "Capacete, HANS, macacão, luvas e botas devem ter homologação FIA.",
      "Luvas biométricas e acelerômetros intra-auriculares da FIA.",
      "Piloto mais lastro: pelo menos 82 kg.",
      "O piloto deve sair do carro em até 7 s."
    ],
    "numbers": [
      [
        "Piloto + lastro",
        "≥ 82 kg"
      ],
      [
        "Teste de saída",
        "7 s"
      ]
    ]
  },
  "seat": {
    "name": "Banco",
    "cat": "LTC",
    "group": "Piloto e cockpit",
    "freedom": 3,
    "summary": "Um banco de carbono moldado ao piloto pode ser retirado com ele ainda preso pelos cintos.",
    "rules": [
      "Removível, com no máximo dois fixadores.",
      "A equipe médica pode retirar o piloto junto com o banco."
    ],
    "numbers": [
      [
        "Fixadores",
        "≤ 2"
      ]
    ]
  },
  "steering-wheel": {
    "name": "Volante",
    "cat": "OSC",
    "group": "Piloto e cockpit",
    "freedom": 3,
    "summary": "Um volante de carbono com tela e dezenas de controles de energia, freios e diferencial.",
    "rules": [
      "Deve ser removido rapidamente: saída do piloto e recolocação em até 12 s.",
      "As luzes de aviso da FIA são comandadas pela ECU padrão."
    ],
    "numbers": [
      [
        "Saída + recolocação",
        "≤ 12 s"
      ]
    ]
  },
  "headrest": {
    "name": "Apoio de cabeça e proteção do cockpit",
    "cat": "LTC",
    "group": "Piloto e cockpit",
    "freedom": 1,
    "summary": "Espuma que absorve energia e limita o movimento da cabeça do piloto em impactos.",
    "rules": [
      "Três peças de espuma absorvente de energia aprovada pela FIA.",
      "Tamanho mínimo e posição definidos pelo regulamento.",
      "Removível para a extração do piloto."
    ],
    "numbers": [
      [
        "Peças",
        "3"
      ]
    ]
  },
  "ecu": {
    "name": "ECU padrão",
    "cat": "SSC",
    "group": "Eletrônica FIA",
    "freedom": 0,
    "summary": "A unidade eletrônica de controle padrão da FIA, usada por todos os carros, controla motor, energia e aerodinâmica ativa.",
    "rules": [
      "Fabricada pela Motion Applied para 2026–2030.",
      "Controla a aerodinâmica ativa e o modo Ultrapassagem.",
      "Comanda as luzes de aviso do cockpit."
    ],
    "numbers": [
      [
        "Fornecedor",
        "Motion Applied"
      ]
    ]
  },
  "rear-light": {
    "name": "Luz traseira",
    "cat": "SSC",
    "group": "Eletrônica FIA",
    "freedom": 0,
    "summary": "Uma luz LED padrão da FIA é usada na chuva e pode piscar para indicar o estado do sistema de energia.",
    "rules": [
      "Uma das três luzes traseiras; as outras duas ficam nas placas laterais da asa traseira.",
      "A FIA define quando ela deve acender."
    ],
    "numbers": [
      [
        "Luzes traseiras",
        "3"
      ]
    ],
    "isNew": "Duas luzes adicionais nas placas laterais da asa."
  },
  "cameras": {
    "name": "Carcaças das câmeras de TV",
    "cat": "SSC",
    "group": "Eletrônica FIA",
    "freedom": 0,
    "summary": "Câmeras a bordo em posições obrigatórias, incluindo a T-cam acima do santo-antônio.",
    "rules": [
      "Inclui o gravador de dados de acidentes e uma câmera de alta velocidade no cockpit.",
      "Carcaças de câmeras ou de lastro ocupam posições fixas."
    ],
    "numbers": []
  }
};

export const OVERVIEW = [
  [
    "Massa mín.",
    "724 kg + massa nominal dos pneus (≈ 770 kg)"
  ],
  [
    "Entre-eixos máx.",
    "3400 mm"
  ],
  [
    "Largura máx.",
    "1900 mm"
  ],
  [
    "Potência",
    "≈ 400 kW a combustão + 350 kW MGU-K"
  ],
  [
    "Aerodinâmica",
    "≈ −30 % de carga, ≈ −55 % de arrasto"
  ],
  [
    "Teto de gastos",
    "US$ 215 milhões (equipes)"
  ]
];

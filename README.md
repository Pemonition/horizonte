# Horizonte

SPA Angular para explorar imagens reais da NASA, salvar descobertas e escrever um diário de observações. Projeto de estudo baseado no enunciado **Da capa para a tela**.

## 1. Resumo do pedido

Partir de uma capa de álbum ou pôster para criar um conceito, um moodboard, uma identidade visual e uma aplicação. A capa inspira a experiência, mas não aparece dentro do aplicativo. A entrega prevê GitHub, README, CONCEITO.md, moodboard e identidade visual em PDF ou imagem, e a aplicação funcionando.

Avaliação: conceito e função 20%; moodboard 15%; identidade 15%; requisitos técnicos 25%; signals 15%; acabamento e apresentação 10%. O documento informa que usar `*ngIf`/`*ngFor` ou mostrar a capa na aplicação zera o critério técnico.

## 2. Explicação da atividade

O objetivo não é copiar o pôster: é transformar sua ideia em uma ação. Aqui, exploração vira busca de imagens, seleção de descobertas e registro pessoal. O moodboard reúne referências para justificar atmosfera e forma. A identidade fecha as decisões. Os esboços demonstram essas escolhas antes das telas finais.

`signal` guarda o que pode mudar por uma ação, como o texto de um formulário ou uma coleção. `computed` deriva o que já pode ser calculado, como contagens, filtros e validade; assim não é preciso sincronizar dois estados manualmente. `input()` recebe dados no cartão, e `output()` comunica a intenção de salvar ao pai. O serviço usa `inject(HttpClient)` para concentrar as chamadas HTTP.

## 3. Executar a implementação

Requisitos: Node.js 24.15 ou superior da linha 24, npm e internet para instalar pacotes e consumir a NASA. Desenvolvido com Node 24.21 e Angular 22.

```powershell
cd "C:\Users\hugoj\Desktop\Curso CSharp\projeto-angular-01"
npm ci
npm start
```

Abra http://localhost:4200. Em uma instalação já pronta, basta `npm start`.

```powershell
npm run build
npm test -- --watch=false
```

Build estático: `dist/spa_http/browser`. O servidor de produção deve redirecionar caminhos desconhecidos para `index.html`, permitindo abrir detalhes diretamente.

## Rotas e uso

- `/explorar`: busca real na NASA, com sugestões e até 24 resultados. Use termos em inglês.
- `/descoberta/:id`: detalhe consultado diretamente na API, inclusive ao recarregar a página.
- `/colecao`: imagens salvas, com filtro local por título ou centro.
- `/diario`: formulário de título, descoberta e observação; lista e exclusão confirmada.
- Qualquer outro endereço: página 404 no tema.

Salve uma imagem antes de escrever no diário. Coleção e observações persistem em `localStorage`, apenas neste navegador e origem. Não há conta, sincronização entre dispositivos ou backend próprio. Remover uma imagem da coleção preserva as observações já escritas. Os dados pessoais do diário não são enviados à NASA.

## Mapa dos requisitos

| Requisito | Implementação |
|---|---|
| 3 rotas, menu ativo, parâmetro, `**` | `src/app/routes.ts`, `app.ts` |
| Dois componentes com `input()` | `DiscoveryCard` e `Stat`, em `components.ts` |
| Comunicação com `output()` | `DiscoveryCard.toggle`, tratado nas páginas |
| `@if`, `@for`, `track`, `@empty` | Explorar, Coleção e Diário |
| Estado em signals | Serviço, store e componentes |
| Pelo menos 3 derivados reais | `savedIds`, `savedCount`, `entryCount`, `observedCount`, `filtered`, `valid` |
| Serviço com `inject()` e API pública | `nasa.service.ts`, NASA Image and Video Library |
| Carregando, erro, repetição da tentativa | Explorar e Detalhes; timeout de 20 segundos |
| Formulário validado | Template-driven (`FormsModule`/`ngModel`) com estado em signals. Diário: título 3–80; observação 10–1500; descoberta obrigatória |
| Tailwind como base | PostCSS + Tailwind 4; utilitários em todos os templates |
| Responsivo | Grade de 1/2/3 colunas, navegação com quebra, formulário adaptável |

## Materiais de criação

- [Conceito e transparência sobre IA](CONCEITO.md)
- [Moodboard: 12 referências](docs/moodboard.pdf)
- [Identidade visual](docs/identidade-visual.pdf)
- [Duas telas esboçadas](docs/esbocos.pdf)
- [Fontes e créditos](docs/REFERENCIAS.md)

As imagens NASA são referências reais; as duas interfaces são capturas dos sites NASA e ESA. A imagem de abertura mostra as Galáxias Antenas, fotografadas por Kent E. Biggs e publicadas no APOD/NASA em 07/02/2024. O arquivo de alta resolução está disponível ao clicar na fotografia. A imagem tem copyright do fotógrafo; a publicação no APOD não constitui licença comercial. O projeto não é afiliado à NASA, ESA ou ao filme.

## Roteiro de apresentação de 5 minutos

1. 0:00–0:40 — mostrar o pôster fora do aplicativo e explicar exploração.
2. 0:40–1:20 — mostrar o moodboard, comentar escala e luz.
3. 1:20–2:00 — explicar paleta, contraste, tipografia e esboços.
4. 2:00–3:40 — buscar, abrir um detalhe, salvar e registrar no diário.
5. 3:40–5:00 — abrir `journal.store.ts` e `diary.ts`; explicar por que contagens e validade são `computed`, e como atualizações imutáveis funcionam.

## Pendências externas à implementação

A referência é uma proposta da IA: confirmar disponibilidade na turma e revisar escolhas e regras de autoria com o professor. O repositório remoto no GitHub não é criado automaticamente; é necessário escolher conta, nome e visibilidade. O projeto está pronto para versionamento, com dependências e arquivos temporários ignorados.

## Fontes técnicas

- [NASA API](https://images.nasa.gov/docs/images.nasa.gov_api_docs.pdf)
- [Angular signals](https://angular.dev/guide/signals)
- [Angular inputs](https://angular.dev/guide/signals/inputs)
- [Angular e Tailwind](https://angular.dev/guide/tailwind)

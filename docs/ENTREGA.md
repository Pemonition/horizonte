# Apresentação — Horizonte

Repositório: https://github.com/Pemonition/horizonte

## Rodar na apresentação

Na raiz, execute `npm ci` e `npm start -- --host 127.0.0.1 --port 4205`. Abra http://127.0.0.1:4205. O GitHub contém o código; não há hospedagem pública criada nesta entrega.

## Roteiro de cinco minutos

1. **0:00–0:45:** mostre a referência indicada em CONCEITO.md. Conceito: exploração. Explique a figura humana pequena diante de um mundo imenso.
2. **0:45–1:30:** abra o moodboard e a direção visual atualizada. Explique luz glacial, escala e contraste. Os documentos iniciais são históricos; não finja que a revisão veio antes do código.
3. **1:30–3:00:** busque na NASA, abra um detalhe, salve uma descoberta e filtre a coleção. Demonstre a página Aprender.
4. **3:00–4:00:** mostre o formulário Produtos, o bloqueio enquanto inválido e o plano baixado. Não há compra, pagamento ou envio de dados.
5. **4:00–5:00:** abra `src/app/learn.ts`: `distance` e `answer` são estado; `completed` é derivado com computed. Mostre também input/output em `components.ts` e HttpClient em `nasa.service.ts`.

## Conferência dos requisitos

Rotas/menu: `routes.ts` e `app.ts`; detalhe `/descoberta/:id`; fallback `**`. Componentes reutilizáveis/input/output: `components.ts`. Signals/computed e blocos de controle: exploração, coleção e missão. API: `nasa.service.ts`. Formulário validado: `side-a.ts`. Tailwind: `.postcssrc.json` e `src/styles.css`.

## Limites e autoria

A implementação e os materiais tiveram assistência de IA, conforme CONCEITO.md. Revise e adapte o que não conseguir explicar. A escolha exclusiva da capa na lista da turma ainda precisa ser confirmada pelo aluno. A API externa depende da rede e pode ficar indisponível; o aplicativo apresenta erro e nova tentativa. Os exercícios JWT dependem de outro backend e estão no repositório de exercícios.

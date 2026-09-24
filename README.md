# Horizonte - Lado A

SPA Angular de exploração científica, engenharia e cultura de ficção científica. Inspirada no conceito de exploração do pôster glacial de Interestelar, sem incluir o cartaz na aplicação.

## Rodar

```powershell
npm ci
npm start -- --host 127.0.0.1 --port 4205
```

Abra http://127.0.0.1:4205. Node 24.15+ na linha 24. Build: `npm run build`. Testes: `npm test -- --watch=false`. Saída: `dist/spa_http/browser`; hospedagem deve redirecionar rotas da SPA a index.html.

## Experiência atual

- `/explorar`: abertura glacial original, busca real na NASA, estados de carregamento/erro e cartões salváveis.
- `/descoberta/:id`: imagem, descrição original e fonte NASA.
- `/colecao`: coleção local filtrável.
- `/aprender`: três percursos gratuitos, exercícios editoriais e links oficiais externos em inglês.
- `/produtos`: conceitos de guias próprios, kits e objetos Horizonte; formulário validado que gera um plano pessoal em TXT.
- `/encomenda`: redireciona a Produtos. O formulário artístico anterior permanece apenas no arquivo `/arquivo/encomenda`; dados locais existentes não foram removidos.
- `/diario`: arquivo das anotações anteriores, fora do menu principal.
- Outras rotas: 404.

Interface em espanhol, português, inglês, holandês, alemão, italiano e francês. Espanhol, português e inglês são prioritários no seletor. Conteúdo da NASA permanece no idioma original, identificado na tela.

## Limites comerciais reais

Os produtos são propostas em desenvolvimento, sem preço, estoque, checkout ou promessa de entrega. O plano é gerado no navegador e baixado pelo visitante; não coleta contatos, não envia leads, não inscreve em lista de espera e não realiza reservas. Campos: nome/apelido 2–80 caracteres, objetivo 20–600, tema e produto de listas fechadas. `computed` controla validade e recomendação; espaços externos não contam. Não existe backend comercial.

Para gerar receita: produzir e revisar o primeiro guia original, validar interesse com público real, definir preço e entrega; conectar captação consentida e pagamento/entrega com provedor escolhido. Métricas futuras: acesso aos percursos, interesse consentido, conversão paga e reembolso. Não há analytics ou rastreamento implementados. Recursos gratuitos NASA são fontes abertas de aprendizagem, não nossos produtos pagos. Ver `docs/MODELO-DE-NEGOCIO.md`.

## Requisitos técnicos preservados

| Requisito | Implementação |
|---|---|
| Rotas, menu ativo, detalhe por parâmetro, 404 | routes.ts e app.ts |
| Dois componentes com input() | DiscoveryCard e Stat |
| output() | DiscoveryCard.toggle comunica salvamento |
| @if, @for, track, @empty | Explorar, Coleção e formulários |
| Signals e derivados | Consulta, coleção, filtro, contagens, validade e recomendação |
| Serviço com inject e HttpClient | NasaService e API pública NASA |
| Carregamento, erro, nova tentativa | Explorar e Detalhes |
| Formulário validado e botão desabilitado | Products em side-a.ts; validação também no submit |
| Responsividade / Tailwind | Utilitários, grades e estilos atmosféricos complementares |

## Materiais e autoria

- `CONCEITO.md`: ligação entre referência, forma e função, com transparência sobre IA.
- `docs/moodboard.pdf`, `docs/identidade-visual.pdf`, `docs/esbocos.pdf`: materiais iniciais da primeira versão, preservados como histórico.
- `docs/lado-a-direcao.pdf`: revisão atual da direção visual, do percurso e das composições. Feita durante esta iteração, não apresentada como esboço anterior ao código original.
- `docs/REFERENCIAS.md`: fontes e créditos das referências.
- `docs/PEMONITION.md`: ideias futuras do Lado B (artes/NFTs), fora da prioridade atual.

A abertura usa ilustração original gerada com IA, identificada no site, em `public/expedition-hero.png`. Não é uma fotografia de missão real. Sem atores, logotipos ou personagens do filme. A imagem de Kent E. Biggs foi retirada da abertura comercial; permanece como arquivo histórico com seu crédito e sem licença comercial presumida.

Coleção e dados antigos persistem apenas no localStorage do navegador. O novo plano não é persistido; o visitante pode baixá-lo antes de sair. Alterar idioma mantém os campos enquanto a página continua aberta. Não há afiliação à NASA ou aos estúdios do filme.

## Apresentação

1. Mostrar o pôster fora do aplicativo; explicar exploração e escala humana.
2. Comparar luz glacial, título serifado e figura pequena com a nova direção.
3. Explorar o acervo, abrir detalhes e salvar uma descoberta.
4. Abrir Aprender e mostrar o percurso de perguntas e fontes.
5. Preencher Produtos, demonstrar botão inválido/válido e baixar o plano; explicar a diferença entre protótipo comercial e operação de vendas.

Repositório privado: https://github.com/Pemonition/horizonte. GitHub não equivale a hospedagem pública. O aluno deve revisar e explicar o código e as decisões conforme as regras do professor.

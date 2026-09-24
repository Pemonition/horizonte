# Validação - 23/09/2026

## Pedidos de obras personalizadas

- Build aprovado: 450,38 kB de JavaScript/CSS inicial; estimativa comprimida de 109,91 kB.
- 17 testes unitários aprovados. Cobertura adicional: validação de contato e opções, limites da descrição, persistência de snapshots, remoção, armazenamento corrompido e indisponível.
- Navegador: coleção vazia, imagem pré-selecionada a partir do detalhe, validação, troca dos sete idiomas preservando os campos, layout de 390 px, recarga de rascunhos, download de texto, exclusão confirmada e acesso às notas antigas.
- Nenhum pedido é enviado: o recurso salva rascunhos no navegador e permite baixar um arquivo de texto. Não há cobrança nem reserva.
- Evidências com dados fictícios: `verificacao/encomenda.json`, `encomenda-desktop.png` e `encomenda-mobile.png`. Script: `scripts/verify-commission.cjs`.

## Atualização multilíngue

- Comparação com `origin/main`: o commit remoto `c9eba8d96989a5fc7413cf29b140adbd8f26c639` já estava presente localmente. Não houve alterações remotas divergentes ou conflitos; a interface multilíngue foi integrada sobre essa base.
- 12 testes unitários aprovados, incluindo paridade das 109 chaves nos sete catálogos, parâmetros, troca e persistência de idioma, datas e armazenamento indisponível.
- Navegador: espanhol, português, inglês, holandês, alemão, italiano e francês aprovados na navegação e no layout de 390 px; idioma e título do documento atualizados; preferência preservada após recarga.
- Formulário em espanhol preservado ao trocar para inglês; observação salva e mensagem de sucesso traduzida ao trocar para português. Conteúdo original da NASA preservado em inglês. Página 404 traduzida.
- Evidência: `verificacao/idiomas.json`; capturas `idioma-es.png`, `idioma-pt.png` e `idioma-en.png` usam dados controlados de teste.
- As traduções adicionais ainda podem receber revisão editorial por falantes nativos. Nenhuma tradução automática é aplicada às anotações pessoais ou descrições da NASA.

## Verificação inicial

- Build de produção aprovado: 370 kB de JavaScript/CSS inicial, estimativa comprimida de 96,45 kB.
- 6 testes automatizados aprovados em `src/app/behavior.spec.ts`.
- 13 verificações de navegador aprovadas, sem erros JavaScript de página: navegação, menu ativo, coleção, filtro, detalhe com recarga, formulário, persistência, exclusão, largura móvel de 390 px sem transbordamento horizontal, página 404, falha e nova tentativa da API, busca vazia e detalhe inexistente.
- Testes de fluxo no navegador usam respostas controladas para serem reproduzíveis. A API real da NASA foi consultada separadamente e retornou 24 resultados; detalhe e recarga também foram verificados com a origem real. Uma execução posterior teve timeout na origem, por isso o estado de erro e o botão de nova tentativa são necessários.
- Revisão visual: página inicial desktop e mobile, diário, moodboard, identidade e esboços.

Evidência automatizada em `verificacao/resultado.json`. `desktop.png` mostra dados reais; `desktop-test.png`, `diario.png` e `mobile.png` são capturas dos testes com fixture. Os testes não escrevem no perfil do navegador do usuário.

Comandos portáveis para build e testes unitários estão no README. Os scripts auxiliares de captura usam o Playwright do runtime local do Codex; em outra máquina, adapte o import para uma instalação de `playwright` e instale o navegador correspondente. Eles não são necessários para executar a aplicação.

## Lado A - 24/09/2026

- Build de produção aprovado: 476,27 kB iniciais (117,13 kB estimados em transferência), incluindo o ajuste final de enquadramento mobile.
- 19 testes unitários aprovados: API/coleção, sete catálogos de tradução, arquivo de encomendas e limites do novo plano.
- `scripts/verify-side-a.cjs`: sete idiomas, três rotas a 390 px sem overflow, troca de idioma preservando campos, redirecionamento de /encomenda, formulário inválido bloqueado, recomendação por tema e conteúdo do download verificado; sem erros de runtime.
- Teste de interface usa respostas NASA controladas; não comprova disponibilidade do serviço externo. A consulta NASA existente não foi modificada.
- Revisão visual da abertura desktop/mobile, catálogo e PDF de direção. Ilustração de abertura original gerada por IA.
- Propostas comerciais ainda indisponíveis; sem checkout, envio de leads ou captação real. O plano é exclusivamente local.

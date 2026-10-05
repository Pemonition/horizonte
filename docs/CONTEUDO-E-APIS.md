# Conteúdo, APIs e referência Kurzgesagt

Pesquisa documental em 24/09/2026. Disponibilidade documental não significa integração, autorização de republicação ou serviço testado em produção.

## Modelo editorial

O site oficial do Kurzgesagt conecta vídeos explicativos, produtos científicos e experiências interativas. A loja apresenta objetos relacionados aos temas; Patreon oferece apoio recorrente. Horizonte pode adaptar o percurso: pergunta -> explicação própria -> experimento -> desafio -> material complementar. Não importar roteiros, desenhos, personagens ou produtos do canal.

Fontes: https://kurzgesagt.org/ ; https://shop-us.kurzgesagt.org/ ; https://www.patreon.com/Kurzgesagt ; https://kurzgesagt.org/imprint/ . O link curto da loja não abriu na ferramenta; a loja foi acessada pelo site oficial. Não foi feita análise dos vídeos individuais nem transcrição do canal.

## Fontes e integrações avaliadas

| Origem | Situação | Uso no Horizonte |
|---|---|---|
| NASA Image and Video Library | API documentada, já usada pelo app | Fotografias e metadados com créditos e fonte |
| NASA APOD | API documentada, parâmetro api_key; não integrada | Candidata a descoberta do dia, após cache, configuração e revisão de direitos por imagem |
| NASA Science / Learning Resources | Conteúdo editorial consultado; não confirmada API geral de artigos | Produzir explicações próprias revisadas, citar URL por aula |
| YouTube | Data API v3 documentada, projeto/chave ou OAuth conforme operação e quotas | Metadados e seleção de vídeos como referências; não fornece autorização de adaptar roteiros |
| Kurzgesagt | Não encontrada documentação pública de API editorial própria | Referência de formato e negócio; não fonte automática de conteúdo republicável |
| Loja Kurzgesagt | Loja pública; API de terceiros não confirmada | Referência de produtos; não copiar catálogo nem conectar checkout alheio |
| Patreon | API documentada com OAuth | Eventual integração de membros da nossa própria campanha; não importar conteúdo pago de terceiros |
| Newsletter Kurzgesagt | Formulário de terceiro, sem API de conteúdo confirmada | Referência de relacionamento; não cadastrar visitantes em listas de terceiros |

Documentação: https://images.nasa.gov/docs/images.nasa.gov_api_docs.pdf ; https://github.com/nasa/apod-api ; https://developers.google.com/youtube/v3/getting-started ; https://docs.patreon.com/ . Nenhuma chave foi criada, nenhum token foi solicitado e nenhuma nova API foi conectada nesta revisão.

## Primeira missão implementada

`/aprender` agora apresenta uma explicação própria sobre ano-luz, experimento de distância, desafio, feedback explicativo e conclusão. Fonte científica explícita após a atividade: https://science.nasa.gov/exoplanets/what-is-a-light-year/ . Modelo: fonte e observador estáticos, luz no vácuo, sem expansão cosmológica. Não é simulador de viagem de nave.

Progresso apenas durante a visita à página; não existe conta, ranking, histórico persistente ou prêmio financeiro. Reiniciar zera a missão. Sete traduções acompanham conteúdo, controles e feedback.

## Próximos conteúdos e monetização

Produzir missões originais sobre escalas cósmicas, gravidade e engenharia, com fontes específicas e revisão científica. Expandir gratuitamente a explicação e o experimento; só oferecer como pagos materiais adicionais realmente produzidos (caderno de desafios, soluções comentadas, atividades ou pôster autoral). Apoio recorrente apenas depois de existir uma rotina de publicação sustentável. Nenhuma oferta ou receita foi ativada.

## Línguas indígenas e povos originários

Pedido registrado, aguardando escolha de línguas, variantes e revisão por falantes. Não adicionar opções que exibam português disfarçado de tradução. Planejar textos, áudio e terminologia em colaboração com revisores remunerados quando disponível. Conhecimentos tradicionais, se incluídos, exigem participação e atribuição às comunidades pertinentes; não tratá-los como um bloco único ou equivalentes automáticos de terminologia científica.

## Canais sociais adicionais

- TikTok: documentação de Display API e incorporação encontrada em https://developers.tiktok.com/docs/en/content-display-landing . Não equivale a acesso irrestrito ao conteúdo de outros criadores.
- Reddit: Data API e regras de acesso documentadas em https://support.reddithelp.com/hc/en-us/articles/14945211791892-Developer-Platform-Accessing-Reddit-Data . Integração não solicitada nem ativada; não usar comentários como fonte científica primária.
- Instagram/Facebook: avaliação específica de acesso às contas indicadas ainda pendente. Não assumir permissão de extrair publicações de contas de terceiros. Prioridade desta etapa: fontes científicas e conteúdo próprio dentro do site.

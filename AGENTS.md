# Planno.online

Este repositório contém o site público, o superadmin e a área do lojista. Preserve as entradas independentes do Vite e o visual da marca. Leia README.md antes de alterar a configuração de publicação.

## Fluxo obrigatório

- Trabalhe em `homolog`, valide, crie o commit e dê push.
- Abra PR de `homolog` para `deploy` e envie o link ao usuário.
- O usuário revisa e faz o merge. Não faça merge nem publique diretamente em `deploy`.
- Após o merge, acompanhe o build e a publicação, sem afirmar sucesso sem evidência. Só prometa acompanhamento posterior com mecanismo configurado.
- Se faltarem branches, esclareça a base antes de criá-las. Preserve alterações existentes e nunca force push.

## Área do lojista

- `/lojista/` é uma entrada estática própria para funcionar no GitHub Pages. Use hash para abas internas; recarregar não pode depender de um servidor com fallback SPA.
- A API está no repositório Planno-Store-Backend. Confira contratos e permissões antes de alterar formulários.
- Exija ADMIN de loja e confirme a identidade via `/auth/me`. PLATFORM_ADMIN sozinho não dá acesso a dados de loja.
- Não use headers de tenant nem aceite storeId arbitrário. Até existir seleção segura no backend, contas com múltiplas lojas não devem selecionar um tenant por fallback.
- Tokens da sessão ficam apenas em sessionStorage; credenciais de frete nunca são persistidas no navegador nem incluídas em logs, URLs ou builds. Não exponha senhas já cadastradas.
- Respeite troca de senha obrigatória, expiração de sessão, autorização e erros de API. Não inclua dados demonstrativos ou bypass de login no bundle publicado.
- Não afirme conexão externa validada apenas porque a configuração foi salva.

## Validação

Execute `npm run build`, `npm run lint` e `npm run test:merchant`. Testes do navegador usam respostas sintéticas isoladas e nunca contas reais. Confira telas em desktop e celular, navegação por teclado, erros e estados sem dados.

### Stack e organização verificadas

React/TypeScript/Vite; site público em src/pages/; lojista em src/merchant/ e lojista/; superadmin em superadmin/; Playwright em tests/. Não possui banco nem backend próprio. Autorização e pagamentos pertencem à API Store; GitHub Pages publica somente deploy.

## Manual de engenharia e segurança (auditoria 2026-10-10)

Estas regras complementam as regras específicas acima e as instruções do usuário.

1. **Objetivo:** preservar os fluxos reais documentados no README; não inventar requisitos nem publicar demonstrações como operações reais.
2. **Arquitetura:** respeitar a stack identificada abaixo; mudanças de arquitetura exigem justificativa, compatibilidade e documentação.
3. **Diretórios:** manter código, testes, migrations e operação em suas pastas existentes; não misturar dados de clientes nos fixtures.
4. **Desenvolvimento:** mudanças pequenas e revisáveis; contratos públicos só mudam com avaliação e testes dos consumidores.
5. **Segurança:** menor privilégio, falha fechada e defesa em profundidade. Nunca introduzir vulnerabilidades conhecidas, desativar controles ou remover validações para fazer um fluxo funcionar.
6. **Autenticação:** não adicionar senhas ao código; senhas novas respeitam o limite em bytes do bcrypt. Todo login administrativo exige senha e código de uso único por e-mail; o frontend nunca persiste sessão antes da confirmação do segundo fator. Testar credenciais inválidas, expiração, código inválido/reutilizado e troca de senha.
7. **Autorização:** backend deve conferir papel e propriedade de cada recurso. Controles React não substituem a autorização confiável.
8. **APIs:** validar corpo, filtros, tamanho, paginação e headers; restringir CORS; não expor stack traces; manter proteção CSRF onde cookies autenticam operações.
9. **Dados:** minimizar dados pessoais, restringir exportações, documentar retenção/exclusão e não alegar conformidade LGPD apenas por revisão técnica.
10. **Banco:** queries parametrizadas, constraints e transações; dinheiro com BigDecimal; usuário de aplicação com menor privilégio e conexão TLS conforme ambiente.
11. **Integrações:** timeouts, erros públicos seguros, URLs controladas pelo servidor e credenciais separadas por ambiente. Nunca enviar dados privados a serviços não autorizados.
12. **Pagamentos:** preço vem do backend; verificar assinatura e recurso no provedor, conta, moeda e valor; considerar eventos duplicados, fora de ordem e concorrentes; nunca armazenar cartão completo.
13. **Multi-tenant:** papéis por loja e recurso, sem fallback ambíguo de contas com várias lojas; header de loja só seleciona contexto já autorizado. Testar leitura e escrita cruzadas.
14. **Entradas:** validação positiva e limites; não concatenar dados externos em SQL/comandos; uploads precisam de verificação do conteúdo além do MIME declarado.
15. **Erros:** resposta consistente para cliente; não revelar credenciais, dados internos nem conteúdo recebido em exceções.
16. **Logs/auditoria:** UTC, correlação, níveis e acesso restrito; nunca registrar senhas, tokens, credenciais, cartões ou payloads pessoais desnecessários; operações críticas precisam de trilha protegida.
17. **Segredos:** .env privado e ignorado; valores reais nunca em código, AGENTS.md, logs ou relatórios. Ao detectar exposição registrar apenas localização/categoria; remoção não substitui rotação. Não revogar produção sem autorização.
18. **Testes:** correções relevantes exigem regressão, incluindo cenários negativos de autorização, sessão, dinheiro, isolamento e uploads. Não ignorar falhas nem afirmar execução inexistente.
19. **Frontend:** React codifica conteúdo externo; não usar HTML arbitrário; manter estados de erro e sessão. Nenhum segredo privado em VITE_* ou bundle.
20. **Backend:** controllers finos, DTOs validados, serviços transacionais e consultas com escopo. Não confiar em papéis, tenant ou preço enviados pelo navegador.
21. **Infra:** não alterar produção, DNS, custos de nuvem, portas públicas ou firewall sem autorização explícita; containers não privilegiados e health checks; separar homologação e produção.
22. **CI/CD:** trabalhar em homolog, validar, commit e push; abrir PR homolog → deploy para merge do usuário. Conferir branches/gatilhos antes de criar branches; nunca force push, merge ou publicação direta. Preservar PRs anteriores.
23. **Dependências:** avaliar vulnerabilidades/licenças e lockfiles antes de adicionar dependências; evitar major indiscriminado; executar análise compatível e registrar limites da verificação.
24. **Backups:** automação, criptografia, isolamento, retenção e restauração ensaiada; RPO/RTO dependem de decisão operacional, não de números inventados.
25. **Monitoramento:** alertar falhas de integração, jobs, deploy e backups; não prometer acompanhamento futuro sem mecanismo real configurado.
26. **Alterações:** investigar causa, implementar, testar e revisar diff; preservar funcionalidades e atualizar SECURITY_AUDIT.md. Não excluir trabalho existente.
27. **Migrations:** Flyway versionado e incremental; não editar migrations já aplicadas, apagar tabelas, trocar dados reais por fixtures ou executar migrations destrutivas em produção.
28. **Conclusão:** testes adequados, build, revisão de diff/segredos, documentação e registro explícito dos testes não executados.
29. **Produção:** exige isolamento, segurança financeira, segredos protegidos, testes críticos, backups restauráveis, monitoramento, rollback e resposta a incidentes; auditoria local não valida infraestrutura real.
30. **Agente:** pode corrigir código/testes/docs e verificar localmente; não pode apagar dados reais, realizar testes ofensivos externos, instalar ferramentas desconhecidas como administrador ou fazer push em branch protegida.

## Ambiente de engenharia Planno (Codex)

Os especialistas globais `arquiteto`, `desenvolvedor`, `revisor` e `qa` atendem este projeto. Use somente os necessários; a tarefa simples fica com o principal. Skills globais são descobertas em `~/.agents/skills/`; novos projetos usam `project-bootstrap`.

Preserve as instruções e mudanças anteriores. Commit/push exigem autorização específica da tarefa; não são consequência automática deste setup. A entrega autorizada segue homolog → PR deploy, com merge pelo usuário. Não execute deploy nem altere produção, credenciais, regras financeiras/comerciais ou banco real nesta configuração.

### Stack e comandos verificados no diagnóstico

React 19 / TypeScript / Vite, ESLint / Playwright, Sem backend ou banco próprio.

- Em `.`: `npm run lint; npm run build`. Executar separadamente; não inicia servidor/banco.

Os comandos acima existem ou usam a ferramenta Maven declarada no projeto; não significam que todos passaram. Consulte o relatório da implantação para resultados. `;` na lista significa verificações separadas. Maven fora do PATH pode ser executado pela distribuição local confirmada, sem instalar outra versão. Não invente lint/test inexistentes.

Execute integrações somente com dados fictícios e banco descartável confirmado, sem variáveis que sobrescrevam datasource com ambiente real. E2E usa loopback e API simulada/isolada; build não comprova autenticação, pagamentos ou provisionamento reais. Preserve workflows existentes; parsing YAML não equivale a execução no GitHub.

### Limites de validação

- npm run test:merchant inclui merchant.spec.ts e production.spec.ts; inicia Vite dev/preview em 127.0.0.1:4321/4322. Merchant API é sintética; build precisa existir antes.

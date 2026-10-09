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

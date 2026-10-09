# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://npmx.dev/package/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://npmx.dev/package/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

## Painel da plataforma — /superadmin

O build gera `dist/superadmin/index.html` e assets separados. O GitHub Pages serve `/superadmin/` diretamente; `/superadmin` redireciona para a pasta. Recarregar a página não depende de um fallback SPA/404. O site público e seus estilos continuam separados do painel. O domínio canônico configurado no Pages é `www.planno.online`.

O código do painel está em `superadmin/`, adaptado do projeto local PlannoPlatformDashboard. Sem API configurada, o build publicado exibe um aviso e desabilita login; não envia credenciais ao GitHub Pages. Não há dados de demonstração no aplicativo.

### Ativar login real

1. Publique o backend Spring em um serviço com Java e banco de dados. GitHub Pages só hospeda o frontend.
2. Em Settings → Secrets and variables → Actions → Variables, configure `VITE_PLATFORM_API_BASE_URL` com a URL HTTPS da API, incluindo `/api/v1`.
3. Autorize `https://www.planno.online` no `APP_CORS_ALLOWED_ORIGINS` do backend (e o domínio sem www se ele também servir a aplicação).
4. Execute novamente o workflow de publicação. A variável é incorporada ao build e é pública; nunca inclua segredos nela.
5. Use uma conta `PLATFORM_ADMIN` com senha própria. Não habilite contas de demonstração em produção.

Em desenvolvimento, `/api` usa proxy para `http://localhost:8080`, ou `API_PROXY_TARGET` configurado. A sessão é validada em `/auth/me`. Os indicadores reproduzem os cálculos atuais do backend (status PAID, data de criação), sem consolidar mensalidades ou liquidação financeira.

## Área do lojista — /lojista/

A entrada `lojista/index.html` gera um diretório próprio no GitHub Pages. As abas usam hash (`/lojista/#integracoes`, `/lojista/#embalagens`), permitindo abrir e recarregar diretamente. Há um link no rodapé do site. O superadmin permanece em sua entrada independente.

### Telas disponíveis

- **Formas de entrega:** criar, editar, ativar, desativar e remover entrega manual, retirada, Melhor Envio e Correios com contrato. Campos condicionais incluem faixa de CEP, endereço/horários de retirada, código de serviço e valor declarado.
- **Contas de frete:** origem, ambiente, habilitação e credenciais por provedor; Correios inclui contrato, cartão de postagem e regional. Credenciais existentes não são reveladas e permanecem intactas quando não são substituídas. A troca de ambiente exige novas credenciais.
- **Embalagens:** catálogo paginado, peso em kg e dimensões em cm da unidade já embalada. A edição preserva o restante do produto.
- **Acesso:** login próprio do lojista, validação de sessão, troca obrigatória de senha e saída. Requer ADMIN vinculado a uma loja; PLATFORM_ADMIN sozinho e STAFF não podem gerenciar estas configurações.

### Conectar ao backend

1. Integre e publique o backend com os endpoints de frete do [PR #2 do backend](https://github.com/plannocorp/Planno-Store-Backend/pull/2).
2. Configure a variável de Actions `VITE_MERCHANT_API_BASE_URL` com a URL HTTPS da API incluindo `/api/v1`. Se omitida, a área usa `VITE_PLATFORM_API_BASE_URL`, quando configurada. Sem ambas, o login publicado fica desabilitado com aviso.
3. Autorize a origem `https://www.planno.online` no CORS do backend e prepare a conta ADMIN do lojista. Nenhuma credencial de transportadora vai nas variáveis públicas de build.
4. Revise o PR `homolog` → `deploy` e faça o merge para publicar pelo workflow existente. O agente não faz merge.
5. Confira login e salvamento com a conta autorizada, depois valide a cotação no checkout da loja. As telas não compram etiquetas nem executam cotações reais automaticamente ao salvar.

O backend atual não oferece seleção segura de loja para uma conta com múltiplas lojas em produção. A interface bloqueia esse caso antes de consultar dados administrativos; não envia `X-Store-Slug` nem escolhe uma loja por fallback. Ao carregar `/admin/store/current`, confirma que o ID coincide com a loja autorizada em `/auth/me`.

A sessão usa `sessionStorage`, em chave separada do superadmin. Credenciais de frete ficam somente no formulário até o envio HTTPS, não são armazenadas no navegador. Estado “habilitada” significa configuração habilitada, não homologação da conta externa. Erros não exibem payloads de provedor ou dados sensíveis.

### Desenvolvimento e validação

```sh
npm ci
npm run dev
# Abra /lojista/; /api usa o proxy local configurado em API_PROXY_TARGET.
npm run lint
npm run build
npx playwright install chromium
npm run test:merchant
```

Os testes de navegador interceptam a API com dados sintéticos e cobrem cadastros, erros, expiração de sessão, autorização, credenciais e visual responsivo. Não há fixtures ou bypass de login no bundle publicado. O workflow de verificação do PR não publica o site. A dependência de Playwright é exclusiva de desenvolvimento.

As telas configuram a logística; gestão completa de pedidos, compra de etiquetas, rastreamento e conexão OAuth por botão continuam fora desta entrega. Melhor Envio usa token de cotação configurado pelo lojista. Consulte `docs/SHIPPING_SETUP.md` no backend para regras de embalagem, serviços e homologação real.

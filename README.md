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

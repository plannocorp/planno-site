import { useEffect } from 'react';

/** Atualiza título e descrição por rota (o site é uma SPA com um único index.html). */
export const usePageMeta = (title: string, description?: string) => {
  useEffect(() => {
    document.title = title;
    if (description) {
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute('content', description);
    }
  }, [title, description]);
};

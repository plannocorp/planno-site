import React from 'react';
import HeaderAlt from '../../components/header/header-alt/header-alt';
import Footer from '../../components/footer/footer';
import { WhatsAppFloat } from '../../components/whatsapp-float/whatsapp-float';
import { usePageMeta } from '../../hook/use-page-meta';

interface SecaoPageProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

/** Página própria para seções que não fazem parte da home (Projetos, FAQ, Contato). */
export const SecaoPage: React.FC<SecaoPageProps> = ({ title, description, children }) => {
  usePageMeta(title, description);
  return (
    <>
      <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>
      <HeaderAlt />
      <main id="conteudo">{children}</main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
};

export default SecaoPage;

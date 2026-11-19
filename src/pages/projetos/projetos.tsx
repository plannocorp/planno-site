import React from 'react';
import './projetos.css';
import { whatsappLink, WHATSAPP_MESSAGES } from '../../lib/contact';

interface ProjectLink {
  label: string;
  href: string;
}

interface Project {
  name: string;
  category: string;
  description: string;
  /** Captura de tela em /public/projetos (opcional). */
  image?: string;
  links: ProjectLink[];
}

// Para adicionar um projeto, basta incluir um novo item nesta lista.
const projects: Project[] = [
  {
    name: 'Amanda Ribeiro Arquitetura',
    category: 'Site institucional',
    description: 'Site para arquiteta apresentar seu portfólio e receber novos clientes.',
    image: 'projetos/amanda-ribeiro.jpg',
    links: [{ label: 'Ver site', href: 'https://arquitetaamandaribeiro.com.br' }],
  },
  {
    name: 'Halana Maranha Psicologia',
    category: 'Landing page',
    description: 'Página de apresentação para psicóloga, focada em gerar contatos e agendamentos.',
    image: 'projetos/halana-maranha.jpg',
    links: [{ label: 'Ver site', href: 'https://www.psihalanamaranha.com.br' }],
  },
  {
    name: 'Soft Chaos',
    category: 'Blog',
    description: 'Blog com identidade visual própria, desenvolvido sob demanda.',
    links: [{ label: 'Ver site', href: 'https://soft-chaos.vercel.app' }],
  },
];

export const Projetos: React.FC = () => {
  return (
    <section className="section projetos" id="projetos">
      <div className="projetos-container">
        <div className="section-head" data-reveal="fade-up">
          <span className="eyebrow">Projetos</span>
          <h2>Veja o que já entregamos</h2>
          <p>Projetos reais, no ar e funcionando. Navegue e imagine o seu.</p>
        </div>

        <div className="projetos-grid">
          {projects.map((project, index) => (
            <article
              key={project.name}
              className="projeto-card"
              data-reveal="scale-up"
              data-delay={index * 120}
            >
              <div className="projeto-preview">
                {project.image ? (
                  <img
                    src={`${import.meta.env.BASE_URL}${project.image}`}
                    alt={`Prévia do site ${project.name}`}
                    loading="lazy"
                    width={800}
                    height={500}
                  />
                ) : (
                  <span className="projeto-preview-fallback" aria-hidden="true">
                    {project.name.charAt(0)}
                  </span>
                )}
              </div>
              <span className="projeto-category">{project.category}</span>
              <h3 className="projeto-name">{project.name}</h3>
              <p className="projeto-description">{project.description}</p>

              <div className="projeto-links">
                {project.links.map((link) => (
                  <a
                    key={link.href}
                    className="projeto-link"
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label} <span aria-hidden="true">↗</span>
                    <span className="sr-only"> (abre em nova aba)</span>
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="projetos-cta" data-reveal="fade-up">
          <p>Gostou? O próximo projeto pode ser o seu.</p>
          <a
            className="btn btn-whatsapp"
            href={whatsappLink(WHATSAPP_MESSAGES.projeto)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-whatsapp" aria-hidden="true"></i> Quero um site assim
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projetos;

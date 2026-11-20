import React from 'react';
import './diferenciais.css';

interface Diferencial {
  icon: string;
  title: string;
  description: string;
}

const diferenciais: Diferencial[] = [
  {
    icon: 'fas fa-palette',
    title: 'Design personalizado.',
    description: 'Seu negócio tem identidade própria. Sua presença digital também deve ter.',
  },
  {
    icon: 'fas fa-gears',
    title: 'Soluções funcionais.',
    description: 'Cada recurso é pensado para facilitar a experiência de quem visita e de quem administra.',
  },
  {
    icon: 'fas fa-headset',
    title: 'Suporte próximo.',
    description: 'Atendimento humano para orientar você nas etapas do projeto e no suporte previsto em seu plano.',
  },
  {
    icon: 'fas fa-code',
    title: 'Tecnologia sem complicação.',
    description: 'Cuidamos da parte técnica para você focar no seu negócio.',
  },
];

export const Diferenciais: React.FC = () => {
  return (
    <section className="section diferenciais" id="diferenciais" aria-labelledby="diferenciais-titulo">
      <div className="section-inner">
        <div className="section-head" data-reveal="fade-up">
          <span className="eyebrow">Diferenciais</span>
          <h2 id="diferenciais-titulo">Tecnologia de verdade. Atendimento Humanizado.</h2>
          <p>Não acreditamos em soluções complicadas nem em entregar um projeto e desaparecer.</p>
          <p>Na Planno, você conversa com quem entende do desenvolvimento e acompanha seu projeto de perto.</p>
        </div>

        <ul className="diferenciais-grid">
          {diferenciais.map((d, i) => (
            <li key={d.title} className="diferencial-card" data-reveal="fade-up" data-delay={i * 80}>
              <span className="diferencial-icon">
                <i className={d.icon} aria-hidden="true"></i>
              </span>
              <h3>{d.title}</h3>
              <p>{d.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Diferenciais;

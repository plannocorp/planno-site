import React from 'react';
import './equipe.css';

interface Member {
  name: string;
  role: string;
  bio: string;
  tags: string[];
}

const members: Member[] = [
  {
    role: 'Front-End & UX',
    name: 'Vitor Teixeira',
    bio: 'Responsável pela experiência visual e interfaces que encantam seus clientes finais e geram conversão.',
    tags: ['React', 'Python', 'Angular', 'TypeScript'],
  },
  {
    role: 'Back-End & Infraestrutura',
    name: 'Ilton Carlos',
    bio: 'Responsável pela segurança, servidores de hospedagem e APIs que integram as lojas virtuais.',
    tags: ['Java', 'Spring Boot', 'Mercado Pago API'],
  },
];

export const Equipe: React.FC = () => {
  return (
    <section className="equipe" id="equipe">
      <div className="equipe-container">
        {/* Cabeçalho */}
        <div className="equipe-header">
          <span className="section-badge">
            <i className="fas fa-circle" aria-hidden="true"></i> Time Planno
          </span>
          <h2 className="equipe-title">Especialistas por trás da sua loja online</h2>
          <p className="equipe-subtitle">
            Uma equipe próxima e focada no desenvolvimento de soluções que resolvem seus problemas
            operacionais de verdade.
          </p>
        </div>

        {/* Cards dos Integrantes */}
        <div className="team-grid">
          {members.map((member) => (
            <div key={member.name} className="team-card">
              <span className="member-role">{member.role}</span>
              <h3 className="member-name">{member.name}</h3>
              <p className="member-bio">{member.bio}</p>

              <div className="member-tags">
                {member.tags.map((tag) => (
                  <span key={tag} className="tag-pill">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Equipe;
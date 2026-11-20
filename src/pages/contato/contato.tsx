import React, { useState } from 'react';
import './contato.css';
import { whatsappLink } from '../../lib/contact';

const interests = [
  'Landing Page',
  'Site institucional',
  'Planno Store (loja virtual)',
  'Hospedagem, SSL e suporte técnico',
  'Outro assunto',
];

interface FormData {
  nome: string;
  interesse: string;
  mensagem: string;
}

const initialForm: FormData = { nome: '', interesse: interests[0], mensagem: '' };

export const Contato: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialForm);
  const [sentLink, setSentLink] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Não há backend de formulário: a mensagem segue para o WhatsApp da Planno,
  // onde o atendimento acontece de fato. Nada é "enviado" em silêncio.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      `Olá! Meu nome é ${formData.nome.trim()}.`,
      `Tenho interesse em: ${formData.interesse}.`,
      formData.mensagem.trim(),
    ].filter(Boolean);
    const link = whatsappLink(lines.join('\n'));
    setSentLink(link);
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="section contato" id="contato">
      <div className="contato-container">
        <div className="section-head" data-reveal="fade-up">
          <span className="eyebrow">Contato</span>
          <h1>Vamos conversar sobre seu projeto</h1>
          <p>
            Seja um site profissional, uma landing page ou uma loja virtual completa, a Planno ajuda você a construir uma presença digital à altura do seu negócio.
          </p>
        </div>

        <div className="contato-layout">
          <div className="contato-left-col">
            <div className="contact-info-card">
              <h2 className="info-card-title">O que acontece depois do seu contato</h2>
              <ul className="info-checklist">
                <li>
                  <i className="fas fa-circle-check" aria-hidden="true"></i>
                  <span>Você conta sua ideia e conversa com quem entende do desenvolvimento</span>
                </li>
                <li>
                  <i className="fas fa-circle-check" aria-hidden="true"></i>
                  <span>Entendemos seu negócio, seus objetivos e o que você precisa</span>
                </li>
                <li>
                  <i className="fas fa-circle-check" aria-hidden="true"></i>
                  <span>Indicamos a solução certa para o momento do seu negócio</span>
                </li>
              </ul>
            </div>

            <div className="contact-social-card">
              <span className="social-card-text">Outros canais</span>
              <div className="social-icons-row">
                <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/planno.br/" aria-label="Instagram da Planno" className="contact-social-btn">
                  <i className="fab fa-instagram" aria-hidden="true"></i>
                </a>
                <a target="_blank" rel="noopener noreferrer" href="https://github.com/plannocorp" aria-label="GitHub da Planno" className="contact-social-btn">
                  <i className="fab fa-github" aria-hidden="true"></i>
                </a>
                <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/planno-corp-97b5b63a7/" aria-label="LinkedIn da Planno" className="contact-social-btn">
                  <i className="fab fa-linkedin" aria-hidden="true"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="contato-right-col">
            <form onSubmit={handleSubmit} className="contact-form-card">
              <div className="form-group">
                <label htmlFor="contato-nome">Seu nome</label>
                <input
                  id="contato-nome"
                  type="text"
                  name="nome"
                  autoComplete="name"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="contato-interesse">O que você procura?</label>
                <select
                  id="contato-interesse"
                  name="interesse"
                  value={formData.interesse}
                  onChange={handleChange}
                  className="form-input"
                >
                  {interests.map((i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="contato-mensagem">Conte um pouco sobre o que você precisa</label>
                <textarea
                  id="contato-mensagem"
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleChange}
                  required
                  className="form-textarea"
                ></textarea>
              </div>

              <button type="submit" className="btn btn-whatsapp contact-submit-btn">
                <i className="fab fa-whatsapp" aria-hidden="true"></i> Enviar pelo WhatsApp
              </button>

              <p className="form-hint" role="status" aria-live="polite">
                {sentLink ? (
                  <>
                    Abrimos o WhatsApp com a sua mensagem. Se nada abriu,{' '}
                    <a href={sentLink} target="_blank" rel="noopener noreferrer">
                      clique aqui
                    </a>
                    .
                  </>
                ) : (
                  'Ao continuar, você abre uma conversa no WhatsApp com a mensagem preenchida.'
                )}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contato;

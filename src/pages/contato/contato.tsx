import React, { useState } from 'react';
import './contato.css';
import { whatsappLink, WHATSAPP_MESSAGES } from '../../lib/contact';

const interests = [
  'Landing page',
  'Site institucional',
  'Planno Store (loja virtual)',
  'Hospedagem e manutenção',
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
          <h2>Pronto para vender mais? Fale com a Planno</h2>
          <p>
            Conte a sua ideia e receba um orçamento. O atendimento é direto, pelo WhatsApp.
          </p>
        </div>

        <div className="contato-layout">
          <div className="contato-left-col">
            <div className="contact-info-card">
              <h3 className="info-card-title">O que acontece depois do seu contato</h3>
              <ul className="info-checklist">
                <li>
                  <i className="fas fa-circle-check" aria-hidden="true"></i>
                  <span>Respondemos pelo WhatsApp, com atendimento humano</span>
                </li>
                <li>
                  <i className="fas fa-circle-check" aria-hidden="true"></i>
                  <span>Indicamos a melhor solução para o seu negócio</span>
                </li>
                <li>
                  <i className="fas fa-circle-check" aria-hidden="true"></i>
                  <span>Você recebe um orçamento claro, sem surpresa</span>
                </li>
              </ul>
              <a
                className="btn btn-whatsapp contato-direct"
                href={whatsappLink(WHATSAPP_MESSAGES.geral)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-whatsapp" aria-hidden="true"></i> Quero meu orçamento
              </a>
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

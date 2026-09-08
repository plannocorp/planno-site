import React, { useState } from 'react';
import './contato.css';

interface FormData {
  nome: string;
  email: string;
  assunto: string;
  mensagem: string;
}

export const Contato: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    assunto: '',
    mensagem: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulação de envio com retorno amigável
    setTimeout(() => {
      setIsSubmitting(false);
      setStatusMessage('Mensagem enviada com sucesso! Retornaremos em breve.');
      setFormData({ nome: '', email: '', assunto: '', mensagem: '' });

      setTimeout(() => setStatusMessage(null), 5000);
    }, 1000);
  };

  return (
    <section className="contato" id="contato">
      <div className="contato-container">
        {/* Cabeçalho */}
        <div className="contato-header">
          <span className="section-badge">
            <i className="fas fa-circle" aria-hidden="true"></i> Fale Conosco
          </span>
          <h2 className="contato-title">Solicite seu projeto</h2>
          <p className="contato-subtitle">
            Envie sua dúvida ou conte-nos a sua ideia de negócio. Retornamos o mais breve possível.
          </p>
        </div>

        {/* Layout com 2 colunas */}
        <div className="contato-layout">
          {/* Lado Esquerdo */}
          <div className="contato-left-col">
            {/* Card de Informações */}
            <div className="contact-info-card">
              <h3 className="info-card-title">Sua presença online sem complicações</h3>
              <p className="info-card-desc">
                Envie um e-mail descrevendo seu projeto ou planos de preferência, ou fale direto por
                WhatsApp.
              </p>
              <ul className="info-checklist">
                <li>
                  <i className="fas fa-circle-check" aria-hidden="true"></i>
                  <span>Retorno humanizado</span>
                </li>
                <li>
                  <i className="fas fa-circle-check" aria-hidden="true"></i>
                  <span>Orientação sobre hospedagem e domínio</span>
                </li>
                <li>
                  <i className="fas fa-circle-check" aria-hidden="true"></i>
                  <span>Alinhamento ágil e objetivo</span>
                </li>
              </ul>
            </div>

            {/* Card de Redes Sociais */}
            <div className="contact-social-card">
              <span className="social-card-text">Outros canais de contato</span>
              <div className="social-icons-row">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.instagram.com/planno.br/"
                  aria-label="Instagram"
                  className="contact-social-btn"
                >
                  <i className="fab fa-instagram" aria-hidden="true"></i>
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://wa.me/5562984458858?text=Ol%C3%A1!%20Gostaria%20de%20conversar%20sobre%20as%20solu%C3%A7%C3%B5es%20digitais%20da%20Planno."
                  aria-label="WhatsApp"
                  className="contact-social-btn"
                >
                  <i className="fab fa-whatsapp" aria-hidden="true"></i>
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/plannocorp"
                  aria-label="GitHub"
                  className="contact-social-btn"
                >
                  <i className="fab fa-github" aria-hidden="true"></i>
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.linkedin.com/in/planno-corp-97b5b63a7/"
                  aria-label="LinkedIn"
                  className="contact-social-btn"
                >
                  <i className="fab fa-linkedin" aria-hidden="true"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Lado Direito: Formulário */}
          <div className="contato-right-col">
            <form onSubmit={handleSubmit} className="contact-form-card">
              <div className="form-group">
                <input
                  type="text"
                  name="nome"
                  placeholder="Nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="assunto"
                  placeholder="Assunto"
                  value={formData.assunto}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <textarea
                  name="mensagem"
                  placeholder="Fale sobre seu projeto ou suas dúvidas..."
                  value={formData.mensagem}
                  onChange={handleChange}
                  required
                  className="form-textarea"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="contact-submit-btn"
              >
                {isSubmitting ? 'ENVIANDO...' : 'ENVIAR'}
              </button>

              {statusMessage && (
                <p className="form-status-msg">{statusMessage}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contato;
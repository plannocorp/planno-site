import React from 'react';
import './whatsapp-float.css';
import { whatsappLink, WHATSAPP_MESSAGES } from '../../lib/contact';

export const WhatsAppFloat: React.FC = () => (
  <a
    className="whatsapp-float"
    href={whatsappLink(WHATSAPP_MESSAGES.geral)}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Falar com a Planno no WhatsApp (abre em nova aba)"
  >
    <i className="fab fa-whatsapp" aria-hidden="true"></i>
    <span>WhatsApp</span>
  </a>
);

export default WhatsAppFloat;

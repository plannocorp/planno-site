/** Fonte única dos canais de contato comerciais da Planno. */
export const WHATSAPP_NUMBER = '5562984458858';

export const whatsappLink = (message: string): string =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const WHATSAPP_MESSAGES = {
  geral: 'Olá! Gostaria de conversar com um especialista sobre as soluções digitais da Planno.',
  landing: 'Olá! Tenho interesse em uma landing page. Podem me passar uma proposta?',
  site: 'Olá! Tenho interesse em um site institucional. Podem me passar uma proposta?',
  store: 'Olá! Tenho interesse na Planno Store. Podem me explicar como funciona e os planos?',
  hospedagem: 'Olá! Gostaria de saber mais sobre os planos de hospedagem e manutenção.',
  projeto: 'Olá! Vi os projetos no site da Planno e gostaria de um projeto parecido.',
} as const;

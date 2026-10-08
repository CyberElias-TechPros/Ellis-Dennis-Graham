const env = import.meta.env;

export const siteConfig = {
  name: 'Ellis Dennis Graham',
  alias: 'Cyber Elias',
  role: 'Technology Systems Architect',
  email: env.VITE_CONTACT_EMAIL?.trim() || '',
  linkedin: env.VITE_LINKEDIN_URL?.trim() || '',
  github: env.VITE_GITHUB_URL?.trim() || '',
  phone: env.VITE_PUBLIC_PHONE?.trim() || '',
  whatsapp: env.VITE_WHATSAPP_URL?.trim() || '',
  cvUrl: env.VITE_CV_URL?.trim() || '',
  siteUrl: env.VITE_SITE_URL?.trim().replace(/\/$/, '') || ''
};

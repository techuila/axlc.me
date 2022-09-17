import { Section } from 'astro-boilerplate-components';

import { AppConfig } from '@/utils/AppConfig';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Section>
      <span className="text-sm text-gray-200">
        © Copyright {currentYear} by {AppConfig.site_name}
      </span>
    </Section>
  );
};

export { Footer };

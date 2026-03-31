'use client';

import type { ReactNode } from 'react';

type PlanetFooterContactItem = {
  href: string;
  icon: ReactNode;
  label: string;
};

type PlanetFooterInlineCta = {
  label: string;
  onClick: () => void;
  token: string;
};

type PlanetFooterSectionProps = {
  aboutTitle: string;
  aboutParagraphs: readonly string[];
  contactTitle: string;
  contactCopy: string;
  greetingStripAria: string;
  greetingLabel: string;
  animatedGreeting: string;
  isAzerbaijaniLayout: boolean;
  contactItems: PlanetFooterContactItem[];
  footer: string;
  email: string;
  desktopLayout?: 'stacked' | 'split';
  inlineCta?: PlanetFooterInlineCta;
};

export default function PlanetFooterSection({
  aboutTitle,
  aboutParagraphs,
  contactTitle,
  contactCopy,
  greetingStripAria,
  greetingLabel,
  animatedGreeting,
  isAzerbaijaniLayout,
  contactItems,
  footer,
  email,
  desktopLayout = 'stacked',
  inlineCta,
}: PlanetFooterSectionProps) {
  const renderStoryParagraph = (paragraph: string, index: number) => {
    const className = index === 0 ? undefined : 'landing-showcase__story-copy';

    if (!inlineCta || index !== aboutParagraphs.length - 1 || !paragraph.includes(inlineCta.token)) {
      return (
        <p key={`${aboutTitle}-${index}`} className={className}>
          {paragraph}
        </p>
      );
    }

    const [beforeToken, ...afterTokenParts] = paragraph.split(inlineCta.token);

    return (
      <p key={`${aboutTitle}-${index}`} className={className}>
        {beforeToken}
        <button
          type="button"
          className="landing-showcase__story-cta"
          onClick={inlineCta.onClick}
        >
          {inlineCta.label}
        </button>
        {afterTokenParts.join(inlineCta.token)}
      </p>
    );
  };

  return (
    <>
      <div className={`landing-showcase__footer-grid landing-showcase__footer-grid--${desktopLayout}`}>
        <section className="landing-showcase__section landing-showcase__section--story">
          <h2>{aboutTitle}</h2>
          {aboutParagraphs.map(renderStoryParagraph)}
        </section>

        <section className="landing-showcase__section landing-showcase__section--contact">
          <h2>{contactTitle}</h2>
          <p>
            {contactCopy.includes(email) ? (
              <>
                {contactCopy.split(email)[0]}
                <span className="landing-showcase__contact-email">{email}</span>
                {contactCopy.split(email).slice(1).join(email)}
              </>
            ) : (
              contactCopy
            )}
          </p>
          <div className="landing-showcase__greeting-strip" aria-label={greetingStripAria}>
            {isAzerbaijaniLayout ? (
              <>
                <div className="landing-showcase__greeting-typewriter" aria-live="polite">
                  <span>{animatedGreeting}</span>
                  <span className="landing-showcase__greeting-caret" aria-hidden="true"></span>
                </div>
                <span className="landing-showcase__greeting-label">{greetingLabel}</span>
              </>
            ) : (
              <>
                <span className="landing-showcase__greeting-label">{greetingLabel}</span>
                <div className="landing-showcase__greeting-typewriter" aria-live="polite">
                  <span>{animatedGreeting}</span>
                  <span className="landing-showcase__greeting-caret" aria-hidden="true"></span>
                </div>
              </>
            )}
          </div>
          <div className="landing-showcase__contact-actions">
            {contactItems.map((item) => (
              <a
                key={item.label}
                className="landing-showcase__back-button landing-showcase__section-button landing-showcase__contact-button"
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
              >
                <span className="landing-showcase__contact-icon">{item.icon}</span>
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        </section>
      </div>

      <p className="landing-showcase__footer-note">{footer}</p>
    </>
  );
}

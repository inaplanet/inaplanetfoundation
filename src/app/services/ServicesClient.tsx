'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaTelegramPlane, FaWhatsapp } from 'react-icons/fa';
import { MdMailOutline } from 'react-icons/md';
import { SERVICE_PAGE_MAP, SERVICE_PAGES } from '../content/services';
import { SERVICE_ROUTE_TRANSLATIONS, SERVICE_ROUTE_UI, type ServiceRouteLanguage } from '../content/serviceRouteCopy';
import { SITE_EMAIL } from '../content/site';

const LANGUAGE_OPTIONS = [
  { code: 'az', label: 'AZ' },
  { code: 'ru', label: 'RU' },
  { code: 'en', label: 'ENG' },
] as const;

type ServicesClientProps = {
  slug?: string;
};

export default function ServicesClient({ slug }: ServicesClientProps) {
  const [language, setLanguage] = useState<ServiceRouteLanguage>('en');
  const ui = SERVICE_ROUTE_UI[language];
  const fontClass = language === 'en' ? 'landing-showcase__shell--orbitron' : 'landing-showcase__shell--exo';
  const service = slug ? SERVICE_PAGE_MAP[slug] : null;

  if (slug && !service) {
    return null;
  }

  const localizedService = service && language !== 'en'
    ? SERVICE_ROUTE_TRANSLATIONS[language][service.slug]
    : null;

  const serviceTitle = localizedService?.title ?? service?.title ?? '';
  const serviceSummary = localizedService?.summary ?? service?.summary ?? '';
  const serviceSections = service
    ? ui.sectionTitles.map((sectionTitle, index) => ({
        title: sectionTitle,
        body: localizedService?.sections[index] ?? service.sections[index]?.body ?? '',
      }))
    : [];

  const contactItems = [
    {
      label: ui.contactLabels[0],
      href: 'https://wa.me/393515018252',
      icon: <FaWhatsapp aria-hidden="true" />,
    },
    {
      label: ui.contactLabels[1],
      href: 'https://t.me/lvnmmdv',
      icon: <FaTelegramPlane aria-hidden="true" />,
    },
    {
      label: ui.contactLabels[2],
      href: `mailto:${SITE_EMAIL}`,
      icon: <MdMailOutline aria-hidden="true" />,
    },
  ];

  return (
    <main className={slug ? 'service-page' : 'service-hub'}>
      <section className={`service-route__shell ${fontClass}`}>
        <div className="landing-showcase__topbar service-route__topbar">
          <Link href="/" className="landing-showcase__back-button service-route__back-button">
            <span className="landing-showcase__back-label">{ui.backToMainPage}</span>
          </Link>
        </div>
        <div className="service-route__content">
          <div className="landing-showcase__language-switch" role="group" aria-label={ui.languageSwitcherLabel}>
            {LANGUAGE_OPTIONS.map((option) => (
              <button
                key={option.code}
                type="button"
                className={`landing-showcase__language-button ${language === option.code ? 'landing-showcase__language-button-active' : ''}`}
                onClick={() => setLanguage(option.code)}
              >
                {option.label}
              </button>
            ))}
          </div>

          {service ? (
            <>
              <div className="service-page__hero">
                <p className="landing-showcase__eyebrow">{ui.detailEyebrow}</p>
                <h1 className="service-page__title">{serviceTitle}</h1>
                <p className="service-page__copy">{serviceSummary}</p>
              </div>

              <div className="service-route__divider landing-showcase__divider" aria-hidden="true"></div>

              <div className="service-page__sections">
                {serviceSections.map((section) => (
                  <article key={section.title} className="service-page__card">
                    <h2>{section.title}</h2>
                    <p>{section.body}</p>
                  </article>
                ))}
              </div>

              <Link href="/services" className="service-hub__link service-route__all-services-link">
                {ui.allServices}
              </Link>
            </>
          ) : (
            <>
              <div className="service-hub__hero">
                <p className="landing-showcase__eyebrow">{ui.routeEyebrow}</p>
                <h1 className="service-hub__title">{ui.servicesTitle}</h1>
                <p className="service-hub__copy">{ui.servicesCopy}</p>
              </div>

              <div className="service-route__divider landing-showcase__divider" aria-hidden="true"></div>

              <div className="service-hub__grid">
                {SERVICE_PAGES.map((entry) => {
                  const localizedEntry = language !== 'en' ? SERVICE_ROUTE_TRANSLATIONS[language][entry.slug] : null;

                  return (
                    <Link key={entry.slug} href={`/services/${entry.slug}`} className="service-hub__card service-route__card-link">
                      <p className="service-hub__card-eyebrow">{ui.topLevelRouteLabel}</p>
                      <h2>{localizedEntry?.title ?? entry.title}</h2>
                      <p>{localizedEntry?.summary ?? entry.summary}</p>
                      <span className="service-hub__link service-route__card-button">{ui.openService}</span>
                    </Link>
                  );
                })}
              </div>
            </>
          )}

          <div className="service-route__divider landing-showcase__divider" aria-hidden="true"></div>

          <div className="landing-showcase__sections">
            <section className="landing-showcase__section landing-showcase__section--story">
              <h2>{ui.aboutTitle}</h2>
              <p>{ui.aboutParagraphs[0]}</p>
              <p className="landing-showcase__story-copy">{ui.aboutParagraphs[1]}</p>
            </section>

            <section className="landing-showcase__section landing-showcase__section--contact">
              <h2>{ui.contactTitle}</h2>
              <p>
                {ui.contactCopy.includes(SITE_EMAIL) ? (
                  <>
                    {ui.contactCopy.split(SITE_EMAIL)[0]}
                    <span className="landing-showcase__contact-email">{SITE_EMAIL}</span>
                    {ui.contactCopy.split(SITE_EMAIL).slice(1).join(SITE_EMAIL)}
                  </>
                ) : (
                  ui.contactCopy
                )}
              </p>
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

          <p className="landing-showcase__footer-note">{ui.footer}</p>
        </div>
      </section>
    </main>
  );
}

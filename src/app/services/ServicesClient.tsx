'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  FaBriefcase,
  FaBroadcastTower,
  FaCube,
  FaDatabase,
  FaGamepad,
  FaRobot,
  FaReact,
  FaServer,
  FaStore,
  FaTelegramPlane,
  FaUserShield,
  FaUsers,
  FaWhatsapp,
  FaMobileAlt,
  FaWindowMaximize,
} from 'react-icons/fa';
import { FiArrowUpRight } from 'react-icons/fi';
import { MdLocalMall, MdMailOutline } from 'react-icons/md';
import PlanetFooterSection from '../PlanetFooterSection';
import SignatureComponent from '../SignatureComponent';
import { SERVICE_PAGE_MAP, SERVICE_PAGES } from '../content/services';
import { SERVICE_ROUTE_TRANSLATIONS, SERVICE_ROUTE_UI, type ServiceRouteLanguage } from '../content/serviceRouteCopy';
import { SITE_EMAIL } from '../content/site';
import { getLocalePath, type SiteLocale } from '../i18n';
import { useDeferredLanguageFont } from '../useDeferredLanguageFont';

const LANGUAGE_OPTIONS = [
  { code: 'az', label: 'AZ' },
  { code: 'ru', label: 'RU' },
  { code: 'en', label: 'ENG' },
] as const;

const SERVICE_CARD_ICONS = {
  'corporate-websites': <FaBriefcase aria-hidden="true" />,
  'landing-pages': <FaWindowMaximize aria-hidden="true" />,
  'web-app-development': <FaReact aria-hidden="true" />,
  'e-commerce-development': <MdLocalMall aria-hidden="true" />,
  'marketplace-development': <FaStore aria-hidden="true" />,
  'social-network-development': <FaUsers aria-hidden="true" />,
  'multiplayer-game-development': <FaGamepad aria-hidden="true" />,
  'mobile-app-development': <FaMobileAlt aria-hidden="true" />,
  'backend-systems': <FaDatabase aria-hidden="true" />,
  'real-time-systems': <FaBroadcastTower aria-hidden="true" />,
  'auth-payment-flows': <FaUserShield aria-hidden="true" />,
  'vpc-cloud-infrastructure': <FaServer aria-hidden="true" />,
  'smart-contract-development': <FaCube aria-hidden="true" />,
  'ai-integrations': <FaRobot aria-hidden="true" />,
} as const;

type ServicesClientProps = {
  slug?: string;
  initialLanguage?: SiteLocale;
};

export default function ServicesClient({ slug, initialLanguage = 'en' }: ServicesClientProps) {
  const pathname = usePathname();
  const router = useRouter();
  const {
    language,
    renderedLanguage,
    renderedFontLanguage,
    isLanguageReady,
  } = useDeferredLanguageFont<ServiceRouteLanguage>(initialLanguage);
  const ui = SERVICE_ROUTE_UI[renderedLanguage];
  const fontClass = renderedFontLanguage === 'en' ? 'landing-showcase__shell--orbitron' : 'landing-showcase__shell--exo';
  const service = slug ? SERVICE_PAGE_MAP[slug] : null;
  const currentLocalePath = slug ? `/services/${slug}` : '/services';
  const homePath = getLocalePath(initialLanguage, '/');
  const allServicesPath = getLocalePath(initialLanguage, '/services');

  if (slug && !service) {
    return null;
  }

  const localizedService = service && renderedLanguage !== 'en'
    ? SERVICE_ROUTE_TRANSLATIONS[renderedLanguage][service.slug]
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
      <section
        className={`service-route__shell ${fontClass} ${isLanguageReady ? '' : 'landing-showcase__shell--switching'}`}
        aria-busy={!isLanguageReady}
      >
        <div className="landing-showcase__topbar service-route__topbar">
          <Link href={homePath} className="landing-showcase__back-button service-route__back-button">
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
                onClick={() => {
                  if (option.code !== initialLanguage) {
                    router.push(getLocalePath(option.code, currentLocalePath));
                  }
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
          <div key={`${pathname}-${renderedLanguage}`} className="service-route__localized-content route-content-reveal">
            {service ? (
              <>
                <div className="service-page__hero">
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

                <Link href={allServicesPath} className="service-hub__link service-route__all-services-link">
                  {ui.allServices}
                </Link>
              </>
            ) : (
              <>
                <div className="service-hub__hero">
                  <h1 className="service-hub__title">{ui.servicesTitle}</h1>
                  <p className="service-hub__copy">{ui.servicesCopy}</p>
                </div>

                <div className="service-route__divider landing-showcase__divider" aria-hidden="true"></div>

                <div className="service-hub__grid">
                  {SERVICE_PAGES.map((entry) => {
                    const localizedEntry = renderedLanguage !== 'en' ? SERVICE_ROUTE_TRANSLATIONS[renderedLanguage][entry.slug] : null;

                    return (
                      <Link key={entry.slug} href={getLocalePath(initialLanguage, `/services/${entry.slug}`)} className="service-hub__card service-route__card-link">
                        <span className="landing-showcase__route-arrow service-hub__card-arrow" aria-hidden="true">
                          <FiArrowUpRight />
                        </span>
                        <div className="service-hub__card-head">
                          <span className="landing-showcase__expertise-icon service-hub__card-icon">
                            {SERVICE_CARD_ICONS[entry.slug as keyof typeof SERVICE_CARD_ICONS]}
                          </span>
                          <h2>{localizedEntry?.title ?? entry.title}</h2>
                        </div>
                        <p>{localizedEntry?.summary ?? entry.summary}</p>
                      </Link>
                    );
                  })}
                </div>
              </>
            )}

            <div className="service-route__divider landing-showcase__divider" aria-hidden="true"></div>

            <div className="landing-showcase__footer-stack">
              <PlanetFooterSection
                aboutTitle={ui.aboutTitle}
                aboutParagraphs={ui.aboutParagraphs}
                contactTitle={ui.contactTitle}
                contactCopy={ui.contactCopy}
                greetingStripAria={ui.greetingStripAria}
                greetingLabel={ui.greetingLabel}
                isAzerbaijaniLayout={renderedLanguage === 'az'}
                contactItems={contactItems}
                email={SITE_EMAIL}
                desktopLayout="split"
              />
              <SignatureComponent text={ui.footer} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

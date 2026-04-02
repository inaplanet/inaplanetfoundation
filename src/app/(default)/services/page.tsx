import type { Metadata } from 'next';
import ServicePageContent from '../../ServicePageContent';
import { buildServicesIndexMetadata } from '../../seo';

export function generateMetadata(): Metadata {
  return buildServicesIndexMetadata('en');
}

export default function ServicesPage() {
  return <ServicePageContent locale="en" />;
}

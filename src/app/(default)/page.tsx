import type { Metadata } from 'next';
import HomePageContent from '../HomePageContent';
import { buildHomeMetadata } from '../seo';

export function generateMetadata(): Metadata {
  return buildHomeMetadata('en');
}

export default function HomePage() {
  return <HomePageContent locale="en" />;
}

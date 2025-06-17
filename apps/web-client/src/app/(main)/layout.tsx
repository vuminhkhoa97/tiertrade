import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Marketplace - Browse Premium Digital Items',
  description: 'Explore our curated marketplace of premium digital items. Filter by categories (Mythic, Epic, Accessory), tiers (Premium, Deluxe, Standard), and themes. Find rare collectibles and exclusive items.',
  keywords: ['marketplace', 'digital items', 'mythic items', 'epic collectibles', 'premium accessories', 'tier trading', 'collectible marketplace'],
  openGraph: {
    title: 'TierTrade Marketplace - Premium Digital Items',
    description: 'Explore our curated marketplace of premium digital items. Filter by categories, tiers, and themes.',
    type: 'website',
    images: [
      {
        url: '/images/banner.webp',
        width: 1200,
        height: 630,
        alt: 'TierTrade Marketplace',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TierTrade Marketplace - Premium Digital Items',
    description: 'Explore our curated marketplace of premium digital items.',
    images: ['/images/banner.webp'],
  },
  alternates: {
    canonical: '/marketplace',
  },
};

export default function MarketplaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
